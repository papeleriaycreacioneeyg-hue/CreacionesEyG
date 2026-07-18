export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  categorySlug: string;
  image: string;
  isFeatured: boolean;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Planner Diario Espiralado",
    slug: "planner-diario-espiralado",
    description: "Planner de tapa dura con organizador mensual y hojas de control de hábitos.",
    price: 12990,
    categorySlug: "papeleria-personalizada",
    image: "/images/products/planner.jpg",
    isFeatured: true,
  },
  {
    id: "2",
    name: "Stickers Troquelados DTF UV",
    slug: "stickers-troquelados-dtf-uv",
    description: "Stickers con relieve y adhesivo de alta resistencia para botellas y termos.",
    price: 8500,
    categorySlug: "dtf-textil-uv",
    image: "/images/products/stickers.jpg",
    isFeatured: true,
  },
  {
    id: "3",
    name: "Tazón Cerámico Sublimado",
    slug: "tazon-ceramico-sublimado",
    description: "Tazón de cerámica importada con impresión a todo color apto para microondas.",
    price: 4990,
    categorySlug: "sublimacion",
    image: "/images/products/tazon.jpg",
    isFeatured: false,
  },
];
