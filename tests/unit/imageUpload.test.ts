import { describe, it, expect } from "vitest";
import {
  validateImageFile,
  detectImageMagicBytes,
  MAX_FILE_SIZE_BYTES,
} from "@/lib/validations/imageUpload";
import { OFFICIAL_CONTACT, buildWhatsAppUrl, buildMailtoUrl } from "@/lib/constants/contact";

describe("Validación de Fotografías e Integridad de Archivos", () => {
  it("detecta correctamente una imagen JPEG válida por magic bytes", () => {
    // Magic bytes JPEG: FF D8 FF E0 ...
    const jpegBuffer = new Uint8Array([
      0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01,
    ]);
    expect(detectImageMagicBytes(jpegBuffer)).toBe("image/jpeg");

    const result = validateImageFile("foto-etiquetas.jpg", 1024, jpegBuffer);
    expect(result.valid).toBe(true);
    expect(result.detectedMimeType).toBe("image/jpeg");
  });

  it("detecta correctamente una imagen PNG válida por magic bytes", () => {
    // Magic bytes PNG: 89 50 4E 47 0D 0A 1A 0A
    const pngBuffer = new Uint8Array([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
    ]);
    expect(detectImageMagicBytes(pngBuffer)).toBe("image/png");

    const result = validateImageFile("producto.png", 2048, pngBuffer);
    expect(result.valid).toBe(true);
    expect(result.detectedMimeType).toBe("image/png");
  });

  it("detecta correctamente una imagen WebP válida por magic bytes", () => {
    // Magic bytes WebP: RIFF .... WEBP
    const webpBuffer = new Uint8Array([
      0x52,
      0x49,
      0x46,
      0x46, // RIFF
      0x20,
      0x00,
      0x00,
      0x00, // length
      0x57,
      0x45,
      0x42,
      0x50, // WEBP
    ]);
    expect(detectImageMagicBytes(webpBuffer)).toBe("image/webp");

    const result = validateImageFile("muestra.webp", 4096, webpBuffer);
    expect(result.valid).toBe(true);
    expect(result.detectedMimeType).toBe("image/webp");
  });

  it("rechaza archivos con extensión .svg aunque el nombre parezca válido", () => {
    const dummyBuffer = new Uint8Array(20);
    const result = validateImageFile("logo.svg", 500, dummyBuffer);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("SVG");
  });

  it("rechaza archivos disfrazados (ej: script o ejecutable renombrado a .jpg)", () => {
    // Archivo con contenido de texto "<script>" renombrado a foto.jpg
    const fakeBuffer = new TextEncoder().encode("<script>alert('hack')</script>   ");
    const result = validateImageFile("foto-maliciosa.jpg", fakeBuffer.length, fakeBuffer);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("no corresponde a una imagen válida");
  });

  it("rechaza archivos que exceden el límite de 5 MB", () => {
    const jpegBuffer = new Uint8Array([
      0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01,
    ]);
    const oversized = MAX_FILE_SIZE_BYTES + 1024;
    const result = validateImageFile("foto-pesada.jpg", oversized, jpegBuffer);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("supera el tamaño máximo");
  });

  it("rechaza archivos vacíos de 0 bytes", () => {
    const emptyBuffer = new Uint8Array(0);
    const result = validateImageFile("vacio.jpg", 0, emptyBuffer);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("vacío");
  });
});

describe("Canales Oficiales de Contacto", () => {
  it("contiene los datos comerciales oficiales exactos", () => {
    expect(OFFICIAL_CONTACT.email).toBe("papeleriaycreacioneseyg@gmail.com");
    expect(OFFICIAL_CONTACT.whatsappNumber).toBe("56948672300");
  });

  it("genera enlaces de WhatsApp con formato internacional wa.me y codificación segura", () => {
    const urlSinMensaje = buildWhatsAppUrl();
    expect(urlSinMensaje).toBe("https://wa.me/56948672300");

    const urlConMensaje = buildWhatsAppUrl("Hola Creaciones E&G, cotización para etiquetas");
    expect(urlConMensaje).toContain("https://wa.me/56948672300?text=");
    expect(urlConMensaje).toContain(
      encodeURIComponent("Hola Creaciones E&G, cotización para etiquetas")
    );
  });

  it("genera enlaces mailto oficiales con parámetros codificados", () => {
    const url = buildMailtoUrl("Cotización Colección 1", "Deseo consultar por 50 unidades");
    expect(url).toContain("mailto:papeleriaycreacioneseyg@gmail.com");
    expect(url).toContain("subject=Cotizaci%C3%B3n%20Colecci%C3%B3n%201");
  });
});
