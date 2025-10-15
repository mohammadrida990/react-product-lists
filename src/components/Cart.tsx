import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { useCart, type CartItem } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, clearCart, updateQty } = useCart();

  const handleIncrement = (id: number) => {
    const item = cart.find((p) => p.id === id);
    if (item) updateQty(id, item.qty + 1);
  };

  const handleDecrement = (id: number) => {
    const item = cart.find((p) => p.id === id);
    if (item && item.qty > 1) updateQty(id, item.qty - 1);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0)
    return (
      <div className="mx-auto px-4 py-10 text-center container">
        <h2 className="mb-4 font-bold text-3xl">🛒 Your Cart is Empty</h2>
        <Link to="/products" className="text-blue-500 underline">
          Go back to Products
        </Link>
      </div>
    );

  return (
    <section className="mx-auto px-4 py-10 container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-3xl">🛒 Your Cart</h2>

        <Button
          onClick={clearCart}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white transition"
        >
          Clear Cart
        </Button>
      </div>

      <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3">
        {cart.map((item: CartItem) => (
          <div
            key={item.id}
            className="relative flex flex-col bg-white shadow-md p-4 rounded-xl"
          >
            {item.images?.[0] && (
              <Link to={`/products/${item.id}`}>
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="mb-4 rounded-lg w-full h-48 object-cover"
                />
              </Link>
            )}

            <div className="mb-5">
              <h3 className="mb-1 font-semibold text-lg">{item.title}</h3>

              <span className="font-semibold text-blue-600 text-3xl">
                ${item.price}
              </span>
            </div>

            <p className="mb-2 text-gray-500 line-clamp-2">
              {item.description}
            </p>

            <div className="flex sm:flex-row flex-col justify-center sm:justify-between sm:items-center gap-4 mt-4">
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => handleDecrement(item.id)}
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-black"
                >
                  −
                </Button>

                <span className="font-semibold text-lg">{item.qty}</span>

                <Button
                  onClick={() => handleIncrement(item.id)}
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-black"
                >
                  +
                </Button>
              </div>

              <span>=</span>

              <span className="font-semibold text-blue-600 text-xl">
                ${(item.price * item.qty).toFixed(2)}
              </span>
            </div>

            <Button
              onClick={() => removeFromCart(item.id)}
              className="top-2 right-2 absolute font-bold text-red-500 hover:text-red-700 text-xl cursor-pointer"
            >
              ×
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-6 font-bold text-2xl text-right">
        Total: <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
      </div>
    </section>
  );
}
