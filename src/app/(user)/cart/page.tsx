"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShoppingCart,
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  Tag,
  Truck,
  ShieldCheck,
  ShoppingBasket,
  Undo2,
  CheckCircle2,
  X,
} from "lucide-react";

import { useCartStore } from "@/store/cart-store";

const CartPage = () => {
  const items = useCartStore((state) => state.items);
  const coupon = useCartStore((state) => state.coupon);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const clearCoupon = useCartStore((state) => state.clearCoupon);
  const undo = useCartStore((state) => state.undo);
  const history = useCartStore((state) => state.history);

  const [couponInput, setCouponInput] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [couponSuccess, setCouponSuccess] = useState(false);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  const shipping = subtotal === 0 || subtotal >= 499 ? 0 : 40;

  const discount = coupon === "FRESH10" ? Math.min(subtotal * 0.1, 100) : 0;

  const total = Math.max(0, subtotal + shipping - discount);

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();

    if (!code) {
      setCouponMessage("Please enter a coupon code.");
      setCouponSuccess(false);
      return;
    }

    if (code === "FRESH10") {
      applyCoupon(code);
      setCouponMessage("Coupon applied! You saved 10%.");
      setCouponSuccess(true);
    } else {
      setCouponMessage("Invalid coupon code.");
      setCouponSuccess(false);
    }
  };

  const handleRemoveCoupon = () => {
    clearCoupon();
    setCouponInput("");
    setCouponMessage("");
    setCouponSuccess(false);
  };

  if (items.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f8faf7] px-4 py-16">
        <div className="w-full max-w-lg rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <ShoppingBasket size={44} strokeWidth={1.5} />
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900">
            Your cart is empty
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
            Looks like you have not added anything to your cart yet. Explore our
            fresh products and find something you love.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
          >
            <ArrowLeft size={18} />
            Start shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8faf7] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <Link
            href="/"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-emerald-600"
          >
            <ArrowLeft size={17} />
            Continue shopping
          </Link>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600">
                <ShoppingCart size={15} />
                Your shopping bag
              </span>

              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Shopping Cart
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                {totalQuantity} {totalQuantity === 1 ? "item" : "items"} in your
                cart
              </p>
            </div>

            <button
              type="button"
              onClick={undo}
              disabled={history.length === 0}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-emerald-300 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Undo2 size={16} />
              Undo last change
            </button>
          </div>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-3">
          <section className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <article
                key={item.id}
                className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link
                    href={`/products/${item.id}`}
                    className="flex h-28 w-full shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-6xl transition hover:bg-emerald-100 sm:h-32 sm:w-32"
                    aria-label={`View ${item.name}`}
                  >
                    {item.emoji}
                  </Link>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                          {item.category}
                        </p>

                        <Link
                          href={`/products/${item.id}`}
                          className="mt-1 block text-lg font-bold text-gray-900 transition hover:text-emerald-700"
                        >
                          {item.name}
                        </Link>

                        <p className="mt-1 text-xs text-gray-500">
                          {item.unit}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3 rounded-full border border-gray-200 px-2 py-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(item.id, item.quantity - 1)
                          }
                          aria-label={`Decrease ${item.name} quantity`}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="min-w-5 text-center text-sm font-bold text-gray-900">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(item.id, item.quantity + 1)
                          }
                          aria-label={`Increase ${item.name} quantity`}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-extrabold text-gray-900">
                          ₹{item.price * item.quantity}
                        </p>
                        <p className="text-xs text-gray-400">
                          ₹{item.price} each
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full px-2 py-3 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
            >
              <ArrowLeft size={17} />
              Continue shopping
            </Link>
          </section>

          <aside className="lg:sticky lg:top-28">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-7">
              <h2 className="text-xl font-extrabold text-gray-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4 border-b border-gray-100 pb-5 text-sm">
                <div className="flex justify-between gap-4 text-gray-500">
                  <span>Subtotal ({totalQuantity} items)</span>
                  <span className="font-semibold text-gray-900">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-gray-500">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-900">
                    {shipping === 0 ? (
                      <span className="text-emerald-600">Free</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between gap-4 text-emerald-600">
                    <span>Discount</span>
                    <span className="font-semibold">
                      -₹{discount.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-b border-gray-100 py-5">
                <label
                  htmlFor="coupon"
                  className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-800"
                >
                  <Tag size={17} className="text-emerald-600" />
                  Apply coupon
                </label>

                {coupon ? (
                  <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={17} className="text-emerald-600" />
                      <span className="text-sm font-bold text-emerald-700">
                        {coupon}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      aria-label="Remove coupon"
                      className="rounded-full p-1 text-emerald-700 transition hover:bg-emerald-100"
                    >
                      <X size={17} />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      id="coupon"
                      type="text"
                      value={couponInput}
                      onChange={(event) => {
                        setCouponInput(event.target.value);
                        setCouponMessage("");
                      }}
                      placeholder="Enter coupon code"
                      className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm uppercase outline-none transition focus:border-emerald-500 focus:bg-white"
                    />

                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="rounded-xl bg-gray-900 px-4 py-3 text-xs font-bold text-white transition hover:bg-emerald-700"
                    >
                      Apply
                    </button>
                  </div>
                )}

                {couponMessage && (
                  <p
                    className={`mt-2 text-xs ${
                      couponSuccess ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {couponMessage}
                  </p>
                )}

                {!coupon && (
                  <p className="mt-2 text-xs text-gray-400">
                    Try FRESH10 for 10% off.
                  </p>
                )}
              </div>

              <div className="py-5">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-gray-900">
                    Total
                  </span>
                  <span className="text-2xl font-extrabold text-emerald-700">
                    ₹{total.toFixed(2)}
                  </span>
                </div>

                <p className="mt-1 text-right text-xs text-gray-400">
                  Including applicable charges
                </p>
              </div>

              <Link
                href="/checkout"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </Link>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
                <ShieldCheck size={16} className="text-emerald-600" />
                Secure checkout
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-white p-2 text-emerald-700">
                  <Truck size={20} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-emerald-900">
                    Free delivery
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-emerald-700">
                    Enjoy free shipping on orders of ₹499 or more.
                  </p>
                  {subtotal < 499 && (
                    <p className="mt-2 text-xs font-semibold text-emerald-800">
                      Add ₹{(499 - subtotal).toFixed(2)} more to qualify.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
