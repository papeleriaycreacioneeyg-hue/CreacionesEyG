import { mockProducts } from "@/lib/mock/products";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ProductsSection() {
  return (
    <section className="py-16 container mx-auto px-6 space-y-12">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-plum">✦ Productos destacados ✦</h2>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full border-rose-200 text-rose-500 hover:bg-rose-50 font-semibold"
          asChild
        >
          <Link href="/productos">Ver todos</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {mockProducts.map((product) => (
          <Card
            key={product.id}
            className="flex flex-col justify-between hover:shadow-md transition-shadow border"
          >
            <CardHeader className="p-0">
              <div className="aspect-[4/3] bg-muted rounded-t-lg flex items-center justify-center text-muted-foreground text-xs font-semibold">
                [Imagen de Producto]
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <h3 className="text-sm font-bold text-plum line-clamp-2">{product.name}</h3>
              <p className="text-sm font-bold text-rose-500">
                ${product.price.toLocaleString("es-CL")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
