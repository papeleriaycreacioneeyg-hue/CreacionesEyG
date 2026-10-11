# Especificación de Requisitos (Spec)

## Identificador y Título
* **ID:** `SPEC-[YYYYMMDD]-[slug]`
* **Título:** `[Título descriptivo de la funcionalidad]`
* **Fecha:** `YYYY-MM-DD`
* **Autor:** `[Nombre / Rol]`
* **Estado:** `DRAFT | PROPOSED | APPROVED | IN PROGRESS | VERIFIED | ARCHIVED`

---

## 1. Contexto y Problema
* **Descripción del problema:** ¿Qué problema resuelve o qué necesidad cubre esta especificación?
* **Justificación de negocio:** ¿Por qué es prioritario ahora y qué valor aporta al cliente o al taller?
* **Público objetivo:** ¿A qué usuario o rol impacta (ej. Camila - Novia, Nicolás - Pyme, María Teresa - Colegios, Administrador)?

---

## 2. Alcance (Scope)

### 2.1. Dentro del Alcance (In Scope)
* [ ] Requisito funcional 1
* [ ] Requisito funcional 2
* [ ] Requisito funcional 3

### 2.2. Fuera del Alcance (Out of Scope)
* Aspecto 1 explícitamente excluido de esta entrega.
* Aspecto 2 diferido para una fase posterior.

---

## 3. Requisitos Funcionales y No Funcionales

### 3.1. Requisitos Funcionales (RF)
* **RF-01:** El sistema debe...
* **RF-02:** Cuando el usuario haga clic en... debe suceder...
* **RF-03:** Los datos deben persistir en la tabla...

### 3.2. Requisitos No Funcionales (RNF)
* **RNF-01 (Rendimiento):** El tiempo de carga o respuesta no debe superar...
* **RNF-02 (Seguridad):** Toda consulta a Supabase debe estar protegida por RLS.
* **RNF-03 (Accesibilidad y UX):** Mantener paleta ciruela/rosa/crema y soporte para `prefers-reduced-motion`.

---

## 4. Criterios de Aceptación (Acceptance Criteria)

*Formato Given-When-Then o Checklist verificable:*

* [ ] **Criterio 1:** Dado que un usuario accede a `[URL]`, cuando realiza `[Acción]`, entonces `[Resultado esperado verificable]`.
* [ ] **Criterio 2:** Dado un formulario con campos inválidos, cuando se presiona enviar, entonces se muestra el mensaje de error `[Mensaje]`.
* [ ] **Criterio 3:** En dispositivos móviles (<640px), la vista se adapta correctamente sin desbordamiento horizontal.

---

## 5. Pruebas Requeridas (Testing Strategy)
* [ ] **Pruebas unitarias:** Detallar qué lógica o componente requiere nuevos tests en `tests/unit/`.
* [ ] **Pruebas de integración / E2E:** Indicar si se requiere prueba de flujo de usuario.
* [ ] **Pruebas de regresión:** Confirmar que no se rompen flujos existentes.

---

## 6. Dependencias y Riesgos
* **Dependencias técnicas:** Componentes, librerías o tablas previas requeridas.
* **Riesgos identificados:** Posibles fallos y mitigación planificada.
