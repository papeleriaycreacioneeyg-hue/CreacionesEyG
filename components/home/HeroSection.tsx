import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, CheckCircle } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-rose-50/50 via-background to-background">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Content */}
        <div className="space-y-6 text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-500">
            <Sparkles className="h-3 w-3" /> Papelería y Creaciones E&G
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Productos Personalizados
            <span className="block bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">
              Creados para Momentos Especiales
            </span>
          </h1>

          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Estudio creativo de papelería, DTF, sublimación y regalos únicos fabricados a mano en
            nuestro taller físico. Cuidamos cada detalle.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button
              asChild
              size="lg"
              className="bg-rose-500 hover:bg-rose-600 text-white rounded-full"
            >
              <Link href="/productos">Ver Catálogo</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-rose-200 hover:bg-rose-50"
              asChild
            >
              <Link href="/cotizar">Solicitar Cotización</Link>
            </Button>
          </div>

          {/* Benefits Tags */}
          <div className="grid grid-cols-2 gap-3 pt-6 border-t border-muted">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <span>Diseños Exclusivos</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <span>Calidad Garantizada</span>
            </div>
          </div>
        </div>

        {/* Right Column - Illustration */}
        <div className="relative flex justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-200/20 to-amber-200/20 rounded-full blur-3xl" />
          <div className="relative h-64 w-64 md:h-96 md:w-96 rounded-2xl overflow-hidden border bg-background shadow-xl flex items-center justify-center p-6">
            <Image
              src="/logo.png"
              alt="Estudio Creativo E&G"
              fill
              className="object-contain p-8 animate-pulse"
              sizes="(max-w-768px) 256px, 384px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
