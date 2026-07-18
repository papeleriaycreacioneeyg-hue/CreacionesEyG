# AI Strategy & Automation Layer Architecture
## Papelería y Creaciones E&G — Capa de Inteligencia Artificial y Automatizaciones Cloud

---

## 1. Visión y Casos de Uso de la Inteligencia Artificial

La inteligencia artificial en **Papelería y Creaciones E&G** se implementa bajo el principio de **"Copiloto y Asistencia"**, diseñando agentes cognitivos que potencian las capacidades humanas del taller, el área comercial y de marketing sin delegar decisiones finales automatizadas:

```mermaid
graph TD
    UserQuery[Cliente / Canal Externo] -->|WhatsApp / Web| AISales[AI Sales Assistant]
    AISales -->|Clasificación| RequestQueue[public.customer_requests]
    RequestQueue -->|Recomendación| AIQuote[AI Quote Assistant]
    AIQuote -->|Maquetado Preliminar| Designer[Diseñador Humano (Aprobación)]
```

### Módulos Inteligentes Proyectados:
1.  **AI Sales Assistant (Ventas):** Chatbot conversacional para WhatsApp y Web alimentado por una Base de Conocimiento (Knowledge Base). Clasifica intenciones de compra y crea de manera automatizada registros limpios en `customer_requests`.
2.  **AI Product Recommendation (Recomendador):** Motor que procesa la cesta del cliente y sugiere productos o variantes complementarias basándose en asociaciones históricas.
3.  **AI Quote Assistant (Cotizador):** Asistente interno del panel administrativo que lee la descripción del cliente y propone materiales, técnicas y precios sugeridos basados en cotizaciones anteriores exitosas.
4.  **AI Content Generator (Marketing/SEO):** Generador de descripciones de producto optimizadas para SEO, metadata, y propuestas de publicaciones de blog MDX a partir de palabras clave cargadas en el inventario.

---

## 2. Arquitectura de Datos Futura (Capa IA)

Para albergar la memoria conversacional y el entrenamiento de los agentes, se proponen las siguientes entidades conceptuales listas para ser normalizadas en el esquema de base de datos PostgreSQL:

```text
Entidades Conceptuales IA:

ai_conversations (Conversaciones)
├── id: UUID (PK)
├── customer_id: UUID (FK ➔ profiles.id, Nullable para anónimos)
├── platform: String (WhatsApp, WebChat)
└── status: String (active, closed)

ai_messages (Mensajes Históricos)
├── id: UUID (PK)
├── conversation_id: UUID (FK ➔ ai_conversations.id)
├── sender_role: String (user, assistant, system)
└── content: Text

ai_knowledge (Base de Conocimiento Vectorial)
├── id: UUID (PK)
├── category: String (FAQ, Materiales, Envíos)
├── content_chunk: Text
└── embedding: Vector(1536) -- Indexación HNSW para búsqueda semántica pgvector
```

---

## 3. Seguridad, Privacidad y Control Humano

*   **Principio de Validación Humana:** Ninguna cotización generada por la IA se enviará al cliente sin la firma o aprobación explícita de un vendedor humano.
*   **Privacidad de Datos Personales:** El pipeline del modelo de lenguaje (LLM) procesará las solicitudes eliminando datos de identificación personal sensibles (ej: números de teléfono, direcciones exactas) para garantizar la conformidad con estándares de seguridad y evitar fugas de información.
