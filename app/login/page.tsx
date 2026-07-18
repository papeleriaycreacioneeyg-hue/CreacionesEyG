import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 bg-muted/20">
        <div className="w-full space-y-4">
          <LoginForm />
          <p className="text-center text-sm text-muted-foreground">
            ¿No tienes una cuenta?{" "}
            <Link href="/registro" className="text-rose-500 hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
