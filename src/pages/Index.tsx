import DashboardHeader from "@/components/dashboard/DashboardHeader";
import BudgetHero from "@/components/dashboard/BudgetHero";
import CategoryExpenseCard from "@/components/dashboard/CategoryExpenseCard";
import WeeklyTrendChart from "@/components/dashboard/WeeklyTrendChart";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decoración de fondo sutil */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/2 rounded-full blur-3xl" />
      </div>
      
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6 lg:space-y-8">
        {/* Métrica 1: Hero Section - Te quedan $X para el mes */}
        <div className="mb-12">
          <BudgetHero 
            remainingAmount={1234}
            totalBudget={2500}
            spentAmount={1266}
            dailySpent={87}
            weeklySpent={456}
          />
        </div>

        {/* Métricas 2 y 3: Gastos por categoría + Tendencia semanal */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          <CategoryExpenseCard />
          <WeeklyTrendChart />
        </div>
      </main>
    </div>
  );
};

export default Index;
