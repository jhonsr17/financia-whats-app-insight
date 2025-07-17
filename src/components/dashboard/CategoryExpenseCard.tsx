import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Utensils, 
  Car, 
  Zap, 
  Gamepad2, 
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface CategoryData {
  name: string;
  value: number;
  icon: React.ReactNode;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
}

const CategoryExpenseCard = () => {
  const categoryData: CategoryData[] = [
    {
      name: 'Comida',
      value: 450,
      icon: <Utensils className="h-5 w-5" />,
      percentage: 32,
      trend: 'up',
      trendValue: 15
    },
    {
      name: 'Transporte',
      value: 350,
      icon: <Car className="h-5 w-5" />,
      percentage: 25,
      trend: 'down',
      trendValue: 8
    },
    {
      name: 'Entretenimiento',
      value: 280,
      icon: <Gamepad2 className="h-5 w-5" />,
      percentage: 20,
      trend: 'up',
      trendValue: 22
    },
    {
      name: 'Vivienda',
      value: 150,
      icon: <Home className="h-5 w-5" />,
      percentage: 11,
      trend: 'stable',
      trendValue: 0
    },
    {
      name: 'Servicios',
      value: 100,
      icon: <Zap className="h-5 w-5" />,
      percentage: 7,
      trend: 'down',
      trendValue: 5
    }
  ];

  const totalAmount = categoryData.reduce((sum, item) => sum + item.value, 0);

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
    if (trend === 'up') return 'text-red-500';
    if (trend === 'down') return 'text-green-500';
    return 'text-muted-foreground';
  };

  return (
    <Card className="bg-card border-border shadow-lg h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground">
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
            className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors flex-shrink-0">
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
                <div className="w-full bg-border rounded-full h-1.5 sm:h-2 mb-2">
                  <div 
                    className="bg-primary h-1.5 sm:h-2 rounded-full transition-all duration-500"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-xs sm:text-sm gap-2">
                  <span className="text-muted-foreground">{category.percentage}% del total</span>
                  <Badge variant="secondary" className="text-xs flex-shrink-0">
                    {formatCurrency(category.value)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Summary footer */}
        <div className="mt-4 sm:mt-6 pt-4 border-t border-border">
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