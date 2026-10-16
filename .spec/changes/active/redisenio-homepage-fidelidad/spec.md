# Especificación de Requisitos (Spec)

## Identificador y Título
* **ID:** `SPEC-20261016-redisenio-homepage-fidelidad`
* **Título:** `Rediseño de Alta Fidelidad de la Página de Inicio (Homepage)`
* **Fecha:** `2026-10-16`
* **Autor:** `Senior Web Designer & Fullstack Engineer`
* **Estado:** `APPROVED`

---

## 1. Contexto y Problema
* **Descripción del problema:** La página de inicio actual no refleja con exactitud el mockup de diseño maestro provisto por el cliente, difiriendo en jerarquía tipográfica, distribución visual, paleta pastel refinada, integración del asset `banner.png` y componentes clave (como micro-credenciales bajo el Hero, tarjetas de servicios en 5 columnas, productos destacados con precios artesanales, tira fotográfica de trabajos realizados, sección sobre la creadora y franja de contacto inferior).
* **Justificación de negocio:** La página de inicio es la principal vitrina de conversión del taller. Alcanzar el 100% de fidelidad con el diseño aprobado eleva la percepción de valor, transmite calidez y confianza artesanal, y canaliza eficazmente a los clientes hacia el catálogo y la cotización por WhatsApp.
* **Público objetivo:** Clientes del taller (familias, novias, colegios, empresas pyme) y visitantes nuevos.

---

## 2. Alcance (Scope)

### 2.1. Dentro del Alcance (In Scope)
* [x] **Navbar:** Enlaces con diseño y tipografía de referencia (`Inicio` con subrayado rosa activo, `Nosotros`, `Productos`, `Servicios`, `Galería`, `Contacto`) y botón píldora *"Cotizar por WhatsApp"*.
* [x] **Hero Section:** Título H1 bicolor (*"Papelería y"* en rosa `#E04B88`, *"Creaciones E&G"* en ciruela `#4A154B`), botones píldora (*"Cotizar ahora"*, *"Ver catálogo"*), 3 micro-credenciales circulares de confianza y el asset `banner.png` integrado orgánicamente a la derecha.
* [x] **Nuestros servicios:** Grilla de 5 columnas con iconos lineales pastel (Regalos Personalizados, Papelería Creativa, DTF Textil, Sublimación, Eventos).
* [x] **Productos destacados:** Grilla de 5 productos de referencia con precios exactos ($8.000, $6.000, $7.000, $4.000, $10.000) y botón *"Ver todos"*.
* [x] **Trabajos realizados:** Tira fotográfica horizontal continua de 6 fotos de productos de taller.
* [x] **Sobre E&G:** Composición equilibrada con ilustración de la creadora en su mesa de trabajo, relato de propósito, botón morado *"Conoce nuestra historia"* y las 3 tarjetas de beneficios apiladas (Calidad garantizada, Atención personalizada, Envíos seguros).
* [x] **Franja CTA de conversión:** Banda lavanda-rosa con texto persuasivo y botón destacado de WhatsApp con doble línea informativa.
* [x] **Footer:** 4 columnas (Marca, Enlaces rápidos, Servicios, Contacto) y fila inferior de copyright con botón de scroll al inicio.

### 2.2. Fuera del Alcance (Out of Scope)
* Modificaciones al motor de base de datos o esquema de Supabase.
* Modificaciones a rutas de backend privadas o RLS.

---

## 3. Requisitos Funcionales y No Funcionales

### 3.1. Requisitos Funcionales (RF)
* **RF-01:** La cabecera debe permitir navegación a todas las secciones y enlace directo a WhatsApp Business oficial (`+56948672300`).
* **RF-02:** Los botones del Hero deben redirigir fluidamente al flujo de cotización y al catálogo (`/productos`).
* **RF-03:** Las tarjetas de servicios y productos destacados deben ser responsivas (1 col en móvil, 2 en tablet, 5 en desktop).
* **RF-04:** La sección de trabajos realizados debe mostrar imágenes reales nítidas sin desbordamiento.
* **RF-05:** El botón flotante de retorno superior en el Footer debe realizar scroll suave al pliegue inicial.

### 3.2. Requisitos No Funcionales (RNF)
* **RNF-01 (Alineación estética):** Respeto estricto de la paleta oficial (Rosa `#E04B88`, Ciruela `#4A154B`, Lavanda `#9C7AC2`, Crema `#FDFAF6`, Dorado `#D4A359`).
* **RNF-02 (Rendimiento Web):** Uso de `next/image` con dimensiones optimizadas y `priority` en el Hero.
* **RNF-03 (Calidad):** 100% de cumplimiento en typecheck, lint, unit tests y build de producción.

---

## 4. Criterios de Aceptación (Acceptance Criteria)
* [x] **AC-01:** El Hero presenta el título de dos colores, los dos botones píldora, las 3 micro-credenciales y el banner.
* [x] **AC-02:** La sección de servicios tiene exactamente las 5 categorías oficiales con sus iconos y descripciones.
* [x] **AC-03:** La sección de productos destacados exhibe los 5 artículos con sus valores en color rosa.
* [x] **AC-04:** La sección Sobre E&G contiene la ilustración, la narrativa y las 3 tarjetas de garantía a la derecha.
* [x] **AC-05:** La franja de contacto inferior y el pie de página cumplen con la disposición de 4 columnas y enlaces correctos.
