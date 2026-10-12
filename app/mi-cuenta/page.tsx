import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Images, ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import { CATALOG_PRODUCTS } from "@/lib/data/catalog";
import { getAllPublicCollectionImages } from "@/app/actions/admin-images";

export default async function AccountPage() {
  const groupedImages = await getAllPublicCollectionImages();
  const totalUploadedImages = Object.values(groupedImages).reduce(
    (acc, arr) => acc + arr.length,
    0
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-plum">
          Bienvenido al Panel de Administración
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Administra las fotografías del catálogo de productos, tus diseños vectoriales y haz
          seguimiento de pedidos.
        </p>
      </div>

      {/* Featured Banner: Administrar Catálogo */}
      <div className="rounded-3xl bg-gradient-to-r from-rose-500/10 via-purple-500/10 to-amber-500/10 border border-rose-200/60 p-6 sm:p-8 relative overflow-hidden shadow-xs">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-rose-200 text-xs font-bold text-plum shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Gestión Oficial de Catálogo</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-plum">
              Catálogo de Productos y Fotografías
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Administra las fotografías de cada una de las{" "}
              <strong className="text-plum">{CATALOG_PRODUCTS.length} colecciones</strong> exhibidas
              en el catálogo público. Cada producto permite cargar hasta un{" "}
              <strong className="text-plum">máximo de 10 fotos</strong> en alta resolución.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-plum/80 pt-1">
              <span className="bg-white/70 px-3 py-1 rounded-full border border-purple-100 shadow-2xs">
                📦 {CATALOG_PRODUCTS.length} Productos en Catálogo
              </span>
              <span className="bg-white/70 px-3 py-1 rounded-full border border-purple-100 shadow-2xs">
                📸 {totalUploadedImages} Fotos cargadas actualmente
              </span>
              <span className="bg-white/70 px-3 py-1 rounded-full border border-purple-100 shadow-2xs">
                ⚡ Límite: hasta 10 fotos por producto
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <Button
              className="bg-primary hover:bg-[#c93d75] text-white rounded-full px-6 py-5 font-bold text-sm shadow-md gap-2"
              asChild
            >
              <Link href="/mi-cuenta/catalogo">
                <Images className="w-4 h-4" />
                <span>Administrar Catálogo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-purple-200 text-plum hover:bg-white font-semibold text-xs px-5 py-2.5 gap-1.5 shadow-2xs"
              asChild
            >
              <Link href="/productos" target="_blank">
                <span>Ver Catálogo Público</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Grid of Other Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow border">
          <CardHeader>
            <CardTitle className="text-lg text-plum">Gestor de Fotos</CardTitle>
            <CardDescription>Carga rápida de imágenes de catálogo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <span className="text-3xl font-extrabold text-primary">{CATALOG_PRODUCTS.length}</span>
            <p className="text-xs text-muted-foreground">
              Colecciones listas para subir fotos (máx. 10 c/u)
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-[#c93d75] p-0 font-bold text-xs"
              asChild
            >
              <Link href="/mi-cuenta/catalogo" className="flex items-center gap-1">
                <span>Ir al gestor de fotos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow border">
          <CardHeader>
            <CardTitle className="text-lg text-plum">Bóveda Cloud</CardTitle>
            <CardDescription>Archivos cargados en Supabase Storage</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold">12</span>
            <p className="text-xs text-muted-foreground mt-1">Diseños vectoriales guardados</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow border">
          <CardHeader>
            <CardTitle className="text-lg text-plum">Pedidos Activos</CardTitle>
            <CardDescription>Estado de fabricación en taller</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-3xl font-bold">1</span>
            <Badge variant="secondary">En Impresión</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
