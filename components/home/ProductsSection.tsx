import { mockProducts } from "@/lib/mock/products";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export function ProductsSection() {
  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Productos Destacados</h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Descubre los productos favoritos de nuestros clientes, listos para tu personalización
            especial.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {mockProducts.map((product) => (
            <Card
              key={product.id}
              className="flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <CardHeader className="p-4 space-y-2">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-xs">
                  {/* Image placeholder */}
                  [Imagen de Producto]
                </div>
                <CardTitle className="text-sm font-bold line-clamp-1">{product.name}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground line-clamp-2">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-4 flex justify-between items-center">
                <span className="text-sm font-bold text-rose-500">
                  ${product.price.toLocaleString("es-CL")}
                </span>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  size="sm"
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-full gap-2"
                  asChild
                >
                  <Link href={`/productos/${product.slug}`}>
                    <ShoppingCart className="h-3 w-3" />
                    <span>Personalizar</span>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
