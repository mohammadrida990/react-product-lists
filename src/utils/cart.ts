import type { Product } from "../types";

export type CartItem = Product & { qty: number };

export const addToCart = (product: Product): boolean => {
  if (!product) return false;

  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

  const existingItem = cart.find((p) => p.id === product.id);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  return true;
};

export const getCart = (): CartItem[] => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

export const updateCartQty = (productId: number, qty: number) => {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

  const updatedCart = cart
    .map((p) => (p.id === productId ? { ...p, qty: Math.max(1, qty) } : p))
    .filter((p) => p.qty > 0);

  localStorage.setItem("cart", JSON.stringify(updatedCart));

  return updatedCart;
};

export const removeFromCart = (productId: number) => {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

  const updatedCart = cart.filter((p) => p.id !== productId);

  localStorage.setItem("cart", JSON.stringify(updatedCart));

  return updatedCart;
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};
