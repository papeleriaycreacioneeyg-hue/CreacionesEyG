import React from "react";
import Link from "next/link";
import { getAllPublicCollectionImages } from "@/app/actions/admin-images";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { ExternalLink, Sparkles } from "lucide-react";

export default async function MiCuentaCatalogoPage() {
  const groupedImages = await getAllPublicCollectionImages();

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-semibold text-primary mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>26 Colecciones Oficiales • Límite: 10 fotos por producto</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-plum">
            Administración del Catálogo
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Carga y gestiona las fotografías oficiales para cada uno de los productos de{" "}
            <Link
              href="/productos"
              target="_blank"
              className="text-primary hover:underline font-medium inline-flex items-center gap-1"
            >
              /productos <ExternalLink className="w-3 h-3" />
            </Link>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/productos"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-plum bg-white hover:bg-rose-50 border border-purple-200 shadow-2xs transition-colors"
          >
            <span>Ver Catálogo Público</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Interactive Photo Manager */}
      <AdminDashboard initialImagesGrouped={groupedImages} />
    </div>
  );
}
