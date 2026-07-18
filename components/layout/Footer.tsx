import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/40 py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {/* Brand Column */}
        <div className="flex flex-col space-y-4">
          <span className="text-lg font-bold bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">
            Creaciones E&G
          </span>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Estudio creativo y e-commerce de papelería, regalos a medida y personalización
            industrial para Pymes y colegios.
          </p>
        </div>

        {/* Links B2B/B2C */}
        <div className="flex flex-col space-y-2">
          <span className="text-sm font-semibold">Plataforma</span>
          <Link href="/catálogo" className="text-xs text-muted-foreground hover:underline">
            Catálogo de Productos
          </Link>
          <Link href="/corporativos" className="text-xs text-muted-foreground hover:underline">
            Servicios para Pymes
          </Link>
          <Link href="/colegios" className="text-xs text-muted-foreground hover:underline">
            Soluciones para Colegios
          </Link>
        </div>

        {/* Help Column */}
        <div className="flex flex-col space-y-2">
          <span className="text-sm font-semibold">Ayuda & Soporte</span>
          <Link href="/ayuda" className="text-xs text-muted-foreground hover:underline">
            Preguntas Frecuentes
          </Link>
          <Link href="/contacto" className="text-xs text-muted-foreground hover:underline">
            Formulario de Contacto
          </Link>
        </div>

        {/* Legal Column */}
        <div className="flex flex-col space-y-2">
          <span className="text-sm font-semibold">Términos</span>
          <span className="text-xs text-muted-foreground">Términos de Servicio</span>
          <span className="text-xs text-muted-foreground">
            Políticas de Privacidad & Reembolsos
          </span>
        </div>
      </div>

      <div className="container mx-auto mt-8 border-t pt-8 text-center text-[10px] text-muted-foreground">
        © {new Date().getFullYear()} Papelería y Creaciones E&G. Todos los derechos reservados.
      </div>
    </footer>
  );
}
