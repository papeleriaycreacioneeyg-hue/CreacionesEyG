import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Papelería y Creaciones E&G | Momentos Especiales",
  description:
    "Estudio creativo de papelería personalizada, estampados DTF, sublimación y regalos exclusivos hechos a mano en Chile.",
  openGraph: {
    title: "Papelería y Creaciones E&G",
    description: "Diseño y personalización de papelería y regalos corporativos a medida.",
    url: "https://creaciones-ey-g-lx4k.vercel.app",
    siteName: "Creaciones E&G",
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
