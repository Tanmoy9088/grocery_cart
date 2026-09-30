"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShoppingCart,
  Search,
  Heart,
  Star,
  Truck,
  ShieldCheck,
  Clock,
  Plus,
  Check,
} from "lucide-react";

import { products } from "@/services/json/groceryData";
import { useCartStore } from "@/store/cart-store";

const categories = [
  { name: "All", emoji: "🛒" },
  { name: "Fruits", emoji: "🍎" },
  { name: "Vegetables", emoji: "🥦" },
  { name: "Dairy", emoji: "🥛" },
  { name: "Bakery", emoji: "🍞" },
  { name: "Staples", emoji: "🍚" },
];

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addedProduct, setAddedProduct] = useState<string | null>(null);

  const addItem = useCartStore((state) => state.addItem);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "All") {
      result = result.filter((product) => product.category === category);
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query),
      );
    }

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, category, sort]);

  const toggleWishlist = (id: string) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const handleAddToCart = (product: (typeof products)[number]) => {
    addItem(product);
    setAddedProduct(product.id);
    window.setTimeout(() => setAddedProduct(null), 1200);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-green-700 via-green-600 to-emerald-500">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-lime-300/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-24">
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-lime-300" />
              Fresh groceries, delivered to your door
            </span>

            <h1 className="mt-6 max-w-xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Freshness you can taste,{" "}
              <span className="text-lime-200">quality you can trust.</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-green-50 sm:text-lg">
              Shop fresh fruits, vegetables, dairy, and everyday essentials from
              one convenient place.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-green-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-green-50"
              >
                Shop Now <ArrowRight size={18} />
              </a>

              <a
                href="#categories"
                className="rounded-xl border border-white/40 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Explore Categories
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-green-50">
              <div className="flex items-center gap-2">
                <Truck size={19} />
                <span>Fast delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={19} />
                <span>Quality products</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={19} />
                <span>Easy shopping</span>
              </div>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
            <div className="absolute h-72 w-72 rounded-full bg-lime-200/30 blur-2xl sm:h-96 sm:w-96" />
            <div className="relative flex aspect-square w-full items-center justify-center rounded-[2.5rem] border border-white/20 bg-white/10 shadow-2xl backdrop-blur-sm">
              <div className="absolute left-8 top-10 -rotate-12 rounded-2xl bg-white p-4 text-5xl shadow-xl sm:text-6xl">
                🍎
              </div>
              <div className="absolute right-8 top-14 -rotate-12 rounded-2xl bg-white p-4 text-5xl shadow-xl sm:text-6xl">
                🥦
              </div>
              <div className="absolute bottom-10 left-10 -rotate-10deg rounded-2xl bg-white p-4 text-5xl shadow-xl sm:text-6xl">
                🥕
              </div>
              <div className="absolute bottom-12 right-10 rotate-[-10deg] rounded-2xl bg-white p-4 text-5xl shadow-xl sm:text-6xl">
                🍌
              </div>

              <div className="z-10 flex h-44 w-44 items-center justify-center rounded-full bg-white text-8xl shadow-2xl sm:h-56 sm:w-56 sm:text-9xl">
                🛒
              </div>

              <div className="absolute bottom-5 rounded-full bg-lime-300 px-5 py-2 text-sm font-bold text-green-900 shadow-lg">
                Fresh every day!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        {[
          {
            icon: <Truck size={24} />,
            title: "Convenient delivery",
            description: "Get groceries delivered to your doorstep.",
          },
          {
            icon: <ShieldCheck size={24} />,
            title: "Quality essentials",
            description: "Shop everyday products in one place.",
          },
          {
            icon: <Clock size={24} />,
            title: "Easy shopping",
            description: "Find what you need and order with ease.",
          },
        ].map((benefit) => (
          <div
            key={benefit.title}
            className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
              {benefit.icon}
            </div>
            <div>
              <h3 className="font-bold">{benefit.title}</h3>
              <p className="mt-1 text-sm text-gray-500">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section
        id="categories"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-8 sm:px-8"
      >
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
              Browse by category
            </p>
            <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">
              Shop by category
            </h2>
          </div>
          <button
            onClick={() => setCategory("All")}
            className="text-sm font-semibold text-green-700 hover:text-green-800"
          >
            View all
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((item) => (
            <button
              key={item.name}
              onClick={() => setCategory(item.name)}
              className={`rounded-2xl border p-4 text-center transition hover:-translate-y-1 hover:shadow-md ${
                category === item.name
                  ? "border-green-600 bg-green-50 shadow-sm"
                  : "border-gray-100 bg-white"
              }`}
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-3xl">
                {item.emoji}
              </span>
              <span className="mt-3 block text-sm font-semibold">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section
        id="products"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-12 sm:px-8"
      >
        <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
              Fresh picks for you
            </p>
            <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">
              Our products
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Explore our selection of everyday essentials.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:w-64"
              />
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            >
              <option value="default">Default sorting</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item.name}
              onClick={() => setCategory(item.name)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === item.name
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-600 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
            <span className="text-5xl">🔎</span>
            <h3 className="mt-4 text-lg font-bold">No products found</h3>
            <p className="mt-2 text-sm text-gray-500">
              Try another search term or category.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-5 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative flex h-52 items-center justify-center bg-linear-to-br from-green-50 to-lime-50">
                  <span className="text-8xl transition duration-300 group-hover:scale-110">
                    {product.emoji}
                  </span>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={
                      wishlist.includes(product.id)
                        ? `Remove ${product.name} from wishlist`
                        : `Add ${product.name} to wishlist`
                    }
                    className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-110 ${
                      wishlist.includes(product.id)
                        ? "text-red-500"
                        : "text-gray-400 hover:text-red-500"
                    }`}
                  >
                    <Heart
                      size={19}
                      fill={
                        wishlist.includes(product.id) ? "currentColor" : "none"
                      }
                    />
                  </button>

                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-green-700">
                    {product.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold">{product.name}</h3>
                    <span className="flex shrink-0 items-center gap-1 text-xs text-amber-500">
                      <Star size={14} fill="currentColor" />
                      4.8
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-gray-500">
                    {product.description}
                  </p>

                  <p className="mt-2 text-xs text-gray-400">{product.unit}</p>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <p className="text-xl font-extrabold text-gray-900">
                      ₹{product.price}
                    </p>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                        addedProduct === product.id
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      {addedProduct === product.id ? (
                        <>
                          <Check size={17} /> Added
                        </>
                      ) : (
                        <>
                          <Plus size={17} /> Add
                        </>
                      )}
                    </button>
                  </div>

                  <Link
                    href={`/products/${product.id}`}
                    className="mt-4 flex items-center justify-center gap-1 border-t border-gray-100 pt-3 text-sm font-medium text-green-700 hover:text-green-900"
                  >
                    View details <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-5 rounded-3xl bg-green-700 px-6 py-10 text-center text-white sm:px-10 md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Ready to fill your cart?
            </h2>
            <p className="mt-2 text-sm text-green-100">
              Find your everyday essentials and start shopping.
            </p>
          </div>
          <Link
            href="/cart"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50"
          >
            <ShoppingCart size={18} />
            View Cart
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
