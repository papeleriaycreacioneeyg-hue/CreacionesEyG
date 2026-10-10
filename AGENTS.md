# REGLAS PERMANENTES DE WORKFLOW GIT + VERCEL — PAPELERÍA Y CREACIONES E&G

Este archivo establece las instrucciones permanentes para Antigravity en este espacio de trabajo. Se ejecutan automáticamente al finalizar cualquier tarea de desarrollo.

---

## 1. Contexto del Proyecto e Infraestructura
* **Carpeta Raíz:** `c:\CreacionesEyG`
* **Repositorio GitHub:** `https://github.com/papeleriaycreacioneeyg-hue/CreacionesEyG`
* **Rama de Producción:** `main`
* **Despliegue Automático:** Vercel (`https://vercel.com/papeleriay-creaciones-ey-g/creaciones-ey-g`)
* **Binario Git Local:** `c:\CreacionesEyG\git\cmd\git.exe`

---

## 2. Protocolo Obligatorio de Verificación y Push Automático

Al finalizar la implementación de cualquier tarea o corrección solicitada por el usuario:

1. **Revisión de Cambios:** Inspeccionar los archivos creados o modificados.
2. **Comprobación de Calidad y Compilación (Obligatoria):**
   * Ejecutar `npm run typecheck` (verificar 0 errores de TypeScript).
   * Ejecutar `npm run lint` (verificar 0 advertencias/errores de ESLint).
   * Ejecutar `npm run build` (confirmar compilación de producción limpia).
3. **Filtro de Seguridad:**
   * Garantizar que no se incluyan archivos `.env`, secretos, claves privadas ni archivos generados no deseados.
4. **Preparación de Commit:**
   * Hacer `git add` únicamente de los archivos relevantes para la tarea.
   * Crear un commit estructurado con mensaje descriptivo (e.g. `feat: ...`, `fix: ...`).
5. **Sincronización con GitHub:**
   * Ejecutar `git push origin main`.
6. **Reporte:**
   * Informar al usuario el hash del commit, confirmación del push a GitHub y la activación del despliegue automático en Vercel.

---

## 3. Reglas de Seguridad y Protección de Código

* **NUNCA** ejecutar `git push --force`.
* **NUNCA** ejecutar `git reset --hard` ni `git clean -fd`.
* **NUNCA** descartar cambios locales ni trabajo pendiente del usuario.
* **NUNCA** utilizar `git add .` de forma indiscriminada si existen archivos sin seguimiento no relacionados.
* **NUNCA** realizar commits o pushes si la compilación (`npm run build`) o la validación de tipos falla.
* En caso de conflicto de Git o requerimiento de inicio de sesión, detenerse e informar al usuario.
