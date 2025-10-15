import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Product } from "../types";
import * as cartUtils from "../utils/cart"; // your cart.ts

export type CartItem = Product & { qty: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  updateQty: (id: number, qty: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => cartUtils.getCart());

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    const success = cartUtils.addToCart(product);

    setCart(cartUtils.getCart());

    return success;
  };

  const removeFromCart = (id: number) => {
    const updated = cartUtils.removeFromCart(id);
    setCart(updated);
  };

  const clearCart = () => {
    cartUtils.clearCart();
    setCart([]);
  };

  const updateQty = (id: number, qty: number) => {
    const updated = cartUtils.updateCartQty(id, qty);
    setCart(updated);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateQty }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) throw new Error("useCart must be used within CartProvider");

  return context;
};
