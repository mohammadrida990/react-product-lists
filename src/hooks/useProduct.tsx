import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types";

const fetchProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};

export const useProduct = (id?: string) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
