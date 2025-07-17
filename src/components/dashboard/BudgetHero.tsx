import { useState } from "react";
import { Edit3, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface BudgetHeroProps {
  remainingAmount: number;
  totalBudget: number;
  spentAmount: number;
}

const BudgetHero = ({ remainingAmount = 1234, totalBudget = 2500, spentAmount = 1266 }: BudgetHeroProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const percentageRemaining = (remainingAmount / totalBudget) * 100;
  const percentageSpent = (spentAmount / totalBudget) * 100;
  
  // Determinar color basado en porcentaje restante
  const getStatusColor = () => {
    if (percentageRemaining > 50) return "text-green-500";
    if (percentageRemaining >= 20) return "text-yellow-500";
    return "text-red-500";
  };
  
  const getProgressColor = () => {
    if (percentageRemaining > 50) return "bg-green-500";
    if (percentageRemaining >= 20) return "bg-yellow-500";
    return "bg-red-500";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const isOverBudget = remainingAmount < 0;

  return (
    <div className="relative bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border p-8 md:p-12 shadow-2xl">
      {/* Botón de editar */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
      >
        <Edit3 className="h-5 w-5" />
      </Button>

      <div className="text-center space-y-6">
        {/* Texto principal */}
        <div className="space-y-2">
          <h1 className="text-lg md:text-xl text-muted-foreground font-medium">
            {isOverBudget ? "¡Presupuesto agotado!" : "Te quedan"}
          </h1>
          
          {/* Monto principal */}
          <div 
            className={`text-5xl md:text-6xl lg:text-7xl font-bold ${getStatusColor()} cursor-pointer transition-all duration-200 hover:scale-105 ${isOverBudget ? 'animate-pulse' : ''}`}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {formatCurrency(Math.abs(remainingAmount))}
            {isOverBudget && <span className="text-red-500">-</span>}
          </div>

          <p className="text-sm md:text-base text-muted-foreground">
            de {formatCurrency(totalBudget)} presupuesto mensual
          </p>
        </div>

        {/* Barra de progreso */}
        <div className="space-y-3 max-w-md mx-auto">
          <div className="relative">
            <Progress 
              value={Math.min(percentageSpent, 100)} 
              className="h-3 bg-muted"
            />
            <div 
              className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getProgressColor()}`}
              style={{ width: `${Math.min(percentageSpent, 100)}%` }}
            />
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className={`font-medium ${getStatusColor()}`}>
              {Math.round(percentageRemaining)}% restante
            </span>
            {percentageSpent > 100 ? (
              <span className="flex items-center text-red-500 font-medium">
                <TrendingDown className="h-4 w-4 mr-1" />
                {Math.round(percentageSpent - 100)}% excedido
              </span>
            ) : (
              <span className="flex items-center text-muted-foreground">
                <TrendingUp className="h-4 w-4 mr-1" />
                {Math.round(percentageSpent)}% gastado
              </span>
            )}
          </div>
        </div>

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-popover border border-border rounded-lg p-3 shadow-lg z-10">
            <p className="text-sm text-popover-foreground">
              Llevas gastado {formatCurrency(spentAmount)} este mes
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetHero;