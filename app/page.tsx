import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { ValueSection } from "@/components/home/ValueSection";
import { GallerySection } from "@/components/home/GallerySection";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section Banner */}
        <HeroSection />

        {/* Categories Carousel / Showcase Grid */}
        <CategoriesSection />

        {/* Brand Pillars & Trust Badges */}
        <ValueSection />

        {/* Finished Orders Gallery */}
        <GallerySection />

        {/* Bottom Deferral CTA */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
