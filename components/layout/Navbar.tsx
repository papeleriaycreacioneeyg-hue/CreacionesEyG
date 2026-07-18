"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Menu, PhoneCall } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand Logo and Title */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border">
            <Image
              src="/logo.png"
              alt="Logo Creaciones E&G"
              fill
              className="object-cover"
              sizes="40px"
              priority
            />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">
            Creaciones E&G
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            href="/productos"
            className="text-sm font-medium hover:text-rose-500 transition-colors"
          >
            Catálogo
          </Link>
          <Link
            href="/cotizar"
            className="text-sm font-medium hover:text-rose-500 transition-colors"
          >
            Cotizar
          </Link>
          <Link
            href="/nosotros"
            className="text-sm font-medium hover:text-rose-500 transition-colors"
          >
            Nosotros
          </Link>
          <Link
            href="/contacto"
            className="text-sm font-medium hover:text-rose-500 transition-colors"
          >
            Contacto
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

          {/* Pink WhatsApp Button */}
          <Button
            variant="default"
            size="sm"
            className="hidden sm:inline-flex bg-rose-500 hover:bg-rose-600 text-white rounded-full gap-2"
            asChild
          >
            <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer">
              <PhoneCall className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menú principal">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
