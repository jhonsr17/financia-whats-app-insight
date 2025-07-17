import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Home, Utensils, Car, Zap, User, Gamepad2, CreditCard, MoreHorizontal } from 'lucide-react';

interface CategoryData {
  name: string;
  value: number;
  color: string;
  icon: React.ReactNode;
  percentage: number;
}

const CategoryDonutChart = () => {
  const categoryData: CategoryData[] = [
    {
      name: 'Comida',
      value: 450,
      color: '#ff6b6b',
      icon: <Utensils className="h-4 w-4" />,
      percentage: 32
    },
    {
      name: 'Transporte',
      value: 350,
      color: '#4ecdc4',
      icon: <Car className="h-4 w-4" />,
      percentage: 25
    },
    {
      name: 'Entretenimiento',
      value: 280,
      color: '#45b7d1',
      icon: <Gamepad2 className="h-4 w-4" />,
      percentage: 20
    },
    {
      name: 'Vivienda',
      value: 150,
      color: '#f9ca24',
      icon: <Home className="h-4 w-4" />,
      percentage: 11
    },
    {
      name: 'Servicios',
      value: 100,
      color: '#6c5ce7',
      icon: <Zap className="h-4 w-4" />,
      percentage: 7
    },
    {
      name: 'Otros',
      value: 70,
      color: '#a0a0a0',
      icon: <MoreHorizontal className="h-4 w-4" />,
      percentage: 5
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

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2 mb-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: data.color }}
            />
            <span className="font-medium text-popover-foreground">{data.name}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(data.value)} ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCenterContent = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Total mensual</p>
        <p className="text-lg font-bold text-foreground">{formatCurrency(totalAmount)}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-foreground mb-6">¿En qué gastas más?</h2>
      
      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Gráfico */}
        <div className="relative flex-shrink-0">
          <ResponsiveContainer width={300} height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {categoryData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {renderCenterContent()}
        </div>

        {/* Leyenda personalizada */}
        <div className="flex-1 space-y-3">
          {categoryData.map((item, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex items-center gap-2">
                  <span style={{ color: item.color }}>
                    {item.icon}
                  </span>
                  <span className="font-medium text-foreground">{item.name}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{formatCurrency(item.value)}</p>
                <p className="text-sm text-muted-foreground">{item.percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDonutChart;