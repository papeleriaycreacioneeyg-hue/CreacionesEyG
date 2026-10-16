"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, ChevronUp } from "lucide-react";
import { OFFICIAL_CONTACT, buildWhatsAppUrl } from "@/lib/constants/contact";

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full border-t border-rose-100 bg-[#fdfaf6] pt-14 pb-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-4 sm:px-6">
        {/* Column 1: Brand Info */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <div className="relative h-13 w-13 overflow-hidden rounded-full border border-rose-200/80 shadow-2xs">
              <Image
                src="/logo.png"
                alt="Logo Papelería y Creaciones E&G"
                fill
                className="object-cover"
                sizes="52px"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold text-[#4a154b]">Papelería y</span>
              <span className="text-sm font-extrabold text-[#4a154b]">Creaciones E&G</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
            Creamos detalles únicos para momentos especiales.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col space-y-3">
          <span className="text-sm font-extrabold text-[#4a154b]">Enlaces rápidos</span>
          <nav className="flex flex-col space-y-2 text-xs font-medium text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <Link href="/nosotros" className="hover:text-primary transition-colors">
              Nosotros
            </Link>
            <Link href="/productos" className="hover:text-primary transition-colors">
              Productos
            </Link>
            <Link href="/servicios" className="hover:text-primary transition-colors">
              Servicios
            </Link>
            <Link href="/galeria" className="hover:text-primary transition-colors">
              Galería
            </Link>
            <Link href="/contacto" className="hover:text-primary transition-colors">
              Contacto
            </Link>
          </nav>
        </div>

        {/* Column 3: Services */}
        <div className="flex flex-col space-y-3">
          <span className="text-sm font-extrabold text-[#4a154b]">Servicios</span>
          <nav className="flex flex-col space-y-2 text-xs font-medium text-muted-foreground">
            <Link
              href="/productos?categoria=regalos-personalizados"
              className="hover:text-primary transition-colors"
            >
              Regalos Personalizados
            </Link>
            <Link
              href="/productos?categoria=papeleria-creativa"
              className="hover:text-primary transition-colors"
            >
              Papelería Creativa
            </Link>
            <Link
              href="/productos?categoria=dtf-textil"
              className="hover:text-primary transition-colors"
            >
              DTF Textil
            </Link>
            <Link
              href="/productos?categoria=sublimacion"
              className="hover:text-primary transition-colors"
            >
              Sublimación
            </Link>
            <Link
              href="/productos?categoria=eventos"
              className="hover:text-primary transition-colors"
            >
              Eventos
            </Link>
          </nav>
        </div>

        {/* Column 4: Contact & Socials */}
        <div className="flex flex-col space-y-3">
          <span className="text-sm font-extrabold text-[#4a154b]">Contáctanos</span>
          <div className="flex flex-col space-y-2.5 text-xs text-muted-foreground">
            <a
              href={buildWhatsAppUrl(
                "¡Hola Papelería y Creaciones E&G! Quisiera consultar por sus productos..."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-primary transition-colors group"
            >
              <div className="h-6 w-6 rounded-full bg-rose-50 flex items-center justify-center text-[#e04b88] group-hover:bg-primary group-hover:text-white transition-colors">
                <Phone className="h-3.5 w-3.5 fill-current" />
              </div>
              <span className="font-semibold">{OFFICIAL_CONTACT.phoneFormatted}</span>
            </a>

            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-rose-50 flex items-center justify-center text-[#e04b88]">
                <InstagramIcon className="h-3.5 w-3.5" />
              </div>
              <span>{OFFICIAL_CONTACT.instagram}</span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-rose-50 flex items-center justify-center text-[#e04b88]">
                <TikTokIcon className="h-3.5 w-3.5 fill-current" />
              </div>
              <span>{OFFICIAL_CONTACT.tiktok}</span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-rose-50 flex items-center justify-center text-[#e04b88]">
                <MapPin className="h-3.5 w-3.5" />
              </div>
              <span>{OFFICIAL_CONTACT.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Scroll-to-Top Button */}
      <div className="container mx-auto mt-10 border-t border-rose-100/80 pt-6 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted-foreground gap-4">
        <span>
          © {new Date().getFullYear()} Papelería y Creaciones E&G. Todos los derechos reservados.
        </span>

        <div className="flex items-center gap-4">
          <span>Diseñado con 💜 para nuestros clientes</span>

          {/* Scroll to Top Circular Button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="h-8 w-8 rounded-full border border-purple-200/80 bg-white hover:bg-rose-50 flex items-center justify-center text-plum shadow-2xs hover:scale-105 transition-all cursor-pointer"
            aria-label="Volver arriba"
            title="Volver arriba"
          >
            <ChevronUp className="w-4 h-4 text-primary" />
          </button>
        </div>
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
