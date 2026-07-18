# User Management & Authorization Architecture
## Papelería y Creaciones E&G — Fase 5: Estructura de Roles, Permisos y Auditoría de Actividad

---

## 1. Esquema de Roles y Permisos en Base de Datos

Se implementó el soporte relacional para control de accesos por roles (RBAC) mediante las siguientes entidades en PostgreSQL:

*   **`permissions`:** Tabla maestra que registra los permisos operacionales (ej: `"taller:escribir"`, `"catalogo:crear"`).
*   **`role_permissions`:** Tabla pivote que mapea qué permisos corresponden a qué roles del enum `user_role_type` (`admin`, `designer`, `production`, `sales`, `customer`).

---

## 2. Auditoría Operativa (`user_activity_logs`)

Toda acción crítica o de control de sesiones se audita de forma persistente en la tabla `user_activity_logs`:

*   **Tipos de Eventos:** `login`, `logout` y `critical_action`.
*   **Información Capturada:** Dirección IP, User-Agent de navegador y metadatos complementarios en formato JSONB.
*   **Seguridad:** Las políticas RLS restringen la lectura de estos logs únicamente al propio usuario creador del evento y a los administradores globales del sistema.
