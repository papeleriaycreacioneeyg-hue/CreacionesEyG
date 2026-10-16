"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone, ClipboardList, ChevronDown } from "lucide-react";
import { useQuote } from "@/lib/context/QuoteContext";
import { buildWhatsAppUrl } from "@/lib/constants/contact";

export function Navbar() {
  const { totalItems, openDrawer } = useQuote();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-rose-100/80 bg-white/95 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo and Title */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-rose-200/80 shadow-2xs group-hover:scale-105 transition-transform">
            <Image
              src="/logo.png"
              alt="Logo Papelería y Creaciones E&G"
              fill
              className="object-cover"
              sizes="56px"
              priority
            />
          </div>
        </Link>

        {/* Center Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8 text-sm font-semibold">
          <Link href="/" className="text-primary border-b-2 border-primary pb-1 transition-colors">
            Inicio
          </Link>
          <Link href="/nosotros" className="text-plum/80 hover:text-primary transition-colors pb-1">
            Nosotros
          </Link>
          <Link
            href="/productos"
            className="text-plum/80 hover:text-primary transition-colors flex items-center gap-1 pb-1"
          >
            <span>Productos</span>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </Link>
          <Link
            href="/servicios"
            className="text-plum/80 hover:text-primary transition-colors pb-1"
          >
            Servicios
          </Link>
          <Link href="/galeria" className="text-plum/80 hover:text-primary transition-colors pb-1">
            Galería
          </Link>
          <Link href="/contacto" className="text-plum/80 hover:text-primary transition-colors pb-1">
            Contacto
          </Link>
        </div>

        {/* Right Actions: Quote Drawer Indicator & WhatsApp CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quote Drawer trigger */}
          <button
            type="button"
            onClick={openDrawer}
            className="relative flex items-center gap-2 px-3 py-2 rounded-full bg-rose-50/60 hover:bg-rose-100 text-plum font-bold text-xs transition-all border border-rose-200/60 cursor-pointer shadow-2xs"
            aria-label={`Ver lista de cotización (${totalItems} artículos)`}
            title="Ver mi cotización"
          >
            <div className="relative">
              <ClipboardList className="h-4 w-4 text-primary" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-primary text-white text-[10px] font-black flex items-center justify-center animate-in zoom-in">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden xl:inline text-[11px]">Mi Cotización</span>
          </button>

          {/* Primary Pill Button: Cotizar por WhatsApp */}
          <Button
            variant="default"
            className="bg-[#e04b88] hover:bg-[#c93d75] text-white rounded-full px-5 py-2.5 sm:px-6 sm:py-5 gap-2 shadow-xs font-bold text-xs sm:text-sm tracking-wide transition-transform hover:scale-[1.02]"
            asChild
          >
            <a
              href={buildWhatsAppUrl(
                "¡Hola Papelería y Creaciones E&G! Me gustaría cotizar un pedido especial..."
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone className="h-4 w-4 fill-current" />
              <span>Cotizar por WhatsApp</span>
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
