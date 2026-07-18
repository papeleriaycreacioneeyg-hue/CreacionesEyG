import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-12 bg-gradient-to-r from-rose-100 via-purple-50 to-amber-100 border-y">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-left space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold text-plum">
            ¿Tienes una idea en mente?
          </h2>
          <p className="text-plum/80 text-sm font-semibold">¡Hagámosla realidad juntas!</p>
        </div>

        <Button
          size="lg"
          className="bg-[#e04b88] hover:bg-[#c93d75] text-white rounded-full px-8 py-6 gap-2 shadow-md font-semibold flex flex-col items-center sm:flex-row sm:items-center"
          asChild
        >
          <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer">
            <Phone className="h-5 w-5 fill-current" />
            <div className="flex flex-col items-start">
              <span>Cotizar por WhatsApp</span>
              <span className="text-[10px] text-white/80 font-normal">
                Respuesta rápida garantizada
              </span>
            </div>
          </a>
        </Button>
      </div>
    </section>
  );
}
