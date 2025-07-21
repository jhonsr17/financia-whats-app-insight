import { Card, CardContent } from "@/components/ui/card";

interface ExpenseSummaryCardProps {
  title: string;
  amount: string;
  currency: string;
  variant: "today" | "week" | "month" | "total" | "balance" | "income" | "today-income";
  isBalance?: boolean;
  isLarge?: boolean;
}

const ExpenseSummaryCard = ({ title, amount, currency, variant, isBalance, isLarge }: ExpenseSummaryCardProps) => {
  const getCardStyles = () => {
    switch (variant) {
      case "today":
        return "bg-gradient-to-br from-emerald-600 to-emerald-500 text-white border-emerald-500";
      case "week":
        return "bg-gradient-to-br from-blue-600 to-blue-500 text-white border-blue-500";
      case "month":
        return "bg-gradient-to-br from-purple-600 to-purple-500 text-white border-purple-500";
      case "total":
        return "bg-gradient-to-br from-slate-600 to-slate-500 text-white border-slate-500";
      case "balance":
        const balanceNumber = parseFloat(amount.replace(/[^\d.-]/g, ''));
        return balanceNumber >= 0 
          ? "bg-gradient-to-br from-green-600 to-green-500 text-white border-green-500"
          : "bg-gradient-to-br from-red-600 to-red-500 text-white border-red-500";
      case "income":
        return "bg-gradient-to-br from-teal-600 to-teal-500 text-white border-teal-500";
      case "today-income":
        return "bg-gradient-to-br from-cyan-600 to-cyan-500 text-white border-cyan-500";
      default:
        return "bg-card text-card-foreground";
    }
  };

  return (
    <Card className={`${getCardStyles()} border transition-all duration-200 hover:scale-105`}>
      <CardContent className={`${isLarge ? 'p-8' : 'p-6'}`}>
        <div className="space-y-2">
          <h3 className={`${isLarge ? 'text-2xl' : 'text-lg'} font-medium opacity-90`}>{title}</h3>
          <div className="space-y-1">
            <p className={`${isLarge ? 'text-5xl' : 'text-3xl'} font-bold tracking-tight`}>{amount}</p>
            <p className={`${isLarge ? 'text-base' : 'text-sm'} opacity-75`}>{currency}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseSummaryCard;