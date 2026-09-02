import { initialCategories } from "../../../mocks/data/categories";
import { getStorage, setStorage } from "../../../mocks/storage/mockStorage";
import type { Category, CreateCategoryInput, UpdateCategoryInput } from "../types/category.schema";


const STORAGE_KEY = "court-store-categories";

function delay(ms = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId(): string {
  return `category-${Date.now()}`;
}

function getCategoriesFromStorage(): Category[] {
  return getStorage<Category[]>(STORAGE_KEY, initialCategories);
}

export const categoryService = {
  async getAll(): Promise<Category[]> {
    await delay();

    return getCategoriesFromStorage();
  },

  async getById(id: string): Promise<Category | null> {
    await delay();

    const categories = getCategoriesFromStorage();

    return categories.find((category) => category.id === id) ?? null;
  },

  async create(input: CreateCategoryInput): Promise<Category> {
    await delay();

    const categories = getCategoriesFromStorage();

    const now = new Date().toISOString();

    const category: Category = {
      id: generateId(),
      name: input.name,
      description: input.description,
      createdAt: now,
      updatedAt: now,
    };

    const updatedCategories = [...categories, category];

    setStorage(STORAGE_KEY, updatedCategories);

    return category;
  },

  async update(
    id: string,
    input: UpdateCategoryInput,
  ): Promise<Category> {
    await delay();

    const categories = getCategoriesFromStorage();

    const categoryIndex = categories.findIndex(
      (category) => category.id === id,
    );

    if (categoryIndex === -1) {
      throw new Error("La categoría no existe");
    }

    const currentCategory = categories[categoryIndex];

    const updatedCategory: Category = {
      ...currentCategory,
      name: input.name,
      description: input.description,
      updatedAt: new Date().toISOString(),
    };

    const updatedCategories = [...categories];

    updatedCategories[categoryIndex] = updatedCategory;

    setStorage(STORAGE_KEY, updatedCategories);

    return updatedCategory;
  },

  async remove(id: string): Promise<void> {
    await delay();

    const categories = getCategoriesFromStorage();

    const categoryExists = categories.some(
      (category) => category.id === id,
    );

    if (!categoryExists) {
      throw new Error("La categoría no existe");
    }

    const updatedCategories = categories.filter(
      (category) => category.id !== id,
    );

    setStorage(STORAGE_KEY, updatedCategories);
  },
};