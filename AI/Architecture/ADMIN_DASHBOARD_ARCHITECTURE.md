# Admin Dashboard & Business Operations Architecture
## Papelería y Creaciones E&G — Panel Administrativo y Módulos Operativos

---

## 1. Módulos Operativos del Dashboard

El panel administrativo (`/admin/*`) se concibe como el centro de control operativo del negocio, estructurado en **6 grandes módulos de autogestión**:

### A. Dashboard Overview (Consola Ejecutiva)
*   **Propósito:** Visualizar la salud comercial y operativa del negocio de un vistazo.
*   **Componentes Principales:**
    *   `MetricsGrid`: Tarjetas con KPIs (Venta diaria, Órdenes en producción, Gigabytes de Storage consumidos, Conversión de cotizaciones).
    *   `AlertQueue`: Alertas críticas (Pedidos venciendo en < 24 horas, Diseños rechazados por cliente en espera de revisión).
    *   `RecentActivityFeed`: Registro en tiempo real de transacciones exitosas y cambios de estado en taller.

### B. Módulo de Clientes (`/admin/clientes`)
*   **Propósito:** Administrar el historial de clientes B2C y B2B corporativos.
*   **Vistas:**
    *   `ClientListTable`: Tabla indexada con buscador asíncrono, filtro por `customer_type` y estatus.
    *   `ClientDetailsView`: Ficha única con libreta de direcciones, bóveda de archivos del cliente y registro histórico de compras/cotizaciones asociadas.

### C. Módulo de Inventario y Catálogo (`/admin/catálogo`)
*   **Propósito:** Administrar productos, stock de variantes y configuraciones de personalización.
*   **Vistas:**
    *   `ProductGridAdmin`: Lista de productos con buscador por SKU o código público.
    *   `ProductForm`: CRUD completo que incluye cargador de imágenes a Supabase Storage y el constructor de variables del configurador (`customization_options`).

### D. Módulo de Cotizaciones B2B (`/admin/cotizaciones`)
*   **Propósito:** Gestionar solicitudes de presupuesto de Pymes y centros de padres.
*   **Vistas:**
    *   `QuoteInboxTable`: Bandeja de entrada de solicitudes agrupadas por estado (`under_review`, `sent_to_client`).
    *   `QuoteDraftBuilder`: Modificador de precios unitarios con botón de un click: `Convertir a Pedido`.

### E. Módulo de Pedidos y Taller Kanban (`/admin/taller`)
*   **Propósito:** Controlar el fulfillment físico y fases de diseño del taller.
*   **Componentes Principales:**
    *   `ProductionKanbanBoard`: Tablero Kanban dividido por fases físicas de taller (`in_queue`, `printing`, `cutting`, `quality_check`, `ready_to_ship`).
    *   `JobSheetExporter`: Botón para imprimir la hoja de trabajo en formato PDF agrupando los vectores de corte del cliente.

### F. Módulo de Configuración de Sistema (`/admin/configuracion`)
*   **Propósito:** Control de variables y accesos.
*   **Componentes:**
    *   `UserRightsMatrix`: Tabla de asignación de roles de empleados (`designer`, `production`, `sales`).

---

## 2. Matriz de Permisos del Panel Administrativo

El control de accesos al panel se rige bajo la siguiente matriz de roles:

| Módulo / Ruta | Admin | Designer | Production | Sales |
| :--- | :---: | :---: | :---: | :---: |
| `/admin` (Overview) | **Lectura/Escritura** | Lectura | Lectura | Lectura |
| `/admin/clientes` | **Lectura/Escritura** | Lectura | Sin Acceso | **Lectura/Escritura** |
| `/admin/catálogo` | **Lectura/Escritura** | Lectura | Lectura | Lectura |
| `/admin/cotizaciones`| **Lectura/Escritura** | Sin Acceso | Sin Acceso | **Lectura/Escritura** |
| `/admin/taller` | **Lectura/Escritura** | **Lectura/Escritura**| **Lectura/Escritura**| Lectura |
| `/admin/configuracion`| **Lectura/Escritura** | Sin Acceso | Sin Acceso | Sin Acceso |

---

## 3. Experiencia de Usuario (UX) Administrativa

*   **Desktop First:** Optimización extrema de pantallas anchas (1080p en adelante) para permitir visualizaciones del Kanban y tablas de clientes sin scroll horizontal molesto.
*   **Diseño Limpio y de Fricción Cero:** Uso de combinaciones de grises neutros y elementos de shadcn/ui con espaciados cómodos que prevengan errores al presionar botones críticos en pantallas táctiles de tablet en el taller físico.
