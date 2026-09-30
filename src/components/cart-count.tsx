"use client";
import { useCartStore } from "@/store/cart-store";
export function CartCount() {
  const count = useCartStore((s) =>
    s.items.reduce((n, i) => n + i.quantity, 0),
  );
  return <span className="count">{count}</span>;
}
