# Frontend Architecture & App Router Setup
## Papelería y Creaciones E&G — Plano Frontend e Integración con Supabase

---

## 1. Estructura de Carpetas del App Router (Jerarquía de Rutas)

El App Router de Next.js se organiza separando los layouts generales, la zona pública del e-commerce y las zonas privadas autenticadas:

```text
app/
├── (public)/                 # Grupo de rutas públicas sin restricción
│   ├── layout.tsx            # Header y Footer públicos
│   ├── page.tsx              # Home Page
│   ├── catálogo/             # Grid y filtros de catálogo
│   │   ├── page.tsx
│   │   └── [categoria]/
│   │       └── [producto]/   # Detalle de producto y configurador
│   │           └── page.tsx
│   ├── nosotros/             # Página estática informativa
│   ├── ayuda/                # Preguntas Frecuentes
│   └── contacto/             # Formulario de contacto
├── (auth)/                   # Grupo de autenticación
│   ├── login/
│   └── registro/
├── (customer)/               # Rutas de autogestión de cliente (Protegidas por Middleware)
│   ├── layout.tsx            # Sidebar de navegación del cliente
│   └── mi-cuenta/
│       ├── page.tsx          # Resumen del perfil
│       ├── pedidos/          # Historial de pedidos
│       └── disenos/          # Bóveda de archivos vectoriales
└── (admin)/                  # Rutas del Panel Administrativo (Protegidas por RLS/Middleware)
    ├── layout.tsx            # Sidebar y barra superior administrativa
    └── admin/
        ├── page.tsx          # Resumen de KPIs
        ├── taller/           # Kanban operativo del taller
        ├── catálogo/         # CRUD de productos e inventarios
        └── clientes/         # Tabla de clientes
```

---

## 2. Estrategia de Gestión de Estado y Renderizado (Rendering Strategy)

*   **React Server Components (RSC) por Defecto:** Las fichas de producto (`/catálogo/[categoria]/[producto]`) y páginas informativas cargan de manera estática mediante RSC para agilizar el SEO y velocidad inicial.
*   **Parámetros de URL para Filtros (URL State):** El estado de los filtros del catálogo (categorías, precio, técnicas) se guarda en los query parameters de la URL (`?categoria=stickers&precio=15000`). Esto permite compartir búsquedas y conservar el SEO nativo.
*   **Formularios y Validaciones Client-Side:** Se integran **React Hook Form** y **Zod** para procesar los datos ingresados en el Checkout y la subida de archivos de personalización, asegurando la consistencia antes de enviar la solicitud al servidor.

---

## 3. Seguridad y Control de Rutas

*   **Middleware Route Protection:** El archivo `middleware.ts` en la raíz intercepta las solicitudes entrantes y comprueba la sesión activa de Supabase:
    *   Si se intenta acceder a `/mi-cuenta/*` sin sesión activa, se redirige a `/login`.
    *   Si se intenta acceder a `/admin/*`, el middleware valida la sesión y una Server Action adicional comprueba si el rol del perfil corresponde a `admin`, `designer` o `production`, retornando un error `403 Forbidden` en caso contrario.
*   **Sanitización y Carga de Archivos:** Las imágenes y archivos cargados se sanitizan eliminando caracteres especiales de los nombres de archivo y restringiendo los mime-types permitidos en el cliente antes del envío al Supabase Storage Bucket.
