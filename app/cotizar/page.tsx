import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { QuoteForm } from "@/components/quotes/QuoteForm";

export default function CotizarPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 bg-muted/20">
        <div className="w-full space-y-4 px-4">
          <QuoteForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
