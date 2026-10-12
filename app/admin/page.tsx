import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { getAllPublicCollectionImages } from "@/app/actions/admin-images";
import { ShieldAlert, AlertTriangle, KeyRound } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Panel de Administración | Papelería y Creaciones E&G",
  description: "Gestión privada de fotografías y colecciones del catálogo.",
};

export default async function AdminPage() {
  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // Caso 1: Variables de Supabase no configuradas en el entorno local
  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-[#fdfaf6] flex flex-col">
        <AdminHeader />
        <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-amber-200 shadow-xl space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Configuración Requerida
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-plum">
                Conexión con Supabase Pendiente
              </h1>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                El panel de administración y el almacenamiento persistente de fotografías requieren
                que configures las credenciales de Supabase en tu archivo local{" "}
                <code className="text-plum font-mono bg-rose-50 px-2 py-0.5 rounded text-xs">
                  .env.local
                </code>
                .
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-secondary/40 border border-purple-100 text-left text-xs space-y-3 font-mono text-plum/90">
              <p className="font-bold font-sans text-plum flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-primary" />
                <span>Variables necesarias en .env.local:</span>
              </p>
              <pre className="bg-white p-3 rounded-xl border border-rose-100 overflow-x-auto text-[11px]">
                {`NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key-aqui`}
              </pre>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/productos"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-bold text-white bg-primary hover:bg-[#c93d75] shadow-xs transition-colors"
              >
                Volver al Catálogo Público
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Caso 2: Supabase configurado, validar sesión y rol
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Si no hay sesión iniciada, redirigir a login con retorno
  if (!user) {
    redirect("/login?redirectTo=/admin");
  }

  // Comprobar rol en la tabla profiles
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  // Si no tiene rol admin, bloquear acceso
  if (!profile || profile.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#fdfaf6] flex flex-col">
        <AdminHeader userEmail={user.email} />
        <main className="flex-1 container mx-auto px-4 py-12 max-w-xl flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 border border-destructive/20 shadow-xl space-y-5 text-center">
            <div className="w-14 h-14 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
              <ShieldAlert className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h1 className="text-2xl font-extrabold text-plum">Acceso Restringido</h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                La cuenta <strong className="text-plum font-semibold">{user.email}</strong> está
                autenticada, pero no tiene asignado el rol de{" "}
                <strong className="text-plum">administrador (admin)</strong> en la base de datos.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-secondary/50 border border-purple-100 text-left text-xs text-muted-foreground space-y-2">
              <p className="font-bold text-plum">Instrucciones para autorizar esta cuenta:</p>
              <p className="leading-relaxed">
                Ejecuta la siguiente sentencia en el SQL Editor de tu consola de Supabase para
                conceder permisos de administración:
              </p>
              <pre className="bg-white p-2.5 rounded-xl border border-rose-100 text-[11px] font-mono text-plum overflow-x-auto">
                {`UPDATE public.profiles
SET role = 'admin'::user_role_type
WHERE id = '${user.id}';`}
              </pre>
            </div>

            <div className="pt-2 flex justify-center">
              <Link
                href="/productos"
                className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-primary hover:bg-[#c93d75] shadow-xs transition-colors"
              >
                Volver al Catálogo
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Caso 3: Usuario autenticado y con rol de administrador verificado
  const groupedImages = await getAllPublicCollectionImages();

  return (
    <div className="min-h-screen bg-[#fdfaf6] flex flex-col">
      <AdminHeader userEmail={user.email} />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 sm:py-10 max-w-7xl">
        <AdminDashboard initialImagesGrouped={groupedImages} />
      </main>
    </div>
  );
}
