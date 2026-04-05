"use client";

import { Product } from "@/lib/product";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type CartItem = {
  id: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  primaryCategory: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "urbanbeads-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem(STORAGE_KEY);
      if (storedCart) {
        setItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [isHydrated, items]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (product: Product, quantity = 1) => {
      setItems((currentItems) => {
        const existingItem = currentItems.find((item) => item.slug === product.slug);

        if (existingItem) {
          return currentItems.map((item) =>
            item.slug === product.slug
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        }

        return [
          ...currentItems,
          {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            image: product.images?.[0] || "/images/placeholder.png",
            primaryCategory: product.primary_category,
            quantity,
          },
        ];
      });
    };

    const removeItem = (slug: string) => {
      setItems((currentItems) => currentItems.filter((item) => item.slug !== slug));
    };

    const updateQuantity = (slug: string, quantity: number) => {
      setItems((currentItems) =>
        currentItems
          .map((item) => (item.slug === slug ? { ...item, quantity } : item))
          .filter((item) => item.quantity > 0),
      );
    };

    const clearCart = () => setItems([]);

    const cartCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    return {
      items,
      cartCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
