"use client";

import React, { useState } from "react";
import { Plus, Check, Eye } from "lucide-react";
import { CatalogProduct } from "@/lib/data/catalog";
import { ProductVisual } from "./ProductVisual";
import { useQuote } from "@/lib/context/QuoteContext";

interface ProductCardProps {
  product: CatalogProduct;
  onOpenDetails: (product: CatalogProduct) => void;
}

export function ProductCard({ product, onOpenDetails }: ProductCardProps) {
  const { addItem } = useQuote();
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      categoryName: product.categoryName,
      quantity: 1,
      themeColor: product.themeColor,
      accentColor: product.accentColor,
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <article
      onClick={() => onOpenDetails(product)}
      className="group relative bg-white rounded-3xl p-4 sm:p-5 border border-rose-100 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
    >
      {/* Top Visual Area */}
      <div className="relative">
        <ProductVisual
          icon={product.icon}
          name={product.name}
          categoryName={product.categoryName}
          themeColor={product.themeColor}
          accentColor={product.accentColor}
          aspectRatio="landscape"
        />

        {/* Badge Pill */}
        {product.badge && (
          <span className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 text-primary shadow-xs border border-rose-200/60 uppercase tracking-wider backdrop-blur-xs">
            {product.badge}
          </span>
        )}
      </div>

      {/* Content Area */}
      <div className="pt-4 pb-2 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Category Tag */}
          <span className="text-xs font-semibold text-primary/80 uppercase tracking-wider">
            {product.categoryName}
          </span>

          {/* Product Name */}
          <h2 className="text-xl font-bold text-plum group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h2>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>
        </div>

        {/* Price / Quote Tag */}
        <div className="pt-4 pb-1 border-t border-rose-50 mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              Precio
            </span>
            <span className="text-sm sm:text-base font-bold text-plum">Cotizar a medida</span>
          </div>
          <span className="text-[11px] font-medium text-primary bg-rose-50 px-2.5 py-1 rounded-full">
            Hecho en Taller
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 grid grid-cols-2 gap-2 mt-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(product);
          }}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full text-xs font-bold text-plum bg-secondary hover:bg-rose-100/70 border border-purple-100 transition-colors"
          aria-label={`Ver detalles de ${product.name}`}
        >
          <Eye className="w-3.5 h-3.5 text-plum" />
          <span>Detalles</span>
        </button>

        <button
          type="button"
          onClick={handleQuickAdd}
          className={`inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full text-xs font-bold text-white transition-all shadow-xs ${
            justAdded
              ? "bg-emerald-600 scale-[1.02]"
              : "bg-primary hover:bg-[#c93d75] active:scale-95"
          }`}
          aria-label={`Agregar ${product.name} a la cotización`}
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>¡Agregado!</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Agregar</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
