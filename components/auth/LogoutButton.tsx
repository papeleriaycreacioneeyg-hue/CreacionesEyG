"use client";

import { logout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className="flex w-full items-center justify-start space-x-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
    >
      <LogOut className="h-4 w-4" />
      <span>Cerrar Sesión</span>
    </Button>
  );
}
