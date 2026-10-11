# Registro de Corrección Urgente (Hotfix)

## Identificador y Datos
* **ID:** `HOTFIX-[YYYYMMDD]-[slug]`
* **Fecha:** `YYYY-MM-DD`
* **Severidad:** `CRÍTICA | ALTA`
* **Estado:** `DIAGNOSED | IN PROGRESS | VERIFIED | ARCHIVED`

---

## 1. Incidente y Comportamiento Observado
* **Descripción del fallo:** ¿Qué falló en producción o desarrollo?
* **Impacto:** ¿A qué usuarios o funcionalidades afectó directamente?
* **Evidencia del error:** Código HTTP, logs del servidor, mensaje de consola o captura.

---

## 2. Causa Raíz
* **Explicación técnica:** ¿Por qué ocurrió el error exactamente?
* **Archivos implicados:** Rutas de los archivos donde reside el problema.

---

## 3. Solución Mínima Necesaria
* **Cambio propuesto:** ¿Qué corrección atómica resuelve el problema sin efectos secundarios?
* **Archivos a modificar:**
  - `ruta/al/archivo.ts`
* **No-alcance:** Qué refactorizaciones o mejoras NO se tocarán en este hotfix para minimizar riesgo.

---

## 4. Validaciones Obligatorias
- [ ] `npm run typecheck` → 0 errores de TypeScript.
- [ ] `npm run lint` → 0 errores y 0 advertencias.
- [ ] `npm run test` → todos los tests existentes pasando.
- [ ] `npm run build` → compilación de producción exitosa.
- [ ] Revisión del diff: confirmar que solo se modifican los archivos necesarios y ningún secreto.

---

## 5. Publicación y Comprobación en Producción
* **Commit:** `fix([scope]): [descripción concisa]`
* **Push a `main`:** Ejecutado con Git portable y `wincred`.
* **Hash del commit:** `[hash]`
* **Comprobación en Vercel:** Despliegue completado con estado `Ready` / `Success`.
* **Verificación en el dominio publicado:** URL probada y resultado obtenido.
