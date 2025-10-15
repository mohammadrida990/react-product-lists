import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";

import { useProduct } from "../hooks/useProduct";
import Loader from "./Loading";
import { NotFoundPage } from "../pages/NotFound";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const { id } = useParams<{ id: string }>();
  const [currentImage, setCurrentImage] = useState(0);
  const [qty, setQty] = useState(1);

  const { data: product, isLoading, isError } = useProduct(id);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ ...product, qty } as any);
  };

  const incrementQty = () => setQty((prev) => prev + 1);
  const decrementQty = () => setQty((prev) => Math.max(1, prev - 1));

  if (isLoading) return <Loader />;
  if (isError)
    return <div className="py-20 text-2xl text-center">Product not exist</div>;
  if (!product) return <NotFoundPage />;

  return (
    <section className="mx-auto px-4 py-10 container">
      <Button
        onClick={() => navigate(-1)}
        className="inline-block bg-blue-400 hover:bg-gray-300 mb-6 px-4 py-2 rounded-lg text-white transition"
      >
        ← Back
      </Button>

      <div className="flex md:flex-row flex-col gap-10 bg-white shadow-lg p-6 rounded-2xl">
        <div className="flex-1">
          {product.images?.length > 1 ? (
            <div className="relative">
              <img
                src={product.images[currentImage]}
                alt={product.title}
                className="rounded-xl w-full h-96 object-cover"
              />

              <div className="flex justify-center gap-2 mt-2">
                {product.images.map((_, idx) => (
                  <Button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`w-3 h-3 rounded-full ${
                      idx === currentImage ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="rounded-xl w-full h-96 object-cover"
            />
          )}
        </div>

        <div className="flex flex-col flex-1 justify-between">
          <div>
            <h1 className="mb-4 font-bold text-4xl">{product.title}</h1>

            <p className="mb-6 text-gray-600">{product.description}</p>
          </div>

          <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mt-4">
            <span className="font-semibold text-blue-600 text-3xl">
              ${product.price}
            </span>

            <div className="flex items-center gap-3">
              <Button
                onClick={decrementQty}
                className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-black"
              >
                −
              </Button>

              <span className="font-semibold text-lg">{qty}</span>

              <Button
                onClick={incrementQty}
                className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-black"
              >
                +
              </Button>
            </div>

            <Button
              onClick={handleAddToCart}
              className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl font-semibold text-white transition hover:-translate-y-1 transform"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
