import type { Product } from "@/features/products/types/product.types";

export const initialProducts: Product[] = [
  {
    id: "product-001",
    name: "Wilson Blade 98",
    description:
      "Raqueta de tenis profesional orientada a jugadores que buscan control y precisión.",
    price: 249.99,
    imageUrl:
      "https://images.unsplash.com/photo-1617083277494-8c1e3c6f4f7e?auto=format&fit=crop&w=800&q=80",
    categoryId: "category-001",
    createdAt: "2026-08-10T10:00:00.000Z",
    updatedAt: "2026-08-10T10:00:00.000Z",
  },
  {
    id: "product-002",
    name: "Babolat Pure Aero",
    description:
      "Raqueta diseñada para jugadores que buscan potencia y efectos desde el fondo de la cancha.",
    price: 229.99,
    imageUrl:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80",
    categoryId: "category-001",
    createdAt: "2026-08-11T10:00:00.000Z",
    updatedAt: "2026-08-11T10:00:00.000Z",
  },
  {
    id: "product-003",
    name: "Wilson US Open Balls",
    description:
      "Pack de pelotas oficiales para entrenamiento y competición.",
    price: 8.99,
    imageUrl:
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80",
    categoryId: "category-002",
    createdAt: "2026-08-12T10:00:00.000Z",
    updatedAt: "2026-08-12T10:00:00.000Z",
  },
  {
    id: "product-004",
    name: "Nike Court Dri-FIT",
    description:
      "Camiseta deportiva ligera con tecnología transpirable para jugar cómodamente.",
    price: 54.99,
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    categoryId: "category-003",
    createdAt: "2026-08-13T10:00:00.000Z",
    updatedAt: "2026-08-13T10:00:00.000Z",
  },
  {
    id: "product-005",
    name: "Asics Gel Resolution",
    description:
      "Calzado de tenis con estabilidad y amortiguación para movimientos laterales.",
    price: 139.99,
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    categoryId: "category-004",
    createdAt: "2026-08-14T10:00:00.000Z",
    updatedAt: "2026-08-14T10:00:00.000Z",
  },
];