import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types";
import ProductCard from "./ProductCard";
import { NotFoundPage } from "../pages/NotFound";
import Loader from "./Loading";
import { Button } from "@mantine/core";

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const limit = 16;

  const { data, isLoading, isError, isFetching } = useProducts(
    pageFromUrl,
    limit
  );
  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  const setPage = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  if (isLoading || isFetching) return <Loader />;

  if (isError) return <NotFoundPage />;

  const getPageNumbers = (current: number, total: number, maxPages = 5) => {
    const pages: (number | string)[] = [];
    if (total <= maxPages) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      const left = Math.max(2, current - 1);
      const right = Math.min(total - 1, current + 1);

      pages.push(1);
      if (left > 2) pages.push("...");
      for (let i = left; i <= right; i++) pages.push(i);
      if (right < total - 1) pages.push("...");
      pages.push(total);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers(pageFromUrl, totalPages);

  return (
    <section className="mx-auto px-4 py-10 container">
      <header className="mb-10 text-center">
        <h2 className="mb-2 font-bold text-gray-800 text-3xl">
          📚 Product List
        </h2>

        <p className="text-gray-500">
          Explore some of the greatest sci-fi classics ever written.
        </p>
      </header>

      <div className="justify-center items-start gap-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.products?.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-8">
        <Button
          onClick={() => setPage(Math.max(pageFromUrl - 1, 1))}
          disabled={pageFromUrl === 1}
          className="bg-blue-400 disabled:opacity-50 px-4 py-2 rounded text-white cursor-pointer"
        >
          Previous
        </Button>

        {pageNumbers.map((p, idx) =>
          typeof p === "number" ? (
            <Button
              key={idx}
              variant="filled"
              onClick={() => setPage(p)}
              className={`px-4 py-2 rounded ${
                p === pageFromUrl
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 cursor-pointer"
              }`}
            >
              {p}
            </Button>
          ) : (
            <span key={idx} className="px-2 py-2">
              {p}
            </span>
          )
        )}

        <Button
          onClick={() => setPage(Math.min(pageFromUrl + 1, totalPages))}
          disabled={pageFromUrl === totalPages}
          className="bg-blue-400 disabled:opacity-50 px-4 py-2 rounded text-white cursor-pointer"
        >
          Next
        </Button>
      </div>
    </section>
  );
}
