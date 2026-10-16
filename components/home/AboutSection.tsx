import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Award, Heart, Truck } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-16 sm:py-24 container mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Workshop Artist Illustration + Brand Narrative (col-span-7) */}
        <div className="lg:col-span-7 flex flex-col md:flex-row items-center gap-8 text-left">
          {/* Charming Craft Atelier Illustration */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 shrink-0 rounded-3xl overflow-hidden shadow-md border border-rose-100/90 bg-white">
            <Image
              src="/images/about-art.jpg"
              alt="Sobre Papelería y Creaciones E&G - Taller artesanal"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 224px, 256px"
            />
          </div>

          {/* Narrative & Action */}
          <div className="space-y-4 flex-1">
            <span className="text-xs font-bold text-[#e04b88] tracking-wider uppercase bg-rose-50 px-3 py-1 rounded-full border border-rose-200/60 inline-block">
              Sobre E&G
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif tracking-tight text-[#4a154b] leading-tight">
              Más que productos, <span className="block text-[#4a154b]">creamos emociones</span>
            </h2>

            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-md">
              En Papelería y Creaciones E&G nos dedicamos a diseñar y crear productos personalizados
              que cuentan historias, celebran momentos y dejan huellas inolvidables.
            </p>

            <div className="pt-2">
              <Button
                asChild
                className="bg-[#9c7ac2] hover:bg-[#8862b0] text-white rounded-full px-6 py-5 shadow-xs font-bold text-xs tracking-wide transition-all hover:scale-[1.02] gap-2"
              >
                <Link href="/nosotros">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>Conoce nuestra historia</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: 3 Stacked Benefit Cards (col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: Calidad garantizada */}
          <div className="flex items-center space-x-4 p-4 sm:p-5 bg-white border border-rose-100/80 rounded-3xl shadow-2xs hover:shadow-sm transition-all">
            <div className="h-12 w-12 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-[#e04b88] shrink-0 shadow-2xs">
              <Award className="h-6 w-6 stroke-[1.8]" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#4a154b]">Calidad garantizada</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Trabajamos con los mejores materiales
              </p>
            </div>
          </div>

          {/* Card 2: Atención personalizada */}
          <div className="flex items-center space-x-4 p-4 sm:p-5 bg-white border border-purple-100/80 rounded-3xl shadow-2xs hover:shadow-sm transition-all">
            <div className="h-12 w-12 rounded-2xl bg-purple-50 border border-purple-200/80 flex items-center justify-center text-[#9c7ac2] shrink-0 shadow-2xs">
              <Heart className="h-6 w-6 fill-purple-400/20 text-[#9c7ac2] stroke-[1.8]" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#4a154b]">Atención personalizada</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Te acompañamos en todo el proceso
              </p>
            </div>
          </div>

          {/* Card 3: Envíos seguros */}
          <div className="flex items-center space-x-4 p-4 sm:p-5 bg-white border border-amber-100/80 rounded-3xl shadow-2xs hover:shadow-sm transition-all">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-[#d4a359] shrink-0 shadow-2xs">
              <Truck className="h-6 w-6 stroke-[1.8]" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#4a154b]">Envíos seguros</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Llegamos a donde nos necesites</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
