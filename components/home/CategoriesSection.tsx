import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { BookOpen, Scissors, Printer, Gift, Sparkles, ChevronRight } from "lucide-react";

const categories = [
  {
    id: "1",
    name: "Papelería Personalizada",
    slug: "papeleria-personalizada",
    description: "Planners, agendas y cuadernos de diseño para organizar tu día a día.",
    icon: BookOpen,
    color: "bg-rose-500/10 text-rose-500 border-rose-100",
  },
  {
    id: "2",
    name: "DTF Textil & UV",
    slug: "dtf-textil-uv",
    description: "Estampados de alta durabilidad y relieve para marcas y Pymes.",
    icon: Scissors,
    color: "bg-amber-500/10 text-amber-500 border-amber-100",
  },
  {
    id: "3",
    name: "Sublimación",
    slug: "sublimacion",
    description: "Tazas, tazones y merchandising corporativo a todo color.",
    icon: Printer,
    color: "bg-purple-500/10 text-purple-500 border-purple-100",
  },
  {
    id: "4",
    name: "Regalos Personalizados",
    slug: "regalos-personalizados",
    description: "Cajas de regalo y detalles con sentido para momentos especiales.",
    icon: Gift,
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-100",
  },
  {
    id: "5",
    name: "Eventos & Colegios",
    slug: "eventos-colegios",
    description: "Diplomas, recuerdos, medallas y piochas para graduaciones.",
    icon: Sparkles,
    color: "bg-blue-500/10 text-blue-500 border-blue-100",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-16 container mx-auto px-4 space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Nuestras Líneas de Productos</h2>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          Explora la variedad de soluciones creativas que diseñamos y fabricamos a medida en nuestro
          taller.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card
              key={category.id}
              className="group relative overflow-hidden transition-all hover:shadow-lg flex flex-col justify-between border hover:border-rose-300"
            >
              <CardHeader className="space-y-4">
                <div
                  className={`h-12 w-12 rounded-xl flex items-center justify-center border ${category.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-base font-bold group-hover:text-rose-500 transition-colors">
                  {category.name}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <div className="p-6 pt-0 flex justify-end">
                <Link
                  href={`/productos?categoria=${category.slug}`}
                  className="inline-flex items-center text-[10px] font-bold text-rose-500 hover:underline gap-0.5"
                >
                  Ver Más <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
