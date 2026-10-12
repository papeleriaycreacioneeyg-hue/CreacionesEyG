"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CatalogHeader } from "@/components/catalog/CatalogHeader";
import { CategoryFilter } from "@/components/catalog/CategoryFilter";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ProductDetailModal } from "@/components/catalog/ProductDetailModal";
import { FloatingQuoteButton } from "@/components/catalog/FloatingQuoteButton";
import { CATALOG_PRODUCTS, CatalogProduct } from "@/lib/data/catalog";
import { Sparkles, Heart, SearchX } from "lucide-react";
import { getAllPublicCollectionImages, CollectionImageRecord } from "@/app/actions/admin-images";
import { buildWhatsAppUrl } from "@/lib/constants/contact";

export default function ProductosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductForModal, setSelectedProductForModal] = useState<CatalogProduct | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagesGrouped, setImagesGrouped] = useState<Record<string, CollectionImageRecord[]>>({});

  useEffect(() => {
    getAllPublicCollectionImages().then((data) => {
      if (data) {
        setImagesGrouped(data);
      }
    });
  }, []);

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((product) => {
      // Category match
      if (selectedCategory && product.categorySlug !== selectedCategory) {
        return false;
      }

      // Search match (name, description, category, tags)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inName = product.name.toLowerCase().includes(query);
        const inDesc = product.shortDescription.toLowerCase().includes(query);
        const inCategory = product.categoryName.toLowerCase().includes(query);
        const inCustomization = product.customizationDetails.some((d) =>
          d.toLowerCase().includes(query)
        );
        return inName || inDesc || inCategory || inCustomization;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenDetails = (product: CatalogProduct) => {
    setSelectedProductForModal(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProductForModal(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      {/* Catalog Editorial Header */}
      <CatalogHeader />

      {/* Main Catalog Explorer Section */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 max-w-7xl">
        {/* Search & Category Filter Zone */}
        <section
          aria-label="Filtros y buscador de productos"
          className="bg-white p-5 sm:p-6 rounded-3xl border border-rose-100 shadow-xs"
        >
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalFiltered={filteredProducts.length}
            totalProducts={CATALOG_PRODUCTS.length}
          />
        </section>

        {/* Product Grid or Empty State */}
        <section aria-label="Catálogo de productos">
          {filteredProducts.length === 0 ? (
            /* Empty State */
            <div className="py-20 px-6 text-center bg-white rounded-3xl border border-dashed border-rose-200 max-w-xl mx-auto space-y-5">
              <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-primary mx-auto">
                <SearchX className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-xl font-bold text-plum">
                  No encontramos productos para tu búsqueda
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Intenta buscando con otro término o selecciona otra categoría para ver más
                  creaciones.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery("");
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-primary hover:bg-[#c93d75] shadow-xs transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ver todas las 26 colecciones</span>
              </button>
            </div>
          ) : (
            /* Grid of Cards */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetails={handleOpenDetails}
                  images={imagesGrouped[product.id]}
                />
              ))}
            </div>
          )}
        </section>

        {/* Bottom Banner: Custom Project Advice */}
        <section className="bg-gradient-to-r from-[#f1ebfc]/80 via-white to-rose-50/80 p-8 sm:p-10 rounded-3xl border border-rose-100/70 text-center max-w-4xl mx-auto space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary mx-auto shadow-2xs border border-rose-100">
            <Heart className="w-6 h-6 fill-current text-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-plum">
            ¿Tienes una idea especial que no ves en el catálogo?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            En Creaciones E&G confeccionamos proyectos únicos a medida. Cuéntanos tu temática,
            colores o evento y diseñaremos una propuesta exclusiva para ti.
          </p>
          <div className="pt-2">
            <a
              href={buildWhatsAppUrl(
                "Hola Creaciones E&G, tengo una idea especial y me gustaría consultar..."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold text-white bg-[#e04b88] hover:bg-[#c93d75] shadow-sm transition-all"
            >
              <span>Conversar con el taller por WhatsApp</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Quote Access Button */}
      <FloatingQuoteButton />

      {/* Detailed Modal View */}
      <ProductDetailModal
        product={selectedProductForModal}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        images={selectedProductForModal ? imagesGrouped[selectedProductForModal.id] : []}
      />
    </div>
  );
}
