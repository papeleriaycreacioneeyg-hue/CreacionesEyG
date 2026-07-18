import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function TestSupabasePage() {
  let status = "PENDING";
  let message = "";

  try {
    const supabase = await createClient();

    // Test connection by checking the profiles table count
    const { count, error } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    if (error) {
      status = "ERROR";
      message = error.message;
    } else {
      status = "CONNECTED";
      message = `Conexión exitosa. Perfiles registrados: ${count}`;
    }
  } catch (err) {
    status = "ERROR";
    message = err instanceof Error ? err.message : "Error de inicialización de conexión";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/20 p-6">
      <div className="bg-background p-6 rounded-xl border shadow max-w-md w-full space-y-4">
        <h1 className="text-xl font-bold tracking-tight">Verificación de Conexión</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold">Estado:</span>
          <span
            className={`text-sm font-bold px-2 py-0.5 rounded ${
              status === "CONNECTED"
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            {status}
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{message}</p>
      </div>
    </div>
  );
}
