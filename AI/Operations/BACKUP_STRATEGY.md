# Backup Strategy & Disaster Recovery Plan
## Papelería y Creaciones E&G — Plan de Respaldo de Datos y Recuperación Cloud

---

## 1. Respaldo de Base de Datos (PostgreSQL)

*   **Copias de Seguridad Automatizadas:** Supabase realiza backups diarios automáticos a nivel físico de la base de datos PostgreSQL, almacenándolos en su propia red redundante.
*   **Copias de Seguridad Lógicas Semanales:** El rol de administración programará una copia de seguridad lógica utilizando `pg_dump` para resguardar las tablas críticas (`orders`, `quotes`, `profiles`) fuera de la infraestructura de Supabase (ej: almacenamiento en frío Glacier de AWS).

---

## 2. Respaldo de Archivos Multimedia (Supabase Storage)

*   **Respaldo de Diseños de Clientes:** El bucket `client-designs` aloja los archivos vectoriales críticos para la producción. Se implementará una sincronización periódica utilizando la CLI de Supabase o scripts de Node.js para replicar el bucket hacia una bóveda secundaria de almacenamiento en la nube de forma semanal.

---

## 3. Plan de Recuperación de Desastres (DRP)

En caso de fallo catastrófico del centro de datos o corrupción crítica de base de datos:

1.  **Aislamiento y Modo Mantenimiento:** Activar el banner de mantenimiento dinámico en Supabase para bloquear nuevos accesos de clientes a la web.
2.  **Restauración de Punto de Restauración:** Utilizar el dashboard de Supabase para restaurar la base de datos al último snapshot diario limpio verificado.
3.  **Verificación de Consistencia:** Ejecutar scripts de validación de integridad para comprobar que no existan inconsistencias de stock en las variantes de productos.
