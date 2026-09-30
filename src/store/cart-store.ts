"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem, Product } from "@/types/types/product";
type Snapshot = { items: CartItem[]; coupon: string };
type CartState = {
  items: CartItem[];
  coupon: string;
  history: Snapshot[];
  addItem: (p: Product) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, q: number) => void;
  applyCoupon: (code: string) => void;
  clearCoupon: () => void;
  undo: () => void;
};
const snap = (s: CartState): Snapshot => ({
  items: s.items.map((i) => ({ ...i })),
  coupon: s.coupon,
});
const remember = (s: CartState) => [...s.history, snap(s)].slice(-10);
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      coupon: "",
      history: [],
      addItem: (p) =>
        set((s) => ({
          history: remember(s),
          items: s.items.some((i) => i.id === p.id)
            ? s.items.map((i) =>
                i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i,
              )
            : [...s.items, { ...p, quantity: 1 }],
        })),
      removeItem: (id) =>
        set((s) => ({
          history: remember(s),
          items: s.items.filter((i) => i.id !== id),
        })),
      setQuantity: (id, q) =>
        set((s) => ({
          history: remember(s),
          items:
            q <= 0
              ? s.items.filter((i) => i.id !== id)
              : s.items.map((i) => (i.id === id ? { ...i, quantity: q } : i)),
        })),
      applyCoupon: (code) =>
        set((s) => ({
          history: remember(s),
          coupon: code.trim().toUpperCase(),
        })),
      clearCoupon: () => set((s) => ({ history: remember(s), coupon: "" })),
      undo: () =>
        set((s) => {
          const prev = s.history.at(-1);
          return prev
            ? {
                items: prev.items,
                coupon: prev.coupon,
                history: s.history.slice(0, -1),
              }
            : s;
        }),
    }),
    {
      name: "freshcart-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) =>
        ({ items: s.items, coupon: s.coupon, history: s.history }) as CartState,
    },
  ),
);
