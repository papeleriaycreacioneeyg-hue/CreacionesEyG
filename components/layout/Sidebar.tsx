"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { LayoutDashboard, ShoppingBag, FolderHeart } from "lucide-react";

const navItems = [
  { href: "/mi-cuenta", label: "Mi Cuenta", icon: LayoutDashboard },
  { href: "/mi-cuenta/pedidos", label: "Mis Pedidos", icon: ShoppingBag },
  { href: "/mi-cuenta/disenos", label: "Mi Bóveda", icon: FolderHeart },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-muted/20 h-screen flex flex-col justify-between p-4">
      <div className="flex flex-col space-y-6">
        <Link href="/" className="px-2">
          <span className="text-lg font-bold bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">
            Creaciones E&G
          </span>
        </Link>

        <nav className="flex flex-col space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-rose-500/10 text-rose-500"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col space-y-1">
        <LogoutButton />
      </div>
    </aside>
  );
}
