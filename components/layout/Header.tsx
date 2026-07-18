import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 border-b flex items-center justify-between px-6 bg-background">
      <h2 className="text-sm font-semibold text-muted-foreground">Panel de Control</h2>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" aria-label="Notificaciones">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
