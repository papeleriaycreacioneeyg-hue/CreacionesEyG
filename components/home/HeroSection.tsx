"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Gift, MessageCircle, ShoppingBag } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/constants/contact";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[580px] lg:min-h-[640px] flex items-center bg-[#fdfaf6]">
      {/* Background Banner Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/banner.png"
          alt="Papelería y Creaciones E&G"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center md:object-right"
        />
        {/* Contrast Overlay: ensures clean readability while keeping the desk illustration vibrant */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fdfaf6]/95 via-[#fdfaf6]/85 to-[#fdfaf6]/30 md:from-[#fdfaf6]/95 md:via-[#fdfaf6]/80 md:to-transparent" />
      </div>

      {/* Hero Content Container */}
      <div className="container mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24 relative z-10">
        <div className="max-w-2xl space-y-7 text-left">
          {/* Main Hero Title with Rasley Heights font and Cinzel Decorative for E&G */}
          <div className="space-y-3">
            <h1 className="font-rasley text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.12]">
              <span className="block text-[#e04b88]">Papelería y</span>
              <span className="block text-[#4a154b]">Creaciones</span>
              <span className="block text-[#4a154b] font-cinzel">E&G</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#605149] font-medium leading-relaxed max-w-lg">
              Creamos detalles únicos para momentos especiales
            </p>
          </div>

          {/* Action Buttons: Cotizar ahora & Ver catálogo */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <Button
              asChild
              size="lg"
              className="bg-[#e04b88] hover:bg-[#c93d75] text-white rounded-full px-7 py-6 shadow-md font-bold text-sm tracking-wide transition-all hover:scale-[1.02] gap-2"
            >
              <a
                href={buildWhatsAppUrl(
                  "¡Hola Creaciones E&G! Quiero cotizar un pedido especial para un momento único..."
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Cotizar ahora</span>
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-rose-200/90 bg-white/90 backdrop-blur-xs hover:bg-rose-50 text-plum font-bold text-sm px-6 py-6 shadow-sm gap-2 transition-all hover:scale-[1.02]"
              asChild
            >
              <Link href="/productos">
                <span>Ver catálogo</span>
                <ShoppingBag className="w-4 h-4 text-primary" />
              </Link>
            </Button>
          </div>

          {/* Trust Micro-Badges Row */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-rose-200/60 max-w-xl">
            {/* Badge 1: Hecho con amor */}
            <div className="flex items-center gap-2.5 bg-white/60 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none p-2 md:p-0 rounded-xl">
              <div className="h-10 w-10 rounded-full bg-rose-50 border border-rose-200/80 flex items-center justify-center text-primary shrink-0 shadow-2xs">
                <Heart className="h-4.5 w-4.5 fill-rose-500/20 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-plum leading-tight">
                  Hecho con amor
                </span>
                <span className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                  Cada detalle importa
                </span>
              </div>
            </div>

            {/* Badge 2: Personalizados */}
            <div className="flex items-center gap-2.5 bg-white/60 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none p-2 md:p-0 rounded-xl">
              <div className="h-10 w-10 rounded-full bg-purple-50 border border-purple-200/80 flex items-center justify-center text-[#9c7ac2] shrink-0 shadow-2xs">
                <Star className="h-4.5 w-4.5 fill-purple-400/20 text-[#9c7ac2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-plum leading-tight">
                  Personalizados
                </span>
                <span className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                  Ideas hechas para ti
                </span>
              </div>
            </div>

            {/* Badge 3: Calidad premium */}
            <div className="flex items-center gap-2.5 bg-white/60 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none p-2 md:p-0 rounded-xl">
              <div className="h-10 w-10 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center text-[#d4a359] shrink-0 shadow-2xs">
                <Gift className="h-4.5 w-4.5 text-[#d4a359]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-plum leading-tight">
                  Calidad premium
                </span>
                <span className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                  Materiales de calidad
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
