import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Category } from "@/lib/mock/categories";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg flex flex-col justify-between">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl font-bold group-hover:text-rose-500 transition-colors">
          {category.name}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground leading-relaxed">
          {category.description}
        </CardDescription>
      </CardHeader>
      <div className="p-6 pt-0 flex justify-end">
        <Link
          href={`/productos?categoria=${category.slug}`}
          className="inline-flex items-center text-xs font-semibold text-rose-500 hover:underline gap-0.5"
        >
          Explorar <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
    </Card>
  );
}
