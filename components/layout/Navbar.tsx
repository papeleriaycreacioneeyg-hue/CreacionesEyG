"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        {/* Brand Logo and Title */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border">
            <Image
              src="/logo.png"
              alt="Logo Creaciones E&G"
              fill
              className="object-cover"
              sizes="56px"
              priority
            />
          </div>
        </Link>

        {/* Center Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <Link
            href="/"
            className="text-sm font-semibold text-primary border-b-2 border-primary pb-1 transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/nosotros"
            className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            Nosotros
          </Link>
          <Link
            href="/productos"
            className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            Productos
          </Link>
          <Link
            href="/servicios"
            className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            Servicios
          </Link>
          <Link
            href="/galeria"
            className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            Galería
          </Link>
          <Link
            href="/contacto"
            className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            Contacto
          </Link>
        </div>

        {/* Right WhatsApp Button */}
        <Button
          variant="default"
          className="bg-[#e04b88] hover:bg-[#c93d75] text-white rounded-full px-6 py-5 gap-2 shadow-sm font-semibold"
          asChild
        >
          <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer">
            <Phone className="h-4 w-4 fill-current" />
            <span>Cotizar por WhatsApp</span>
          </a>
        </Button>
      </div>
    </nav>
  );
}
