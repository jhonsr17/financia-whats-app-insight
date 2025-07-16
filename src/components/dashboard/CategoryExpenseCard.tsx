import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CategoryExpenseCardProps {
  title: string;
  amount: string;
  percentage: string;
  icon: LucideIcon;
  color: string;
  size?: "small" | "medium" | "large";
}

const CategoryExpenseCard = ({ 
  title, 
  amount, 
  percentage, 
  icon: Icon, 
  color,
  size = "medium" 
}: CategoryExpenseCardProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "col-span-1 row-span-1 min-h-[120px]";
      case "large":
        return "col-span-2 row-span-1 min-h-[140px]";
      default:
        return "col-span-1 row-span-1 min-h-[140px]";
    }
  };

  return (
    <Card className={`${getSizeClasses()} ${color} border-0 transition-all duration-200 hover:scale-105`}>
      <CardContent className="p-4 h-full flex flex-col justify-between">
        <div className="flex items-center space-x-2 mb-2">
          <Icon className="h-5 w-5 text-white/90" />
          <h3 className="text-white font-medium text-sm">{title}</h3>
        </div>
        
        <div className="space-y-1">
          <p className="text-white text-2xl font-bold tracking-tight">{amount}</p>
          <p className="text-white/80 text-sm">{percentage}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryExpenseCard;