# SEO, Marketing & Growth Engine Architecture
## Papelería y Creaciones E&G — Plataforma de Adquisición Orgánica y Analytics

---

## 1. Planos de SEO Técnico y Local

La adquisición del proyecto se basa principalmente en la optimización orgánica (SEO) para capturar la demanda local y las búsquedas específicas de productos de papelería B2B/B2C en Chile:

### SEO Técnico Core:
*   **Next.js Metadata API:** Se inyectan de forma dinámica en Server Components utilizando la función `generateMetadata` de Next.js, leyendo las variables de SEO configuradas en cada producto o post de blog.
*   **Optimización de Core Web Vitals:** Prerenderizado estático (SSG) de landings críticas, carga de imágenes de catálogo optimizadas en formato WebP con dimensiones predefinidas para prevenir saltos de maquetación (CLS), y fuentes integradas localmente para evitar solicitudes de DNS de Google Fonts de terceros.

### SEO Local (Landings Georeferenciadas):
*   **Estrategia de Búsqueda Local:** Generación de páginas con URLs orientadas a comunas chilenas (ej. `/servicios/stickers-personalizados-las-condes`, `/servicios/agendas-corporativas-providencia`).
*   **Google Business Profile Integration:** Estructuración de Schema.org LocalBusiness en la página de inicio vinculando las coordenadas geográficas de la sucursal física, horarios y reseñas de Google Maps.

---

## 2. Content Engine (Blog y Landing B2B)

El motor de contenido actúa como el atractor orgánico en la parte alta del embudo (TOFU):
*   **Blog Corporativo:** Publicaciones organizadas por categorías (Bullet Journaling, Ideas de Regalo, Insumos Pyme) consumidas directamente desde el Content CMS de la base de datos de Supabase.
*   **Product SEO Framework:** Cada producto de catálogo incluye una pestaña opcional de Preguntas Frecuentes (FAQ) indexables mediante schemas JSON-LD.

---

## 3. Propuesta de Entidades de Base de Datos para Crecimiento

Para dar soporte al blog y el registro de analíticas sin recurrir a scripts pesados de terceros, se proponen las siguientes estructuras de datos conceptuales:

```text
Entidades Conceptuales de Growth & Marketing:

seo_pages (Metadata Personalizada de Páginas Especiales)
├── id: UUID (PK)
├── route_path: String (Unique, ej: "/nosotros")
├── meta_title: String
├── meta_description: String
└── open_graph_image: String

blog_posts (Artículos de Contenido)
├── id: UUID (PK)
├── title: String
├── slug: String (Unique)
├── content_body: Text (Markdown)
├── category_id: UUID (FK ➔ blog_categories.id)
├── status: String (draft, published)
└── published_at: Timestamp

leads (Registro de Prospectos Capturados)
├── id: UUID (PK)
├── email: String
├── source_landing: String
└── is_subscribed_to_newsletter: Boolean (Default: true)

analytics_events (Registro de Eventos y Conversión)
├── id: UUID (PK)
├── session_id: UUID
├── event_name: String (ej: "ADD_TO_CART", "CHECKOUT_COMPLETED")
├── event_metadata: jsonb
└── created_at: Timestamp
```

---

## 4. Límites de Seguridad e Integridad

*   **Datos Públicos vs. Privados:**
    *   La tabla `seo_pages`, `blog_posts` y sus relaciones tienen políticas RLS públicas de lectura (`USING (true)`).
    *   Las tablas `leads` y `analytics_events` están bloqueadas para lecturas públicas. Solo el rol `admin` tiene accesos para análisis de retención.
