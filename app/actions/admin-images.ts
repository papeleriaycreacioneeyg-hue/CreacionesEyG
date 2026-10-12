"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { validateImageFile, MAX_IMAGES_PER_COLLECTION } from "@/lib/validations/imageUpload";
import { CATALOG_PRODUCTS } from "@/lib/data/catalog";

export interface CollectionImageRecord {
  id: string;
  collection_id: string;
  collection_slug: string;
  storage_path: string;
  public_url: string;
  file_name: string;
  file_size_bytes: number;
  mime_type: string;
  position: number;
  created_at: string;
}

export interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Verifica si las variables de entorno de Supabase están configuradas.
 */
function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

/**
 * Verifica si el usuario actual tiene rol de administrador.
 */
async function verifyAdminUser(): Promise<{
  isAdmin: boolean;
  userId?: string;
  error?: string;
}> {
  if (!isSupabaseConfigured()) {
    return {
      isAdmin: false,
      error:
        "Supabase no está configurado en el entorno local. Por favor define NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local.",
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      isAdmin: false,
      error: "No has iniciado sesión o la sesión ha expirado.",
    };
  }

  // Comprobar rol en la tabla profiles
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || !profile || profile.role !== "admin") {
    return {
      isAdmin: false,
      userId: user.id,
      error: "Acceso denegado: se requieren permisos de administrador (rol 'admin').",
    };
  }

  return { isAdmin: true, userId: user.id };
}

/**
 * Obtiene las fotografías actuales de una colección.
 */
export async function getCollectionImages(
  collectionId: string
): Promise<ActionResult<CollectionImageRecord[]>> {
  if (!isSupabaseConfigured()) {
    return {
      success: true,
      data: [],
    };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("collection_images")
      .select("*")
      .eq("collection_id", collectionId)
      .order("position", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error al consultar fotografías.";
    return { success: false, error: message };
  }
}

/**
 * Sube una fotografía a Supabase Storage y registra la referencia en collection_images.
 */
export async function uploadCollectionImage(
  formData: FormData
): Promise<ActionResult<CollectionImageRecord>> {
  // 1. Verificación de permisos de administrador
  const authCheck = await verifyAdminUser();
  if (!authCheck.isAdmin) {
    return { success: false, error: authCheck.error };
  }

  // 2. Extraer parámetros
  const file = formData.get("file") as File | null;
  const collectionId = formData.get("collectionId") as string | null;

  if (!file || !(file instanceof File)) {
    return { success: false, error: "Debes seleccionar un archivo de imagen válido." };
  }

  if (!collectionId) {
    return { success: false, error: "Falta el identificador de la colección." };
  }

  // 3. Validar que la colección exista entre las 26 oficiales
  const validProduct = CATALOG_PRODUCTS.find((p) => p.id === collectionId);
  if (!validProduct) {
    return {
      success: false,
      error: `La colección "${collectionId}" no existe en el catálogo de 26 colecciones.`,
    };
  }

  const supabase = await createClient();

  // 4. Comprobar límite de 10 fotografías a nivel de aplicación antes de procesar el archivo
  const { count, error: countError } = await supabase
    .from("collection_images")
    .select("*", { count: "exact", head: true })
    .eq("collection_id", collectionId);

  if (countError) {
    return { success: false, error: `Error verificando cupo: ${countError.message}` };
  }

  if (count !== null && count >= MAX_IMAGES_PER_COLLECTION) {
    return {
      success: false,
      error: `Límite alcanzado: La colección "${validProduct.name}" ya tiene el máximo permitido de 10 fotografías. Elimina una para poder subir otra.`,
    };
  }

  // 5. Validar buffer e integridad del archivo (Magic Bytes, tamaño, formato)
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const validation = validateImageFile(file.name, file.size, buffer);
  if (!validation.valid || !validation.detectedMimeType) {
    return { success: false, error: validation.error || "Archivo no válido." };
  }

  // 6. Generar ruta estructurada en Storage
  const ext = file.name.split(".").pop()?.toLowerCase() || "webp";
  const uniqueId = crypto.randomUUID();
  const storagePath = `collections/${collectionId}/${Date.now()}_${uniqueId}.${ext}`;

  // 7. Cargar archivo al bucket de Supabase Storage ('catalog-images')
  const { error: storageError } = await supabase.storage
    .from("catalog-images")
    .upload(storagePath, buffer, {
      contentType: validation.detectedMimeType,
      cacheControl: "3600",
      upsert: false,
    });

  if (storageError) {
    return {
      success: false,
      error: `Error al almacenar la imagen en Supabase Storage: ${storageError.message}`,
    };
  }

  // 8. Obtener URL pública
  const {
    data: { publicUrl },
  } = supabase.storage.from("catalog-images").getPublicUrl(storagePath);

  // 9. Registrar en la tabla persistente collection_images
  const nextPosition = count ?? 0;
  const { data: insertedRecord, error: dbError } = await supabase
    .from("collection_images")
    .insert({
      collection_id: collectionId,
      collection_slug: validProduct.slug,
      storage_path: storagePath,
      public_url: publicUrl,
      file_name: file.name,
      file_size_bytes: file.size,
      mime_type: validation.detectedMimeType,
      position: nextPosition,
    })
    .select()
    .single();

  // 10. Si la inserción en BD falla (por ejemplo, por el trigger de 10 imágenes ante concurrencia)
  // eliminamos el archivo subido en Storage inmediatamente para evitar registros huérfanos.
  if (dbError) {
    await supabase.storage.from("catalog-images").remove([storagePath]);
    return {
      success: false,
      error: `Error al registrar en base de datos: ${dbError.message}`,
    };
  }

  // 11. Revalidar rutas para actualización instantánea
  revalidatePath("/productos");
  revalidatePath("/admin");

  return {
    success: true,
    data: insertedRecord as CollectionImageRecord,
  };
}

/**
 * Elimina una fotografía de Supabase Storage y de collection_images.
 */
export async function deleteCollectionImage(
  imageId: string,
  storagePath: string
): Promise<ActionResult<null>> {
  // 1. Verificación de permisos de administrador
  const authCheck = await verifyAdminUser();
  if (!authCheck.isAdmin) {
    return { success: false, error: authCheck.error };
  }

  const supabase = await createClient();

  // 2. Eliminar registro en base de datos primero
  const { error: dbError } = await supabase.from("collection_images").delete().eq("id", imageId);

  if (dbError) {
    return { success: false, error: `Error eliminando de base de datos: ${dbError.message}` };
  }

  // 3. Eliminar archivo en Supabase Storage
  if (storagePath) {
    const { error: storageError } = await supabase.storage
      .from("catalog-images")
      .remove([storagePath]);

    if (storageError) {
      console.error("Advertencia: archivo en Storage no eliminado:", storageError.message);
    }
  }

  // 4. Revalidar rutas
  revalidatePath("/productos");
  revalidatePath("/admin");

  return { success: true, data: null };
}

/**
 * Obtiene todas las fotografías del catálogo agrupadas por collection_id para visualización pública.
 */
export async function getAllPublicCollectionImages(): Promise<
  Record<string, CollectionImageRecord[]>
> {
  if (!isSupabaseConfigured()) {
    return {};
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("collection_images")
      .select("*")
      .order("position", { ascending: true })
      .order("created_at", { ascending: true });

    if (error || !data) {
      return {};
    }

    const grouped: Record<string, CollectionImageRecord[]> = {};
    for (const img of data) {
      if (!grouped[img.collection_id]) {
        grouped[img.collection_id] = [];
      }
      grouped[img.collection_id].push(img);
    }

    return grouped;
  } catch {
    return {};
  }
}
