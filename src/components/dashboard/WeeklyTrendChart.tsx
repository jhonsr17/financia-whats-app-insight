import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

const WeeklyTrendChart = () => {
  const weeklyData = [
    { week: 'Sem 1', amount: 320, date: '1-7 Jul' },
    { week: 'Sem 2', amount: 287, date: '8-14 Jul' },
    { week: 'Sem 3', amount: 294, date: '15-21 Jul' },
    { week: 'Esta semana', amount: 330, date: '22-28 Jul' }
  ];

  const currentWeek = weeklyData[weeklyData.length - 1];
  const previousWeek = weeklyData[weeklyData.length - 2];
  const percentChange = ((currentWeek.amount - previousWeek.amount) / previousWeek.amount) * 100;
  const average = weeklyData.reduce((sum, week) => sum + week.amount, 0) / weeklyData.length;
  const isIncreasing = percentChange > 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-popover-foreground">{label}</p>
          <p className="text-sm text-muted-foreground mb-1">Semana del {data.date}</p>
          <p className="text-lg font-bold text-primary">{formatCurrency(data.amount)}</p>
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={6} 
        fill="hsl(var(--neon-primary))" 
        stroke="hsl(var(--background))" 
        strokeWidth={2}
        className="hover:r-8 transition-all cursor-pointer drop-shadow-lg"
        style={{
          filter: 'drop-shadow(0 0 6px hsl(var(--neon-glow)))'
        }}
      />
    );
  };

  return (
    <div className="neon-border bg-card/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold neon-text">
          ¿Gastas más que la semana pasada?
        </h2>
        
        {/* Indicador de tendencia */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 ${
          isIncreasing 
            ? 'bg-red-500/10 text-red-400 border-red-400/30' 
            : 'bg-emerald-500/10 text-emerald-400 border-emerald-400/30'
        }`}>
          {isIncreasing ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span className="text-sm font-medium">
            {isIncreasing ? '+' : ''}{Math.round(percentChange)}% vs semana anterior
          </span>
        </div>
      </div>

      {/* Gráfico */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={weeklyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--neon-primary))" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="hsl(var(--neon-primary))" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="week" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Área bajo la curva */}
            <Area
              type="monotone"
              dataKey="amount"
              stroke="hsl(var(--neon-primary))"
              fill="url(#colorAmount)"
              strokeWidth={3}
            />
            
            {/* Línea de promedio */}
            <Line
              type="monotone"
              dataKey={() => average}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="5 5"
              strokeWidth={1}
              dot={false}
            />
            
            {/* Línea principal */}
            <Line
              type="monotone"
              dataKey="amount"
              stroke="hsl(var(--neon-primary))"
              strokeWidth={3}
              dot={<CustomDot />}
              activeDot={{ 
                r: 8, 
                stroke: 'hsl(var(--background))', 
                strokeWidth: 2,
                fill: 'hsl(var(--neon-primary))',
                filter: 'drop-shadow(0 0 8px hsl(var(--neon-glow)))'
              }}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Indicador de promedio */}
        <div className="absolute top-2 right-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <div className="w-3 h-px bg-muted-foreground opacity-50" style={{ borderTop: '1px dashed' }} />
            Promedio: {formatCurrency(average)}
          </span>
        </div>
      </div>

      {/* Estadísticas adicionales */}
      <div className="mt-4 flex justify-between text-sm text-muted-foreground">
        <span>Mejor semana: {formatCurrency(Math.min(...weeklyData.map(w => w.amount)))}</span>
        <span>Peor semana: {formatCurrency(Math.max(...weeklyData.map(w => w.amount)))}</span>
      </div>
    </div>
  );
};

export default WeeklyTrendChart;