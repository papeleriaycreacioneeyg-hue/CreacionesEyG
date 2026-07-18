# Performance & Optimization Architecture
## Papelería y Creaciones E&G — Directivas de Optimización y Core Web Vitals

---

## 1. Optimización del Frontend (Core Web Vitals)

Para garantizar un tiempo de interacción (TTI) inferior a 1.5 segundos en dispositivos móviles:

*   **Next.js Image Component (`next/image`):** Todas las imágenes del catálogo consumidas desde Supabase Storage se procesan a través de la API de optimización de imágenes de Next.js, convirtiendo los archivos a WebP/AVIF y requiriendo los parámetros obligatorios `width` y `height` para evitar saltos acumulativos de diseño (CLS).
*   **Segmentación de Código (Code Splitting):** Componentes interactivos complejos del configurador interactivo (Canvas, visualizadores 2D/3D) se cargan utilizando la directiva `next/dynamic` de forma asíncrona, de modo que el peso de ese Javascript solo se descargue cuando el usuario ingrese a la pantalla de personalización.
*   **Fuentes del Sistema:** Las fuentes tipográficas se autocontienen localmente en la compilación utilizando `next/font/google`, eliminando las consultas externas de red de Google Fonts en el cliente.

---

## 2. Optimización de Base de Datos (PostgreSQL)

*   **Estrategia de Indexado:**
    *   **B-Tree Indexes:** Aplicados sobre columnas clave utilizadas en filtros de búsqueda, joins y ordenamiento (`products.sku`, `products.slug`, `orders.customer_id`, `orders.status`).
    *   **GIN Indexes:** Aplicados sobre las columnas `variant_attributes` de la tabla `product_variants` para acelerar las consultas complejas de filtros combinables dinámicos (color, talla, material) almacenados en JSONB.
*   **Connection Pooling:** Vercel se comunica con Supabase a través de Supabase Connection Pooler (puerto `6543`) para reciclar conexiones de base de datos activas y evitar caídas en picos de tráfico estacionales.
