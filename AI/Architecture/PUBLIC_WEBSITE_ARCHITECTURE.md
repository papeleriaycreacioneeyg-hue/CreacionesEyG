# Public Website & Conversion Architecture
## Papelería y Creaciones E&G — Estructura de la Web Pública y Optimización de Conversión

---

## 1. Diseño y Estructura de Páginas Públicas

La web pública se concibe como un embudo visual diseñado para guiar al usuario desde el descubrimiento estético hasta la confirmación transaccional:

### A. Home (`/`)
*   **Sección Hero:** Propuesta de valor emocional ("Detalles que Inspiran") acompañada de un botón de acción principal (CTA) hacia el catálogo.
*   **CategoryGrid:** Mosaico visual en tonos pastel que separa de forma clara las líneas de producto (Stickers, Agendas, Regalos, Colegios).
*   **FeaturedProducts:** Grid dinámico que consume productos con el flag `is_featured = true`.
*   **Proceso Ilustrado:** Infografía interactiva paso a paso: `Elige` ➔ `Personaliza` ➔ `Recibe`.

### B. Catálogo (`/catálogo`)
*   **Filtros Asíncronos:** Panel lateral de filtrado por precio, materiales, técnicas y categorías sin refrescar la página.
*   **Buscador Debounced:** Barra de búsqueda predictiva con autocompletado rápido.

### C. Ficha de Detalle de Producto (`/catálogo/[categoria]/[producto]`)
*   **Visualizador y Galería:** Carrusel de imágenes de alta resolución (`product_images`) y mockups con soporte táctil.
*   **Customizer Panel (Si `is_customizable = true`):**
    *   Cargador drag-and-drop para subir logotipos o referencias.
    *   Validador client-side de formato, dimensión y DPIs del archivo del cliente.
    *   Cuadro de texto para notas especiales de impresión.

### D. Formulario de Cotización Especial (`/cotización`)
*   **Formulario Multi-step:** Captura de datos de contacto (WhatsApp obligatorio), volumen aproximado, técnica deseada y subida de archivos de referencia.
*   **Gatillo Supabase:** Inserta una solicitud directa en la tabla `customer_requests` con el origen `Web`.

---

## 2. Optimización para SEO Local y de Nicho

*   **Metadata Dinámica:** Implementada mediante `generateMetadata` de Next.js.
*   **Estructura Schema.org (JSON-LD):**
    *   `Product Schema` en cada ficha de detalle de producto con precio base y calificaciones.
    *   `FAQPage Schema` en la sección de Ayuda para lograr fragmentos enriquecidos en Google.
*   **Canonical Tags:** Inyección automática de `<link rel="canonical" href="..." />` para evitar penalizaciones por contenido duplicado generado por los filtros.

---

## 3. Estrategia de Conversión (CRO)

*   **Puntos de Fricción Minimizados:**
    *   *Checkout sin registro obligatorio:* Permite la compra como invitado (`Guest Checkout`) solicitando únicamente el correo para enviar la confirmación.
    *   *Feedback visual inmediato:* Botón de añadir al carrito animado que cambia temporalmente a un estado de éxito tras el clic (Framer Motion).
*   **Recuperación de Carritos:** Sincronización local en `localStorage` del estado del carrito para restaurar los items y personalizaciones si el cliente recarga la página.
