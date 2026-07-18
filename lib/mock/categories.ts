export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Papelería Personalizada",
    slug: "papeleria-personalizada",
    description: "Planners, agendas, cuadernos de diseño y stickers para organizar tu día a día.",
    image: "/images/categories/papeleria.jpg",
  },
  {
    id: "2",
    name: "Regalos Personalizados",
    slug: "regalos-personalizados",
    description:
      "Detalles únicos con sentido y cajas exclusivas para celebrar momentos especiales.",
    image: "/images/categories/regalos.jpg",
  },
  {
    id: "3",
    name: "DTF Textil & UV",
    slug: "dtf-textil-uv",
    description: "Estampados de alta durabilidad y transferencias de relieve para Pymes y marcas.",
    image: "/images/categories/dtf.jpg",
  },
  {
    id: "4",
    name: "Sublimación",
    slug: "sublimacion",
    description: "Tazas, tazones y merchandising personalizado con colores vibrantes.",
    image: "/images/categories/sublimacion.jpg",
  },
  {
    id: "5",
    name: "Eventos & Colegios",
    slug: "eventos-colegios",
    description: "Diplomas, medallas, recuerdos y piochas para graduaciones e hitos escolares.",
    image: "/images/categories/eventos.jpg",
  },
];
