# Desglose de Tareas Verificables (Tasks): Catálogo y Cotizaciones

## Referencia
* **Spec ID:** `SPEC-20261011-catalogo-cotizaciones`
* **Plan ID:** `PLAN-20261011-catalogo-cotizaciones`
* **Estado:** `ALIGNED_DRAFT` (Alineado con Decisiones Comerciales - Pendiente de Aprobación para Implementar)

---

> **ADVERTENCIA DE SEGURIDAD SDD:**
> 1. Ninguna de las siguientes tareas debe ejecutarse en código hasta contar con la **aprobación formal del usuario para implementar**.
> 2. La aprobación para implementar **NO equivale a autorización para publicar**. La publicación en la rama `main` requerirá una aprobación posterior e independiente.

---

### Fase 1: Selección y Curaduría de Fotografías (Sin tocar originales)
- [ ] **Tarea 1.1:** Elaborar el manifiesto preliminar seleccionando de 2 a 3 fotografías representativas para cada una de las 26 colecciones en `.spec/changes/active/catalogo-cotizaciones/photo-manifest.json`.
  - *Verificación:* Tabla de trazabilidad que vincula cada foto seleccionada con su archivo original en `C:\Users\Pyme\Desktop\Fotos Papeleria Y Creaciones E&G`. Exclusión confirmada de los 2 archivos `.MOV`.
- [ ] **Tarea 1.2 [PUNTO DE CONTROL]:** Presentar la selección fotográfica al propietario para su revisión y visto bueno.
  - *Condición de salida:* Aprobación explícita de las imágenes elegidas antes de cualquier conversión.
- [ ] **Tarea 1.3:** Ejecutar script local de procesamiento para convertir las imágenes seleccionadas a formato `.webp` (800×800 px proporcional, calidad 85%, peso < 150 KB) y guardarlas en `public/images/products/`.
  - *Verificación:* Directorio `public/images/products/` con las imágenes WebP generadas. Verificación de que las 533 fotos originales en el escritorio no sufrieron ninguna alteración.

### Fase 2: Esquema de Base de Datos y Datos Semilla (Supabase)
- [ ] **Tarea 2.1:** Redactar la migración SQL `supabase/migrations/20261012000000_guest_quotation_support.sql` permitiendo `customer_id NULL`, columna `contact_info JSONB`, columna `items_snapshot JSONB` y políticas RLS (restringiendo lectura exclusivamente a usuarios propietarios/admin y bloqueando inserción directa de rol anon).
  - *Verificación:* Script SQL revisado contra el esquema real y reglas de seguridad de la Constitución.
- [ ] **Tarea 2.2:** Redactar script de datos iniciales (`seed.sql` o función de carga) para registrar las 6 categorías maestras y los 26 productos en Supabase, vinculando las rutas de las imágenes WebP.
  - *Verificación:* Verificación de que cada producto tiene `base_price = 0` y `status = 'active'`.

### Fase 3: Gestión de Estado, Utilidades y Clientes Seguros
- [ ] **Tarea 3.1:** Crear el store de cotización del cliente (`lib/stores/quoteStore.ts` o `QuoteContext.tsx`) con persistencia en `localStorage` para almacenar la lista de artículos, cantidades y notas.
  - *Verificación:* Test unitario en `tests/unit/quote-store.test.ts` validando agregar producto, modificar cantidad, eliminar ítem y calcular total de artículos.
- [ ] **Tarea 3.2:** Crear la utilidad de formateo de mensajes de WhatsApp (`lib/utils/formatWhatsAppQuote.ts`).
  - *Verificación:* Test unitario en `tests/unit/format-whatsapp-quote.test.ts` asegurando formato limpio, emojis correctos, desglose de ítems y codificación URI válida.
- [ ] **Tarea 3.3:** Crear el esquema de validación Zod para solicitudes de cotización (`lib/validations/quoteSchema.ts`) con límites estrictos de tamaño, cantidades, validación de productos activos y campo honeypot anti-spam.
  - *Verificación:* Test unitario en `tests/unit/quote-schema.test.ts` validando campos requeridos, límites de longitud y descarte de envíos de bots.
- [ ] **Tarea 3.4:** Crear el cliente administrativo aislado de servidor en `lib/supabase/admin.ts` con directiva `"server-only"` y uso exclusivo de `SUPABASE_SERVICE_ROLE_KEY`.
  - *Verificación:* Comprobación de que la clave no se expone al cliente y de que el compilador falla si se importa en componentes cliente.

### Fase 4: Vistas y Componentes del Catálogo Digital
- [ ] **Tarea 4.1:** Crear componentes del catálogo en `components/catalog/`:
  - `ProductCard.tsx`: Tarjeta con foto WebP, nombre verificado, etiqueta «Cotizar a medida» y botón para ver detalles o agregar.
  - `CatalogGrid.tsx`: Grilla responsiva (1 col en móvil, 2 en tablet, 3-4 en escritorio) con buscador predictivo y filtros.
  - `CategoryNav.tsx`: Navegación horizontal fluida entre las 6 categorías maestras.
  - *Verificación:* Revisión visual de componentes respetando paleta oficial (ciruela `#4A154B`, rosa `#E04B88`, crema `#FDFAF6`).
- [ ] **Tarea 4.2:** Actualizar `app/productos/page.tsx` para consultar los productos y categorías reales desde Supabase y eliminar definitivamente la dependencia de `lib/mock/products.ts`.
  - *Verificación:* La página compila sin mocks; maneja estados de carga (`loading.tsx`), lista vacía y errores de conexión.
- [ ] **Tarea 4.3:** Crear la página de ficha de producto `app/productos/[slug]/page.tsx` con galería de 2 a 3 fotos (`ProductGallery.tsx`), selector numérico de cantidad (`QuantitySelector.tsx`), campo de notas/personalización y botón «Añadir a mi Cotización».
  - *Verificación:* Navegación fluida y adición correcta al store de cotización.

### Fase 5: Bandeja de Cotización y Despacho Multicanal
- [ ] **Tarea 5.1:** Crear el componente `QuoteDrawer.tsx` accesible desde la barra de navegación y mediante botón flotante, permitiendo revisar los artículos seleccionados, editar cantidades o eliminarlos.
  - *Verificación:* Apertura/cierre fluido en móviles y escritorio sin desbordamiento.
- [ ] **Tarea 5.2:** Rediseñar la página `app/cotizar/page.tsx` para desplegar el formulario de datos del cliente (nombre, teléfono, correo, comuna, observaciones) y el selector interactivo entre Correo Electrónico y WhatsApp.
  - *Verificación:* Formulario accesible, responsive y validado con Zod.
- [ ] **Tarea 5.3:** Implementar el Server Action `submitEmailQuoteRequest` en `app/actions/quotes.ts` que almacena la solicitud en `customer_requests` y despacha el correo transaccional hacia el taller, manejando contingencias en caso de fallo de envío.
  - *Verificación:* Acuse de recibo visual mostrado al cliente únicamente tras confirmación real del servicio de correo. En caso de error, muestra mensaje transparente y botón de contingencia directa hacia WhatsApp sin perder los datos cotizados.
- [ ] **Tarea 5.4:** Implementar la acción de WhatsApp que registra la solicitud de respaldo en `customer_requests`, genera la URL oficial `https://wa.me/[numero]` y despliega el aviso obligatorio de que el cliente debe presionar «Enviar» en su aplicación.
  - *Verificación:* Apertura correcta del chat con mensaje prellenado, registro en base de datos y mensaje explicativo visible en la interfaz indicando la acción requerida.

### Fase 6: Pruebas Automatizadas y Quality Gates Locales
- [x] **Tarea 6.1:** Ejecutar `npm run typecheck` (verificar 0 errores de TypeScript en toda la base de código).
- [x] **Tarea 6.2:** Ejecutar `npm run lint` (verificar 0 errores y 0 advertencias de ESLint).
- [x] **Tarea 6.3:** Ejecutar `npm run test` (verificar que el 100% de los tests unitarios existentes y nuevos pasen exitosamente).
- [x] **Tarea 6.4:** Ejecutar `npm run build` (confirmar compilación limpia de producción en Next.js).
- [x] **Tarea 6.5:** Inspeccionar `git diff` asegurando que no se incluyan archivos `.env`, secretos, credenciales ni modificaciones ajenas al alcance.

---

### Fase 8: Panel de Administración y Fotografías Reales del Catálogo
- [x] **Tarea 8.1:** Crear migración SQL `supabase/migrations/20261012000100_collection_images_and_storage.sql` con la tabla `collection_images`, políticas RLS para lectura pública y gestión exclusiva de admin, y función trigger `check_collection_images_limit` con `pg_advisory_xact_lock` para imponer el tope de 10 imágenes.
- [x] **Tarea 8.2:** Crear módulo de validación de archivos en servidor `lib/validations/imageUpload.ts` con verificación de tipos MIME, magic bytes (JPEG, PNG, WebP) y descarte estricto de SVG o ejecutables.
- [x] **Tarea 8.3:** Implementar Server Actions administrativos en `app/actions/admin-images.ts` (`uploadCollectionImageAction`, `deleteCollectionImageAction`, `getCollectionImagesAction`) con directiva `"server-only"` y verificación de `public.is_admin()`.
- [x] **Tarea 8.4:** Implementar la interfaz protegida del panel `/admin` (`app/admin/page.tsx` y componentes en `components/admin/`) con:
  - Selector de las 26 colecciones estables (`prod-1` a `prod-26`).
  - Contador de cupos en tiempo real (utilizados vs disponibles de 10).
  - Carga manual de fotografías desde dispositivo con vista previa previa a confirmar.
  - Indicadores de progreso, mensajes claros de error y alertas de éxito.
  - Eliminación con modal de confirmación obligatoria.
  - Bloqueo visual y de servidor si se alcanzan las 10 fotografías.
  - Diseño fiel a la paleta oficial (crema, ciruela, rosa, dorado) y totalmente responsive.
- [x] **Tarea 8.5:** Integrar la visualización de imágenes reales en `/productos` y `ProductDetailModal.tsx`:
  - Si una colección tiene fotografías en `collection_images`, se muestran en la galería y tarjeta.
  - Si una colección tiene 0 fotografías, se muestra la ilustración artesanal existente `ProductVisual` como fallback.
- [x] **Tarea 8.6:** Configurar canales comerciales oficiales:
  - WhatsApp: `+56948672300` (`https://wa.me/56948672300`) con codificación estructurada en catálogo y cotizador.
  - Correo: `papeleriaycreacioneseyg@gmail.com`.
  - Reemplazo exhaustivo de enlaces placeholder en Navbar, Footer y Catálogo.
- [x] **Tarea 8.7:** Escribir tests unitarios exhaustivos para validación de imágenes (`imageUpload.test.ts`), límites de colección y control de acceso.

---

### Fase 7: Revisión Humana y Publicación en Producción (Requiere Aprobación Independiente)
- [ ] **Tarea 7.1 [PUNTO DE CONTROL FINAL]:** Presentar al propietario el informe completo de validación local y solicitar su **aprobación explícita e independiente para publicar**.
  - *Condición de salida:* Aprobación formal del propietario para proceder con el commit y push.
- [ ] **Tarea 7.2:** Crear commit estructurado siguiendo Conventional Commits (`feat(catalog): implement digital catalog and quote system`).
- [ ] **Tarea 7.3:** Sincronizar cambios a la rama `main` en GitHub utilizando Git Portable con `wincred`.
- [ ] **Tarea 7.4:** Verificar que el despliegue automático en Vercel finalice con estado `Ready` / `Success`.
- [ ] **Tarea 7.5:** Validar en vivo en `https://creaciones-ey-g-lx4k.vercel.app/productos` el cumplimiento de los criterios de aceptación AC-01 a AC-22 con evidencias reales.
- [ ] **Tarea 7.6:** Mover la especificación de `.spec/changes/active/catalogo-cotizaciones/` a `.spec/changes/archive/`.

