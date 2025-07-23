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
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getExcedente = (actual: number, presupuestado: number) => {
    return presupuestado - actual;
  };

  const getActualColor = (actual: number) => {
    return actual > 0 ? '#dc2626' : '#16a34a'; // rojo si hay gasto, verde si no
  };

  const getExcedenteColor = (excedente: number) => {
    return excedente >= 0 ? '#16a34a' : '#dc2626'; // verde si queda presupuesto, rojo si se excedió
  };

  return (
    <Card className="bg-white border border-gray-300 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900">Presupuesto</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="text-left py-3 px-6 font-semibold text-gray-900 border-r border-gray-200">Categoría</th>
                <th className="text-center py-3 px-6 font-semibold text-gray-900 border-r border-gray-200">Actual</th>
                <th className="text-center py-3 px-6 font-semibold text-gray-900 border-r border-gray-200">Presupuestado</th>
                <th className="text-center py-3 px-6 font-semibold text-gray-900">Excedente</th>
              </tr>
            </thead>
            <tbody>
              {budgetData.map((item, index) => {
                const excedente = getExcedente(item.actual, item.presupuestado);
                return (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-900 capitalize border-r border-gray-200">{item.categoria}</td>
                    <td 
                      className="py-4 px-6 text-center font-semibold border-r border-gray-200"
                      style={{ color: getActualColor(item.actual) }}
                    >
                      {formatCurrency(item.actual)}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-700 border-r border-gray-200">
                      {formatCurrency(item.presupuestado)}
                    </td>
                    <td 
                      className="py-4 px-6 text-center font-semibold"
                      style={{ color: getExcedenteColor(excedente) }}
                    >
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