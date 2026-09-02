import { useCallback, useEffect, useState } from "react";

import { categoryService } from "../services/category.service";

import type {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../types/category.schema";

interface UpdateCategoryParams {
  id: string;
  input: UpdateCategoryInput;
}

interface UseCategoriesReturn {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
  createCategory: (
    input: CreateCategoryInput,
  ) => Promise<Category>;
  updateCategory: (
    params: UpdateCategoryParams,
  ) => Promise<Category>;
  deleteCategory: (id: string) => Promise<void>;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<
    Category[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCategories = useCallback((): (() => void) => {
    let cancelled = false;

    categoryService
      .getAll()
      .then((data) => {
        if (cancelled) return;

        setCategories(data);
        setIsError(false);
      })
      .catch(() => {
        if (!cancelled) setIsError(true);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => fetchCategories(), [fetchCategories]);

  const createCategory = useCallback(
    async (
      input: CreateCategoryInput,
    ): Promise<Category> => {
      try {
        setIsCreating(true);

        const category = await categoryService.create(
          input,
        );

        setCategories((previous) => [
          ...previous,
          category,
        ]);

        return category;
      } finally {
        setIsCreating(false);
      }
    },
    [],
  );

  const updateCategory = useCallback(
    async ({
      id,
      input,
    }: UpdateCategoryParams): Promise<Category> => {
      try {
        setIsUpdating(true);

        const category = await categoryService.update(
          id,
          input,
        );

        setCategories((previous) =>
          previous.map((item) =>
            item.id === id ? category : item,
          ),
        );

        return category;
      } finally {
        setIsUpdating(false);
      }
    },
    [],
  );

  const deleteCategory = useCallback(
    async (id: string): Promise<void> => {
      try {
        setIsDeleting(true);

        await categoryService.remove(id);

        setCategories((previous) =>
          previous.filter((item) => item.id !== id),
        );
      } finally {
        setIsDeleting(false);
      }
    },
    [],
  );

  return {
    categories,
    isLoading,
    isError,
    createCategory,
    updateCategory,
    deleteCategory,
    isCreating,
    isUpdating,
    isDeleting,
  };
}
