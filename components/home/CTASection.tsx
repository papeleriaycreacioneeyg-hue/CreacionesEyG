import { Button } from "@/components/ui/button";
import { Phone, Sparkles } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/constants/contact";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-14 bg-gradient-to-r from-[#ece2f7] via-[#fdf1f7] to-[#ece2f7] border-y border-purple-200/50">
      {/* Decorative floating sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Sparkles className="absolute top-4 left-10 w-4 h-4 text-purple-300/60" />
        <Sparkles className="absolute bottom-4 right-16 w-5 h-5 text-rose-300/60" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Persuasive Call to Action Copy */}
        <div className="text-center md:text-left space-y-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black font-serif text-[#4a154b]">
            ¿Tienes una idea en mente?
          </h2>
          <p className="text-plum/80 text-sm sm:text-base font-semibold">
            ¡Hagámosla realidad juntas!
          </p>
        </div>

        {/* Double-Line WhatsApp Conversion Button */}
        <Button
          size="lg"
          className="bg-[#e04b88] hover:bg-[#c93d75] text-white rounded-2xl sm:rounded-full px-7 py-6 sm:py-7 gap-3 shadow-md font-semibold transition-all hover:scale-[1.02] cursor-pointer"
          asChild
        >
          <a
            href={buildWhatsAppUrl(
              "¡Hola Papelería y Creaciones E&G! Tengo una idea especial en mente y me gustaría hacerla realidad..."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3"
          >
            <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Phone className="h-4.5 w-4.5 fill-current" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-extrabold tracking-wide leading-tight">
                Cotizar por WhatsApp
              </span>
              <span className="text-[11px] text-white/90 font-normal leading-tight mt-0.5">
                Respuesta rápida garantizada
              </span>
            </div>
          </a>
        </Button>
      </div>
    </section>
  );
}
