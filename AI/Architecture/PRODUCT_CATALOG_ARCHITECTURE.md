# Product Catalog Engine Architecture
## Papelería y Creaciones E&G — Fase 2: Catálogo Profesional & Estructura de Personalización

---

## 1. Modelo de Entidades y Relaciones

El motor de catálogo separa el producto comercial base de sus variaciones físicas e integraciones creativas utilizando las siguientes entidades estructuradas:

*   **`products`:** Registro del modelo comercial del artículo, centralizando el precio base y códigos administrativos (`sku`, `public_code`).
*   **`product_variants`:** Variaciones discretas combinables (ej: Color y Talla). Utiliza campos `jsonb` con índices GIN para almacenar pares clave-valor de atributos sin redundancia.
*   **`customization_options`:** Define las restricciones técnicas del configurador (tipo de entrada requerida, límites de tamaño, tipos de lienzo).
*   **`materials` & `production_techniques`:** Tablas maestras que definen la materialidad y método de manufacturación del taller (DTF, Sublimación, etc.), vinculadas a `products` a través de relaciones muchos a muchos.

---

## 2. Reglas Administrativas de Nomenclatura SKU

Para mantener una estructura legible que simplifique la logística del taller y las búsquedas rápidas:

*   **Estructura del SKU base:** `[TIPO]-[TECNICA]-[CORRELATIVO]` (ej: `POL-DTF-102`).
*   **Estructura del SKU de Variante:** `[SKU-BASE]-[VAR-1]-[VAR-2]` (ej: `POL-DTF-102-BLK-M`).
*   **Índices:** Se crean índices B-Tree específicos sobre `sku` y `sku_variant` para resolver búsquedas en microsegundos.

---

## 3. Seguridad de Datos y Row Level Security (RLS)

*   **Acceso Público (Lectura):**
    *   Cualquier visitante puede consultar las categorías, colecciones, técnicas y productos siempre que posean el estado `active` (o `status = 'active'`).
    *   Las imágenes de productos (`product_images`) y tags son de lectura pública incondicional (`USING (true)`).
*   **Acceso Administrativo (Lectura & Escritura):**
    *   Todas las operaciones de mutación (`INSERT`, `UPDATE`, `DELETE`) están limitadas a usuarios con rol `admin` mediante la validación segura de la función `public.is_admin()`.

---

## 4. Almacenamiento en Supabase Storage (Estructura)

Se habilita el bucket público `product-images` para servir los activos visuales del catálogo con la siguiente taxonomía organizada por identificadores de producto:

```text
product-images (Bucket Público)
└── products/
    └── {product_id}/
        ├── main/        # Imagen principal de portada de la ficha
        └── gallery/     # Galería de detalles y acabados macro
```
