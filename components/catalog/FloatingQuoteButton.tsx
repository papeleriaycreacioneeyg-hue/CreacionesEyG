"use client";

import React from "react";
import { ClipboardList } from "lucide-react";
import { useQuote } from "@/lib/context/QuoteContext";

export function FloatingQuoteButton() {
  const { totalItems, openDrawer } = useQuote();

  if (totalItems === 0) return null;

  return (
    <aside aria-label="Acceso rápido a tu cotización" className="fixed bottom-6 right-6 z-40">
      <button
        type="button"
        onClick={openDrawer}
        className="group relative flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-plum text-white shadow-xl hover:bg-[#381038] hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border border-white/20"
        aria-label={`Ver lista de cotización con ${totalItems} productos`}
      >
        <div className="relative">
          <ClipboardList className="w-5 h-5 text-white" />
          <span className="absolute -top-2 -right-2.5 w-5 h-5 rounded-full bg-primary text-white text-[11px] font-black flex items-center justify-center shadow-xs border-2 border-plum animate-pulse">
            {totalItems}
          </span>
        </div>
        <span className="text-xs sm:text-sm font-bold tracking-wide">Ver mi cotización</span>
      </button>
    </aside>
  );
}
