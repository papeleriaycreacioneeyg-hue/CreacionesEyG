export interface CatalogCategory {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
  color: string;
}

export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  shortDescription: string;
  fullDescription: string;
  customizationDetails: string[];
  suggestedOccasions: string[];
  badge?: string;
  // Metadata for prototype visual presentation
  themeColor: string;
  accentColor: string;
  icon: string;
  galleryImages: { title: string; subtitle: string }[];
  targetWebpFilename: string;
}

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    id: "cat-1",
    slug: "papeleria-escolar",
    name: "Papelería Escolar y Didáctica",
    shortName: "Escolar y Didáctica",
    description:
      "Etiquetas vinílicas, horarios termolaminados y recursos didácticos para el aprendizaje.",
    iconName: "BookOpen",
    color: "#e04b88",
  },
  {
    id: "cat-2",
    slug: "fiestas-eventos",
    name: "Fiestas y Eventos",
    shortName: "Fiestas y Eventos",
    description: "Cotillones, cake toppers 3D, pulseras y lienzos para celebraciones memorables.",
    iconName: "PartyPopper",
    color: "#4a154b",
  },
  {
    id: "cat-3",
    slug: "bodas-recuerdos",
    name: "Bodas y Recuerdos Especiales",
    shortName: "Bodas y Recuerdos",
    description:
      "Invitaciones nupciales finas, etiquetas conmemorativas y recuerdos con acabados delicados.",
    iconName: "Sparkles",
    color: "#e5c386",
  },
  {
    id: "cat-4",
    slug: "cajas-desayunos",
    name: "Cajas y Desayunos Sorpresa",
    shortName: "Cajas y Desayunos",
    description:
      "Bandejas artesanales, cajas explosivas decoradas y empaques festivos para regalar.",
    iconName: "Gift",
    color: "#e04b88",
  },
  {
    id: "cat-5",
    slug: "corporativo-emprendedores",
    name: "Corporativo y Emprendedores",
    shortName: "Corporativo",
    description: "Papelería comercial, calendarios de sobremesa, imanes y avisos para tu marca.",
    iconName: "Briefcase",
    color: "#4a154b",
  },
  {
    id: "cat-6",
    slug: "regalos-especiales",
    name: "Regalos y Fechas Especiales",
    shortName: "Fechas Especiales",
    description:
      "Agendas devocionales, cuadros de dedicatoria y detalles únicos para papá, mamá y aniversarios.",
    iconName: "Heart",
    color: "#e04b88",
  },
];

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  // 1. Papelería Escolar y Didáctica
  {
    id: "prod-1",
    slug: "etiquetas-escolares-personalizadas",
    name: "Etiquetas Escolares Personalizadas",
    categorySlug: "papeleria-escolar",
    categoryName: "Papelería Escolar y Didáctica",
    shortDescription:
      "Planchas de stickers vinílicos troquelados ultra resistentes al agua y al roce.",
    fullDescription:
      "Set completo de etiquetas adhesivas personalizadas con nombre, apellido y personaje favorito. Impresas en vinilo de alta adherencia y corte digital, ideales para marcar lápices, cuadernos, termos y estuches.",
    customizationDetails: [
      "Nombre completo y curso del estudiante",
      "Elección de personaje, temática o colores de fondo",
      "Variedad de formatos: lápices, cuadernos y multiuso",
    ],
    suggestedOccasions: ["Regreso a clases", "Colegio y jardín infantil"],
    badge: "Más Solicitado",
    themeColor: "#fdf1ed",
    accentColor: "#e04b88",
    icon: "Tag",
    galleryImages: [
      { title: "Plancha Completa", subtitle: "Variedad de tamaños y formas" },
      { title: "Aplicadas en Cuadernos", subtitle: "Alta adherencia y acabado brillante" },
      { title: "Etiquetas de Lápices", subtitle: "Formato delgado y resistente" },
    ],
    targetWebpFilename: "etiquetas-escolares-personalizadas-primary.webp",
  },
  {
    id: "prod-2",
    slug: "horario-escolar-personalizado",
    name: "Horarios Escolares Personalizados",
    categorySlug: "papeleria-escolar",
    categoryName: "Papelería Escolar y Didáctica",
    shortDescription: "Horario semanal termolaminado reutilizable, apto para escribir y borrar.",
    fullDescription:
      "Planificador de materias semanales para el colegio. Diseñado con esquinas redondeadas y termolaminado de alto micraje para permitir escribir con plumón de pizarra y limpiar fácilmente sin manchar.",
    customizationDetails: [
      "Nombre del alumno y año lectivo",
      "Temáticas personalizadas de dibujos, deportes o anime",
      "Opción imantada para refrigerador o de escritorio",
    ],
    suggestedOccasions: ["Inicio de año escolar", "Organización del hogar"],
    themeColor: "#f1ebfc",
    accentColor: "#4a154b",
    icon: "Calendar",
    galleryImages: [
      { title: "Vista Semanal", subtitle: "Casillas amplias para cada materia" },
      { title: "Acabado Plastificado", subtitle: "Resistente a líquidos y manchas" },
    ],
    targetWebpFilename: "horario-escolar-personalizado-primary.webp",
  },
  {
    id: "prod-3",
    slug: "libro-de-sumas-personalizado",
    name: "Libros de Sumas Didácticos",
    categorySlug: "papeleria-escolar",
    categoryName: "Papelería Escolar y Didáctica",
    shortDescription: "Libro interactivo anillado con ejercicios matemáticos plastificados.",
    fullDescription:
      "Material pedagógico diseñado para reforzar las matemáticas de forma lúdica. Cada página cuenta con ejercicios ilustrados que el estudiante puede resolver con plumón borrable y repetir cuantas veces quiera.",
    customizationDetails: [
      "Nombre del estudiante en portada",
      "Nivel de dificultad: iniciación preescolar o primer ciclo básico",
      "Anillado doble cero metálico con tapas duras",
    ],
    suggestedOccasions: ["Refuerzo escolar", "Regalo didáctico infantil"],
    badge: "Educativo",
    themeColor: "#fdf1ed",
    accentColor: "#e04b88",
    icon: "BookOpen",
    galleryImages: [
      { title: "Portada Dura", subtitle: "Diseño con personaje y nombre" },
      { title: "Páginas Interactivas", subtitle: "Ilustraciones a todo color" },
    ],
    targetWebpFilename: "libro-de-sumas-personalizado-primary.webp",
  },
  {
    id: "prod-4",
    slug: "pizarra-suma-y-resta",
    name: "Pizarras Didácticas de Suma y Resta",
    categorySlug: "papeleria-escolar",
    categoryName: "Papelería Escolar y Didáctica",
    shortDescription: "Pizarra borrable con cuadrículas de operaciones y figuras de apoyo.",
    fullDescription:
      "Herramienta visual para aprender adición y sustracción posicional. Plastificada en material de alta durabilidad, incluye zonas para representar decenas y unidades de manera intuitiva.",
    customizationDetails: [
      "Diseño temático infantil a elección",
      "Nombre del alumno en la cabecera",
      "Incluye plumón con borrador incorporado",
    ],
    suggestedOccasions: ["Apoyo en casa", "Docentes y psicopedagogía"],
    themeColor: "#f1ebfc",
    accentColor: "#4a154b",
    icon: "Grid",
    galleryImages: [
      { title: "Cuadrícula Posicional", subtitle: "Guías para orden de cifras" },
      { title: "Demostración de Borrado", subtitle: "Limpieza rápida sin manchas" },
    ],
    targetWebpFilename: "pizarra-suma-y-resta-primary.webp",
  },
  {
    id: "prod-5",
    slug: "tablas-de-multiplicar",
    name: "Tablas de Multiplicar de Bolsillo",
    categorySlug: "papeleria-escolar",
    categoryName: "Papelería Escolar y Didáctica",
    shortDescription: "Set llavero con tarjetas termolaminadas del 1 al 12 en abanico.",
    fullDescription:
      "Práctico llavero didáctico que contiene todas las tablas de multiplicar del 1 al 12 organizadas por colores. Su anilla metálica permite transportarlo en el estuche o mochila para consultas rápidas.",
    customizationDetails: [
      "Tarjeta de portada con nombre del alumno",
      "Paleta de colores personalizada",
      "Acabado termolaminado resistente al roce diario",
    ],
    suggestedOccasions: ["Estudio diario", "Premios de curso"],
    themeColor: "#fdfaf6",
    accentColor: "#e5c386",
    icon: "Layers",
    galleryImages: [
      { title: "Abanico Didáctico", subtitle: "Despliegue cómodo con anilla metálica" },
      { title: "Detalle de Tablas", subtitle: "Tipografía clara y contrastada" },
    ],
    targetWebpFilename: "tablas-de-multiplicar-primary.webp",
  },

  // 2. Fiestas y Eventos
  {
    id: "prod-6",
    slug: "cotillones-personalizados",
    name: "Cotillones Personalizados",
    categorySlug: "fiestas-eventos",
    categoryName: "Fiestas y Eventos",
    shortDescription: "Sets festivos con antifaces, corbatas y gorros con troquelado especial.",
    fullDescription:
      "Conjunto festivo confeccionado a mano con cartulinas premium, escarchas y apliques de vinilo. Dale un toque inolvidable y exclusivo a la hora loca de tu cumpleaños, graduación o fiesta temático.",
    customizationDetails: [
      "Frases y dedicatorias impresas en cada pieza",
      "Motivos de fiesta (retro, neón, infantil, elegante)",
      "Paquetes por cantidad de invitados",
    ],
    suggestedOccasions: ["Cumpleaños", "Graduaciones", "Fiestas de fin de año"],
    badge: "Fiesta",
    themeColor: "#f1ebfc",
    accentColor: "#e04b88",
    icon: "PartyPopper",
    galleryImages: [
      { title: "Set Completo", subtitle: "Antifaces, gorros y corbatas" },
      { title: "Detalle Troquelado", subtitle: "Cartulinas glitter y metalizadas" },
    ],
    targetWebpFilename: "cotillones-personalizados-primary.webp",
  },
  {
    id: "prod-7",
    slug: "kits-cumpleanos-personalizado",
    name: "Kits de Cumpleaños Personalizados",
    categorySlug: "fiestas-eventos",
    categoryName: "Fiestas y Eventos",
    shortDescription: "Cajitas temáticas milk, banderines y papelería candy bar en capas 3D.",
    fullDescription:
      "Ambientación integral para mesas dulces. Incluye cajitas tipo lecherita, conos pirámide, banderines de felicitación y envoltorios de golosinas con técnica de relieve multicapa.",
    customizationDetails: [
      "Nombre y edad del festejado en 3D",
      "Temáticas personalizadas (Disney, superhéroes, safari, etc.)",
      "Piezas con detalles en cartulina glitter y cinta de raso",
    ],
    suggestedOccasions: ["Cumpleaños infantiles", "Baby showers"],
    badge: "Artesanal",
    themeColor: "#fdf1ed",
    accentColor: "#4a154b",
    icon: "Sparkles",
    galleryImages: [
      { title: "Mesa Dulce", subtitle: "Cajitas decoradas y banderín" },
      { title: "Cajas Milk 3D", subtitle: "Relieves con capas de cartulina" },
    ],
    targetWebpFilename: "kits-cumpleanos-personalizado-primary.webp",
  },
  {
    id: "prod-8",
    slug: "lienzo-revelacion-de-genero",
    name: "Lienzo de Revelación de Género",
    categorySlug: "fiestas-eventos",
    categoryName: "Fiestas y Eventos",
    shortDescription: "Telón vinílico de gran formato con temática Boy or Girl para votación.",
    fullDescription:
      "Backdrop fotográfico de alta resolución en tela vinílica con acabado mate antibrillo. Diseñado especialmente con casillas para que los invitados dejen sus votos antes de la gran revelación.",
    customizationDetails: [
      "Nombres de los padres y fecha del evento",
      "Paleta de colores pasteles (rosa, celeste, neutro)",
      "Incluye ojetillos metálicos en esquinas para sujeción",
    ],
    suggestedOccasions: ["Gender reveal party", "Baby shower"],
    themeColor: "#f1ebfc",
    accentColor: "#e04b88",
    icon: "Image",
    galleryImages: [
      { title: "Lienzo Completo", subtitle: "Dimensiones panorámicas de fondo" },
      { title: "Detalle de Gráfica", subtitle: "Impresión nítida antibrillo" },
    ],
    targetWebpFilename: "lienzo-revelacion-de-genero-primary.webp",
  },
  {
    id: "prod-9",
    slug: "pulseras-fluorescentes-eventos",
    name: "Pulseras Fluorescentes para Fiestas",
    categorySlug: "fiestas-eventos",
    categoryName: "Fiestas y Eventos",
    shortDescription: "Packs de pulseras de neón luminosas para cotillón y fiestas flúor.",
    fullDescription:
      "Pulseras reactivas que brillan intensamente en la oscuridad al doblarse y activarse. Presentadas en empaque protector con conectores para armar brazaletes o collares durante el baile.",
    customizationDetails: [
      "Variedad de colores neón (verde, rosa, azul, amarillo)",
      "Tarjetas de empaque con mensaje conmemorativo",
      "Packs por volumen de fiesta",
    ],
    suggestedOccasions: ["Fiestas flúor", "Eventos nocturnos", "Matrimonios"],
    themeColor: "#fdfaf6",
    accentColor: "#4a154b",
    icon: "Sun",
    galleryImages: [
      { title: "Brillo en Oscuridad", subtitle: "Luminosidad duradera para baile" },
      { title: "Presentación", subtitle: "Empaque sellado con conectores" },
    ],
    targetWebpFilename: "pulseras-fluorescentes-eventos-primary.webp",
  },
  {
    id: "prod-10",
    slug: "toppers-de-tortas",
    name: "Cake Toppers y Adornos para Tortas",
    categorySlug: "fiestas-eventos",
    categoryName: "Fiestas y Eventos",
    shortDescription: "Adornos para tortas en relieve multicapa con cartulinas glitter y foil.",
    fullDescription:
      "Pieza central artesanal para coronar tortas de cumpleaños y celebraciones. Fabricada combinando capas de cartulina brillante, efectos holográficos y palillo acrílico transparente de grado alimentario.",
    customizationDetails: [
      "Nombre del homenajeado y número de edad",
      "Temáticas personalizadas y siluetas troqueladas",
      "Opciones con efecto shaker con lentejuelas en el interior",
    ],
    suggestedOccasions: ["Cumpleaños", "Bautizos", "Aniversarios"],
    badge: "Favorito",
    themeColor: "#fdf1ed",
    accentColor: "#e5c386",
    icon: "Cake",
    galleryImages: [
      { title: "Topper Shaker 3D", subtitle: "Capas de brillo y relieve" },
      { title: "Puesto en Torta", subtitle: "Vástago transparente seguro" },
    ],
    targetWebpFilename: "toppers-de-tortas-primary.webp",
  },

  // 3. Bodas y Recuerdos Especiales
  {
    id: "prod-11",
    slug: "arreglos-cursos-estudiantiles",
    name: "Arreglos de Cursos Estudiantiles",
    categorySlug: "bodas-recuerdos",
    categoryName: "Bodas y Recuerdos Especiales",
    shortDescription: "Arreglos de graduación con birretes, chocolates y dedicatorias de curso.",
    fullDescription:
      "Detalle conmemorativo para licenciaturas y despedidas de curso escolar. Cada arreglo incluye golosinas, globo personalizado y una tarjeta con los nombres de todos los compañeros o profesores.",
    customizationDetails: [
      "Insignia del colegio y número de generación",
      "Nombre de cada alumno en cinta de raso",
      "Cajas decorativas con colores institucionales",
    ],
    suggestedOccasions: ["Licenciaturas de 4to medio", "Graduaciones de 8vo básico"],
    themeColor: "#f1ebfc",
    accentColor: "#4a154b",
    icon: "Award",
    galleryImages: [
      { title: "Arreglo Graduación", subtitle: "Birrete y detalles escolares" },
      { title: "Cintas Marcadas", subtitle: "Nombres del curso en foil dorado" },
    ],
    targetWebpFilename: "arreglos-cursos-estudiantiles-primary.webp",
  },
  {
    id: "prod-12",
    slug: "etiquetas-botellas-15-anos",
    name: "Etiquetas para Botellas de 15 Años",
    categorySlug: "bodas-recuerdos",
    categoryName: "Bodas y Recuerdos Especiales",
    shortDescription: "Etiquetas autoadhesivas laminadas en foil dorado para botellas y souvenirs.",
    fullDescription:
      "Elegantes rótulos diseñados a la medida de botellas de vino o espumante de brindis. Confeccionadas con materiales resistentes al frío de la hielera y acabados metalizados brillantes.",
    customizationDetails: [
      "Nombre de la quinceañera y fecha del evento",
      "Detalles metalizados en foil rosa gold o dorado",
      "Adaptadas a marcas y tamaños de botellas estándar",
    ],
    suggestedOccasions: ["Fiestas de 15 años", "Brindis conmemorativos"],
    badge: "Elegante",
    themeColor: "#fdf1ed",
    accentColor: "#e5c386",
    icon: "Wine",
    galleryImages: [
      { title: "Botella Etiquetada", subtitle: "Foil dorado sobre fondo aperlado" },
      { title: "Detalle de Impresión", subtitle: "Resistente a la humedad y frío" },
    ],
    targetWebpFilename: "etiquetas-botellas-15-anos-primary.webp",
  },
  {
    id: "prod-13",
    slug: "kits-bodas-personalizados",
    name: "Papelería y Kits para Bodas",
    categorySlug: "bodas-recuerdos",
    categoryName: "Bodas y Recuerdos Especiales",
    shortDescription: "Invitaciones finas con corte láser, minutas, números de mesa y lacre.",
    fullDescription:
      "Suite de papelería nupcial creada para transmitir la magia de tu matrimonio. Cada elemento armoniza con la paleta de la boda, desde sobres con forro floral hasta sellos de cera lacrada artesanal.",
    customizationDetails: [
      "Monograma o iniciales de los novios",
      "Papelería texturada de alto gramaje (linolino, perla)",
      "Sobres con forro interior personalizado y lacrado a mano",
    ],
    suggestedOccasions: ["Matrimonios civiles y religiosos", "Bodas de plata"],
    badge: "Exclusivo",
    themeColor: "#fdfaf6",
    accentColor: "#e04b88",
    icon: "Heart",
    galleryImages: [
      { title: "Invitación Nupcial", subtitle: "Sobre calado láser y sello de lacre" },
      { title: "Papelería de Mesa", subtitle: "Minutas y marcasitios coordinados" },
      { title: "Caja de Recuerdos", subtitle: "Detalle especial para padrinos" },
    ],
    targetWebpFilename: "kits-bodas-personalizados-primary.webp",
  },
  {
    id: "prod-14",
    slug: "llaveros-personalizados",
    name: "Llaveros de Recuerdo Personalizados",
    categorySlug: "bodas-recuerdos",
    categoryName: "Bodas y Recuerdos Especiales",
    shortDescription: "Llaveros acrílicos transparentes con fotografías, dedicatoria y borlas.",
    fullDescription:
      "Recuerdo conmemorativo perdurable para obsequiar a familiares e invitados. Confeccionados en acrílico cristal de alta pureza con fotografía nítida en ambas caras y herrajes metálicos pulidos.",
    customizationDetails: [
      "Fotografía en alta definición y dedicatoria",
      "Formas geométricas: corazón, círculo o placa",
      "Borla de seda decorativa en color a elección",
    ],
    suggestedOccasions: ["Bautizos", "Matrimonios", "Primera comunión", "Licenciaturas"],
    themeColor: "#f1ebfc",
    accentColor: "#4a154b",
    icon: "Key",
    galleryImages: [
      { title: "Colección de Llaveros", subtitle: "Acrílico cristal con herrajes dorados" },
      { title: "Detalle con Borla", subtitle: "Acabado delicado para souvenir" },
    ],
    targetWebpFilename: "llaveros-personalizados-primary.webp",
  },

  // 4. Cajas y Desayunos Sorpresa
  {
    id: "prod-15",
    slug: "caja-sorpresa-hombres",
    name: "Caja Sorpresa para Hombres",
    categorySlug: "cajas-desayunos",
    categoryName: "Cajas y Desayunos Sorpresa",
    shortDescription: "Caja sorpresa con compartimentos desplegables, globos y regalos masculinos.",
    fullDescription:
      "Experiencia de apertura con caja rígida decorada en tonos sobrios (azul marino, dorado, negro y kraft). En su interior contiene chocolates finos, bebidas selectas y mensajes personalizados ocultos.",
    customizationDetails: [
      "Mensajes y fotos en solapas interiores",
      "Selección de golosinas, cerveza o snacks preferidos",
      "Globo personalizado con helio y moño exterior",
    ],
    suggestedOccasions: ["Cumpleaños", "Aniversario de novios", "Ascensos laborales"],
    badge: "Sorpresa",
    themeColor: "#f1ebfc",
    accentColor: "#4a154b",
    icon: "Gift",
    galleryImages: [
      { title: "Caja Desplegada", subtitle: "Compartimentos con fotos y chocolates" },
      { title: "Presentación Exterior", subtitle: "Lazo elegante con dedicatoria en tapa" },
    ],
    targetWebpFilename: "caja-sorpresa-hombres-primary.webp",
  },
  {
    id: "prod-16",
    slug: "caja-sorpresa-mujeres",
    name: "Caja Sorpresa para Mujeres",
    categorySlug: "cajas-desayunos",
    categoryName: "Cajas y Desayunos Sorpresa",
    shortDescription: "Caja premium en tonos rosas con rosas preservadas, dulces y luces LED.",
    fullDescription:
      "Detalle romántico y delicado para homenajear a una mujer especial. Al levantar la tapa, revela una cuidada selección de rosas, chocolates gourmet y cartas de dedicatoria elaboradas en nuestro taller.",
    customizationDetails: [
      "Letras en vinilo oro espejo en la tapa exterior",
      "Incorporación de luces de hadas cálidas",
      "Espacio para perfume, joya o fotografías impresas",
    ],
    suggestedOccasions: ["Cumpleaños", "Aniversarios", "Día de la Madre"],
    badge: "Romántico",
    themeColor: "#fdf1ed",
    accentColor: "#e04b88",
    icon: "HeartHandshake",
    galleryImages: [
      { title: "Interior Floral", subtitle: "Rosas, luces cálidas y bombones" },
      { title: "Toma Cenital", subtitle: "Distribución organizada de detalles" },
    ],
    targetWebpFilename: "caja-sorpresa-mujeres-primary.webp",
  },
  {
    id: "prod-17",
    slug: "desayuno-sorpresa",
    name: "Desayunos Sorpresa",
    categorySlug: "cajas-desayunos",
    categoryName: "Cajas y Desayunos Sorpresa",
    shortDescription: "Bandejas artesanales de madera con tazón, jugo natural y panadería gourmet.",
    fullDescription:
      "Comienza el día de esa persona especial con una sorpresa inolvidable. Servido sobre bandeja de madera blanca pulida, incluye tazón de cerámica estampado, cubiertos, jugo embotellado y delicias dulces y saladas.",
    customizationDetails: [
      "Tazón cerámico con foto y mensaje de dedicatoria",
      "Etiquetas y servilleteros con papelería a juego",
      "Globo metalizado con helio y mensaje temático",
    ],
    suggestedOccasions: ["Cumpleaños", "Día del Amor", "Día de la Madre"],
    badge: "Gourmet",
    themeColor: "#fdfaf6",
    accentColor: "#e5c386",
    icon: "Coffee",
    galleryImages: [
      { title: "Bandeja Servida", subtitle: "Tazón, jugo natural y bollería" },
      { title: "Detalle de Papelería", subtitle: "Empaques rotulados a mano" },
    ],
    targetWebpFilename: "desayuno-sorpresa-primary.webp",
  },
  {
    id: "prod-18",
    slug: "mini-cajitas-de-pascua",
    name: "Mini Cajitas de Pascua de Resurrección",
    categorySlug: "cajas-desayunos",
    categoryName: "Cajas y Desayunos Sorpresa",
    shortDescription:
      "Cajitas troqueladas con forma de conejito con visor para huevitos de chocolate.",
    fullDescription:
      "Tiernas cajitas de Pascua confeccionadas en cartulinas importadas de colores pasteles. Cuentan con orejitas troqueladas en 3D y ventana transparente para lucir los huevitos y bombones en su interior.",
    customizationDetails: [
      "Nombre de cada niño en la cinta decorativa",
      "Colores pasteles a elección: menta, rosa, celeste o lavanda",
      "Packs familiares o escolares por volumen",
    ],
    suggestedOccasions: ["Pascua de Resurrección", "Detalle para colegios y jardines"],
    themeColor: "#f1ebfc",
    accentColor: "#e04b88",
    icon: "Smile",
    galleryImages: [
      { title: "Conejitos Troquelados", subtitle: "Orejas en relieve y visor de dulces" },
      { title: "Set de Colores Pastel", subtitle: "Empaque festivo infantil" },
    ],
    targetWebpFilename: "mini-cajitas-de-pascua-primary.webp",
  },

  // 5. Corporativo y Emprendedores
  {
    id: "prod-19",
    slug: "avisos-personalizados",
    name: "Avisos Publicitarios Personalizados",
    categorySlug: "corporativo-emprendedores",
    categoryName: "Corporativo y Emprendedores",
    shortDescription: "Letreros acrílicos con logotipo, códigos QR para pago y redes sociales.",
    fullDescription:
      "Identidad visual profesional para mesones de atención, tiendas físicas y eventos. Confeccionados en acrílico con rotulación de corte vinílico o impresión UV directa para promocionar tu marca y medios de pago.",
    customizationDetails: [
      "Logotipo vectorial de tu empresa o emprendimiento",
      "Códigos QR directos a Instagram, WhatsApp o transferencia",
      "Base de madera natural o acrílica para sobremesa",
    ],
    suggestedOccasions: ["Apertura de tiendas", "Stands y ferias", "Recepción"],
    badge: "Para Marcas",
    themeColor: "#fdfaf6",
    accentColor: "#4a154b",
    icon: "QrCode",
    galleryImages: [
      { title: "Aviso de Sobremesa", subtitle: "QR de pago y redes sociales" },
      { title: "Detalle de Acrílico", subtitle: "Acabado brillante y base rígida" },
    ],
    targetWebpFilename: "avisos-personalizados-primary.webp",
  },
  {
    id: "prod-20",
    slug: "calendarios-escritorio-imantados",
    name: "Calendarios de Escritorio e Imantados",
    categorySlug: "corporativo-emprendedores",
    categoryName: "Corporativo y Emprendedores",
    shortDescription: "Calendarios corporativos de sobremesa con anillado metálico o imán.",
    fullDescription:
      "Material publicitario de presencia durante los 365 días del año. Diseñamos calendarios de base triangular rígida para escritorio con 12 meses ilustrados, así como formatos magnéticos ideales para refrigeradores.",
    customizationDetails: [
      "Logotipo, datos de contacto y colores de marca en cada hoja",
      "Hojas con espacio para notas y feriados de Chile",
      "Acabado anillado doble cero metálico",
    ],
    suggestedOccasions: ["Regalos corporativos de fin de año", "Merchandising de clientes"],
    themeColor: "#fdf1ed",
    accentColor: "#4a154b",
    icon: "CalendarDays",
    galleryImages: [
      { title: "Calendario Triangular", subtitle: "Base rígida de sobremesa" },
      { title: "Modelo Imantado", subtitle: "Adherencia total para superficies metálicas" },
    ],
    targetWebpFilename: "calendarios-escritorio-imantados-primary.webp",
  },
  {
    id: "prod-21",
    slug: "material-corporativo-personalizado",
    name: "Merchandising y Papelería Corporativa",
    categorySlug: "corporativo-emprendedores",
    categoryName: "Corporativo y Emprendedores",
    shortDescription:
      "Tarjetas de presentación soft-touch, carpetas institucionales y bolsas kraft.",
    fullDescription:
      "Papelería ejecutiva que proyecta seriedad y confianza. Confeccionamos carpetas con bolsillo para presupuestos, hojas membretadas, sobres y tarjetas de presentación con laminado mate y detalles sectorizados.",
    customizationDetails: [
      "Aplicación rigurosa de manual de marca corporativo",
      "Terminaciones premium: polimate, laca UV sectorizada",
      "Producción de paquetes combinados para colaboradores",
    ],
    suggestedOccasions: ["Presentaciones comerciales", "Eventos corporativos"],
    badge: "Empresas",
    themeColor: "#f1ebfc",
    accentColor: "#4a154b",
    icon: "Briefcase",
    galleryImages: [
      { title: "Set Ejecutivo", subtitle: "Carpetas, hojas membrete y tarjetas" },
      { title: "Tarjetas Soft-Touch", subtitle: "Terminación sedosa y esquinas finas" },
    ],
    targetWebpFilename: "material-corporativo-personalizado-primary.webp",
  },
  {
    id: "prod-22",
    slug: "tarjetas-imantadas-personalizadas",
    name: "Tarjetas Imantadas Publicitarias",
    categorySlug: "corporativo-emprendedores",
    categoryName: "Corporativo y Emprendedores",
    shortDescription: "Tarjetas publicitarias con dorso 100% imantado y laminado brillante.",
    fullDescription:
      "La tarjeta de contacto más efectiva para servicios a domicilio, delivery y profesionales. Gracias a su respaldo imantado completo, permanece visible en refrigeradores y gabinetes sin perder adherencia.",
    customizationDetails: [
      "Diseño publicitario con teléfonos, WhatsApp y servicios",
      "Laminado frontal que protege contra grasa y salpicaduras",
      "Corte recto con esquinas cuadradas o redondeadas",
    ],
    suggestedOccasions: ["Servicios técnicos", "Delivery gastronómico", "Salud y estética"],
    themeColor: "#fdfaf6",
    accentColor: "#e5c386",
    icon: "Magnet",
    galleryImages: [
      { title: "Tarjeta en Refrigerador", subtitle: "Fuerte fijación magnética plana" },
      { title: "Lote Impreso", subtitle: "Colores vivos y brillo protector" },
    ],
    targetWebpFilename: "tarjetas-imantadas-personalizadas-primary.webp",
  },

  // 6. Regalos y Fechas Especiales
  {
    id: "prod-23",
    slug: "agenda-devocional",
    name: "Agenda Devocional",
    categorySlug: "regalos-especiales",
    categoryName: "Regalos y Fechas Especiales",
    shortDescription:
      "Agenda artesanal con tapa dura, versículos inspiracionales y hojas de reflexión.",
    fullDescription:
      "Cuaderno devocional encuadernado cuidadosamente a mano con tapas duras forradas, esquineros metálicos dorados y elástico de cierre. Diseñada con secciones para oración, gratitud diaria y lecturas bíblicas.",
    customizationDetails: [
      "Nombre grabado en portada con detalles metalizados",
      "Paleta de portada a elección (floral, botánica, minimalista)",
      "Cinta separadora de seda y bolsillo portapapeles interior",
    ],
    suggestedOccasions: ["Regalo espiritual", "Cumpleaños", "Bautizos"],
    badge: "Artesanal",
    themeColor: "#fdfaf6",
    accentColor: "#4a154b",
    icon: "BookOpenCheck",
    galleryImages: [
      { title: "Tapa Dura y Cierre", subtitle: "Esquineros dorados y elástico" },
      { title: "Páginas Interiores", subtitle: "Espacios de reflexión y versículos" },
      { title: "Set con Bolígrafo", subtitle: "Presentación lista para obsequio" },
    ],
    targetWebpFilename: "agenda-devocional-primary.webp",
  },
  {
    id: "prod-24",
    slug: "arreglos-dia-del-padre",
    name: "Arreglos del Día del Padre",
    categorySlug: "regalos-especiales",
    categoryName: "Regalos y Fechas Especiales",
    shortDescription: "Composiciones temáticas para papá en cajas rústicas con cervezas y snacks.",
    fullDescription:
      "Homenaje especial para celebrar a los padres en su día. Diseñado en caja de madera o cartón kraft con dedicatoria troquelada, globos temáticos y una cuidada selección de cervezas, chocolates y aperitivos.",
    customizationDetails: [
      "Mensaje personalizado para papá o abuelo",
      "Variedad de marcas de cerveza o café gourmet",
      "Papelería adhesiva en botellas con frases emotivas",
    ],
    suggestedOccasions: ["Día del Padre", "Cumpleaños de papá"],
    badge: "Temporada",
    themeColor: "#f1ebfc",
    accentColor: "#4a154b",
    icon: "Beer",
    galleryImages: [
      { title: "Arreglo Cervecero", subtitle: "Caja de madera con cerveza y snacks" },
      { title: "Globo y Dedicatoria", subtitle: "Mensajes en vinilo y globos" },
    ],
    targetWebpFilename: "arreglos-dia-del-padre-primary.webp",
  },
  {
    id: "prod-25",
    slug: "caja-desayuno-dia-del-carabinero",
    name: "Caja de Desayuno Día del Carabinero",
    categorySlug: "regalos-especiales",
    categoryName: "Regalos y Fechas Especiales",
    shortDescription:
      "Desayuno institucional en verde y dorado con tazón alusivo y empaque temático.",
    fullDescription:
      "Reconocimiento conmemorativo con los colores de la institución verde oliva y dorado. Incluye tazón personalizado con escudo y grado, panadería selecta, termo y papelería diseñada en nuestro taller.",
    customizationDetails: [
      "Grado, apellido y dotación estampados en el tazón",
      "Bandeja o caja decorada con moño institucional",
      "Tarjeta con palabras de agradecimiento",
    ],
    suggestedOccasions: ["Día del Carabinero (27 de abril)", "Ascensos y traslados"],
    badge: "Institucional",
    themeColor: "#fdfaf6",
    accentColor: "#4a154b",
    icon: "Shield",
    galleryImages: [
      { title: "Bandeja Verde Institucional", subtitle: "Tazón con escudo y desayuno" },
      { title: "Detalle de Empaque", subtitle: "Rótulos conmemorativos" },
    ],
    targetWebpFilename: "caja-desayuno-dia-del-carabinero-primary.webp",
  },
  {
    id: "prod-26",
    slug: "cuadros-dia-de-la-madre",
    name: "Cuadros Personalizados Día de la Madre",
    categorySlug: "regalos-especiales",
    categoryName: "Regalos y Fechas Especiales",
    shortDescription: "Cuadro enmarcado con collage de fotos familiares y dedicatoria para mamá.",
    fullDescription:
      "El regalo más emotivo para mamá. Compuesto por un marco de madera lacada con vidrio, paspartú y diseño gráfico personalizado que reúne los recuerdos más preciados y mensajes de sus hijos.",
    customizationDetails: [
      "Collage de 3 a 8 fotografías familiares de alta calidad",
      "Dedicatoria redactada por la familia y nombres de hijos",
      "Marco en color blanco, madera natural o negro",
    ],
    suggestedOccasions: ["Día de la Madre", "Cumpleaños de mamá", "Navidad"],
    badge: "Más Querido",
    themeColor: "#fdf1ed",
    accentColor: "#e04b88",
    icon: "HeartHandshake",
    galleryImages: [
      { title: "Cuadro con Fotos", subtitle: "Collage impreso en papel fotográfico" },
      { title: "Moldura y Acabado", subtitle: "Marco de madera con soporte para muro o mesa" },
    ],
    targetWebpFilename: "cuadros-dia-de-la-madre-primary.webp",
  },
];
