# Supabase Backend Implementation Guide
## Papelería y Creaciones E&G — Fase 1: Core System Foundation

---

## 1. Migración `001_core_system_foundation` (SQL)

La migración inicial se registró en [supabase/migrations/20260718000000_core_system_foundation.sql](file:///c:/CreacionesEyG/supabase/migrations/20260718000000_core_system_foundation.sql) y establece las bases de datos de perfiles y seguridad:

*   **Tipo Enumerado `user_role_type`:** Define estáticamente los roles permitidos en la base de datos: `admin`, `designer`, `production`, `sales` y `customer`.
*   **Tabla `public.profiles`:** Almacena los perfiles públicos vinculados directamente a `auth.users` mediante UUID. Posee un trigger automático de actualización de fecha en `updated_at`.
*   **Sincronización Automática:** El trigger `on_auth_user_created` intercepta los registros de nuevos usuarios e inserta de forma inmediata su perfil en `profiles` con valores por defecto de rol cliente (`customer`).

---

## 2. Modelo de Seguridad y Row Level Security (RLS)

*   **Políticas de Perfil:**
    *   `Users can view their own profile`: Permite a cualquier cliente consultar exclusivamente su información personal en base a su JWT de sesión (`auth.uid() = id`).
    *   `Users can update their own profile`: Permite editar campos personales (ej. teléfono o nombre) únicamente para su propio ID.
    *   `Admins can manage all profiles`: Otorga permisos globales de lectura, creación, actualización y eliminación al rol `admin`.
*   **Políticas de Auditoría:**
    *   La lectura de `audit_logs` está estrictamente limitada a administradores mediante la función de base de datos de seguridad definidora (`SECURITY DEFINER`) llamada `public.is_admin()`.

---

## 3. Decisiones Técnicas Destacadas (ADRs)

*   **Función `public.is_admin()` con Security Definer:** Se utiliza `SECURITY DEFINER` para permitir que el motor de base de datos verifique de forma segura el rol del usuario en la tabla de perfiles, incluso si las políticas RLS sobre la tabla misma impiden que la consulta sea leída directamente por clientes no autorizados.
*   **Cascada de Eliminación (`ON DELETE CASCADE`):** Si una cuenta es eliminada directamente de Supabase Auth (`auth.users`), PostgreSQL elimina automáticamente el perfil asociado en `public.profiles`, evitando dejar registros huérfanos.
