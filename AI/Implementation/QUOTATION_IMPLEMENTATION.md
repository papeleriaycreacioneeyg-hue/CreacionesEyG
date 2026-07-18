# Quotation Engine Implementation Details
## Papelería y Creaciones E&G — Fase 6: Sistema de Pre-Cotización y Flujos Comerciales

---

## 1. Generación de Números de Cotización Automáticos
Se implementó un trigger en PostgreSQL (`trigger_generate_quote_number`) asociado a una secuencia (`quote_number_seq`) que autogenera y formatea el número comercial de la cotización:
*   **Formato de salida:** `EG-COT-000001` (comenzando en 1 y rellenando con ceros a la izquierda hasta 6 dígitos).

---

## 2. Modelado de Cotizaciones e Items
*   **`quotes`:** Documentos base que definen los montos totales de pre-cotización, notas especiales de taller y vigencia temporal (`valid_until`).
*   **`quote_items`:** Detalle de productos y variantes asociadas, conservando una copia estática de la personalización (`customization_snapshot`) cargada en el configurador.
*   **Trazabilidad:** La tabla `quote_status_history` registra todos los cambios de estados de la cotización (`draft` ➔ `submitted` ➔ `under_review` ➔ `sent_to_client` ➔ `accepted`), documentando el usuario administrador responsable del cambio.
