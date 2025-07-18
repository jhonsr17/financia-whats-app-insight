import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Utensils, 
  Car, 
  Zap, 
  Gamepad2, 
  TrendingUp,
  TrendingDown,
  Package
} from 'lucide-react';
import { useTransactions } from "@/hooks/useTransactions";

interface CategoryData {
  name: string;
  value: number;
  icon: React.ReactNode;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
}

const CategoryExpenseCard = () => {
  const { expensesByCategory } = useTransactions();

  const getCategoryIcon = (category: string) => {
    const normalizedCategory = category.toLowerCase();
    if (normalizedCategory.includes('comida') || normalizedCategory.includes('alimentación')) {
      return <Utensils className="h-5 w-5" />;
    }
    if (normalizedCategory.includes('transporte')) {
      return <Car className="h-5 w-5" />;
    }
    if (normalizedCategory.includes('entretenimiento') || normalizedCategory.includes('ocio')) {
      return <Gamepad2 className="h-5 w-5" />;
    }
    if (normalizedCategory.includes('vivienda') || normalizedCategory.includes('hogar')) {
      return <Home className="h-5 w-5" />;
    }
    if (normalizedCategory.includes('servicios') || normalizedCategory.includes('servicio')) {
      return <Zap className="h-5 w-5" />;
    }
    return <Package className="h-5 w-5" />;
  };

  const totalAmount = Object.values(expensesByCategory).reduce((sum, value) => sum + value, 0);
  
  const categoryData: CategoryData[] = Object.entries(expensesByCategory)
    .map(([category, value]) => ({
      name: category,
      value,
      icon: getCategoryIcon(category),
      percentage: totalAmount > 0 ? Math.round((value / totalAmount) * 100) : 0,
      trend: 'stable' as const,
      trendValue: 0
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  if (categoryData.length === 0) {
    return (
      <Card className="neon-border bg-card/90 backdrop-blur-sm shadow-xl h-fit">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold neon-text">
            ¿En qué gastas más?
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No hay transacciones registradas aún</p>
        </CardContent>
      </Card>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="h-3 w-3" />;
    if (trend === 'down') return <TrendingDown className="h-3 w-3" />;
    return null;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return 'text-primary/70';
    if (trend === 'down') return 'text-primary';
    return 'text-muted-foreground';
  };

  return (
    <Card className="neon-border bg-card/90 backdrop-blur-sm shadow-xl h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold neon-text">
          ¿En qué gastas más?
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Total gastado este mes: <span className="font-semibold text-foreground">{formatCurrency(totalAmount)}</span>
        </p>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {categoryData.map((category, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-muted/50 hover:bg-muted/70 transition-all duration-200 cursor-pointer group border border-muted-foreground/20 hover:border-muted-foreground/40"
          >
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              <div className="p-2 rounded-lg bg-muted/50 text-muted-foreground group-hover:bg-muted/70 transition-colors flex-shrink-0">
                {category.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-foreground truncate text-sm sm:text-base">{category.name}</h3>
                  {category.trend !== 'stable' && (
                    <div className={`flex items-center gap-1 ${getTrendColor(category.trend)} flex-shrink-0`}>
                      {getTrendIcon(category.trend)}
                      <span className="text-xs font-medium">{category.trendValue}%</span>
                    </div>
                  )}
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-muted/30 rounded-full h-1.5 sm:h-2 mb-2">
                  <div 
                    className="bg-primary h-1.5 sm:h-2 rounded-full transition-all duration-500"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-xs sm:text-sm gap-2">
                  <span className="text-muted-foreground">{category.percentage}% del total</span>
                  <Badge variant="secondary" className="text-xs flex-shrink-0 bg-muted/50 text-foreground border-muted">
                    {formatCurrency(category.value)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Summary footer */}
        <div className="mt-4 sm:mt-6 pt-4 border-t border-muted-foreground/20">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-muted-foreground">Mayor gasto:</span>
            <span className="font-semibold text-foreground text-right">
              {categoryData[0].name} ({formatCurrency(categoryData[0].value)})
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryExpenseCard;