/**
 * Datos Comerciales y Canales Oficiales de Papelería y Creaciones E&G
 * Utilizados en Catálogo, Cotizador, Navbar, Footer y Notificaciones.
 */

export const OFFICIAL_CONTACT = {
  name: "Papelería y Creaciones E&G",
  email: "papeleriaycreacioneseyg@gmail.com",
  phoneFormatted: "+56 9 4867 2300",
  whatsappNumber: "56948672300",
  whatsappFormatted: "+56948672300",
  instagram: "@papeleriaycreacioneseyg",
  tiktok: "@papeleriaycreacioneseyg",
  location: "Santiago, Chile",
} as const;

/**
 * Genera el enlace internacional oficial de WhatsApp con mensaje codificado
 */
export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${OFFICIAL_CONTACT.whatsappNumber}`;
  if (!message || !message.trim()) {
    return base;
  }
  return `${base}?text=${encodeURIComponent(message.trim())}`;
}

/**
 * Genera el enlace mailto oficial
 */
export function buildMailtoUrl(subject?: string, body?: string): string {
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  const query = params.length > 0 ? `?${params.join("&")}` : "";
  return `mailto:${OFFICIAL_CONTACT.email}${query}`;
}
