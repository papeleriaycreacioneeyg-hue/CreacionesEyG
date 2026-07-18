"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Menu } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">
            Creaciones E&G
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            href="/catálogo"
            className="text-sm font-medium hover:text-rose-500 transition-colors"
          >
            Catálogo
          </Link>
          <Link
            href="/corporativos"
            className="text-sm font-medium hover:text-rose-500 transition-colors"
          >
            Pymes & Emprendedores
          </Link>
          <Link
            href="/colegios"
            className="text-sm font-medium hover:text-rose-500 transition-colors"
          >
            Colegios
          </Link>
          <Link
            href="/nosotros"
            className="text-sm font-medium hover:text-rose-500 transition-colors"
          >
            Nosotros
          </Link>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" aria-label="Carrito de compras">
            <ShoppingCart className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" asChild aria-label="Mi Cuenta">
            <Link href="/mi-cuenta">
              <User className="h-5 w-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menú principal">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
