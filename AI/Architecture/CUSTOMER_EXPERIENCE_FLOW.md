# Customer Experience Flows & User Journeys
## Papelería y Creaciones E&G — Caminos de Conversión e Interacción del Cliente

---

## 1. Flujo Transaccional de Compra (E-commerce Core)

Describe la ruta que realiza un cliente estándar (ej. Camila) al adquirir un producto base o personalizado:

```mermaid
sequenceDiagram
    participant U as Usuario
    participant FE as Frontend (Next.js)
    participant DB as Supabase DB
    
    U->>FE: Ingresa a Ficha de Producto
    FE->>DB: Consume variante & reglas de personalización
    U->>FE: Selecciona variante (ej: Taza Blanca)
    U->>FE: Sube imagen (Validador comprueba DPIs > 300)
    FE->>FE: Previsualiza render 2D en pantalla
    U->>FE: Clic en "Añadir al Carrito"
    FE->>FE: Guarda item y snapshot JSONB en localStorage
    U->>FE: Avanza a Checkout
    FE->>FE: Rellena dirección de envío
    U->>FE: Clic en "Pagar" (Webpay Redirection)
```

---

## 2. Flujo de Cotización Consultiva (B2B / Instituciones)

Describe la ruta para clientes como Nicolás o María Teresa que requieren presupuestos formales:

```mermaid
graph TD
    A[Prospecto ingresa a /cotización] --> B[Rellena Formulario Multi-step]
    B --> C[Sube archivos vectoriales o Excel]
    C --> D[Envío a Supabase: public.customer_requests]
    D --> E[Notificación automática en taller]
    E --> F[Vendedor genera Quote y QuoteItems en panel]
    F --> G[Envia Cotización en PDF por WhatsApp/Email]
    G --> H{¿Acepta Cliente?}
    H -->|Sí| I[Conversión automática a public.orders]
    H -->|No| J[Modificación o cierre de negocio]
```

---

## 3. Puntos de Contacto Críticos (Touchpoints)

*   **Paso de Carga de Archivos:** La validación debe ocurrir en tiempo real en la pantalla del usuario (Client-side validation). Si el archivo no tiene transparencias o es menor a 300 DPI, la interfaz lo detiene inmediatamente antes de permitir el pago, explicando amigablemente la solución técnica.
*   **Confirmación de Pago Inmediata:** Tras retornar del banco (Webpay), el cliente visualiza una pantalla limpia con su número de orden (`order_number`) y un botón para contactar directo al WhatsApp de soporte ante dudas.
*   **Encuestas de Satisfacción:** Un webhook en Supabase gatilla una notificación de WhatsApp al cabo de 5 días de la entrega física del Courier para capturar su testimonio y foto del producto final.
