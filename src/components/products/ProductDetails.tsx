"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types/types/product";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import Link from "next/link";

export default function ProductDetails({
  product,
}: {
  product: Product;
}) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  return (
    <section className="wrap" style={{ padding: "50px 0" }}>
      <Link href="/">← Back to products</Link>

      <div className="product-detail">
        <div className="product-detail-image">
          <span>{product.emoji}</span>
        </div>

        <div className="product-detail-info">
          <span className="category-label">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <p>{product.description}</p>

          <h2>
            ₹{product.price}
            <small> / {product.unit}</small>
          </h2>

          <div className="quantity">
            <button
              onClick={() =>
                setQuantity((q) => Math.max(1, q - 1))
              }
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>

            <span>{quantity}</span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            className="primary-btn"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>

          <p>
            Total: ₹{(product.price * quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </section>
  );
}