"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Minus, Check, Sparkles, Tag, ShieldCheck } from "lucide-react";
import { CatalogProduct } from "@/lib/data/catalog";
import { ProductVisual } from "./ProductVisual";
import { useQuote } from "@/lib/context/QuoteContext";

interface ProductDetailModalProps {
  product: CatalogProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const { addItem } = useQuote();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  // Reset state when opening a new product
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setNotes("");
      setActiveImageIndex(0);
      setIsAdded(false);
    }
  }, [product]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      categoryName: product.categoryName,
      quantity,
      notes: notes.trim(),
      themeColor: product.themeColor,
      accentColor: product.accentColor,
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop click dismiss */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden z-10 my-auto animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-plum/70 hover:text-plum hover:bg-rose-100 border border-rose-200/60 shadow-xs transition-colors cursor-pointer"
          aria-label="Cerrar detalles"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Visual / Gallery Preview (5 cols) */}
          <div className="md:col-span-5 p-6 bg-gradient-to-b from-rose-50/50 to-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-rose-100">
            <div className="space-y-4">
              {/* Main Visual */}
              <ProductVisual
                icon={product.icon}
                name={product.name}
                categoryName={product.categoryName}
                themeColor={product.themeColor}
                accentColor={product.accentColor}
                aspectRatio="square"
              />

              {/* Gallery Thumbnails */}
              {product.galleryImages.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-plum/70 uppercase tracking-wider">
                    Vistas y detalles del producto
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {product.galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`p-2.5 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                          activeImageIndex === idx
                            ? "bg-white border-primary shadow-xs ring-1 ring-primary/30"
                            : "bg-white/60 border-rose-100 hover:bg-white"
                        }`}
                      >
                        <p className="font-semibold text-plum truncate">{img.title}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{img.subtitle}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quality Stamp */}
            <div className="pt-6 mt-4 border-t border-rose-100/70 flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <span>Confección artesanal en nuestro taller en Chile.</span>
            </div>
          </div>

          {/* Right Column: Information, Customization & Actions (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Category & Badge */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  {product.categoryName}
                </span>
                {product.badge && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-secondary text-plum border border-purple-100">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-plum leading-snug">
                {product.name}
              </h2>

              {/* Price Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-plum border border-rose-200/50 text-xs sm:text-sm font-bold">
                <Tag className="w-3.5 h-3.5 text-primary" />
                <span>Cotizar a medida</span>
                <span className="text-[11px] font-normal text-muted-foreground">
                  (Precio ajustado a tu cantidad)
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-foreground/80 leading-relaxed font-normal">
                {product.fullDescription}
              </p>

              {/* Customization Details List */}
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold text-plum uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>Opciones de Personalización</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {product.customizationDetails.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Customization Notes Input */}
              <div className="space-y-1.5 pt-2">
                <label
                  htmlFor="custom-notes"
                  className="text-xs font-semibold text-plum flex items-center gap-1"
                >
                  <span>Tus ideas o especificaciones</span>
                  <span className="text-muted-foreground font-normal">(opcional)</span>
                </label>
                <textarea
                  id="custom-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej: Colores en tonos pasteles, nombre 'Valentina', fecha del evento..."
                  maxLength={250}
                  rows={2}
                  className="w-full p-3 rounded-xl border border-rose-200 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>
            </div>

            {/* Bottom Actions: Quantity & Add Button */}
            <div className="pt-4 border-t border-rose-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between sm:justify-start gap-3 bg-secondary/60 p-1.5 rounded-full border border-purple-100">
                <span className="text-xs font-semibold text-plum pl-3 hidden sm:inline">
                  Cantidad:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-plum hover:bg-rose-50 disabled:opacity-40 shadow-2xs transition-colors cursor-pointer"
                    aria-label="Disminuir cantidad"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-plum">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(1000, q + 1))}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-plum hover:bg-rose-50 shadow-2xs transition-colors cursor-pointer"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Add to Quote Button */}
              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 py-3 px-6 rounded-full font-bold text-sm text-white flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer ${
                  isAdded
                    ? "bg-emerald-600 scale-[1.02]"
                    : "bg-primary hover:bg-[#c93d75] active:scale-98"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>¡Agregado a tu lista!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Agregar a mi cotización</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
