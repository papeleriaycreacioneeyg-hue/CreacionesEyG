import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-[#fdfaf6] py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 px-6">
        {/* Brand Column */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border">
              <Image
                src="/logo.png"
                alt="Logo Creaciones E&G"
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-plum">Papelería y</span>
              <span className="text-sm font-bold text-plum">Creaciones E&G</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Creamos detalles únicos para momentos especiales.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col space-y-3">
          <span className="text-sm font-bold text-plum">Enlaces rápidos</span>
          <nav className="flex flex-col space-y-2 text-xs">
            <Link href="/" className="text-muted-foreground hover:text-primary hover:underline">
              Inicio
            </Link>
            <Link
              href="/nosotros"
              className="text-muted-foreground hover:text-primary hover:underline"
            >
              Nosotros
            </Link>
            <Link
              href="/productos"
              className="text-muted-foreground hover:text-primary hover:underline"
            >
              Productos
            </Link>
            <Link
              href="/servicios"
              className="text-muted-foreground hover:text-primary hover:underline"
            >
              Servicios
            </Link>
            <Link
              href="/galeria"
              className="text-muted-foreground hover:text-primary hover:underline"
            >
              Galería
            </Link>
            <Link
              href="/contacto"
              className="text-muted-foreground hover:text-primary hover:underline"
            >
              Contacto
            </Link>
          </nav>
        </div>

        {/* Services Column */}
        <div className="flex flex-col space-y-3">
          <span className="text-sm font-bold text-plum">Servicios</span>
          <nav className="flex flex-col space-y-2 text-xs text-muted-foreground">
            <span>Regalos Personalizados</span>
            <span>Papelería Creativa</span>
            <span>DTF Textil</span>
            <span>Sublimación</span>
            <span>Eventos</span>
          </nav>
        </div>

        {/* Contact Column */}
        <div className="flex flex-col space-y-3">
          <span className="text-sm font-bold text-plum">Contáctanos</span>
          <div className="flex flex-col space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Phone className="h-4.5 w-4.5 text-rose-500 fill-current" />
              <span>+56 9 1234 5678</span>
            </div>
            <div className="flex items-center space-x-2">
              <InstagramIcon className="h-4.5 w-4.5 text-rose-500" />
              <span>@papeleriaycreacioneseyg</span>
            </div>
            <div className="flex items-center space-x-2">
              <TikTokIcon className="h-4.5 w-4.5 text-rose-500 fill-current" />
              <span>@papeleriaycreacioneseyg</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4.5 w-4.5 text-rose-500" />
              <span>Santiago, Chile</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-12 border-t pt-8 px-6 flex flex-col sm:flex-row items-center justify-between text-[10px] text-muted-foreground gap-4">
        <span>
          © {new Date().getFullYear()} Papelería y Creaciones E&G. Todos los derechos reservados.
        </span>
        <span>Diseñado con 💜 para nuestros clientes</span>
      </div>
    </footer>
  );
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
