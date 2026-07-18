import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-radial from-rose-50 via-background to-background">
      <div className="container mx-auto px-4 text-center space-y-6 relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-500">
          <Sparkles className="h-3 w-3" /> Papelería y Creaciones E&G
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Productos Personalizados creados para
          <span className="block bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">
            Momentos Especiales
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-muted-foreground text-sm md:text-base leading-relaxed">
          Diseño e impresión a medida para plasmar tus ideas y potenciar la identidad de tu marca
          con acabados profesionales de taller.
        </p>

        <div className="flex justify-center gap-4">
          <Button asChild size="lg" className="bg-rose-500 hover:bg-rose-600">
            <Link href="/productos">Ver Catálogo</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/cotizar">Solicitar Cotización</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
