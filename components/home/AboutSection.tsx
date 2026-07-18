import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Award, Heart, Truck } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-20 container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        {/* Left Column - Graphic/Logo */}
        <div className="relative flex justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-200/10 to-amber-200/10 rounded-full blur-2xl" />
          <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-2xl overflow-hidden border shadow-lg bg-background flex items-center justify-center p-6">
            <Image
              src="/logo.png"
              alt="Sobre Creaciones E&G"
              fill
              className="object-contain p-6"
              sizes="(max-w-768px) 256px, 320px"
            />
          </div>
        </div>

        {/* Center Column - Text Content */}
        <div className="space-y-6 text-left">
          <div className="space-y-2">
            <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
              Sobre E&G
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-plum leading-tight">
              Más que productos,
              <span className="block text-plum">creamos emociones</span>
            </h2>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed">
            En Papelería y Creaciones E&G nos dedicamos a diseñar y crear productos personalizados
            que cuentan historias, celebran momentos y dejan huellas inolvidables.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-[#6b21a8] hover:bg-[#581c87] text-white rounded-full px-8 shadow-sm font-semibold"
          >
            <Link href="/nosotros">Conoce nuestra historia</Link>
          </Button>
        </div>

        {/* Right Column - Benefit Cards */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-background border rounded-2xl shadow-sm">
            <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-plum">Calidad garantizada</h4>
              <p className="text-xs text-muted-foreground">Trabajamos con los mejores materiales</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-background border rounded-2xl shadow-sm">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 shrink-0">
              <Heart className="h-5 w-5 fill-current" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-plum">Atención personalizada</h4>
              <p className="text-xs text-muted-foreground">Te acompañamos en todo el proceso</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-background border rounded-2xl shadow-sm">
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 shrink-0">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-plum">Envíos seguros</h4>
              <p className="text-xs text-muted-foreground">Llegamos a donde nos necesites</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
