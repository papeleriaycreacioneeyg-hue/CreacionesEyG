# Especificación de Requisitos (Spec): Catálogo Digital y Sistema de Cotizaciones

## Identificador y Metadatos
* **ID:** `SPEC-20261011-catalogo-cotizaciones`
* **Título:** Catálogo Digital de Productos y Sistema de Solicitudes de Cotización Multicanal (Correo Electrónico y WhatsApp)
* **Fecha:** 2026-10-11
* **Iniciativa:** `catalogo-cotizaciones`
* **Estado:** `REVIEW_COMPLETED` (Revisión Final de Seguridad y Preparación Realizada)

---

## 1. Contexto y Visión de Negocio

Papelería y Creaciones E&G cuenta con un taller físico especializado en papelería personalizada, regalos, estampados y decoraciones para eventos. Actualmente, la sección `/productos` opera con datos simulados desconectados de la base de datos Supabase, con precios genéricos inventados y tarjetas sin fotografías reales. Además, el formulario actual de `/cotizar` bloquea a los visitantes al exigir inicio de sesión obligatorio en Supabase Auth.

La empresa dispone de un repositorio de 533 fotografías reales distribuidas en 26 carpetas temáticas. El objetivo comercial es transformar `/productos` en un catálogo digital profesional que exhiba los productos reales, permita al cliente explorar y añadir artículos a una **lista de cotización temporal**, e iniciar una solicitud formal de presupuesto a través de **Correo Electrónico** o **WhatsApp**, sin necesidad de registrarse previamente.

---

## 2. Alcance (Scope)

### 2.1. Dentro del Alcance (In Scope)
1. **Catálogo Digital Principal (`/productos`):**
   * Grilla interactiva organizada por categorías maestras basada en las 26 colecciones auditadas.
   * Filtros por categoría y buscador predictivo en tiempo real por texto.
   * Presentación de precios estandarizada en **«Cotizar a medida»** para todos los productos. Cero precios fijos o ficticios.
   * Estados de carga (`loading`), ausencia de resultados y errores de red.
2. **Ficha de Producto Detallada (`/productos/[slug]`):**
   * Galería con 2 a 3 fotografías reales optimizadas (imagen principal y miniaturas secundarias).
   * Información comercial verificada, características y opciones de personalización (nombres, colores, motivos).
   * Selector de cantidad solicitada (mínimo 1).
   * Botón de acción: «Añadir a mi Cotización».
3. **Lista / Resumen de Cotización:**
   * Lista temporal persistente en el navegador (`localStorage`) durante la navegación y recargas.
   * Modificación interactiva de cantidades, eliminación de ítems y campo de notas o especificaciones por producto.
   * Contador visual flotante y accesible desde la barra de navegación.
4. **Formulario de Contacto y Despacho (`/cotizar`):**
   * Datos mínimos requeridos: Nombre completo, Teléfono de contacto, Correo electrónico, Comuna/Ciudad y Observaciones generales.
   * Admisión de cotizaciones tanto de **visitantes invitados** como de usuarios autenticados.
   * Selector de canal de preferencia: **Correo Electrónico** o **WhatsApp**.
5. **Canal 1 — Correo Electrónico:**
   * Validación estricta de datos en el servidor con Zod (cantidades, identificadores y canales sanitizados).
   * Registro estructurado en la tabla `customer_requests` de Supabase.
   * Envío de notificación formal al taller mediante proveedor de correo transaccional (Resend / SMTP).
   * Confirmación visual en pantalla basada exclusivamente en el resultado real de la entrega.
6. **Canal 2 — WhatsApp:**
   * Registro previo de respaldo en `customer_requests`.
   * Generación de enlace oficial `https://wa.me/[numero]?text=...` con desglose estructurado y codificado del pedido.
   * Apertura interactiva de WhatsApp, informando explícitamente al cliente que debe revisar y presionar «Enviar» en su aplicación.
7. **Diseño, Accesibilidad y Rendimiento:**
   * Paleta oficial de marca (ciruela `#4A154B`, rosa `#E04B88`, crema `#FDFAF6`).
   * Diseño adaptable estricto (móvil 360–480px, tablet 768px, escritorio 1024px+).
   * Imágenes en formato moderno `.webp` y soporte para `prefers-reduced-motion`.

### 2.2. Exclusiones Explícitas (Out of Scope)
* **Pasarelas de Pago:** Cero integración con Webpay Plus, MercadoPago, Stripe o Transbank.
* **Checkout Comercial:** Sin cobro con tarjetas, sin cálculo de comisiones bancarias ni checkout transaccional.
* **Carrito de Compra Transaccional:** La lista es exclusivamente para presupuestos; no hay pedidos pagados en línea.
* **Precios Fijos no Confirmados:** Queda prohibido mostrar importes monetarios cerrados o ceros como precio.
* **Registro Obligatorio:** No se exigirá crear cuenta ni iniciar sesión para cotizar.
* **Archivos de Video:** Los archivos `.MOV` encontrados en el inventario no se publicarán en esta fase.

---

## 3. Requisitos Funcionales y No Funcionales

### 3.1. Requisitos Funcionales (RF)
* **RF-01 (Las 26 Colecciones / Productos):** El sistema debe contemplar fichas para las 26 colecciones identificadas en el inventario, asociadas a 6 categorías maestras:
  1. *Papelería Escolar y Didáctica:* Etiquetas Escolares, Horarios Escolares, Libros de Sumas, Pizarras de Suma y Resta, Tablas de Multiplicar.
  2. *Fiestas y Eventos:* Kits de Cumpleaños, Cotillones, Cake Toppers, Pulseras Fluorescentes, Lienzo de Revelación de Género.
  3. *Bodas y Recuerdos Especiales:* Papelería para Bodas, Etiquetas para Botellas, Arreglos de Cursos / Graduación, Llaveros de Recuerdo.
  4. *Cajas y Desayunos Sorpresa:* Cajas Sorpresa Hombre, Cajas Sorpresa Mujer, Desayunos Sorpresa, Mini Cajitas de Pascua.
  5. *Corporativo y Emprendedores:* Merchandising Corporativo, Tarjetas Imantadas, Avisos Publicitarios, Calendarios de Escritorio.
  6. *Regalos y Fechas Especiales:* Agenda Devocional, Cuadros Día de la Madre, Cajas Día del Padre, Cajas Día del Carabinero.
* **RF-02 (Presentación de Precios):** Cada tarjeta de producto y ficha técnica debe mostrar obligatoriamente la etiqueta comercial «Cotizar a medida». Queda prohibido mostrar valores numéricos fijos o ceros (`$0`).
* **RF-03 (Galería de 2 a 3 Fotografías):** Cada ficha debe desplegar de 2 a 3 imágenes representativas optimizadas en WebP. La imagen principal debe actualizarse al hacer clic en las miniaturas secundarias.
* **RF-04 (Lista de Cotización):** El cliente debe poder agregar productos, especificar la cantidad deseada (mínimo 1) y agregar especificaciones de personalización (nombres, colores, motivos).
* **RF-05 (Persistencia de la Selección):** La lista de cotización debe persistir en el almacenamiento local del navegador (`localStorage`) para no perder la selección al recargar o navegar.
* **RF-06 (Soporte para Invitados):** Los visitantes anónimos deben poder enviar solicitudes completando su información de contacto sin necesidad de registrarse en la plataforma.
* **RF-07 (Canal de Envío por Correo y Estados Reales):**
  - Al seleccionar Correo, el Server Action valida exhaustivamente la solicitud, comprueba que los productos existan y estén activos, persiste la solicitud en `customer_requests` y despacha el correo transaccional hacia el taller.
  - La interfaz diferencia con precisión: (1) Solicitud guardada en base de datos, (2) Notificación despachada y aceptada por el proveedor de correo, y (3) Entrega en bandeja (esta última jamás se asume sólo por un código HTTP 200 de la API).
  - La pantalla confirma: «Solicitud registrada exitosamente (Ref: SOL-XXXX) y notificación enviada al taller».
* **RF-08 (Canal de Envío por WhatsApp y Contingencia No Duplicada):**
  - Al seleccionar WhatsApp directamente, el sistema persiste la solicitud de respaldo en Supabase, genera el enlace oficial `https://wa.me/[numero]` con el identificador y detalle del pedido, y advierte al cliente que debe presionar «Enviar» en su aplicación.
  - Si el cliente eligió Correo pero el servicio de correo falló tras registrar en base de datos, la interfaz ofrece el botón de WhatsApp como contingencia inmediata **reutilizando el mismo código de referencia ya guardado**, garantizando que no se cree una cotización duplicada en Supabase.
* **RF-09 (Prevención de Duplicados e Idempotencia):** Durante el proceso de envío, los botones se deshabilitan inmediatamente con estado visual de carga (`loading`), y el servidor valida claves de idempotencia o hashes de contenido para evitar registros repetidos por doble envío.

### 3.2. Requisitos No Funcionales (RNF) y Seguridad Integral
* **RNF-01 (Preservación de Fotografías Originales):** Los 533 archivos originales en `C:\Users\Pyme\Desktop\Fotos Papeleria Y Creaciones E&G` no deben ser eliminados, sobrescritos ni alterados. El procesamiento se realizará sobre copias.
* **RNF-02 (Optimización de Imágenes):** Las imágenes publicadas deben estar en formato WebP, con dimensiones objetivo de 800×800 px (preservando relación de aspecto), peso inferior a 150 KB por imagen y carga diferida (`loading="lazy"` para secundarias).
* **RNF-03 (Arquitectura de Acceso Seguro a Base de Datos - Cero Inserción Pública Anon):**
  - Se descarta la inserción pública directa desde el rol `anon`. La tabla `customer_requests` mantiene bloqueada la inserción para el rol público anónimo.
  - La creación de solicitudes se ejecuta **exclusivamente a través de un Server Action en Node.js**, el cual valida todos los datos antes de persistir mediante un cliente administrativo de servidor debidamente restringido.
  - Prohibición estricta de lectura, modificación o eliminación anónima: las políticas RLS garantizan que un visitante anónimo o usuario no administrador jamás pueda consultar, alterar o borrar solicitudes ajenas (`SELECT`, `UPDATE` y `DELETE` denegados para `anon`).
  - Los usuarios autenticados únicamente pueden consultar sus propias solicitudes (`auth.uid() = customer_id`), y la gestión total queda reservada para administradores verificados mediante `public.is_admin()`.
* **RNF-04 (Protección Integral contra Abuso, Inyección y Validación de Dominio):**
  - **Límites de contenido y tamaño:** Restricción de longitud por campo (nombre 2-100 car., teléfono 8-20 car., correo max 100 car., comuna 2-100 car., notas generales max 500 car., notas por producto max 200 car.). Tamaño total del payload serializado restringido a un máximo de 20 KB (`contact_info` < 2 KB, `items_snapshot` < 15 KB).
  - **Límites de cantidades:** Mínimo 1 y máximo 1.000 unidades por producto individual; suma acumulada total de la solicitud limitada a 10.000 unidades. Entre 1 y 50 artículos diferentes por cotización.
  - **Validación de productos activos:** El servidor comprueba en base de datos que cada `productId` del snapshot exista en `public.products` y tenga `status = 'active'::product_status_type`.
  - **Saneamiento server-side:** Todos los textos se sanean en el servidor (escape de caracteres especiales, neutralización de etiquetas HTML/scripts y normalización) sin delegar ni confiar en la sanitización del cliente.
  - **Honeypot y Limitación de Frecuencia:** Campo señuelo invisible en CSS (`website_url`). En serverless, el control de frecuencia se coordina mediante almacenamiento persistente/compartido (evitando estados volátiles en memoria por instancia), con estrategia *fail-open supervisado* que registra incidentes sin bloquear al cliente legítimo si el servicio de métricas sufre demoras.
* **RNF-05 (Aislamiento Estricto de Credenciales Privilegiadas):**
  - `SUPABASE_SERVICE_ROLE_KEY` reside exclusivamente en el entorno del servidor (Vercel / `.env.local`) y carece de prefijo `NEXT_PUBLIC_`. Queda terminantemente prohibido importarla o referenciarla en componentes del cliente.
  - Las consultas del cliente en el navegador se ejecutan exclusivamente con `NEXT_PUBLIC_SUPABASE_ANON_KEY`, restringidas por RLS a lecturas públicas del catálogo.
* **RNF-06 (Accesibilidad y Responsive):** Cumplimiento de WCAG AA (contraste de color), soporte para `prefers-reduced-motion` y adaptabilidad total sin desbordamiento horizontal en pantallas desde 360px de ancho.

---

## 4. Controles Humanos y Aprobaciones Obligatorias

El ciclo de desarrollo incorporará **tres controles humanos independientes y secuenciales**:

1. **Control Humano 1 (Aprobación de Fotografías):** Aprobación explícita de la lista de selección de 2 a 3 imágenes por producto (manifiesto) antes de ejecutar cualquier script de copia o conversión a WebP.
2. **Control Humano 2 (Aprobación de Implementación):** Visto bueno formal del propietario sobre la especificación y el plan técnico antes de comenzar a escribir código en el repositorio.
3. **Control Humano 3 (Aprobación Independiente de Publicación):** Revisión final de los Quality Gates locales (`typecheck`, `lint`, `test`, `build`) y autorización expresa del propietario para realizar el commit y push a `main`. La aprobación para implementar **NO** autoriza por sí misma la publicación.

---

## 5. Criterios de Aceptación Verificables (Acceptance Criteria)

* [ ] **AC-01 (Catálogo y 26 Colecciones):** Dado un usuario en `/productos`, cuando carga la página, entonces se listan los productos correspondientes a las 26 colecciones, organizados por las 6 categorías maestras, sin errores de renderizado.
* [ ] **AC-02 (Precios «Cotizar a medida»):** Dado un usuario en el catálogo o en la ficha de producto, cuando revisa cualquier artículo, entonces visualiza exclusivamente la etiqueta «Cotizar a medida», sin precios numéricos fijos ni valores en cero.
* [ ] **AC-03 (Galería de 2 a 3 Fotos WebP):** Dado un usuario en la ficha de un producto, cuando interactúa con la galería, entonces visualiza imágenes nítidas en formato WebP (inferiores a 150 KB) y la selección de miniaturas cambia la imagen principal fluidamente.
* [ ] **AC-04 (Adición y Selección de Cantidad):** Dado un usuario en la ficha de producto, cuando selecciona cantidad 50, escribe "Personalizado con logo Pyme" y presiona «Añadir a mi Cotización», entonces el indicador visual de la lista se actualiza reflejando los datos ingresados.
* [ ] **AC-05 (Persistencia de la Lista de Cotización):** Dado un usuario con artículos en su lista de cotización, cuando recarga la página o navega por otras secciones del sitio, entonces la selección se mantiene intacta.
* [ ] **AC-06 (Modificación y Eliminación en Resumen):** Dado un usuario en el resumen de cotización, cuando cambia la cantidad de un artículo o lo elimina, entonces el total de artículos se recalcula inmediatamente y la lista se actualiza.
* [ ] **AC-07 (Cotización de Invitado sin Login):** Dado un usuario no autenticado en `/cotizar`, cuando completa sus datos de contacto (nombre, teléfono, correo, comuna) y envía la solicitud, entonces la operación se procesa exitosamente sin exigir inicio de sesión.
* [ ] **AC-08 (Validación en Servidor y Anti-Bot):** Dado un envío con datos malformados o campo honeypot completado, el servidor rechaza la petición con código de error apropiado y no inserta filas en Supabase ni envía correos.
* [ ] **AC-09 (Despacho por Correo y Diferenciación de Estados):** Dado un usuario que selecciona el canal Correo, cuando presiona enviar, entonces el servidor valida los campos con Zod, comprueba la existencia de productos activos, registra la solicitud en Supabase y remite la notificación al taller; la pantalla muestra confirmación con número de referencia indicando que la solicitud fue registrada y la notificación enviada al taller, sin afirmar falsamente "correo entregado en bandeja".
* [ ] **AC-10 (Despacho por WhatsApp y Claridad de Entrega):** Dado un usuario que selecciona WhatsApp, cuando presiona enviar, entonces se registra la solicitud en Supabase, se abre la URL oficial `https://wa.me/[numero]` con el texto prellenado y la interfaz informa explícitamente al cliente: *"Se ha abierto WhatsApp; por favor revisa y presiona 'Enviar' en tu aplicación para completar la solicitud"*, reconociendo que la apertura del enlace no equivale a confirmación de entrega por parte de WhatsApp.
* [ ] **AC-11 (Privacidad RLS y Bloqueo Total de Anon en Supabase):** Dado un usuario anónimo o con rol público `anon`, cuando intenta realizar una consulta `SELECT`, `INSERT`, `UPDATE` o `DELETE` directa sobre la tabla `customer_requests` vía la API de Supabase, entonces la base de datos deniega el acceso en todas las operaciones.
* [ ] **AC-12 (Prevención de Clics Duplicados e Idempotencia):** Dado un usuario que presiona repetidamente el botón de envío, entonces el botón se deshabilita instantáneamente mostrando un indicador de carga (`loading`), y el servidor previene registros repetidos mediante verificación de duplicados.
* [ ] **AC-13 (Adaptabilidad Móvil Estricta):** Dado un dispositivo con ancho de 360px a 480px, cuando navega por el catálogo, las fichas y el formulario de cotización, entonces todos los componentes se adaptan verticalmente sin desbordamiento horizontal ni elementos cortados.
* [ ] **AC-14 (Calidad de Código y Quality Gates):** `npm run typecheck` finaliza con 0 errores, `npm run lint` finaliza con 0 errores y advertencias, `npm run test` supera todos los tests y `npm run build` compila limpiamente.
* [ ] **AC-15 (Manejo de Fallos en Registro o Despacho sin Duplicidad):** Si la base de datos falla, la interfaz informa el error y preserva la selección local para reintento. Si la solicitud se guarda con éxito en Supabase pero falla el despacho del correo al taller, la interfaz informa que el registro fue exitoso (Ref: SOL-XXXX) y habilita un botón de contingencia directa a WhatsApp que **reutiliza el mismo identificador SOL-XXXX sin generar una cotización duplicada**.
* [ ] **AC-16 (Controles Humanos Cumplidos):** Se cuenta con evidencia documentada de las tres aprobaciones humanas independientes: manifiesto fotográfico, orden de implementación y orden de publicación.
