# CONSTITUCIÓN DE PAPELERÍA Y CREACIONES E&G
## Principios Permanentes y Leyes Inmutables del Proyecto

Este documento establece las reglas fundamentales que rigen todo el desarrollo de software en Papelería y Creaciones E&G. Estas reglas son de cumplimiento estricto y obligatorio para cualquier persona o agente de inteligencia artificial que intervenga en el repositorio.

---

### ARTÍCULO I. Principio de Verdad y Código Real
1. Ninguna funcionalidad se considera completada o existente sin código verificado en el repositorio, pruebas asociadas y despliegue funcional en producción.
2. Está estrictamente prohibido simular funcionamiento o asumir que una característica existe únicamente porque figure descrita en documentación histórica (`AI/` o `docs/`).
3. El uso de datos mock está restringido a fases tempranas de prototipado explícitamente autorizadas; no se debe introducir código mock en flujos que ya cuentan con soporte en base de datos.
4. Jamás se debe afirmar que una verificación, prueba o despliegue fue exitoso si no existe evidencia directa (códigos de salida, respuestas HTTP, registros de compilación).

---

### ARTÍCULO II. Integridad Arquitectónica
1. **Framework y Lenguaje:** Next.js con App Router y TypeScript en modo estricto. Queda prohibido el uso de `any` injustificado y la desactivación de verificaciones de tipo del compilador.
2. **Estilizado:** Tailwind CSS v4 complementado con componentes modulares accesibles basados en primitivas de Radix UI. No se deben instalar frameworks de CSS redundantes ni duplicar estilos.
3. **Backend y Persistencia:** Supabase (PostgreSQL, Supabase Auth y Storage). Toda comunicación cliente/servidor debe utilizar las bibliotecas oficiales (`@supabase/ssr` y `@supabase/supabase-js`).
4. **Runtime del Middleware:** El runtime del middleware debe mantenerse compatible con la arquitectura actualmente verificada y con el entorno de despliegue. No cambiar entre Edge Runtime y Node.js Runtime sin una especificación técnica, justificación documentada, pruebas locales y validación exitosa del despliegue en Vercel.

---

### ARTÍCULO III. Seguridad y Protección de Datos
1. **Cero Secretos en Git:** Está terminantemente prohibido incluir archivos `.env`, claves de servicio (`SUPABASE_SERVICE_ROLE_KEY`), secretos de API, certificados o tokens privados en commits o en el código fuente del cliente.
2. **Seguridad a Nivel de Fila (RLS):** Toda tabla creada en Supabase debe tener activadas políticas RLS. Las tablas de catálogos son de solo lectura pública; las tablas transaccionales y de usuario solo permiten acceso a los propietarios autenticados (`auth.uid() == user_id`) o a roles administrativos.
3. **Validación de Entradas:** Todo formulario y Server Action debe validar estrictamente los datos recibidos mediante esquemas tipados (Zod) antes de interactuar con la base de datos.

---

### ARTÍCULO IV. Excelencia en UX y Diseño Visual
1. **Identidad Visual:** Cada interfaz debe respetar la paleta oficial de la marca:
   - Ciruela profundo / Plum (`#4A154B`) para tipografías principales y títulos.
   - Rosa vibrante (`#E04B88` / `#C93D75`) para llamadas a la acción (botones primarios) y acentos de conversión.
   - Tonos pastel de apoyo (fondos crema `#FDFAF6`, lavanda suave y rosa difuminado).
2. **Micro-interacciones y Animaciones:** Se debe mantener una sensación premium mediante animaciones sutiles con Framer Motion, evitando transiciones bruscas o sobrecargas visuales.
3. **No a los Placeholders Rotos:** Los elementos visuales y multimedia deben contar con dimensiones proporcionales, atributos descriptivos (`alt`) y rutas comprobadas en el servidor público.

---

### ARTÍCULO V. Diseño Adaptable Obligatorio (Responsive Design)
1. Toda página, componente y modal debe diseñarse y verificarse para funcionar sin desbordamiento horizontal en las siguientes resoluciones:
   - Móvil compacto: 360px – 480px.
   - Tablet / Móvil amplio: 640px – 768px.
   - Escritorio estándar y amplio: 1024px – 1440px+.
2. Los botones de acción deben tener áreas táctiles cómodas en pantallas táctiles (mínimo 44x44px).

---

### ARTÍCULO VI. Accesibilidad (A11y)
1. **Reducción de Movimiento:** Todo componente con animaciones complejas debe escuchar la preferencia del usuario mediante `useReducedMotion()` o la directiva CSS `prefers-reduced-motion` para desactivar efectos flotantes o cíclicos cuando sea solicitado.
2. **Semántica y Contraste:** Se deben utilizar elementos semánticos HTML5 (`<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`) y asegurar contraste legible entre texto y fondo.
3. **Imágenes:** Toda imagen renderizada con `next/image` debe incluir un atributo `alt` significativo.

---

### ARTÍCULO VII. Puertas de Calidad Obligatorias (Quality Gates)
Antes de publicar cualquier cambio en la rama principal, es obligatorio superar sin excepciones:
1. **`npm run typecheck`:** 0 errores de TypeScript (`tsc --noEmit`).
2. **`npm run lint`:** 0 errores y 0 advertencias de ESLint.
3. **`npm run test`:** Todos los tests existentes deben pasar correctamente antes de publicar un cambio. La ausencia de tests para una funcionalidad no significa que dicha funcionalidad tenga cobertura completa. Cuando una funcionalidad nueva requiera pruebas, la especificación deberá indicar qué pruebas deben crearse.
4. **`npm run build`:** Compilación de producción limpia y exitosa en Next.js.

---

### ARTÍCULO VIII. Reglas de Git y Control de Versiones
1. **Prohibición de Destrucción:** Queda terminantemente prohibido ejecutar `git push --force`, `git reset --hard` o `git clean -fd`.
2. **Protección del Trabajo Local:** Jamás descartar cambios locales ni trabajo pendiente del usuario.
3. **Staging Selectivo:** Usar `git add` únicamente con los archivos estrictamente relacionados con la tarea aprobada.
4. **Mensajes de Commit Estructurados:** Utilizar la convención Conventional Commits (ej. `feat(...)`, `fix(...)`, `chore(...)`, `docs(...)`).
5. **Configuración Local:** Los comandos de Git deben ejecutarse asegurando la ruta de Git Portable (`c:\CreacionesEyG\git\cmd\git.exe`) y el gestor de credenciales `wincred`.

---

### ARTÍCULO IX. Reglas de Despliegue en Producción
1. **Rama de Producción:** La rama de entrega continua es `main`.
2. **Despliegue Automático en Vercel:** Cada push a `main` activa una compilación en Vercel.
3. **Verificación de Despliegue:** Una publicación solo se considera completada tras confirmar que el despliegue en Vercel finalizó con estado `Ready` / `Success` y que la funcionalidad opera correctamente en el dominio de producción.

---

### ARTÍCULO X. Protocolo Spec-Driven Development (SDD)
1. **Prohibido Codificar a Ciegas:** Ninguna nueva funcionalidad, refactorización o cambio arquitectónico se programará sin haber completado previamente la Especificación, el Plan Técnico y el Checklist de Tareas.
2. **Aprobación Previa:** El plan técnico y las tareas atómicas deben presentarse y ser aprobados por el usuario antes de iniciar la escritura de código.
3. **Trazabilidad:** Cada cambio en el código debe responder a un requisito y criterio de aceptación documentado en `.spec/changes/`.
4. **Tratamiento Diferenciado para Hotfixes:** Las correcciones urgentes seguirán un flujo ágil y proporcional que garantice diagnóstico documentado y validaciones de calidad sin saltarse ningún control de seguridad.
