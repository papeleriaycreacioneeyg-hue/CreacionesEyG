import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NosotrosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-16 space-y-8 max-w-3xl">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight">Nuestra Historia</h1>
          <p className="text-rose-500 font-semibold">El origen de Papelería y Creaciones E&G</p>
        </div>

        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>
            Papelería y Creaciones E&G nació como una respuesta apasionada a la necesidad de
            encontrar detalles personalizados que realmente reflejen la identidad y el corazón de
            quien los entrega. Comenzamos en un pequeño taller familiar imprimiendo planners y
            agendas a mano, cuidando cada costura y cada corte.
          </p>
          <p>
            Hoy en día, combinamos técnicas tradicionales de encuadernación con impresión digital de
            última generación, tecnología DTF y sublimación para ofrecer soluciones corporativas a
            Pymes y regalos con sentido para familias y colegios a lo largo de Chile.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
