# Hero Experience V4 — Cinematic Premium
## Papelería y Creaciones E&G — Documentación de Escena y Composición Visual

---

## 1. Capas de Composición (Layers)
Para asegurar sensación de profundidad, la escena se organiza en las siguientes capas jerárquicas:
*   **Layer 1 (Fondo):** Degradados de acuarela rosa y lavanda (`from-rose-50/80 via-purple-50/50`).
*   **Layer 2 (Partículas Ambientales):** Corazones y estrellas flotantes con animación cíclica lenta (breathing/floating de 8 a 10 segundos).
*   **Layer 3 (Máscara de Integración):** Degradado de máscara horizontal hacia el lado izquierdo (`from-[#fdfaf6] via-transparent`) para difuminar los bordes de la imagen principal.
*   **Layer 4 (Banner Principal):** Despliegue de `banner.png` (`/images/banner.png`) cargado de forma prioritaria con Next Image.
*   **Layer 5 (Contenido):** Títulos Playfair Display, botones redondeados de conversión y fila de beneficios con animación stagger.

---

## 2. Animaciones de Framer Motion
*   **Textos:** Fade in y desplazamiento horizontal de `0.8s`.
*   **Banner:** Fade in y escala sutil (`0.98` a `1.0`) en `1.0s`.
*   **Reducción de Movimiento:** Escucha la directiva `prefers-reduced-motion` para desactivar las partículas flotantes en navegadores con requerimientos especiales de accesibilidad.
