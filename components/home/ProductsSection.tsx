import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const featuredProducts = [
  {
    id: "prod-featured-1",
    name: "Vaso sublimado personalizado",
    price: "$8.000",
    image: "/images/products/featured-vaso.jpg",
    slug: "vaso-sublimado-personalizado",
  },
  {
    id: "prod-featured-2",
    name: "Agenda personalizada",
    price: "$6.000",
    image: "/images/products/featured-agenda.jpg",
    slug: "agenda-personalizada",
  },
  {
    id: "prod-featured-3",
    name: "Tazón personalizado",
    price: "$7.000",
    image: "/images/products/featured-tazon.jpg",
    slug: "tazon-personalizado",
  },
  {
    id: "prod-featured-4",
    name: "Llavero personalizado",
    price: "$4.000",
    image: "/images/products/featured-llavero.jpg",
    slug: "llavero-personalizado",
  },
  {
    id: "prod-featured-5",
    name: "Bolso personalizado",
    price: "$10.000",
    image: "/images/products/featured-bolso.jpg",
    slug: "bolso-personalizado",
  },
];

export function ProductsSection() {
  return (
    <section className="py-14 sm:py-20 container mx-auto px-4 sm:px-6 space-y-8">
      {/* Header Bar with Title and "Ver todos" pill button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight text-[#4a154b] flex items-center gap-2">
          <span className="text-[#d4a359] text-lg sm:text-xl">✦</span>
          <span>Productos destacados</span>
          <span className="text-[#d4a359] text-lg sm:text-xl">✦</span>
        </h2>

        <Button
          variant="outline"
          size="sm"
          className="rounded-full border-rose-200/90 text-primary hover:bg-rose-50/80 font-bold text-xs px-5 py-2 shadow-2xs transition-all hover:scale-[1.02]"
          asChild
        >
          <Link href="/productos">Ver todos</Link>
        </Button>
      </div>

      {/* 5-Column Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {featuredProducts.map((product) => (
          <Link
            key={product.id}
            href="/productos"
            className="group relative bg-white rounded-3xl p-3.5 border border-rose-100/90 shadow-2xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 cursor-pointer"
          >
            {/* Image Container with Rounded Corners */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-rose-50/40 border border-rose-100/60">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 220px"
              />
            </div>

            {/* Product Meta: Name & Price in Rose */}
            <div className="pt-3.5 pb-1 px-1 text-center space-y-1">
              <h3 className="text-xs font-bold text-[#4a154b] group-hover:text-primary transition-colors line-clamp-1">
                {product.name}
              </h3>
              <p className="text-sm font-extrabold text-[#e04b88]">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
