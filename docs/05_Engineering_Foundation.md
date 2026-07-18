# Engineering Foundation & Developer Guide
## Papelería y Creaciones E&G — Sprint 0 Technical Base

---

## 1. Stack Tecnológico Final (Confirmado)

*   **Runtime:** Node.js v24.18.0 (LTS) & NPM v11.16.0.
*   **Frontend Core:** Next.js 15 (App Router, dynamic bundling) & React 19.
*   **Styling Engine:** Tailwind CSS v4 & PostCSS v4 (Fastest runtime compilation).
*   **Base de Datos y Auth:** Supabase Client (PostgreSQL, Row Level Security, Storage, Session cookies).
*   **Linter & Formatter:** ESLint Flat Config (`eslint.config.mjs`) & Prettier (`.prettierrc`).
*   **Unit & Component Testing:** Vitest, `@testing-library/react` con entorno JSDOM y `@vitejs/plugin-react`.
*   **End-to-End Testing:** Playwright Multi-browser (`chromium`, `firefox`, `webkit`).

---

## 2. Estructura de Directorios del Repositorio

La arquitectura del repositorio sigue la distribución modular y limpia de Next.js moderna:

```text
/
├── app/                      # Rutas y páginas públicas/privadas del App Router
│   ├── layout.tsx            # Layout principal del sitio
│   ├── page.tsx              # Página Home pública
│   ├── robots.ts             # Generación dinámica de robots.txt (Exclusiones de admin/checkout)
│   ├── sitemap.ts            # Generación dinámica de sitemap.xml
│   └── manifest.ts           # Configuración del PWA web manifest
├── components/               # Componentes transversales reutilizables
│   ├── layout/               # Header, Footer, Sidebar, Menús
│   └── ui/                   # Componentes atómicos (Blueprints para shadcn/ui)
├── features/                 # Módulos aislados agrupados por lógica de negocio
│   ├── catalog/              # Lógica de visualización y filtrado de productos
│   ├── checkout/             # Lógica de procesamiento de orden y cobro
│   └── customization/        # Lógica del canvas interactivo de personalización
├── lib/                      # Librerías y adaptadores de infraestructura
│   ├── supabase/             # Conectores y middleware de Supabase (client, server, middleware)
│   └── utils.ts              # Utilidad cn() para clases condicionales
├── tests/                    # Suites de testing y configuración
│   ├── e2e/                  # Pruebas de integración E2E de Playwright
│   ├── unit/                 # Pruebas unitarias y aserciones de lógica
│   └── setup.ts              # Configuraciones y mocks para Vitest
├── docs/                     # Documentación técnica, Bible y Modelos del Negocio
└── AI/                       # Cerebro y reglas permanentes de interacción con IA
```

---

## 3. Decisiones de Arquitectura (ADR Summary)

*   **Supabase SSR Cookies (`@supabase/ssr`):** Se implementó la gestión de tokens en cookies seguras de servidor para permitir que los Server Components lean y validen la sesión de usuario de forma directa en el prerenderizado, eliminando destellos visuals (flashing) en rutas protegidas.
*   **Exclusión de Tests en Compilación:** Se configuró `tsconfig.json` para excluir el directorio `/tests` y archivos `vitest.config.ts`, `playwright.config.ts` del compilador de producción `next build`, manteniendo el bundle size limpio de dependencias de testing.
*   **Prettier integrado en ESLint:** Se configuró ESLint para reportar errores de formateo como fallos de build directos. Esto garantiza que ningún archivo con espaciados incorrectos sea empujado al repositorio.

---

## 4. Estándares de Código y Convenciones

### Nombres y Estilo
*   **Componentes de React:** PascalCase (ej: `ProductGrid.tsx`, `CartButton.tsx`).
*   **Hooks de React:** camelCase precedido de `use` (ej: `useCart.ts`, `useProductFilter.ts`).
*   **Lógica de negocio / Utilidades:** camelCase (ej: `formatCurrency.ts`, `validateResolution.ts`).

### Directivas Next.js
*   Por defecto, todo componente es un **Server Component** para favorecer el tiempo de carga y el SEO.
*   Se añade la directiva `'use client'` únicamente cuando el componente requiera interactividad inmediata (eventos click, hooks de React como `useState`, `useEffect`, o animaciones directas).

---

## 5. Guía de Inicio para Desarrolladores (Developer Guide)

### Preparación del Entorno
1. Clonar el repositorio.
2. Copiar el archivo `.env.example` a `.env.local` e ingresar las llaves de Supabase correspondientes.
3. Instalar dependencias mediante:
   ```bash
   npm install
   ```

### Comandos de Terminal Disponibles
*   **Desarrollo Local:** `npm run dev` (Inicia el servidor Next.js).
*   **Compilar Producción:** `npm run build` (Realiza typechecking, linting y optimización de estáticos).
*   **Correr Tests Unitarios:** `npm run test` (Vitest ejecuta aserciones).
*   **Formatear Archivos:** `npm run format` (Alinea el estilo a las reglas de Prettier).
*   **Typechecking Manual:** `npm run typecheck` (Ejecuta el compilador de TS sin emitir archivos).
