import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types";

type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

const fetchProducts = async (
  page = 1,
  limit = 16
): Promise<ProductsResponse> => {
  const skip = (page - 1) * limit;
  const res = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );
  return res.json();
};

export const useProducts = (page = 1, limit = 16) => {
  return useQuery<ProductsResponse>({
    queryKey: ["products", page, limit],
    queryFn: () => fetchProducts(page, limit),
  });
};
