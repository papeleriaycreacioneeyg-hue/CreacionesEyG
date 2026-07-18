import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Gift } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-rose-50/70 via-background to-background">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Content */}
        <div className="space-y-8 text-left">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-plum leading-tight">
              Papelería y<span className="block text-plum">Creaciones E&G</span>
            </h1>
            <p className="text-lg text-muted-foreground font-medium leading-relaxed max-w-lg">
              Creamos detalles únicos para momentos especiales
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              asChild
              size="lg"
              className="bg-[#e04b88] hover:bg-[#c93d75] text-white rounded-full px-8 shadow-sm font-semibold"
            >
              <Link href="/cotizar">Cotizar ahora</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-rose-200 hover:bg-rose-50 text-plum font-semibold gap-2"
              asChild
            >
              <Link href="/productos">
                <span>Ver catálogo</span>
                <ShoppingCartIcon className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Bottom Trust Row */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-rose-100">
            <div className="flex flex-col items-start space-y-1">
              <div className="h-8 w-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
                <Heart className="h-4 w-4 fill-current" />
              </div>
              <span className="text-xs font-bold text-plum">Hecho con amor</span>
              <span className="text-[10px] text-muted-foreground">Cada detalle importa</span>
            </div>

            <div className="flex flex-col items-start space-y-1">
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                <Star className="h-4 w-4 fill-current" />
              </div>
              <span className="text-xs font-bold text-plum">Personalizados</span>
              <span className="text-[10px] text-muted-foreground">Ideas hechas para ti</span>
            </div>

            <div className="flex flex-col items-start space-y-1">
              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
                <Gift className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-plum">Calidad premium</span>
              <span className="text-[10px] text-muted-foreground">Materiales de calidad</span>
            </div>
          </div>
        </div>

        {/* Right Column - Illustration */}
        <div className="relative flex justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-200/20 to-amber-200/20 rounded-full blur-3xl" />
          <div className="relative h-72 w-72 md:h-[450px] md:w-[450px] rounded-2xl overflow-hidden border bg-background shadow-xl flex items-center justify-center p-6">
            <Image
              src="/logo.png"
              alt="Estudio Creativo E&G"
              fill
              className="object-contain p-8"
              sizes="(max-w-768px) 288px, 450px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ShoppingCartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
