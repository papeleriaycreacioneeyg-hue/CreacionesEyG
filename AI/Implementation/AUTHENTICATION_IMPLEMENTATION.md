# Authentication Implementation Details
## Papelería y Creaciones E&G — Fase 5: Autenticación Segura y Flujos del Servidor

---

## 1. Servidor de Autenticación (Supabase Auth)
El registro de sesiones y flujos se implementa del lado del servidor utilizando **Next.js Server Actions** (`app/actions/auth.ts`):

*   **Registro (`signup`):** Crea la cuenta en `auth.users` propagando de forma segura los metadatos iniciales (`first_name`, `last_name`, `phone`), gatillando la creación automática del perfil en `public.profiles`.
*   **Inicio de Sesión (`login`):** Valida las credenciales encriptadas y, tras la confirmación, inserta un evento de tipo `'login'` en la tabla `user_activity_logs`.
*   **Cierre de Sesión (`logout`):** Destruye las cookies locales y registra la desconexión del cliente en los logs.

---

## 2. Formularios e Interfaz de Autenticación (Auth UI)
*   [LoginForm.tsx](file:///c:/CreacionesEyG/components/auth/LoginForm.tsx): Captura de credenciales con estados de carga interactivos y manejo de errores dinámicos.
*   [RegisterForm.tsx](file:///c:/CreacionesEyG/components/auth/RegisterForm.tsx): Captura extendida de datos de contacto (Celular, Nombre, Apellido) requeridos por el taller para despachos de encomiendas.
