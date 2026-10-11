"use client";

import React from "react";
import { Search, X, Filter } from "lucide-react";
import { CATALOG_CATEGORIES } from "@/lib/data/catalog";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (categorySlug: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalFiltered: number;
  totalProducts: number;
}

export function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalFiltered,
  totalProducts,
}: CategoryFilterProps) {
  const isFiltered = Boolean(selectedCategory || searchQuery.trim());

  const handleClearFilters = () => {
    onSelectCategory(null);
    onSearchChange("");
  };

  return (
    <div className="space-y-6">
      {/* Search Bar & Active Status */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por producto, técnica o evento..."
            className="w-full pl-10 pr-10 py-2.5 rounded-full bg-white border border-rose-200/80 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-muted-foreground hover:text-plum hover:bg-rose-100 transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Counter and Clear Filters Button */}
        <div className="flex items-center justify-between md:justify-end gap-3 text-xs sm:text-sm text-muted-foreground">
          <span>
            Mostrando <strong className="text-plum font-semibold">{totalFiltered}</strong> de{" "}
            {totalProducts} productos
          </span>
          {isFiltered && (
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-primary hover:bg-rose-50 border border-rose-200 transition-colors"
            >
              <X className="w-3 h-3" />
              <span>Restablecer</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-plum/80 uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-primary" />
          <span>Categorías Principales</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {/* "Todas" Pill */}
          <button
            onClick={() => onSelectCategory(null)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-2xs ${
              selectedCategory === null
                ? "bg-plum text-white shadow-sm scale-[1.02]"
                : "bg-white text-plum/80 hover:bg-rose-50/80 border border-rose-200/60"
            }`}
          >
            Todas ({totalProducts})
          </button>

          {/* Individual Category Pills */}
          {CATALOG_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? null : cat.slug)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-2xs ${
                  isSelected
                    ? "bg-primary text-white shadow-sm scale-[1.02]"
                    : "bg-white text-plum/80 hover:bg-rose-50/80 border border-rose-200/60"
                }`}
              >
                {cat.shortName}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
