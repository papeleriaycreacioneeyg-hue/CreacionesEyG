import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 bg-muted/20">
        <div className="w-full space-y-4">
          <RegisterForm />
          <p className="text-center text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-rose-500 hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
