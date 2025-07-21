import DashboardHeader from "@/components/dashboard/DashboardHeader";
import CategoryExpenseCard from "@/components/dashboard/CategoryExpenseCard";
import DashboardStats from "@/components/dashboard/DashboardStats";
import AddExpenseForm from "@/components/dashboard/AddExpenseForm";
import { useTransactions } from "@/hooks/useTransactions";

const Index = () => {
  const { loading, transactions, refetch } = useTransactions();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <DashboardHeader />

        {transactions.length === 0 ? (
          // Estado vacío - Primera vez
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-foreground">
                ¡Bienvenido a Financia!
              </h1>
              <p className="text-xl text-muted-foreground">
                Comienza a gestionar tus finanzas personales de manera inteligente
              </p>
              <p className="text-muted-foreground">
                Agrega tu primera transacción para empezar a ver tu dashboard financiero
              </p>
            </div>
            
            <div className="bg-card/50 backdrop-blur border rounded-lg p-6">
              <AddExpenseForm onTransactionAdded={refetch} />
            </div>
          </div>
        ) : (
          // Dashboard con datos
          <div className="space-y-8">
            {/* Métricas de gastos */}
            <DashboardStats />

            {/* Grid de componentes principales */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gastos por categoría */}
              <CategoryExpenseCard />
              
              {/* Lista de transacciones recientes */}
              <div className="bg-card/50 backdrop-blur border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Transacciones Recientes</h3>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {transactions.slice(0, 10).map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{transaction.descripcion}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {transaction.categoria} • {new Date(transaction.creado_en!).toLocaleDateString('es-CO')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">
                          {new Intl.NumberFormat('es-CO', {
                            style: 'currency',
                            currency: 'COP',
                            minimumFractionDigits: 0,
                          }).format(transaction.valor || 0)}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {transaction.tipo}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Formulario para agregar gastos */}
            <div className="bg-card/50 backdrop-blur border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Agregar Nueva Transacción</h3>
              <AddExpenseForm onTransactionAdded={refetch} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;