"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Gift, MessageCircle, ShoppingBag } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/constants/contact";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-[#fdf7fa] via-[#fbf2f8] to-background min-h-[580px] flex items-center">
      {/* Soft Ambient Floating Watercolor Blobs & Sparkles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-12 left-10 w-96 h-96 bg-rose-200/25 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-200/25 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-amber-100/30 rounded-full blur-2xl" />

        {/* Ambient floating hearts */}
        <div className="absolute top-16 left-[12%] text-rose-300/40">
          <Heart className="h-7 w-7 fill-current" />
        </div>
        <div className="absolute bottom-20 left-[28%] text-purple-300/30">
          <Heart className="h-6 w-6 fill-current" />
        </div>
        <div className="absolute top-24 right-[15%] text-amber-300/50">
          <Star className="h-5 w-5 fill-current" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
        {/* Left Column: Typography, Actions & Trust Badges (col-span-6) */}
        <div className="lg:col-span-6 space-y-7 text-left">
          {/* Main Hero Title */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight leading-[1.15]">
              <span className="block text-[#e04b88]">Papelería y</span>
              <span className="block text-[#4a154b]">Creaciones E&G</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed max-w-lg">
              Creamos detalles únicos para momentos especiales
            </p>
          </div>

          {/* Action Buttons: Cotizar ahora & Ver catálogo */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <Button
              asChild
              size="lg"
              className="bg-[#e04b88] hover:bg-[#c93d75] text-white rounded-full px-7 py-6 shadow-sm font-bold text-sm tracking-wide transition-all hover:scale-[1.02] gap-2"
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
              className="rounded-full border-rose-200/90 bg-white hover:bg-rose-50 text-plum font-bold text-sm px-6 py-6 shadow-2xs gap-2 transition-all hover:scale-[1.02]"
              asChild
            >
              <Link href="/productos">
                <span>Ver catálogo</span>
                <ShoppingBag className="w-4 h-4 text-primary" />
              </Link>
            </Button>
          </div>

          {/* Trust Micro-Badges Row */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-rose-100/80 max-w-xl">
            {/* Badge 1: Hecho con amor */}
            <div className="flex items-center gap-2.5">
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
            <div className="flex items-center gap-2.5">
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
            <div className="flex items-center gap-2.5">
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

        {/* Right Column: Hero Banner Image (col-span-6) */}
        <div className="lg:col-span-6 relative flex justify-center items-center w-full">
          {/* Soft aura glow behind the desk illustration */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-rose-200/40 via-purple-200/30 to-amber-100/30 rounded-3xl blur-2xl opacity-80 pointer-events-none" />

          <div className="relative w-full max-w-[560px] rounded-3xl overflow-hidden shadow-lg border border-rose-100/80 bg-white/60 backdrop-blur-xs transition-all duration-300 hover:shadow-xl">
            <Image
              src="/images/banner.png"
              alt="Papelería y Creaciones E&G - Ideas que inspiran en el taller"
              width={553}
              height={372}
              priority
              className="w-full h-auto object-cover block rounded-3xl"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 560px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
