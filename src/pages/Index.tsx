import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import CategoryExpenseMap from "@/components/dashboard/CategoryExpenseMap";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        <DashboardStats />
        <CategoryExpenseMap />
        {/* Sección de acceso rápido */}
        <div className="mt-12 space-y-6">
          <h3 className="text-2xl font-semibold text-foreground">Acceso Rápido</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg border border-border p-6 hover:bg-card/80 transition-colors cursor-pointer">
              <h4 className="text-lg font-medium text-foreground mb-2">Registrar Gasto</h4>
              <p className="text-muted-foreground text-sm">Añade un nuevo gasto rápidamente</p>
            </div>
            <div className="bg-card rounded-lg border border-border p-6 hover:bg-card/80 transition-colors cursor-pointer">
              <h4 className="text-lg font-medium text-foreground mb-2">Ver Categorías</h4>
              <p className="text-muted-foreground text-sm">Analiza tus gastos por categoría</p>
            </div>
            <div className="bg-card rounded-lg border border-border p-6 hover:bg-card/80 transition-colors cursor-pointer">
              <h4 className="text-lg font-medium text-foreground mb-2">WhatsApp Bot</h4>
              <p className="text-muted-foreground text-sm">Conecta con tu asistente IA</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
