import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { GallerySection } from "@/components/home/GallerySection";
import { AboutSection } from "@/components/home/AboutSection";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Brand Navbar with WhatsApp CTA */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero Banner: Two-tone serif title, pill buttons, 3 trust badges & banner illustration */}
        <HeroSection />

        {/* 3. Nuestros Servicios: 5-column linear pastel icon cards */}
        <CategoriesSection />

        {/* 4. Productos Destacados: 5-column product cards with rose pricing */}
        <ProductsSection />

        {/* 5. Trabajos Realizados: 6-photo continuous showcase of real workshop crafts */}
        <GallerySection />

        {/* 6. Sobre E&G: Craft atelier illustration, brand narrative and 3 stacked guarantee cards */}
        <AboutSection />

        {/* 7. Conversion Band: Lavender-rose gradient ribbon with double-line WhatsApp CTA */}
        <CTASection />
      </main>

      {/* 8. 4-Column Footer with social links, copyright and scroll to top button */}
      <Footer />
    </div>
  );
}
