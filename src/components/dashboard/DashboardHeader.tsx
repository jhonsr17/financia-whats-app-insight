import { User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  return (
    <header className="bg-card/80 backdrop-blur-md border-b neon-border px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-primary to-neon-accent neon-glow flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold neon-text">FinancIA</h1>
              <p className="text-sm text-muted-foreground">Tu asistente financiero personal</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="hover:bg-muted/50 hover:neon-glow transition-all duration-200">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-muted/50 hover:neon-glow transition-all duration-200">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-muted/50 hover:neon-glow transition-all duration-200">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;