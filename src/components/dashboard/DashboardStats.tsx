import ExpenseSummaryCard from "./ExpenseSummaryCard";

const DashboardStats = () => {
  const statsData = [
    {
      title: "Hoy",
      amount: "$85.000",
      currency: "COP",
      variant: "today" as const
    },
    {
      title: "Esta Semana",
      amount: "$420.000", 
      currency: "COP",
      variant: "week" as const
    },
    {
      title: "Este Mes",
      amount: "$1.850.000",
      currency: "COP",
      variant: "month" as const
    },
    {
      title: "Total",
      amount: "$5.240.000",
      currency: "COP", 
      variant: "total" as const
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-foreground">Resumen de Gastos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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