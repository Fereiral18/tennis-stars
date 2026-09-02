import { useCallback, useEffect, useState } from "react";

import { productService } from "../services/product.service";

import type {
  CreateProductInput,
  Product,
  UpdateProductInput,
} from "../types/product.types";

interface UpdateProductParams {
  id: string;
  input: UpdateProductInput;
}

interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  createProduct: (
    input: CreateProductInput,
  ) => Promise<Product>;
  updateProduct: (
    params: UpdateProductParams,
  ) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<
    Product[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProducts = useCallback((): (() => void) => {
    let cancelled = false;

    productService
      .getAll()
      .then((data) => {
        if (cancelled) return;

        setProducts(data);
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

  useEffect(() => fetchProducts(), [fetchProducts]);

  const createProduct = useCallback(
    async (
      input: CreateProductInput,
    ): Promise<Product> => {
      try {
        setIsCreating(true);

        const product = await productService.create(
          input,
        );

        setProducts((previous) => [
          ...previous,
          product,
        ]);

        return product;
      } finally {
        setIsCreating(false);
      }
    },
    [],
  );

  const updateProduct = useCallback(
    async ({
      id,
      input,
    }: UpdateProductParams): Promise<Product> => {
      try {
        setIsUpdating(true);

        const product = await productService.update(
          id,
          input,
        );

        setProducts((previous) =>
          previous.map((item) =>
            item.id === id ? product : item,
          ),
        );

        return product;
      } finally {
        setIsUpdating(false);
      }
    },
    [],
  );

  const deleteProduct = useCallback(
    async (id: string): Promise<void> => {
      try {
        setIsDeleting(true);

        await productService.remove(id);

        setProducts((previous) =>
          previous.filter((item) => item.id !== id),
        );
      } finally {
        setIsDeleting(false);
      }
    },
    [],
  );

  return {
    products,
    isLoading,
    isError,
    createProduct,
    updateProduct,
    deleteProduct,
    isCreating,
    isUpdating,
    isDeleting,
  };
}
