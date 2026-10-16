# Desglose de Tareas Verificables (Tasks)

## Referencia
* **Spec ID:** `SPEC-20261016-redisenio-homepage-fidelidad`
* **Plan ID:** `PLAN-20261016-redisenio-homepage-fidelidad`
* **Estado:** `APPROVED`

---

## Tareas Atómicas de Implementación

- [x] **Tarea 1: Refactorizar `components/layout/Navbar.tsx`:** Ajustar navegación con enlaces oficiales (`Inicio`, `Nosotros`, `Productos`, `Servicios`, `Galería`, `Contacto`), indicador de página activa rosa, y botón de acción píldora *"Cotizar por WhatsApp"*.
- [x] **Tarea 2: Refactorizar `components/home/HeroSection.tsx`:** Implementar H1 de dos colores (*"Papelería y"* en rosa `#E04B88`, *"Creaciones E&G"* en ciruela `#4A154B`), botones píldora (*"Cotizar ahora"*, *"Ver catálogo"*), fila de 3 micro-badges (Hecho con amor, Personalizados, Calidad premium) e integración limpia del asset `/images/banner.png`.
- [x] **Tarea 3: Refactorizar `components/home/CategoriesSection.tsx`:** Configurar sección `✦ Nuestros servicios ✦` con las 5 categorías oficiales en 5 columnas con sus iconos, colores y descripciones.
- [x] **Tarea 4: Refactorizar `components/home/ProductsSection.tsx`:** Configurar sección `✦ Productos destacados ✦` con las 5 tarjetas de producto con precios en rosa y botón `Ver todos`.
- [x] **Tarea 5: Refactorizar `components/home/GallerySection.tsx`:** Configurar sección `✦ Trabajos realizados ✦` con la tira de 6 fotografías reales de taller.
- [x] **Tarea 6: Refactorizar `components/home/AboutSection.tsx`:** Configurar sección `Sobre E&G` con ilustración a la izquierda, relato de taller, botón morado y 3 tarjetas de beneficios a la derecha.
- [x] **Tarea 7: Refactorizar `components/home/CTASection.tsx`:** Implementar franja inferior lavanda-rosa con texto persuasivo y botón doble línea para WhatsApp.
- [x] **Tarea 8: Refactorizar `components/layout/Footer.tsx`:** Implementar pie de página en 4 columnas y botón flotante de retorno arriba.
- [x] **Tarea 9: Ejecutar Quality Gates Locales:** Superar `typecheck`, `lint`, `test` y `build`.
- [ ] **Tarea 10: Commit y Despliegue:** Realizar commit convencional, push a `main`, validar Vercel y archivar spec.
