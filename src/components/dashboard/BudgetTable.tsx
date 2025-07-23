import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BudgetItem {
  categoria: string;
  actual: number;
  presupuestado: number;
}

interface BudgetTableProps {
  budgetData: BudgetItem[];
}

const BudgetTable = ({ budgetData }: BudgetTableProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getExcedente = (actual: number, presupuestado: number) => {
    return presupuestado - actual;
  };

  const getAmountColor = (amount: number, isExcedente: boolean = false) => {
    if (isExcedente) {
      return amount >= 0 ? 'text-green-600' : 'text-red-600';
    }
    return amount > 0 ? 'text-red-600' : 'text-green-600';
  };

  return (
    <Card className="bg-card/50 backdrop-blur border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Presupuesto</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-4 font-medium text-foreground">Categoría</th>
                <th className="text-right py-2 px-4 font-medium text-foreground">Actual</th>
                <th className="text-right py-2 px-4 font-medium text-foreground">Presupuestado</th>
                <th className="text-right py-2 px-4 font-medium text-foreground">Excedente</th>
              </tr>
            </thead>
            <tbody>
              {budgetData.map((item, index) => {
                const excedente = getExcedente(item.actual, item.presupuestado);
                return (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-3 px-4 text-foreground capitalize">{item.categoria}</td>
                    <td className={`py-3 px-4 text-right font-semibold ${getAmountColor(item.actual)}`}>
                      {formatCurrency(item.actual)}
                    </td>
                    <td className="py-3 px-4 text-right text-muted-foreground">
                      {formatCurrency(item.presupuestado)}
                    </td>
                    <td className={`py-3 px-4 text-right font-semibold ${getAmountColor(excedente, true)}`}>
                      {formatCurrency(excedente)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetTable;