import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, Compass, CheckCircle } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Graphic/Logo */}
        <div className="relative flex justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-200/10 to-amber-200/10 rounded-full blur-2xl" />
          <div className="relative h-64 w-64 md:h-96 md:w-96 rounded-full overflow-hidden border shadow-lg bg-background flex items-center justify-center p-6">
            <Image
              src="/logo.png"
              alt="Sobre Creaciones E&G"
              fill
              className="object-contain p-8"
              sizes="(max-w-768px) 256px, 384px"
            />
          </div>
        </div>

        {/* Right Column - Text & Benefits */}
        <div className="space-y-6 text-left">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Sobre Nosotros & Valores</h2>
            <p className="text-rose-500 font-semibold text-sm">Nuestra historia artesanal</p>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed">
            Nacimos con la vocación de materializar recuerdos y diseñar regalos que emocionen. Cada
            agenda, tazón o sticker DTF UV pasa por un control de calidad manual y detallado en
            nuestro taller.
          </p>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Heart className="h-5 w-5 text-rose-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold">Diseños a medida</h4>
                <p className="text-xs text-muted-foreground">
                  Trabajamos codo a codo en tu propuesta.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Compass className="h-5 w-5 text-rose-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold">Despacho a todo Chile</h4>
                <p className="text-xs text-muted-foreground">
                  Envíos rápidos por Starken y Chilexpress.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-rose-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold">Revisión pre-prensa</h4>
                <p className="text-xs text-muted-foreground">
                  Validamos tus archivos antes de imprimir.
                </p>
              </div>
            </div>
          </div>

          <Button
            asChild
            size="lg"
            className="bg-rose-500 hover:bg-rose-600 text-white rounded-full"
          >
            <Link href="/nosotros">Conocer Historia</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
