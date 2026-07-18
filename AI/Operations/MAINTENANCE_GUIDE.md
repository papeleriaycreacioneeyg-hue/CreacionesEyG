# Operations & System Maintenance Guide
## Papelería y Creaciones E&G — Manual de Mantenimiento Rutinario y Auditorías

---

## 1. Monitoreo y Observabilidad

Para asegurar que la plataforma mantenga un uptime de 99.9% y un rendimiento en verde de Core Web Vitals:

*   **Vercel Analytics:** Monitorear el puntaje real de la Experiencia del Usuario (Speed Index, LCP, CLS) en producción.
*   **Supabase Database Health:** Controlar el uso de disco, consumo de memoria de CPU de PostgreSQL, y tiempos promedio de ejecución de transacciones complejas en las horas pico del catálogo.

---

## 2. Planificación de Actualizaciones de Paquetes (Updates)

*   **Auditorías de Dependencias:** Ejecutar mensualmente `npm audit` para identificar y mitigar vulnerabilidades críticas de seguridad en dependencias de Next.js, React o herramientas de desarrollo.
*   **Actualización de Frameworks:** Las actualizaciones de Next.js o librerías críticas de Supabase se realizarán primero en una rama aislada de desarrollo, ejecutando las suites de prueba `npm run test` y `npm run test:e2e` en local antes de mezclar a la rama principal de producción.

---

## 3. Revisiones de Seguridad y Auditoría Operativa

*   **Inspección de Políticas RLS:** Revisar semestralmente las políticas Row Level Security en la consola de Supabase para comprobar que ninguna modificación accidental haya expuesto tablas de compras o diseños a lecturas públicas.
*   **Auditoría de Logs del Taller:** Evaluar el histórico de la tabla `audit_logs` para identificar posibles anomalías en cambios manuales de stock o anulaciones recurrentes de órdenes comerciales.
