import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { ValueSection } from "@/components/home/ValueSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { GallerySection } from "@/components/home/GallerySection";
import { AboutSection } from "@/components/home/AboutSection";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Spectacular Hero Banner */}
        <HeroSection />

        {/* 5-Column Categories Section */}
        <CategoriesSection />

        {/* Brand Pillars & Trust Badges */}
        <ValueSection />

        {/* 5-Column Featured Products Section */}
        <ProductsSection />

        {/* Showcase Gallery Row */}
        <GallerySection />

        {/* Story & Value Checklist Section */}
        <AboutSection />

        {/* Bottom Conversion Band */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
