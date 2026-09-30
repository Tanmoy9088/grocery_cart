"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  ChevronDown,
  Leaf,
  ArrowRight,
} from "lucide-react";

import { products } from "@/services/json/groceryData";
import { CartCount } from "@/components/cart-count";

const categories = [
  "All",
  ...Array.from(new Set(products.map((product) => product.category))),
];

export default function Header() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("q", search.trim());
    }

    if (selectedCategory !== "All") {
      params.set("category", selectedCategory);
    }

    router.push(`/?${params.toString()}`);
    setMobileOpen(false);
  };

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
    setCategoryOpen(false);

    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("q", search.trim());
    }

    if (category !== "All") {
      params.set("category", category);
    }

    router.push(`/?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Announcement bar */}
      <div className="bg-emerald-700 px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
        <p>
          Fresh groceries delivered to your doorstep.
          <span className="ml-1 font-bold">Shop now!</span>
        </p>
      </div>

      {/* Main header */}
      <div className="border-b border-gray-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Leaf size={25} strokeWidth={2.5} />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
                Fresh<span className="text-emerald-600">Cart</span>
              </h1>
              <p className="-mt-1 text-[10px] font-medium tracking-widest text-gray-500">
                FRESHNESS DELIVERED
              </p>
            </div>
          </Link>

          {/* Search bar - desktop */}
          <form
            onSubmit={handleSearch}
            className="mx-auto hidden w-full max-w-xl items-center rounded-full border border-gray-200 bg-gray-50 p-1.5 transition focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-100 md:flex"
          >
            <div className="relative">
              <button
                type="button"
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <span className="max-w-24 truncate">{selectedCategory}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    categoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {categoryOpen && (
                <div className="absolute left-0 top-12 z-50 max-h-64 w-52 overflow-y-auto rounded-2xl border border-gray-100 bg-white p-2 shadow-xl">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleCategory(category)}
                      className={`block w-full rounded-xl px-4 py-2.5 text-left text-sm transition ${
                        selectedCategory === category
                          ? "bg-emerald-50 font-semibold text-emerald-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="h-7 w-px bg-gray-200" />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for fruits, vegetables..."
              className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />

            <button
              type="submit"
              aria-label="Search products"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white transition hover:bg-emerald-700"
            >
              <Search size={19} />
            </button>
          </form>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-6 lg:flex">
            <Link
              href="/"
              className="text-sm font-semibold text-gray-700 transition hover:text-emerald-600"
            >
              Home
            </Link>

            <Link
              href="/product"
              className="text-sm font-semibold text-gray-700 transition hover:text-emerald-600"
            >
              Shop
            </Link>
          </nav>

          {/* Cart */}
          <Link
            href="/cart"
            aria-label="Shopping cart"
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100"
          >
            <ShoppingCart size={21} />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white">
              <CartCount />
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 transition hover:bg-gray-100 md:hidden"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="border-b border-gray-100 bg-white px-4 py-5 shadow-lg md:hidden">
          <form
            onSubmit={handleSearch}
            className="mb-5 flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 p-2 focus-within:border-emerald-500"
          >
            <Search size={19} className="ml-2 text-gray-400" />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search groceries..."
              className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none"
            />

            <button
              type="submit"
              aria-label="Search"
              className="rounded-xl bg-emerald-600 p-2.5 text-white hover:bg-emerald-700"
            >
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
            >
              Home
            </Link>

            <Link
              href="/shop"
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
            >
              Shop
            </Link>

            <Link
              href="/cart"
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
            >
              Shopping Cart
            </Link>
          </div>

          <div className="mt-5 border-t border-gray-100 pt-4">
            <p className="mb-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-400">
              Categories
            </p>

            <div className="flex flex-wrap gap-2 px-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    handleCategory(category);
                    setMobileOpen(false);
                  }}
                  className={`rounded-full border px-3 py-2 text-xs font-medium transition ${
                    selectedCategory === category
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-emerald-500 hover:text-emerald-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
