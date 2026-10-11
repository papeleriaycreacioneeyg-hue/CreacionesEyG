"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ArrowRight, ClipboardList, Sparkles, Heart } from "lucide-react";
import { useQuote } from "@/lib/context/QuoteContext";

export function QuoteDrawer() {
  const { items, totalItems, isDrawerOpen, closeDrawer, updateQuantity, removeItem, clearQuote } =
    useQuote();

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    if (isDrawerOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen, closeDrawer]);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop click dismiss */}
      <div className="fixed inset-0" onClick={closeDrawer} aria-hidden="true" />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300 border-l border-rose-100">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-rose-100 bg-gradient-to-r from-rose-50/60 to-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-plum">Mi Cotización</h2>
              <p className="text-xs text-muted-foreground">
                {totalItems === 1
                  ? "1 producto seleccionado"
                  : `${totalItems} productos seleccionados`}
              </p>
            </div>
          </div>

          <button
            onClick={closeDrawer}
            className="p-2 rounded-full hover:bg-rose-100 text-plum/70 hover:text-plum transition-colors cursor-pointer"
            aria-label="Cerrar panel de cotización"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Item List or Empty State */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {items.length === 0 ? (
            /* Empty State */
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 my-auto">
              <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center text-primary/60 border border-rose-100">
                <Heart className="w-10 h-10 stroke-[1.5]" />
              </div>
              <div className="space-y-1 max-w-xs">
                <h3 className="text-lg font-bold text-plum">Tu lista está vacía</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Explora nuestras colecciones y agrega los productos que te gustaría personalizar
                  para tu evento.
                </p>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="mt-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-primary hover:bg-[#c93d75] shadow-xs transition-colors cursor-pointer"
              >
                Explorar catálogo
              </button>
            </div>
          ) : (
            /* Active Items */
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-bold text-plum/80 uppercase tracking-wider">
                  Productos a cotizar
                </span>
                <button
                  onClick={clearQuote}
                  className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Vaciar lista</span>
                </button>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-secondary/30 border border-rose-100/80 flex flex-col gap-2.5 hover:bg-rose-50/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                        {item.categoryName}
                      </span>
                      <h4 className="text-sm font-bold text-plum leading-snug">{item.name}</h4>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 rounded-md text-muted-foreground hover:text-destructive hover:bg-rose-100/50 transition-colors cursor-pointer"
                      aria-label={`Eliminar ${item.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Notes snippet if present */}
                  {item.notes && (
                    <p className="text-xs italic text-muted-foreground bg-white/70 p-2 rounded-lg border border-rose-100/60 line-clamp-2">
                      «{item.notes}»
                    </p>
                  )}

                  {/* Quantity and Price tag */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2 bg-white rounded-full px-2 py-1 border border-rose-100 shadow-2xs">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-plum hover:bg-rose-50 cursor-pointer"
                        aria-label="Restar uno"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-plum px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-plum hover:bg-rose-50 cursor-pointer"
                        aria-label="Sumar uno"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-bold text-plum">Cotizar a medida</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / CTA Checkout */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-rose-100 bg-white space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total de artículos:</span>
              <strong className="text-plum font-bold text-base">
                {totalItems} {totalItems === 1 ? "unidad" : "unidades"}
              </strong>
            </div>

            <p className="text-[11px] text-muted-foreground leading-relaxed flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Sin costo ni compromiso. El taller te enviará la propuesta detallada.</span>
            </p>

            <div className="pt-2 space-y-2">
              <Link
                href="/cotizar"
                onClick={closeDrawer}
                className="w-full py-3.5 px-6 rounded-full font-bold text-sm text-white bg-primary hover:bg-[#c93d75] flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
              >
                <span>Solicitar cotización formal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={closeDrawer}
                className="w-full py-2.5 text-xs font-semibold text-plum hover:text-primary transition-colors cursor-pointer"
              >
                Seguir explorando catálogo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
