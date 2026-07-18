import { mockCategories } from "@/lib/mock/categories";
import { CategoryCard } from "./CategoryCard";

export function CategoriesSection() {
  return (
    <section className="py-16 container mx-auto px-4 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Nuestras Líneas de Productos</h2>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          Explora la variedad de soluciones creativas que diseñamos y fabricamos a medida en nuestro
          taller.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
