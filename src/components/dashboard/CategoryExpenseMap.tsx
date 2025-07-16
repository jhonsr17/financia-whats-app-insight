import { Home, Utensils, Car, Zap, Heart, GamepadIcon, CreditCard, MoreHorizontal } from "lucide-react";
import CategoryExpenseCard from "./CategoryExpenseCard";

const CategoryExpenseMap = () => {
  const categoryData = [
    {
      title: "Alimentación",
      amount: "$680.000",
      percentage: "36.7%",
      icon: Utensils,
      color: "bg-gradient-to-br from-red-500 to-red-600",
      size: "large" as const
    },
    {
      title: "Transporte", 
      amount: "$320.000",
      percentage: "17.3%",
      icon: Car,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      size: "medium" as const
    },
    {
      title: "Entretenimiento",
      amount: "$280.000", 
      percentage: "15.1%",
      icon: GamepadIcon,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      size: "medium" as const
    },
    {
      title: "Vivienda",
      amount: "$240.000",
      percentage: "13.0%", 
      icon: Home,
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      size: "medium" as const
    },
    {
      title: "Servicios Básicos",
      amount: "$180.000",
      percentage: "9.7%",
      icon: Zap,
      color: "bg-gradient-to-br from-amber-500 to-amber-600",
      size: "small" as const
    },
    {
      title: "Cuidado Personal", 
      amount: "$150.000",
      percentage: "8.1%",
      icon: Heart,
      color: "bg-gradient-to-br from-teal-500 to-teal-600", 
      size: "small" as const
    },
    {
      title: "Deudas",
      amount: "$120.000",
      percentage: "6.5%",
      icon: CreditCard,
      color: "bg-gradient-to-br from-rose-500 to-rose-600",
      size: "small" as const
    },
    {
      title: "Otros",
      amount: "$75.000", 
      percentage: "4.1%",
      icon: MoreHorizontal,
      color: "bg-gradient-to-br from-slate-500 to-slate-600",
      size: "small" as const
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-foreground">Mapa de Gastos por Categoría</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-min">
        {categoryData.map((category, index) => (
          <CategoryExpenseCard
            key={index}
            title={category.title}
            amount={category.amount}
            percentage={category.percentage}
            icon={category.icon}
            color={category.color}
            size={category.size}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryExpenseMap;