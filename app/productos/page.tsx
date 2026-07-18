import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { mockProducts } from "@/lib/mock/products";

export default function ProductosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-16 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Catálogo de Productos</h1>
          <p className="text-sm text-muted-foreground">
            Explora las soluciones creativas listas para personalizar e imprimir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <Card key={product.id} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <span className="text-lg font-bold text-rose-500">
                  ${product.price.toLocaleString("es-CL")}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
