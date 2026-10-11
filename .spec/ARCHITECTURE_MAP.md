# Mapa de Arquitectura y Estado de Implementación
## Papelería y Creaciones E&G — Inventario Vivo del Proyecto

* **Ubicación:** `.spec/ARCHITECTURE_MAP.md`
* **Última auditoría directa en código:** 10 de octubre de 2026
* **Propósito:** Registrar el estado fáctico del código fuente, diferenciando con total transparencia lo que está programado y desplegado de aquello que solo existe en documentación conceptual.

---

## 1. Convención de Estados de Implementación

| Estado | Definición |
| :--- | :--- |
| **`IMPLEMENTADO Y EN PRODUCCIÓN`** | Código verificado, compilando, con rutas activas y desplegado en Vercel. |
| **`IMPLEMENTADO PARCIALMENTE`** | Código base existente en el repositorio pero con dependencias mock o funciones pendientes. |
| **`MOCK`** | Interfaz o lógica que utiliza datos simulados locales sin persistencia real en base de datos. |
| **`DOCUMENTADO PERO NO IMPLEMENTADO`** | Diseñado en documentos históricos (`AI/` o `docs/`) sin código correspondiente en el repositorio. |
| **`PENDIENTE`** | Funcionalidad identificada en el roadmap que aún no ha iniciado su ciclo SDD. |
| **`SCAFFOLDING PENDIENTE`** | Estructura de carpetas creada con archivos marcadores (`.gitkeep`) sin lógica implementada. |

---

## 2. Inventario Detallado por Módulos del Sistema

### 2.1. Home y Landing Page (`/`)
* **Estado:** **`IMPLEMENTADO Y EN PRODUCCIÓN`**
* **Evidencia en código verificada:**
  - Archivo de ruta: `app/page.tsx`.
  - Componentes activos en `components/home/`: `HeroSection.tsx` (con banner publicitario cinematográfico y Framer Motion), `CategoriesSection.tsx`, `ValueSection.tsx`, `ProductsSection.tsx`, `GallerySection.tsx`, `AboutSection.tsx`, `CTASection.tsx`.
  - Layout y navegación: `components/layout/Navbar.tsx` y `Footer.tsx`.
  - Despliegue en producción: Operativo y verificado en `https://creaciones-ey-g-lx4k.vercel.app/` (HTTP 200 OK).

### 2.2. Catálogo de Productos (`/productos`)
* **Estado:** **`IMPLEMENTADO PARCIALMENTE`** / **`MOCK`**
* **Evidencia en código verificada:**
  - Archivo de ruta: `app/productos/page.tsx`.
  - Fuente de datos actual: Lee de `lib/mock/products.ts` (listado estático de 4 productos: Planner Diario, Stickers Troquelados DTF UV, Tazón Cerámico, Agenda Escolar).
  - Brecha respecto a la arquitectura: La tabla `products` y `categories` ya existen en la base de datos de Supabase, pero la página del catálogo aún no realiza queries al cliente de Supabase.
  - Documentación histórica asociada: `AI/Architecture/PRODUCT_CATALOG_ARCHITECTURE.md`, `EPIC_REGISTRY.md` (EP-04).

### 2.3. Cotizaciones Personalizadas (`/cotizar`)
* **Estado:** **`IMPLEMENTADO Y EN PRODUCCIÓN`**
* **Evidencia en código verificada:**
  - Archivo de ruta: `app/cotizar/page.tsx`.
  - Componente: `components/quotes/QuoteForm.tsx`.
  - Server Action: `app/actions/quotes.ts` (`submitRequest`), que valida la sesión del usuario e inserta el registro en la tabla `customer_requests` de Supabase con canal `Web` y estado `pending`.
  - Revalidación: Invoca `revalidatePath("/mi-cuenta")`.

### 2.4. Autenticación y Portal de Cliente (`/login`, `/registro`, `/mi-cuenta`)
* **Estado:** **`IMPLEMENTADO Y EN PRODUCCIÓN`**
* **Evidencia en código verificada:**
  - Archivos de rutas: `app/login/page.tsx`, `app/registro/page.tsx`, `app/mi-cuenta/page.tsx`.
  - Componentes: `components/auth/LoginForm.tsx`, `RegisterForm.tsx`, `LogoutButton.tsx`.
  - Server Actions: `app/actions/auth.ts` con métodos `signIn` y `signUp` integrados con Supabase Auth.
  - Gestión de sesión: `lib/supabase/middleware.ts` y cliente SSR en `lib/supabase/server.ts`.

### 2.5. Arquitectura Modular de Features (`features/`)
* **Estado:** **`SCAFFOLDING PENDIENTE`**
* **Evidencia en código verificada:**
  - Los directorios `features/catalog/`, `features/checkout/` y `features/customization/` contienen únicamente archivos `.gitkeep`.
  - Toda la lógica actual reside en `components/`, `lib/` y `app/actions/`.
  - Documentación histórica asociada: `AI/Architecture/FRONTEND_ARCHITECTURE.md` proponía este patrón, pero aún no ha sido poblado con código real.

### 2.6. Base de Datos y Persistencia (Supabase PostgreSQL)
* **Estado:** **`IMPLEMENTADO Y EN PRODUCCIÓN`** (Migraciones verificadas)
* **Evidencia en código verificada:**
  - 6 migraciones SQL en `supabase/migrations/`:
    1. `20260718000000_core_system_foundation.sql`: Tablas de usuarios y auditoría base.
    2. `20260718000100_product_catalog_engine.sql`: Tablas de categorías, productos, variantes y atributos.
    3. `20260718000200_customer_quotation_engine.sql`: Tablas de `customer_requests`, cotizaciones y líneas.
    4. `20260718000300_order_production_engine.sql`: Tablas de órdenes y estados de taller.
    5. `20260718000400_auth_extensions.sql`: Triggers de sincronización con `auth.users`.
    6. `20260718000500_customer_quotation_fixes.sql`: Correcciones en índices y relaciones.
  - Verificación de conexión: Endpoint de diagnóstico en `app/test-supabase/page.tsx` consulta la tabla `profiles`.

### 2.7. Carrito de Compras, Checkout y Pagos
* **Estado:** **`DOCUMENTADO PERO NO IMPLEMENTADO`** / **`PENDIENTE`**
* **Evidencia en código verificada:**
  - No existen rutas `/carrito` ni `/checkout`.
  - No existe integración de pasarelas de pago chilenas (Webpay Plus, MercadoPago, Transbank).
  - No existen tablas de transacciones bancarias en frontend ni Server Actions de checkout.
  - Documentación histórica asociada: Diseñado en `AI/Product_Management/EPIC_REGISTRY.md` (EP-05) y `AI/Architecture/ORDER_PRODUCTION_ARCHITECTURE.md`.

### 2.8. Personalizador Visual y Validación de Archivos
* **Estado:** **`DOCUMENTADO PERO NO IMPLEMENTADO`** / **`PENDIENTE`**
* **Evidencia en código verificada:**
  - No existen validadores de DPI en cliente ni canvas de personalización interactiva.
  - No existe el procesador de archivos Excel (.xlsx) para nóminas de graduaciones o colegios.
  - Documentación histórica asociada: Diseñado conceptualmente en `EPIC_REGISTRY.md` (EP-06) para el arquetipo María Teresa.

### 2.9. Infraestructura de Pruebas (Testing)
* **Estado:** **`IMPLEMENTADO PARCIALMENTE`** (Cobertura mínima)
* **Evidencia en código verificada:**
  - **Vitest:** Configurado y operativo (`vitest.config.ts`, `tests/setup.ts`). Cuenta con 1 test de sanidad en `tests/unit/example.test.ts` (100% pasando).
  - **Playwright:** Configurado en `playwright.config.ts` apuntando a `./tests/e2e`. Sin embargo, el directorio `tests/e2e/` **no existe físicamente en el repositorio**, por lo que no hay suite de pruebas funcionales de extremo a extremo activas.

### 2.10. Infraestructura, Despliegue y Plataforma Cloud
* **Estado:** **`IMPLEMENTADO Y EN PRODUCCIÓN`**
* **Evidencia en código verificada:**
  - Framework: Next.js `15.5.20`, React `19.1.0`.
  - Estilos: Tailwind CSS `v4` (`@tailwindcss/postcss`).
  - Git Local: Git Portable en `c:\CreacionesEyG\git\cmd\git.exe` con `wincred`.
  - Control de Versiones: Repositorio GitHub `https://github.com/papeleriaycreacioneeyg-hue/CreacionesEyG` (rama `main`).
  - Despliegue CI/CD: Vercel Project con builds automatizados tras cada push a `main`.

---

## 3. Guía de Consulta para Futuras Especificaciones SDD

Al redactar cualquier nueva `SPEC` en `.spec/changes/active/`:
1. Consultar este mapa para verificar si el módulo objetivo ya tiene código real o si requiere construir cimientos.
2. Si se va a intervenir el Catálogo (`/productos`), la tarea prioritaria es conectar el código a las tablas existentes en Supabase y retirar la dependencia de `lib/mock/products.ts`.
3. Si se va a intervenir Pruebas, considerar crear la carpeta `tests/e2e/` y los primeros tests de navegación con Playwright.
4. Mantener este documento actualizado cada vez que una especificación sea completada y archivada.
