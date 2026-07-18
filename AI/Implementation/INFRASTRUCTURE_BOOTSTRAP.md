# Infrastructure Bootstrap & Cloud Operations Report
## Papelería y Creaciones E&G — Fase de Cimientos y Conectividad Cloud (Sprint 16.5)

---

## 1. Repositorio de Código (GitHub Integration)
El código de la aplicación se aloja en el repositorio oficial de GitHub:
*   **Repositorio:** `https://github.com/papeleriaycreacioneeyg-hue/CreacionesEyG`
*   **Rama Principal:** `main`
*   **Gestión de Commits:** Implementado bajo la directiva estricta de Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).

---

## 2. Aplicación Next.js 15 & Tailwind CSS
La estructura base de la aplicación se inicializó en el directorio raíz con las siguientes tecnologías clave:
*   **Next.js:** Versión 15.5.20 con App Router y renderizado de componentes por el servidor (RSC) por defecto.
*   **TypeScript:** Configurado en modo estricto en [tsconfig.json](file:///c:/CreacionesEyG/tsconfig.json) para asegurar la tipificación de interfaces de pedidos, catálogo y usuarios.
*   **Tailwind CSS:** Integrado para la maquetación y estilización responsive rápida.

---

## 3. Adaptador de Supabase (Client/Server Layer)
Se crearon tres adaptadores para la manipulación y refresco de tokens JWT seguros del lado del cliente y servidor:
*   [lib/supabase/client.ts](file:///c:/CreacionesEyG/lib/supabase/client.ts): Instancia ligera de cliente para interacciones reactivas de navegador.
*   [lib/supabase/server.ts](file:///c:/CreacionesEyG/lib/supabase/server.ts): Instancia de servidor asíncrona para consultar perfiles y órdenes desde Server Components.
*   [lib/supabase/middleware.ts](file:///c:/CreacionesEyG/lib/supabase/middleware.ts): Middleware de refresco de expiración de sesión basado en cookies HTTP.

---

## 4. Variables de Entorno y Despliegue en Vercel
Para asegurar la confidencialidad de credenciales en producción:
*   **Plantilla Local:** Archivo base [.env.example](file:///c:/CreacionesEyG/.env.example) para que el equipo de desarrollo cree su configuración local.
*   **Variables de Producción (Vercel):** Configuración encriptada en el panel de Vercel para `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
*   **Pipeline de CI/CD:** Vercel escucha cambios en la rama `main` y compila automáticamente una versión de producción optimizada tras ejecutar pruebas de calidad (`npm run build`).
