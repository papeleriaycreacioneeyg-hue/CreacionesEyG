import Link from "next/link";
import { Gift, BookOpen, Shirt, Coffee, PartyPopper } from "lucide-react";

const services = [
  {
    id: "1",
    name: "Regalos Personalizados",
    slug: "regalos-personalizados",
    description: "Detalles únicos para cada ocasión",
    icon: Gift,
    iconWrapperColor: "bg-rose-50 text-[#e04b88] border-rose-200/80",
  },
  {
    id: "2",
    name: "Papelería Creativa",
    slug: "papeleria-creativa",
    description: "Útiles y accesorios con estilo",
    icon: BookOpen,
    iconWrapperColor: "bg-purple-50 text-[#9c7ac2] border-purple-200/80",
  },
  {
    id: "3",
    name: "DTF Textil",
    slug: "dtf-textil",
    description: "Estampados de alta calidad",
    icon: Shirt,
    iconWrapperColor: "bg-teal-50 text-[#2ba8a0] border-teal-200/80",
  },
  {
    id: "4",
    name: "Sublimación",
    slug: "sublimacion",
    description: "Productos personalizados con diseño único",
    icon: Coffee,
    iconWrapperColor: "bg-indigo-50 text-[#7c69be] border-indigo-200/80",
  },
  {
    id: "5",
    name: "Eventos",
    slug: "eventos",
    description: "Decoraciones y kits para tus eventos",
    icon: PartyPopper,
    iconWrapperColor: "bg-pink-50 text-[#e04b88] border-pink-200/80",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-14 sm:py-20 container mx-auto px-4 sm:px-6 space-y-10">
      {/* Section Header with Golden Sparkles */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight text-[#4a154b] flex items-center justify-center gap-2">
          <span className="text-[#d4a359] text-lg sm:text-xl">✦</span>
          <span>Nuestros servicios</span>
          <span className="text-[#d4a359] text-lg sm:text-xl">✦</span>
        </h2>
      </div>

      {/* 5-Column Services Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.id}
              href={`/productos?categoria=${service.slug}`}
              className="group relative bg-white rounded-3xl p-6 border border-rose-100/90 shadow-2xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col items-center text-center space-y-4 hover:-translate-y-1 cursor-pointer"
            >
              {/* Rounded Icon Badge */}
              <div
                className={`h-16 w-16 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 shadow-2xs ${service.iconWrapperColor}`}
              >
                <Icon className="h-7 w-7 stroke-[1.8]" />
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5 flex-1 flex flex-col justify-center">
                <h3 className="text-sm font-extrabold text-[#4a154b] group-hover:text-primary transition-colors leading-snug">
                  {service.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
