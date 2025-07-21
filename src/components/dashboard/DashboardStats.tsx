import ExpenseSummaryCard from "./ExpenseSummaryCard";
import { useTransactions } from "@/hooks/useTransactions";

const DashboardStats = () => {
  const { totalSpent, totalIncome, balance, todaySpent, todayIncome, weeklySpent, weeklyIncome } = useTransactions();

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
      title: "Balance Total",
      amount: formatCurrency(balance),
      currency: "COP",
      variant: "balance" as const,
      isBalance: true
    },
    {
      title: "Ingresos Totales",
      amount: formatCurrency(totalIncome),
      currency: "COP",
      variant: "income" as const
    },
    {
      title: "Gastos de Hoy",
      amount: formatCurrency(todaySpent),
      currency: "COP",
      variant: "today" as const
    },
    {
      title: "Ingresos de Hoy",
      amount: formatCurrency(todayIncome),
      currency: "COP",
      variant: "today-income" as const
    },
    {
      title: "Gastos Esta Semana", 
      amount: formatCurrency(weeklySpent),
      currency: "COP",
      variant: "week" as const
    },
    {
      title: "Total Gastos",
      amount: formatCurrency(totalSpent),
      currency: "COP", 
      variant: "total" as const
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-foreground">Dashboard Financiero</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsData.map((stat, index) => (
          <ExpenseSummaryCard
            key={index}
            title={stat.title}
            amount={stat.amount}
            currency={stat.currency}
            variant={stat.variant}
            isBalance={stat.isBalance}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;