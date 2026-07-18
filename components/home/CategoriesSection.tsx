import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Gift, BookOpen, Shirt, CupSoda, PartyPopper, ChevronRight } from "lucide-react";

const categories = [
  {
    id: "1",
    name: "Regalos Personalizados",
    slug: "regalos-personalizados",
    description: "Detalles únicos para cada ocasión",
    icon: Gift,
    color: "bg-rose-100 text-rose-500 border-rose-200",
  },
  {
    id: "2",
    name: "Papelería Creativa",
    slug: "papeleria-creativa",
    description: "Útiles y accesorios con estilo",
    icon: BookOpen,
    color: "bg-purple-100 text-purple-500 border-purple-200",
  },
  {
    id: "3",
    name: "DTF Textil",
    slug: "dtf-textil",
    description: "Estampados de alta calidad",
    icon: Shirt,
    color: "bg-emerald-100 text-emerald-500 border-emerald-200",
  },
  {
    id: "4",
    name: "Sublimación",
    slug: "sublimacion",
    description: "Productos personalizados con diseño único",
    icon: CupSoda,
    color: "bg-indigo-100 text-indigo-500 border-indigo-200",
  },
  {
    id: "5",
    name: "Eventos",
    slug: "eventos",
    description: "Decoraciones y kits para tus eventos",
    icon: PartyPopper,
    color: "bg-pink-100 text-pink-500 border-pink-200",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-16 container mx-auto px-6 space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-plum">✦ Nuestros servicios ✦</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card
              key={category.id}
              className="group relative overflow-hidden transition-all hover:shadow-lg flex flex-col justify-between border hover:border-rose-300 text-center"
            >
              <CardHeader className="space-y-4 flex flex-col items-center">
                <div
                  className={`h-16 w-16 rounded-full flex items-center justify-center border-2 ${category.color}`}
                >
                  <Icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-base font-bold text-plum group-hover:text-rose-500 transition-colors">
                  {category.name}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <div className="p-6 pt-0 flex justify-center">
                <Link
                  href={`/productos?categoria=${category.slug}`}
                  className="inline-flex items-center text-[10px] font-bold text-rose-500 hover:underline gap-0.5"
                >
                  <span>Ver más</span>
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
