import { Card } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";

export function GallerySection() {
  return (
    <section className="w-full bg-[#f1ebfc]/50 py-16">
      <div className="container mx-auto px-6 space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-plum">✦ Trabajos realizados ✦</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {[
            "Libreta Luisa",
            "Caja Regalo Rosa",
            "Tazones Ilustrados",
            "Estuche Mamá",
            "Llaveros S y M",
            "Canasto Regalo",
          ].map((title, id) => (
            <Card
              key={id}
              className="aspect-square bg-background flex flex-col items-center justify-center text-muted-foreground border hover:border-rose-300 transition-all group relative overflow-hidden"
            >
              <ImageIcon className="h-8 w-8 mb-2 group-hover:text-rose-500 transition-colors" />
              <span className="text-[10px] font-bold text-plum">{title}</span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
