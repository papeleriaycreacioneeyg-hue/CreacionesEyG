# Security & Authorization Architecture
## Papelería y Creaciones E&G — Directivas de Seguridad y Control de Accesos (SecOps)

---

## 1. Modelo de Identidad y Autenticación (Supabase Auth)

El sistema de seguridad opera bajo el principio de **Mínimo Privilegio (Least Privilege)** y **Seguro por Defecto (Secure by Default)**:

*   **Proveedor de Identidad:** Supabase Auth gestiona los tokens JWT encriptados. Las credenciales de acceso se almacenan de forma segura fuera del esquema público (`auth.users`).
*   **Gestión de Perfiles:** La tabla `public.profiles` está enlazada 1:1 con `auth.users` mediante triggers en PostgreSQL, asignando por defecto el rol de cliente (`customer`).

---

## 2. Row Level Security (RLS) y Políticas PostgreSQL

Todas las tablas en el esquema público de Supabase tienen la directiva `ROW LEVEL SECURITY` activa por defecto. Las consultas entrantes se filtran utilizando políticas declarativas en base al JWT:

*   **Lectura Pública Protegida:** Las tablas de catálogo (`products`, `categories`, `product_variants`) permiten lecturas públicas únicamente si el estado de la fila es `active` o `published`.
*   **Aislamiento de Clientes:** El acceso a tablas privadas (`orders`, `user_designs`, `customer_addresses`) se restringe estrictamente mediante la verificación del ID de sesión (`auth.uid() = customer_id`), impidiendo accesos cruzados ilegítimos.
*   **Bypass Administrativo:** El control absoluto de escritura está restringido a administradores mediante la función de base de datos `public.is_admin()`.

---

## 3. Seguridad de Almacenamiento (Supabase Storage)

*   **Bucket `product-images` (Público):** Lectura permitida para todo el tráfico web. Escritura permitida exclusivamente para el rol `admin` y `designer`.
*   **Bucket `client-designs` (Privado):** Lectura y descarga restringida al usuario propietario del diseño (`auth.uid() == owner_id`) y a los operarios del taller (`admin` o `production` / `designer`).
