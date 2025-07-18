import DashboardHeader from "@/components/dashboard/DashboardHeader";
import BudgetHero from "@/components/dashboard/BudgetHero";
import CategoryExpenseCard from "@/components/dashboard/CategoryExpenseCard";
import WeeklyTrendChart from "@/components/dashboard/WeeklyTrendChart";
import { useTransactions } from "@/hooks/useTransactions";

const Index = () => {
  const { totalSpent, todaySpent, weeklySpent, loading, transactions } = useTransactions();
  
  const totalBudget = 2500000; // $2.5M COP como presupuesto base
  const remainingAmount = totalBudget - totalSpent;

  console.log('Estado del dashboard:', { totalSpent, todaySpent, weeklySpent, loading, transactionsCount: transactions.length });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando transacciones...</p>
        </div>
      </div>
    );
  }

  // Si no hay transacciones, mostrar estado inicial
  if (transactions.length === 0) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Decoración de fondo sutil */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/2 rounded-full blur-3xl" />
        </div>
        
        <DashboardHeader />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4">¡Bienvenido a FinancIA!</h1>
            <p className="text-muted-foreground mb-8">Aún no tienes transacciones registradas. Conecta tu cuenta para comenzar.</p>
            <div className="bg-card border rounded-lg p-6 max-w-md mx-auto">
              <p className="text-sm text-muted-foreground">
                Una vez que registres transacciones, aquí verás tu dashboard con:
              </p>
              <ul className="mt-4 text-left text-sm space-y-2">
                <li>• Presupuesto restante del mes</li>
                <li>• Gastos por categoría</li>
                <li>• Tendencias semanales</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
            remainingAmount={remainingAmount}
            totalBudget={totalBudget}
            spentAmount={totalSpent}
            dailySpent={todaySpent}
            weeklySpent={weeklySpent}
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
