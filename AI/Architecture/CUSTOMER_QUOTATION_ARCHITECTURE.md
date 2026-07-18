# Customer & Quotation Engine Architecture
## Papelería y Creaciones E&G — Fase 3: Motor de Clientes y Gestión de Cotizaciones

---

## 1. Modelo de Entidades y Relaciones

El subdominio de Clientes y Cotizaciones actúa como el CRM interno del activo digital, enlazando las cuentas de usuario con el historial comercial y solicitudes consultivas:

*   **`customers`:** Almacena información comercial detallada de la Pyme o Institución (ej: RUT, Razón social) asociada a su perfil base en `profiles`.
*   **`customer_addresses`:** Libreta de direcciones para envíos de muestras, despacho de pedidos y facturación física.
*   **`customer_files`:** Bóveda de almacenamiento de logotipos vectoriales, bosquejos de diseño y referencias aportadas por el cliente.
*   **`customer_requests`:** Registro estructurado de la intención de compra inicial proveniente de canales omnicanal (WhatsApp, Instagram, Web).
*   **`quotes` & `quote_items`:** Documentos de cotización formalizadores con vigencia temporal y desglose de variantes y personalizaciones requeridas.

---

## 2. Flujos Comerciales y Transición de Estados

### Flujo de Captura Omnicanal a Cotización:
1.  **Ingreso del Prospecto:** Se registra una solicitud en `customer_requests` marcando el canal de origen (ej. `origin_channel = 'Instagram'`).
2.  **Triage de Ventas:** El rol de ventas evalúa la viabilidad en el panel administrativo y crea una fila en `quotes` vinculando los productos y variantes recomendadas.
3.  **Envío y Aprobación:** La cotización pasa a `sent_to_client`. Si el cliente acepta, se cambia el estado a `accepted` y se gatilla el flujo automático de conversión a orden de compra de e-commerce.

---

## 3. Seguridad de Datos y Row Level Security (RLS)

*   **Acceso al Cliente (Autogestión):**
    *   Un cliente autenticado posee permisos de lectura y escritura restringidos exclusivamente a sus propios registros en `customers`, `customer_addresses`, `customer_files`, y solicitudes de cotizaciones (`customer_id == auth.uid()`).
*   **Acceso Administrativo:**
    *   Los roles `admin` y `sales` poseen bypass total (`FOR ALL`) para interactuar, recalcular precios unitarios y actualizar el histórico en `quote_status_history`.
*   **Bajo Nivel (Público):**
    *   No se concede ningún permiso de lectura anónima sobre estas tablas protegidas.

---

## 4. Almacenamiento en Supabase Storage (Estructura de Diseños)

Se habilita el bucket privado `client-designs` con la siguiente taxonomía organizada por identificadores de clientes y categorías de recursos:

```text
client-designs (Bucket Privado / Protegido por RLS)
└── customers/
    └── {customer_id}/
        ├── logos/       # Logotipos corporativos en formatos vectoriales
        └── references/  # Capturas de pantalla o imágenes de referencia
```
