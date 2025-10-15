import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    addToCart(product);

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link to={`/products/${product.id}`}>
      <div className="flex flex-col justify-between bg-white shadow-md hover:shadow-lg p-5 border border-gray-100 rounded-2xl transition-all hover:-translate-y-1 duration-300 cursor-pointer">
        <div className="mb-4">
          <img
            src={product.images[0]}
            alt={product.title}
            className="rounded-xl w-full h-40 object-cover"
          />
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-gray-800 text-lg truncate">
            {product.title}
          </h3>

          <p className="mb-4 text-gray-500 text-sm line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-auto">
          <span className="font-semibold text-blue-600 text-base">
            ${product.price}
          </span>

          <div className="flex flex-col items-end">
            <Button
              onClick={handleAddToCart}
              disabled={added}
              className="bg-blue-500 hover:bg-blue-600 px-3 py-1.5 rounded-lg text-white text-sm transition cursor-pointer"
            >
              {added ? "Adding to cart ..." : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
