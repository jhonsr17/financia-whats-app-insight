import { useState } from "react";
import { Edit3, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface BudgetHeroProps {
  remainingAmount: number;
  totalBudget: number;
  spentAmount: number;
}

const BudgetHero = ({ 
  remainingAmount = 1234, 
  totalBudget = 2500, 
  spentAmount = 1266
}: BudgetHeroProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const percentageRemaining = (remainingAmount / totalBudget) * 100;
  const percentageSpent = (spentAmount / totalBudget) * 100;
  
  // Sistema de semáforo para estado financiero
  const getFinancialStatus = () => {
    if (percentageSpent <= 60) return 'good'; // Verde
    if (percentageSpent <= 85) return 'warning'; // Amarillo
    return 'danger'; // Rojo
  };

  const financialStatus = getFinancialStatus();
  
  // Determinar color basado en estado del semáforo
  const getStatusColor = () => {
    switch (financialStatus) {
      case 'good': return "text-green-400";
      case 'warning': return "text-yellow-400";  
      case 'danger': return "text-red-400";
      default: return "text-primary";
    }
  };
  
  const getProgressColor = () => {
    switch (financialStatus) {
      case 'good': return "bg-green-400";
      case 'warning': return "bg-yellow-400";
      case 'danger': return "bg-red-400";
      default: return "bg-primary";
    }
  };

  const getOverlayColor = () => {
    switch (financialStatus) {
      case 'good': return "bg-green-400/10";
      case 'warning': return "bg-yellow-400/10";
      case 'danger': return "bg-red-400/10";
      default: return "bg-transparent";
    }
  };

  const getStatusIcon = () => {
    switch (financialStatus) {
      case 'good': return <CheckCircle2 className="h-5 w-5 text-green-400" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      case 'danger': return <AlertTriangle className="h-5 w-5 text-red-400" />;
      default: return null;
    }
  };

  const getStatusMessage = () => {
    switch (financialStatus) {
      case 'good': return "¡Vas por buen camino!";
      case 'warning': return "Moderación recomendada";
      case 'danger': return "¡Atención necesaria!";
      default: return "";
    }
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

  // Componente para slide individual
  const MetricSlide = ({ 
    title, 
    amount, 
    subtitle, 
    icon, 
    showProgress = false 
  }: {
    title: string;
    amount: number;
    subtitle: string;
    icon: React.ReactNode;
    showProgress?: boolean;
  }) => (
    <div className="text-center space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2">
          {icon}
          <h1 className="text-lg md:text-xl text-muted-foreground font-medium">
            {title}
          </h1>
        </div>
        
        <div 
          className={`text-5xl md:text-6xl lg:text-7xl font-bold ${getStatusColor()} cursor-pointer transition-all duration-200 hover:scale-105 ${isOverBudget && showProgress ? 'animate-pulse' : ''}`}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {formatCurrency(Math.abs(amount))}
          {isOverBudget && showProgress && <span className="text-primary/60">-</span>}
        </div>

        <p className="text-sm md:text-base text-muted-foreground">
          {subtitle}
        </p>
      </div>

      {showProgress && (
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
              <span className="flex items-center text-primary/60 font-medium">
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
      )}
    </div>
  );

  return (
    <div className="relative neon-border bg-card/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl neon-glow">
      {/* Decoración neon de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-primary/5 to-neon-accent/5 rounded-2xl pointer-events-none" />
      {/* Overlay del semáforo */}
      <div className={`absolute inset-0 ${getOverlayColor()} rounded-2xl pointer-events-none transition-colors duration-300`} />
      {/* Botón de editar */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-4 right-4 text-muted-foreground hover:text-neon-primary hover:neon-glow transition-all duration-200 z-10"
      >
        <Edit3 className="h-5 w-5" />
      </Button>

      <Carousel className="w-full max-w-4xl mx-auto relative z-10">
        <CarouselContent>
          {/* Slide 1: Presupuesto restante */}
          <CarouselItem>
            <div className="text-center space-y-6">
              {/* Indicador de semáforo */}
              <div className="flex items-center justify-center gap-3 mb-4">
                {getStatusIcon()}
                <span className={`text-sm font-medium ${getStatusColor()}`}>
                  {getStatusMessage()}
                </span>
              </div>
              
              <MetricSlide
                title={isOverBudget ? "¡Presupuesto agotado!" : "Te quedan"}
                amount={remainingAmount}
                subtitle={`de ${formatCurrency(totalBudget)} presupuesto mensual`}
                icon={<TrendingUp className="h-6 w-6 text-muted-foreground" />}
                showProgress={true}
              />
            </div>
          </CarouselItem>

        </CarouselContent>
        
        <CarouselPrevious className="left-4 neon-border bg-card/80 hover:bg-card hover:neon-glow transition-all duration-200" />
        <CarouselNext className="right-4 neon-border bg-card/80 hover:bg-card hover:neon-glow transition-all duration-200" />
      </Carousel>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-popover border border-border rounded-lg p-3 shadow-lg z-10">
          <p className="text-sm text-popover-foreground">
            Llevas gastado {formatCurrency(spentAmount)} este mes
          </p>
        </div>
      )}
    </div>
  );
};

export default BudgetHero;