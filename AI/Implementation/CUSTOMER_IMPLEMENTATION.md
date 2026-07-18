# Customer Module Implementation Details
## Papelería y Creaciones E&G — Fase 6: Estructura de Clientes y Bóveda Cloud

---

## 1. Perfil del Cliente (`customers`)
El subdominio de Clientes amplía la identidad básica del usuario con atributos comerciales y de contacto:
*   **Campos Clave:** `company_name`, `rut` (Facturación y compras B2B), `whatsapp` y `customer_type` (`B2C`, `B2B`, `Institution`).
*   **Libreta de Direcciones (`customer_addresses`):** Permite registrar y marcar una dirección de despacho predeterminada (`is_default`) por cliente.

---

## 2. Bóveda Cloud de Archivos (`customer_files`)
*   **Storage Bucket `customer-files`:** Bucket privado de Supabase para almacenar logotipos, imágenes de referencia y archivos adjuntos de Excel.
*   **Seguridad:** Las políticas RLS restringen la lectura de archivos únicamente a los propietarios del diseño (`auth.uid() == customer_id`) y a los administradores y operarios del taller.
