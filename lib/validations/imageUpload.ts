import { z } from "zod";

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
export const MAX_IMAGES_PER_COLLECTION = 10;
export const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

export type AllowedMimeType = (typeof ALLOWED_MIME_TYPES)[number];

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  detectedMimeType?: AllowedMimeType;
}

/**
 * Detecta el tipo MIME real inspeccionando los Magic Bytes (primeros bytes del buffer).
 * Previene ataques de extensión falsa (ej: SVG o .exe renombrado a .jpg).
 */
export function detectImageMagicBytes(buffer: Uint8Array): AllowedMimeType | null {
  if (buffer.length < 12) {
    return null;
  }

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return "image/png";
  }

  // WebP: RIFF (bytes 0-3) + WEBP (bytes 8-11)
  // 'R'=0x52, 'I'=0x49, 'F'=0x46, 'F'=0x46
  // 'W'=0x57, 'E'=0x45, 'B'=0x42, 'P'=0x50
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return "image/webp";
  }

  return null;
}

/**
 * Valida un archivo antes de permitir su carga al servidor o Supabase Storage.
 */
export function validateImageFile(
  fileName: string,
  fileSize: number,
  buffer: Uint8Array
): FileValidationResult {
  // 1. Validar tamaño
  if (fileSize <= 0) {
    return { valid: false, error: "El archivo está vacío (0 bytes)." };
  }

  if (fileSize > MAX_FILE_SIZE_BYTES) {
    const sizeMb = (fileSize / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `El archivo supera el tamaño máximo permitido de 5 MB (tamaño actual: ${sizeMb} MB).`,
    };
  }

  // 2. Normalizar nombre y verificar extensiones prohibidas
  const lowerName = fileName.toLowerCase();
  if (
    lowerName.endsWith(".svg") ||
    lowerName.endsWith(".html") ||
    lowerName.endsWith(".exe") ||
    lowerName.endsWith(".sh")
  ) {
    return {
      valid: false,
      error: "Archivos vectoriales SVG y ejecutables no están permitidos como fotografías.",
    };
  }

  // 3. Validar extensiones válidas de fotografía
  const validExtensions = [".jpg", ".jpeg", ".png", ".webp"];
  const hasValidExt = validExtensions.some((ext) => lowerName.endsWith(ext));

  if (!hasValidExt) {
    return {
      valid: false,
      error: "Formato no permitido. Solo se aceptan fotografías JPG, PNG o WebP.",
    };
  }

  // 4. Validar Magic Bytes
  const detectedType = detectImageMagicBytes(buffer);
  if (!detectedType) {
    return {
      valid: false,
      error:
        "El contenido del archivo no corresponde a una imagen válida o está dañado. Se rechazó por seguridad.",
    };
  }

  return {
    valid: true,
    detectedMimeType: detectedType,
  };
}

/**
 * Esquema Zod para metadatos de subida
 */
export const uploadImageMetadataSchema = z.object({
  collectionId: z.string().min(1, "Identificador de colección requerido"),
  collectionSlug: z.string().min(1, "Slug de colección requerido"),
  position: z.number().int().min(0).max(9).default(0),
});
