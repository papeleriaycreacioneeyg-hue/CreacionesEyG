"use client";

import { useState } from "react";
import { submitRequest } from "@/app/actions/quotes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export function QuoteForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await submitRequest(formData);

    setLoading(false);
    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Solicitar Cotización</CardTitle>
        <CardDescription>
          Cuéntanos sobre tu proyecto de papelería o regalos personalizados y te enviaremos una
          cotización.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="product_name" className="text-sm font-medium">
              Producto o Insumo solicitado
            </label>
            <Input
              id="product_name"
              name="product_name"
              required
              placeholder="Ej: Stickers DTF UV, Agendas..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="correo@ejemplo.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="quantity" className="text-sm font-medium">
                Cantidad aproximada
              </label>
              <Input id="quantity" name="quantity" type="number" min={1} required />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Detalles del diseño y personalización
            </label>
            <textarea
              id="description"
              name="description"
              required
              className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Detalles sobre colores, materiales, logos, nombres a incluir..."
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          {success && (
            <p className="text-sm text-emerald-500 font-medium">
              ¡Solicitud enviada con éxito! La revisaremos en el taller y nos contactaremos.
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600" disabled={loading}>
            {loading ? "Enviando..." : "Enviar Solicitud"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
