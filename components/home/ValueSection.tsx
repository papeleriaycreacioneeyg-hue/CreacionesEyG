import { Sparkles, Palette, ShieldCheck, Heart } from "lucide-react";

export function ValueSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">¿Por qué elegir Creaciones E&G?</h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Creamos con amor y precisión, respaldando la calidad de cada producto impreso en nuestro
            taller.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center space-y-3 p-4 bg-background rounded-xl border">
            <div className="h-12 w-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
              <Palette className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base">Diseños Exclusivos</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Trabajamos junto a ti para crear composiciones y maquetas adaptadas a tu gusto.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3 p-4 bg-background rounded-xl border">
            <div className="h-12 w-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base">Calidad Premium</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Insumos de primera línea, terminaciones de laminación brillante/mate y cortes limpios.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3 p-4 bg-background rounded-xl border">
            <div className="h-12 w-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base">Revisión Profesional</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Verificamos la calidad de tus imágenes y logotipos vectoriales antes de iniciar la
              impresión.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3 p-4 bg-background rounded-xl border">
            <div className="h-12 w-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base">Atención Cercana</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Canales omnicanal ágiles (WhatsApp) para resolver dudas en todas las fases de
              fabricación.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
