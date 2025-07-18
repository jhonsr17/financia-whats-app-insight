import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Transaction {
  id: string;
  valor: number;
  categoria: string | null;
  tipo: string | null;
  descripcion: string | null;
  creado_en: string | null;
  usuario_id: string | null;
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('transacciones')
        .select('*')
        .order('creado_en', { ascending: false });

      if (error) throw error;
      
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las transacciones",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Cálculos agregados
  const totalSpent = transactions
    .filter(t => t.tipo === 'gasto')
    .reduce((sum, t) => sum + (t.valor || 0), 0);

  const todaySpent = transactions
    .filter(t => {
      if (!t.creado_en || t.tipo !== 'gasto') return false;
      const today = new Date().toDateString();
      const transactionDate = new Date(t.creado_en).toDateString();
      return today === transactionDate;
    })
    .reduce((sum, t) => sum + (t.valor || 0), 0);

  const weeklySpent = transactions
    .filter(t => {
      if (!t.creado_en || t.tipo !== 'gasto') return false;
      const today = new Date();
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const transactionDate = new Date(t.creado_en);
      return transactionDate >= weekAgo && transactionDate <= today;
    })
    .reduce((sum, t) => sum + (t.valor || 0), 0);

  // Gastos por categoría
  const expensesByCategory = transactions
    .filter(t => t.tipo === 'gasto' && t.categoria)
    .reduce((acc, t) => {
      const category = t.categoria!;
      acc[category] = (acc[category] || 0) + (t.valor || 0);
      return acc;
    }, {} as Record<string, number>);

  // Tendencia semanal (últimas 4 semanas)
  const getWeeklyTrend = () => {
    const weeks = [];
    const today = new Date();
    
    for (let i = 3; i >= 0; i--) {
      const weekStart = new Date(today.getTime() - (i + 1) * 7 * 24 * 60 * 60 * 1000);
      const weekEnd = new Date(today.getTime() - i * 7 * 24 * 60 * 60 * 1000);
      
      const weekSpent = transactions
        .filter(t => {
          if (!t.creado_en || t.tipo !== 'gasto') return false;
          const transactionDate = new Date(t.creado_en);
          return transactionDate >= weekStart && transactionDate < weekEnd;
        })
        .reduce((sum, t) => sum + (t.valor || 0), 0);

      weeks.push({
        week: i === 0 ? 'Esta semana' : `Sem ${4 - i}`,
        amount: weekSpent,
        date: `${weekStart.getDate()}-${weekEnd.getDate()} ${weekStart.toLocaleDateString('es', { month: 'short' })}`
      });
    }
    
    return weeks;
  };

  return {
    transactions,
    loading,
    totalSpent,
    todaySpent,
    weeklySpent,
    expensesByCategory,
    weeklyTrend: getWeeklyTrend(),
    refetch: fetchTransactions
  };
};