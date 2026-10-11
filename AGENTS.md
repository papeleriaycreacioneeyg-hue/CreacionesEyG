# REGLAS PERMANENTES DE WORKFLOW GIT + VERCEL + SDD — PAPELERÍA Y CREACIONES E&G

Este archivo establece las instrucciones permanentes para Antigravity en este espacio de trabajo. Se ejecutan obligatoriamente en cada ciclo de desarrollo, mejora y corrección.

---

## 1. Contexto del Proyecto e Infraestructura
* **Carpeta Raíz:** `c:\CreacionesEyG`
* **Repositorio GitHub:** `https://github.com/papeleriaycreacioneeyg-hue/CreacionesEyG`
* **Rama de Producción:** `main`
* **Despliegue Automático:** Vercel (`https://vercel.com/papeleriay-creaciones-ey-g/creaciones-ey-g`)
* **Dominio Producción Vercel:** `https://creaciones-ey-g-lx4k.vercel.app`
* **Binario Git Local:** `c:\CreacionesEyG\git\cmd\git.exe`
* **Gestor de Credenciales Configurado:** `wincred` (utiliza las credenciales guardadas en Windows Credential Manager).
* **Inyección de PATH en comandos:** Todos los comandos de Git deben ejecutarse asegurando la ruta de Git Portable:
  `$env:PATH = "c:\CreacionesEyG\git\cmd;" + $env:PATH; & "c:\CreacionesEyG\git\cmd\git.exe" <comando>`
* **Constitución del Proyecto:** `.spec/CONSTITUTION.md` (leyes de calidad, arquitectura, UX y runtime).
* **Mapa Arquitectónico:** `.spec/ARCHITECTURE_MAP.md` (fuente viva de módulos implementados vs pendientes).

---

## 2. Metodología Spec-Driven Development (SDD)

Antes de programar cualquier cambio, se debe clasificar el trabajo y seguir el flujo respectivo:

### 2.1. Flujo Obligatorio para FEATURES (Nuevas Funcionalidades o Mejoras Planificadas)
1. **Analizar solicitud:** Comprender el problema de negocio, usuarios afectados y objetivos.
2. **Crear especificación:** Crear `.spec/changes/active/[feature-id]/spec.md` a partir de `spec-template.md`.
3. **Definir requisitos:** Detallar requisitos funcionales (RF) y no funcionales (RNF).
4. **Definir criterios de aceptación:** Formular criterios verificables (Given-When-Then o checklist).
5. **Analizar impacto:** Evaluar dependencias, compatibilidad de runtime y afectación a componentes existentes.
6. **Crear plan técnico:** Crear `plan.md` con arquitectura, modelo de datos y diseño detallado.
7. **Crear tareas atómicas:** Crear `tasks.md` con pasos pequeños, ordenados y verificables.
8. **Solicitar aprobación del usuario antes de implementar:** NO escribir código de la aplicación sin el visto bueno del usuario.
9. **Implementar:** Ejecutar las tareas paso a paso respetando la constitución del proyecto.
10. **Ejecutar Quality Gates:** Superar typecheck, lint, test y build.
11. **Revisar diff:** Verificar que solo se modifican archivos pertinentes y cero secretos.
12. **Commit:** Crear commit estructurado siguiendo Conventional Commits (`feat(...)`).
13. **Push a `main`:** Enviar a GitHub mediante Git Portable con `wincred`.
14. **Verificar Vercel:** Confirmar que el despliegue termine con estado `Ready` / `Success`.
15. **Comprobar criterios de aceptación en producción:** Validar en el dominio en vivo con evidencias reales.
16. **Archivar la especificación:** Mover la carpeta de `.spec/changes/active/` a `.spec/changes/archive/`.

### 2.2. Flujo Obligatorio para HOTFIX (Errores Urgentes en Producción)
1. **Diagnosticar:** Reproducir y aislar el error mediante logs, códigos HTTP o evidencias directas.
2. **Registrar hotfix:** Crear `.spec/changes/active/hotfix-[fecha]-[slug].md` usando `hotfix-template.md`.
3. **Identificar causa raíz:** Documentar técnicamente la razón exacta del fallo.
4. **Definir cambio mínimo:** Delimitar la corrección atómica para mitigar riesgo colateral.
5. **Implementar:** Aplicar el cambio mínimo estrictamente necesario.
6. **Ejecutar validaciones:** Superar las pruebas y Quality Gates obligatorios.
7. **Commit:** Crear commit con formato `fix(...)`.
8. **Push:** Sincronizar a `main` con Git Portable y `wincred`.
9. **Verificar Vercel:** Comprobar que el nuevo despliegue resuelva el fallo en vivo.
10. **Archivar hotfix:** Mover el documento a `.spec/changes/archive/`.

> **Regla de Oro Hotfix:** No utilizar un hotfix como excusa para saltarse controles de seguridad o validación.

---

## 3. Protocolo Obligatorio de Verificación y Push Automático

Al finalizar la implementación de cualquier tarea o corrección solicitada por el usuario:

1. **Revisión de Cambios:** Inspeccionar los archivos creados o modificados con `git status` y `git diff`.
2. **Comprobación de Calidad y Compilación (Obligatoria - Quality Gates):**
   * Ejecutar `npm run typecheck` (verificar 0 errores de TypeScript).
   * Ejecutar `npm run lint` (verificar 0 advertencias/errores de ESLint).
   * Ejecutar `npm run test` (todos los tests existentes deben pasar correctamente antes de publicar un cambio. La ausencia de tests para una funcionalidad no significa que dicha funcionalidad tenga cobertura completa. Cuando una funcionalidad nueva requiera pruebas, la especificación deberá indicar qué pruebas deben crearse).
   * Ejecutar `npm run build` (confirmar compilación de producción limpia).
3. **Filtro de Seguridad:**
   * Garantizar que no se incluyan archivos `.env`, secretos, claves privadas ni archivos generados no deseados.
4. **Preparación de Commit:**
   * Hacer `git add` únicamente de los archivos relevantes para la tarea.
   * Crear un commit estructurado con mensaje descriptivo (e.g. `feat: ...`, `fix: ...`, `chore: ...`).
5. **Sincronización con GitHub:**
   * Ejecutar `git push origin main` con la configuración de `wincred`.
   * **Comprobación Real:** Confirmar que el comando finalizó con código de salida 0 y que `git status` muestra `Your branch is up to date with 'origin/main'`. No confundir un comando en segundo plano o pendiente con una sincronización completada.
6. **Reporte:**
   * Informar al usuario el hash del commit, la confirmación de la sincronización en GitHub y la activación y estado del despliegue en Vercel.

---

## 4. Reglas de Seguridad y Protección de Código

* **NUNCA** ejecutar `git push --force`.
* **NUNCA** ejecutar `git reset --hard` ni `git clean -fd`.
* **NUNCA** descartar cambios locales ni trabajo pendiente del usuario.
* **NUNCA** utilizar `git add .` de forma indiscriminada si existen archivos sin seguimiento no relacionados.
* **NUNCA** realizar commits o pushes si la compilación (`npm run build`) o la validación de tipos falla.
* **NUNCA** modificar el runtime del middleware (`Edge` vs `Node.js`) sin especificación previa, justificación técnica y pruebas aprobadas.
* En caso de conflicto de Git o requerimiento de intervención, detenerse e informar al usuario.
