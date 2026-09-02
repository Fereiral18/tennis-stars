import { useMemo } from "react";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useSales } from "@/features/sales/hooks/useSales";

export function useDashboard() {
  const {
    products,
    isLoading: isProductsLoading,
  } = useProducts();

  const {
    categories,
    isLoading: isCategoriesLoading,
  } = useCategories();

  const {
    sales,
    isLoading: isSalesLoading,
  } = useSales(products);

  const metrics = useMemo(() => {
    const totalRevenue = sales.reduce(
      (total, sale) => total + sale.total,
      0,
    );

    return {
      totalProducts: products.length,
      totalCategories: categories.length,
      totalSales: sales.length,
      totalRevenue,
    };
  }, [products, categories, sales]);

  const recentSales = useMemo(() => {
    return [...sales]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime(),
      )
      .slice(0, 5);
  }, [sales]);

  const isLoading =
    isProductsLoading ||
    isCategoriesLoading ||
    isSalesLoading;

  return {
    products,
    categories,
    sales,
    recentSales,
    metrics,
    isLoading,
  };
}