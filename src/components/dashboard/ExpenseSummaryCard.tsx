import { Card, CardContent } from "@/components/ui/card";

interface ExpenseSummaryCardProps {
  title: string;
  amount: string;
  currency: string;
  variant: "today" | "week" | "month" | "total";
}

const ExpenseSummaryCard = ({ title, amount, currency, variant }: ExpenseSummaryCardProps) => {
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
      default:
        return "bg-card text-card-foreground";
    }
  };

  return (
    <Card className={`${getCardStyles()} border transition-all duration-200 hover:scale-105`}>
      <CardContent className="p-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium opacity-90">{title}</h3>
          <div className="space-y-1">
            <p className="text-3xl font-bold tracking-tight">{amount}</p>
            <p className="text-sm opacity-75">{currency}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseSummaryCard;