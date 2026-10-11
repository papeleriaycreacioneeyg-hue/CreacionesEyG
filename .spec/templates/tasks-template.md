# Desglose de Tareas Verificables (Tasks)

## Referencia
* **Spec ID:** `SPEC-[YYYYMMDD]-[slug]`
* **Plan ID:** `PLAN-[YYYYMMDD]-[slug]`

---

## Tareas de Implementación

> **Regla:** Cada tarea debe ser atómica, ejecutable y contar con un criterio claro de verificación antes de avanzar a la siguiente.

### Fase 1: Preparación y Tipos
- [ ] **Tarea 1.1:** Definir tipos e interfaces TypeScript en `types/` o en el módulo correspondiente.
  - *Verificación:* `npm run typecheck` pasa sin errores.
- [ ] **Tarea 1.2:** Crear migración SQL en `supabase/migrations/` si aplica.
  - *Verificación:* Script SQL revisado y con políticas RLS añadidas.

### Fase 2: Lógica de Backend y Server Actions
- [ ] **Tarea 2.1:** Implementar Server Action en `app/actions/`.
  - *Verificación:* Retorna tipos estructurados `{ success, error, data }` y maneja errores de red.
- [ ] **Tarea 2.2:** Escribir prueba unitaria en `tests/unit/` para la lógica pura.
  - *Verificación:* `npm run test` pasa al 100% de los tests existentes y nuevos.

### Fase 3: Componentes de Interfaz de Usuario
- [ ] **Tarea 3.1:** Crear o actualizar componentes UI en `components/`.
  - *Verificación:* Estilos consistentes con la paleta ciruela/rosa/crema, responsive y accesibles.
- [ ] **Tarea 3.2:** Integrar formulario o vista en la ruta de App Router (`app/`).
  - *Verificación:* Navegación fluida y retroalimentación visual al usuario (loaders, notificaciones Sonner).

### Fase 4: Quality Gates y Pre-publicación
- [ ] **Tarea 4.1:** Ejecutar `npm run typecheck` (0 errores).
- [ ] **Tarea 4.2:** Ejecutar `npm run lint` (0 errores, 0 advertencias).
- [ ] **Tarea 4.3:** Ejecutar `npm run test` (todos los tests pasando).
- [ ] **Tarea 4.4:** Ejecutar `npm run build` (compilación limpia en `.next`).
- [ ] **Tarea 4.5:** Revisar `git diff` asegurando cero inclusión de secretos o `.env`.

### Fase 5: Publicación y Verificación en Producción
- [ ] **Tarea 5.1:** Commit descriptivo (`feat(...)` o `fix(...)`) y push a `main` con Git Portable y `wincred`.
- [ ] **Tarea 5.2:** Confirmar despliegue exitoso en Vercel con estado `Ready` / `Success`.
- [ ] **Tarea 5.3:** Validar los criterios de aceptación directamente en el dominio en vivo.
- [ ] **Tarea 5.4:** Mover la especificación a `.spec/changes/archive/`.
