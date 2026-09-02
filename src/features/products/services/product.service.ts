import {
  getStorage,
  setStorage,
} from "@/mocks/storage/mockStorage";



import type {
  CreateProductInput,
  Product,
  UpdateProductInput,
} from "../types/product.types";
import { initialProducts } from "@/mocks/api/products.mock";

const STORAGE_KEY = "court-store-products";

function delay(ms = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId(): string {
  return `product-${Date.now()}`;
}

function getProductsFromStorage(): Product[] {
  return getStorage<Product[]>(
    STORAGE_KEY,
    initialProducts,
  );
}

export const productService = {
  async getAll(): Promise<Product[]> {
    await delay();

    return getProductsFromStorage();
  },

  async getById(id: string): Promise<Product | null> {
    await delay();

    const products = getProductsFromStorage();

    return (
      products.find((product) => product.id === id) ??
      null
    );
  },

  async create(
    input: CreateProductInput,
  ): Promise<Product> {
    await delay();

    const products = getProductsFromStorage();

    const now = new Date().toISOString();

    const product: Product = {
      id: generateId(),
      name: input.name,
      description: input.description,
      price: input.price,
      imageUrl: input.imageUrl,
      categoryId: input.categoryId,
      createdAt: now,
      updatedAt: now,
    };

    const updatedProducts = [
      ...products,
      product,
    ];

    setStorage(
      STORAGE_KEY,
      updatedProducts,
    );

    return product;
  },

  async update(
    id: string,
    input: UpdateProductInput,
  ): Promise<Product> {
    await delay();

    const products = getProductsFromStorage();

    const productIndex = products.findIndex(
      (product) => product.id === id,
    );

    if (productIndex === -1) {
      throw new Error("El producto no existe");
    }

    const currentProduct =
      products[productIndex];

    const updatedProduct: Product = {
      ...currentProduct,
      name: input.name,
      description: input.description,
      price: input.price,
      imageUrl: input.imageUrl,
      categoryId: input.categoryId,
      updatedAt: new Date().toISOString(),
    };

    const updatedProducts = [...products];

    updatedProducts[productIndex] =
      updatedProduct;

    setStorage(
      STORAGE_KEY,
      updatedProducts,
    );

    return updatedProduct;
  },

  async remove(id: string): Promise<void> {
    await delay();

    const products = getProductsFromStorage();

    const exists = products.some(
      (product) => product.id === id,
    );

    if (!exists) {
      throw new Error("El producto no existe");
    }

    const updatedProducts = products.filter(
      (product) => product.id !== id,
    );

    setStorage(
      STORAGE_KEY,
      updatedProducts,
    );
  },
};