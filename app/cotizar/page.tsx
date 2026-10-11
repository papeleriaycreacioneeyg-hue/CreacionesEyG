import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { QuoteForm } from "@/components/quotes/QuoteForm";
import { FloatingQuoteButton } from "@/components/catalog/FloatingQuoteButton";

export default function CotizarPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 py-10 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-rose-50/50 via-[#f1ebfc]/20 to-background">
        <div className="container mx-auto max-w-6xl">
          <QuoteForm />
        </div>
      </main>

      <Footer />

      <FloatingQuoteButton />
    </div>
  );
}
