import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-center relative overflow-hidden">
      <div className="container mx-auto px-4 space-y-6 relative z-10 max-w-xl">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          ¿Tienes un diseño en mente?
        </h2>
        <p className="text-white/90 text-sm md:text-base leading-relaxed">
          Sube tus archivos de referencia, dinos qué necesitas y recibe un presupuesto a tu medida
          en menos de 24 horas hábiles.
        </p>
        <div className="flex justify-center pt-2">
          <Button asChild size="lg" className="bg-white text-rose-500 hover:bg-white/90 shadow-lg">
            <Link href="/cotizar">Cotizar Ahora</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
