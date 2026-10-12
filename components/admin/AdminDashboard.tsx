"use client";

import React, { useState, useMemo } from "react";
import { CATALOG_PRODUCTS } from "@/lib/data/catalog";
import { CollectionImageRecord } from "@/app/actions/admin-images";
import { CollectionPhotoManager } from "./CollectionPhotoManager";
import { Search, FolderKanban } from "lucide-react";

interface AdminDashboardProps {
  initialImagesGrouped: Record<string, CollectionImageRecord[]>;
}

export function AdminDashboard({ initialImagesGrouped }: AdminDashboardProps) {
  const [selectedProductId, setSelectedProductId] = useState<string>(CATALOG_PRODUCTS[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [imagesState, setImagesState] =
    useState<Record<string, CollectionImageRecord[]>>(initialImagesGrouped);

  // Extract unique categories
  const categories = useMemo(() => {
    const map = new Map<string, string>();
    CATALOG_PRODUCTS.forEach((p) => {
      if (!map.has(p.categorySlug)) {
        map.set(p.categorySlug, p.categoryName);
      }
    });
    return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }));
  }, []);

  // Filter products by search and category
  const filteredProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((product) => {
      if (selectedCategory !== "all" && product.categorySlug !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          product.name.toLowerCase().includes(q) ||
          product.categoryName.toLowerCase().includes(q) ||
          product.id.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const activeProduct = useMemo(() => {
    return CATALOG_PRODUCTS.find((p) => p.id === selectedProductId) || CATALOG_PRODUCTS[0];
  }, [selectedProductId]);

  const handleImagesUpdated = (collectionId: string, updated: CollectionImageRecord[]) => {
    setImagesState((prev) => ({
      ...prev,
      [collectionId]: updated,
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: 26 Collections Navigator (4 cols) */}
      <aside className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 border border-rose-100 shadow-xs space-y-4">
        <div className="space-y-1 pb-3 border-b border-rose-100">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-plum flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-primary" />
              <span>Colecciones del Catálogo</span>
            </h2>
            <span className="text-xs font-bold text-primary bg-rose-50 px-2.5 py-0.5 rounded-full">
              26 Productos
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Selecciona una colección para administrar sus fotografías en Supabase Storage.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar colección..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-rose-200 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
              selectedCategory === "all"
                ? "bg-primary text-white"
                : "bg-secondary text-plum hover:bg-rose-100"
            }`}
          >
            Todas (26)
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setSelectedCategory(c.slug)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer truncate max-w-[140px] ${
                selectedCategory === c.slug
                  ? "bg-primary text-white"
                  : "bg-secondary text-plum hover:bg-rose-100"
              }`}
            >
              {c.name.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Product List */}
        <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
          {filteredProducts.map((product) => {
            const count = imagesState[product.id]?.length || 0;
            const isSelected = product.id === selectedProductId;
            const isFull = count >= 10;

            return (
              <button
                key={product.id}
                type="button"
                onClick={() => setSelectedProductId(product.id)}
                className={`w-full p-3 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? "border-primary bg-rose-50/70 shadow-2xs ring-1 ring-primary/20"
                    : "border-transparent bg-secondary/30 hover:bg-rose-50/40 hover:border-rose-100"
                }`}
              >
                <div className="space-y-0.5 min-w-0 flex-1">
                  <p className="text-xs font-bold text-plum truncate">{product.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {product.categoryName}
                  </p>
                </div>

                {/* Photo Count Badge */}
                <div className="shrink-0 flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      count === 0
                        ? "bg-gray-100 text-gray-600"
                        : isFull
                          ? "bg-rose-100 text-rose-800 font-black"
                          : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {count}/10
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Right Column: Active Collection Photo Manager (8 cols) */}
      <main className="lg:col-span-8">
        <CollectionPhotoManager
          key={activeProduct.id}
          product={activeProduct}
          initialImages={imagesState[activeProduct.id] || []}
          onImagesUpdated={(updated) => handleImagesUpdated(activeProduct.id, updated)}
        />
      </main>
    </div>
  );
}
