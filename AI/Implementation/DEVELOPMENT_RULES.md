# Development Rules & Coding Conventions
## Papelería y Creaciones E&G — Guía de Convenciones del Equipo de Desarrollo

---

## 1. Convenciones de Nomenclatura

*   **Rutas de Carpeta:** Minúsculas y separadas por guiones en caso de rutas compuestas (ej: `app/mi-cuenta/pedidos/`).
*   **Componentes de React:** PascalCase (ej: `Navbar.tsx`, `Sidebar.tsx`).
*   **Hooks de React:** camelCase precedidos por `use` (ej: `useCart.ts`).

---

## 2. Flujo Git y Commits (Conventional Commits)

Los mensajes de confirmación se estructuran de forma mandatoria: `<tipo>(<ambito>): <descripcion>`
*   `feat`: Agregar nueva funcionalidad.
*   `fix`: Corregir bug técnico.
*   `docs`: Cambios de documentación.
*   `style`: Ajustes estéticos o espaciados.

---

## 3. Principios de Código Limpio (Clean Code)

*   **TypeScript Estricto:** Prohibido el uso del tipo `any`. Si la respuesta de la base de datos es dinámica, se declaran interfaces o tipos estructurados precisos.
*   **Componentes Puros:** Toda la lógica de fetching compleja, manipulación de estados y cálculos matemáticos debe ser extraída hacia Hooks dedicados, dejando los componentes como plantillas de visualización puras.
*   **Seguridad de Claves:** Ninguna credencial privada (ej: `SUPABASE_SERVICE_ROLE_KEY`) se cargará en componentes del navegador o repositorios de GitHub.
