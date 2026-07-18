"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitRequest(formData: FormData) {
  const supabase = await createClient();

  const description = formData.get("description") as string;
  const quantity = parseInt(formData.get("quantity") as string) || 1;
  const productName = formData.get("product_name") as string;

  // Check user authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const customerId = user?.id;

  if (!customerId) {
    return { error: "Debes iniciar sesión en tu cuenta para enviar una solicitud de cotización." };
  }

  // Insert into customer_requests table
  const { error } = await supabase.from("customer_requests").insert({
    customer_id: customerId,
    description: `[Producto: ${productName}] - ${description}`,
    requested_quantity: quantity,
    origin_channel: "Web",
    status: "pending",
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/mi-cuenta");
  return { success: true };
}
