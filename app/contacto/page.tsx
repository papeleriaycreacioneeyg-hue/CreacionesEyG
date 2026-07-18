import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Mail, MapPin } from "lucide-react";

export default function ContactoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Contacto Comercial</h1>
            <p className="text-sm text-muted-foreground">
              ¿Tienes dudas o necesitas asistencia inmediata para un pedido? Escríbenos por
              cualquiera de nuestros canales oficiales.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
              <MessageCircle className="h-6 w-6 text-rose-500" />
              <div>
                <h4 className="text-sm font-semibold">WhatsApp de Ventas</h4>
                <p className="text-xs text-muted-foreground">+56 9 1234 5678</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
              <Mail className="h-6 w-6 text-rose-500" />
              <div>
                <h4 className="text-sm font-semibold">Correo Electrónico</h4>
                <p className="text-xs text-muted-foreground">contacto@creacioneseyg.cl</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
              <MapPin className="h-6 w-6 text-rose-500" />
              <div>
                <h4 className="text-sm font-semibold">Taller Físico</h4>
                <p className="text-xs text-muted-foreground">Santiago, Chile (Retiro coordinado)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>Enviar Mensaje</CardTitle>
            <CardDescription>Responderemos a tu correo en menos de 24 horas.</CardDescription>
          </CardHeader>
          <form className="space-y-4 p-6 pt-0">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nombre Completo
              </label>
              <Input id="name" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Mensaje
              </label>
              <textarea
                id="message"
                required
                className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600">
              Enviar Mensaje
            </Button>
          </form>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
