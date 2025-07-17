import DashboardHeader from "@/components/dashboard/DashboardHeader";
import BudgetHero from "@/components/dashboard/BudgetHero";
import CategoryDonutChart from "@/components/dashboard/CategoryDonutChart";
import WeeklyTrendChart from "@/components/dashboard/WeeklyTrendChart";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
        {/* Métrica 1: Hero Section - Te quedan $X para el mes */}
        <div className="mb-12">
          <BudgetHero 
            remainingAmount={1234}
            totalBudget={2500}
            spentAmount={1266}
          />
        </div>

        {/* Métricas 2 y 3: Gastos por categoría + Tendencia semanal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CategoryDonutChart />
          <WeeklyTrendChart />
        </div>
      </main>
    </div>
  );
};

export default Index;
