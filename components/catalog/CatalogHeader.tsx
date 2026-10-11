"use client";

import React from "react";
import { Sparkles, Heart, Clock, ShieldCheck } from "lucide-react";

export function CatalogHeader() {
  return (
    <section className="relative overflow-hidden pt-10 pb-12 md:pt-14 md:pb-16 bg-gradient-to-b from-rose-50/60 via-[#f1ebfc]/30 to-background border-b border-rose-100/60">
      {/* Decorative ambient blurs */}
      <div className="absolute top-0 right-10 w-72 h-72 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl text-center space-y-6">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-rose-200/60 shadow-xs text-xs font-semibold text-plum uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Taller de Creaciones Personalizadas</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-plum leading-[1.15]">
          Nuestro Catálogo de Creaciones
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-normal max-w-2xl mx-auto leading-relaxed">
          Explora nuestras{" "}
          <strong className="font-semibold text-plum">26 colecciones artesanales</strong> diseñadas
          a mano. Agrega tus favoritas a tu lista y solicita un presupuesto personalizado para tu
          ocasión especial.
        </p>

        {/* Value Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 text-xs sm:text-sm text-plum/90 font-medium">
          <div className="flex items-center gap-2 bg-white/60 px-3.5 py-1.5 rounded-full border border-rose-100 shadow-2xs">
            <Heart className="w-4 h-4 text-primary fill-current" />
            <span>Hecho a mano con dedicación</span>
          </div>
          <div className="flex items-center gap-2 bg-white/60 px-3.5 py-1.5 rounded-full border border-rose-100 shadow-2xs">
            <Clock className="w-4 h-4 text-primary" />
            <span>Cotización a medida en 24h</span>
          </div>
          <div className="flex items-center gap-2 bg-white/60 px-3.5 py-1.5 rounded-full border border-rose-100 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Sin pago en línea ni compromisos</span>
          </div>
        </div>
      </div>
    </section>
  );
}
