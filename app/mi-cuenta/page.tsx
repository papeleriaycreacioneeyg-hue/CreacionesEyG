import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bienvenido a tu Bóveda Creativa</h1>
        <p className="text-sm text-muted-foreground">
          Administra tus diseños vectoriales, haz seguimiento de pedidos y solicita cotizaciones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Bóveda Cloud</CardTitle>
            <CardDescription>Archivos cargados en Supabase Storage</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold">12</span> Diseños vectoriales
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pedidos Activos</CardTitle>
            <CardDescription>Estado de fabricación en taller</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-3xl font-bold">1</span>
            <Badge variant="secondary">En Impresión</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
