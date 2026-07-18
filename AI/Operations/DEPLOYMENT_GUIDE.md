# Deployment & CI/CD Operations Guide
## Papelería y Creaciones E&G — Guía de Despliegue en Vercel y Supabase

---

## 1. Pipeline de Despliegue de Código (Vercel Integration)

La infraestructura de producción está integrada directamente con el repositorio oficial en GitHub:

```text
[Push local to 'develop'] ➔ [Vercel Staging Deploy (Preview)] ➔ [PR Approved] ➔ [Merge to 'main'] ➔ [Vercel Production Deploy]
```

### Configuración del Despliegue
*   **Vercel Build Command:** `npm run build`
*   **Vercel Output Directory:** `.next`
*   **Vercel Install Command:** `npm install`

---

## 2. Gestión de Variables de Entorno

Toda clave de API o URL de servicio debe estar configurada en el panel de Vercel encriptada según el entorno (`Development`, `Preview`, `Production`):

*   `NEXT_PUBLIC_SUPABASE_URL`: Endpoint de acceso API a Supabase.
*   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Clave pública de Supabase segura para el navegador.
*   `SUPABASE_SERVICE_ROLE_KEY`: Clave de bypass RLS restringida estrictamente a ejecuciones de servidor en Vercel.
*   `NEXT_PUBLIC_SITE_URL`: Utilizado para construir canonical URLs y redireccionamientos OAuth.

---

## 3. Proceso de Despliegue de Producción (Checklist)

Antes de realizar un lanzamiento a producción:

1.  **Ejecutar Typechecking Local:** Correr `npm run typecheck` y resolver cualquier error de compilación.
2.  **Correr Test Suites:** Correr `npm run test` y comprobar que el 100% de los unit tests pasan de forma satisfactoria.
3.  **Aplicar Migraciones SQL:** Validar que los scripts SQL estén en la carpeta `supabase/migrations/` para su sincronización.
