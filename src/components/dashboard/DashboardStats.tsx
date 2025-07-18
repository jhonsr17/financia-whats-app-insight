import ExpenseSummaryCard from "./ExpenseSummaryCard";
import { useTransactions } from "@/hooks/useTransactions";

const DashboardStats = () => {
  const { totalSpent, todaySpent, weeklySpent } = useTransactions();

  // Función para formatear montos
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const statsData = [
    {
      title: "Hoy",
      amount: formatCurrency(todaySpent),
      currency: "COP",
      variant: "today" as const
    },
    {
      title: "Esta Semana", 
      amount: formatCurrency(weeklySpent),
      currency: "COP",
      variant: "week" as const
    },
    {
      title: "Total",
      amount: formatCurrency(totalSpent),
      currency: "COP", 
      variant: "total" as const
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-foreground">Resumen de Gastos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsData.map((stat, index) => (
          <ExpenseSummaryCard
            key={index}
            title={stat.title}
            amount={stat.amount}
            currency={stat.currency}
            variant={stat.variant}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;