"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Heart,
  Star,
  SlidersHorizontal,
  ArrowRight,
  Sparkles,
  Leaf,
  Check,
} from "lucide-react";

import { products } from "@/services/json/groceryData";
import { useCartStore } from "@/store/cart-store";

const categories = [
  "All",
  "Fruits",
  "Vegetables",
  "Dairy",
  "Bakery",
  "Staples",
];

export default function ProductPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [addedProducts, setAddedProducts] = useState<string[]>([]);

  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, category, sort]);

  const toggleFavorite = (id: string) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    );
  };

  const handleAddToCart = (product: (typeof products)[number]) => {
    addItem(product);

    setAddedProducts((previous) => [...previous, product.id]);

    setTimeout(() => {
      setAddedProducts((previous) =>
        previous.filter((id) => id !== product.id),
      );
    }, 1500);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <main className="min-h-screen bg-[#f8faf7] text-gray-900">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-linear-to-br from-emerald-700 via-emerald-600 to-green-500 px-6 py-12 text-white sm:px-12 sm:py-16 lg:px-16">
          <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 right-1/3 h-64 w-64 rounded-full bg-lime-300/20 blur-3xl" />

          <div className="relative z-10 grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider">
                <Sparkles size={15} />
                Freshness delivered
              </span>

              <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Fresh groceries,
                <span className="block text-lime-200">happy living.</span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-emerald-50 sm:text-base">
                Discover fresh fruits, vegetables, dairy, and everyday
                essentials. Everything you need, delivered with care.
              </p>

              <a
                href="#product"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-emerald-800 shadow-lg transition hover:-translate-y-1 hover:bg-lime-100"
              >
                Shop now
                <ArrowRight size={18} />
              </a>

              <div className="mt-8 flex flex-wrap items-center gap-5 text-xs font-medium text-emerald-50">
                <span className="flex items-center gap-2">
                  <Check size={16} />
                  Fresh products
                </span>
                <span className="flex items-center gap-2">
                  <Check size={16} />
                  Easy shopping
                </span>
              </div>
            </div>

            <div className="relative flex min-h-56 items-center justify-center sm:min-h-72">
              <div className="absolute h-56 w-56 rounded-full bg-white/10 sm:h-72 sm:w-72" />
              <div className="relative grid grid-cols-2 gap-3 text-6xl sm:gap-5 sm:text-8xl">
                <div className="flex h-28 w-28 rotate-[-8deg] items-center justify-center rounded-3xl border border-white/20 bg-white/15 shadow-xl backdrop-blur-md transition hover:rotate-0 sm:h-36 sm:w-36">
                  🍎
                </div>
                <div className="mt-8 flex h-28 w-28 rotate-[8deg] items-center justify-center rounded-3xl border border-white/20 bg-white/15 shadow-xl backdrop-blur-md transition hover:rotate-0 sm:h-36 sm:w-36">
                  🥑
                </div>
                <div className="flex h-28 w-28 rotate-6deg items-center justify-center rounded-3xl border border-white/20 bg-white/15 shadow-xl backdrop-blur-md transition hover:rotate-0 sm:h-36 sm:w-36">
                  🥦
                </div>
                <div className="-mt-8 flex h-28 w-28 -rotate-6deg items-center justify-center rounded-3xl border border-white/20 bg-white/15 shadow-xl backdrop-blur-md transition hover:rotate-0 sm:h-36 sm:w-36">
                  🍊
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
        {[
          {
            icon: "🥬",
            title: "Fresh products",
            description: "Carefully selected groceries",
          },
          {
            icon: "🛒",
            title: "Easy shopping",
            description: "A simple shopping experience",
          },
          {
            icon: "💚",
            title: "Everyday essentials",
            description: "Everything for your kitchen",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-2xl">
              {item.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
              <p className="mt-1 text-xs text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </section>

      <section
        id="products"
        className="mx-auto max-w-7xl scroll-mt-32 px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600">
              <Leaf size={15} />
              Our collection
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Fresh products
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Find your everyday essentials in one place.
            </p>
          </div>

          <Link
            href="/cart"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-100 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-50"
          >
            <ShoppingCart size={18} />
            View cart
            {cartCount > 0 && (
              <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition focus-within:border-emerald-500 focus-within:bg-white sm:max-w-md">
            <Search size={19} className="shrink-0 text-gray-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search fruits, vegetables..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-gray-500" />
            <label htmlFor="sort" className="text-sm text-gray-500">
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="min-w-0 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-semibold text-gray-700 outline-none focus:border-emerald-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to high</option>
              <option value="price-high">Price: High to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                category === item
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-emerald-300 hover:text-emerald-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-bold text-gray-900">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>

          {(search || category !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="text-xs font-semibold text-emerald-700 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, index) => {
              const isFavorite = favorites.includes(product.id);
              const isAdded = addedProducts.includes(product.id);
              const inCart = cartItems.some((item) => item.id === product.id);

              return (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/5"
                >
                  <div className="relative flex h-56 items-center justify-center overflow-hidden bg-[#f3f8f0]">
                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 shadow-sm">
                      {product.category}
                    </span>

                    {index < 3 && (
                      <span className="absolute right-4 top-4 rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold text-amber-700">
                        Popular
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleFavorite(product.id)}
                      aria-label={
                        isFavorite ? "Remove from wishlist" : "Add to wishlist"
                      }
                      className="absolute right-4 top-12 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition hover:text-red-500"
                    >
                      <Heart
                        size={18}
                        className={
                          isFavorite ? "fill-red-500 text-red-500" : ""
                        }
                      />
                    </button>

                    <Link
                      href={`/product/${product.id}`}
                      aria-label={`View ${product.name}`}
                      className="flex h-full w-full items-center justify-center"
                    >
                      <span className="select-none text-8xl drop-shadow-sm transition duration-500 group-hover:scale-110">
                        {product.emoji}
                      </span>
                    </Link>
                  </div>

                  {/* Product details */}
                  <div className="p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-400">
                        {product.unit}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                        <Star size={13} className="fill-current" />
                        4.8
                      </span>
                    </div>

                    <Link href={`/product/${product.id}`}>
                      <h3 className="truncate text-lg font-bold text-gray-900 transition hover:text-emerald-700">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="mt-1 min-h-10 text-xs leading-5 text-gray-500">
                      {product.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xl font-extrabold text-gray-900">
                          ₹{product.price}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          Inclusive of all taxes
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition ${
                          isAdded
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-emerald-600 text-white hover:bg-emerald-700"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check size={15} />
                            Added
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={15} />
                            {inCart ? "Add more" : "Add"}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-3xl">
              🛒
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              No products found
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Try another search or select a different category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-5 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              Show all products
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
