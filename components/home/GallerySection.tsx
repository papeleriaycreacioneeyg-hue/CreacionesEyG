import { Card } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";

export function GallerySection() {
  return (
    <section className="py-16 container mx-auto px-4 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Trabajos Realizados</h2>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          Echa un vistazo a la calidad final de los encargos impresos y despachados desde nuestro
          taller a clientes felices.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((id) => (
          <Card
            key={id}
            className="aspect-square bg-muted/40 flex flex-col items-center justify-center text-muted-foreground border-dashed border-2 relative overflow-hidden group"
          >
            <ImageIcon className="h-8 w-8 mb-2 group-hover:text-rose-500 transition-colors" />
            <span className="text-xs">Maqueta Showcase #{id}</span>
          </Card>
        ))}
      </div>
    </section>
  );
}
