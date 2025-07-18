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
      
      // Primero verificamos si el usuario está autenticado
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log('Usuario no autenticado');
        setTransactions([]);
        return;
      }

      const { data, error } = await supabase
        .from('transacciones')
        .select('*')
        .eq('usuario_id', user.id)
        .order('creado_en', { ascending: false });

      if (error) {
        console.error('Error fetching transactions:', error);
        throw error;
      }
      
      console.log('Transacciones cargadas:', data);
      console.log('Usuario ID:', user.id);
      
      // Debug detallado
      if (data && data.length > 0) {
        const today = new Date();
        console.log('Fecha de hoy:', today.toDateString());
        
        data.forEach(t => {
          const transactionDate = new Date(t.creado_en);
          console.log(`Transacción: ${t.valor} COP, fecha: ${transactionDate.toDateString()}, tipo: ${t.tipo}`);
        });
        
        const todayTransactions = data.filter(t => {
          if (!t.creado_en || t.tipo !== 'gasto') return false;
          const transactionDate = new Date(t.creado_en);
          return today.toDateString() === transactionDate.toDateString();
        });
        
        console.log('Gastos de hoy encontrados:', todayTransactions);
        console.log('Total gastos de hoy:', todayTransactions.reduce((sum, t) => sum + (t.valor || 0), 0));
      }
      
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      // No mostrar toast si es solo que no hay usuario autenticado
      if (error?.message?.includes('user_id') || error?.message?.includes('usuario_id')) {
        console.log('Problema con autenticación o permisos');
      } else {
        toast({
          title: "Error",
          description: "No se pudieron cargar las transacciones",
          variant: "destructive",
        });
      }
      setTransactions([]);
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

  // Gasto de hoy - calculado usando fecha local del usuario
  const todaySpent = transactions
    .filter(t => {
      if (!t.creado_en || t.tipo !== 'gasto') return false;
      const today = new Date();
      const transactionDate = new Date(t.creado_en);
      
      return today.toDateString() === transactionDate.toDateString();
    })
    .reduce((sum, t) => sum + (t.valor || 0), 0);

  // Gasto de la semana (últimos 7 días)
  const weeklySpent = transactions
    .filter(t => {
      if (!t.creado_en || t.tipo !== 'gasto') return false;
      const today = new Date();
      const transactionDate = new Date(t.creado_en);
      const daysDifference = Math.floor((today.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24));
      return daysDifference >= 0 && daysDifference < 7;
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

  console.log('Métricas calculadas:', { totalSpent, todaySpent, weeklySpent });

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