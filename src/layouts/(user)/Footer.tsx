import Link from "next/link";
import {
  ShoppingBasket,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  //   Instagram,
  //   Facebook,
  Leaf,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-5 inline-flex items-center gap-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                <ShoppingBasket size={23} />
              </span>

              <span className="text-2xl font-extrabold tracking-tight text-white">
                freshcart<span className="text-emerald-400">.</span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-7 text-gray-400">
              Fresh groceries, delivered with care. Make every meal special with
              FreshCart. Bringing freshness and quality straight to your
              doorstep.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-800 bg-gray-900 transition hover:border-emerald-500 hover:bg-emerald-500 hover:text-white"
              >
                {/* <Instagram size={18} /> */}
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-800 bg-gray-900 transition hover:border-emerald-500 hover:bg-emerald-500 hover:text-white"
              >
                {/* <Facebook size={18} /> */}
              </a>

              <a
                href="mailto:hello@freshcart.com"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-800 bg-gray-900 transition hover:border-emerald-500 hover:bg-emerald-500 hover:text-white"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-base font-bold text-white">Quick Links</h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="transition hover:translate-x-1 hover:text-emerald-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#products"
                  className="transition hover:translate-x-1 hover:text-emerald-400"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="transition hover:translate-x-1 hover:text-emerald-400"
                >
                  My Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-base font-bold text-white">
              Customer Support
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:hello@freshcart.com"
                  className="transition hover:text-emerald-400"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <Link href="/faq" className="transition hover:text-emerald-400">
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="transition hover:text-emerald-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition hover:text-emerald-400"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-base font-bold text-white">
              Get in Touch
            </h3>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-emerald-400"
                />
                <span>India</span>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-emerald-400" />
                <a
                  href="tel:+919876543210"
                  className="transition hover:text-emerald-400"
                >
                  +91 98765 43210
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-emerald-400" />
                <a
                  href="mailto:hello@freshcart.com"
                  className="break-all transition hover:text-emerald-400"
                >
                  hello@freshcart.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 rounded-3xl border border-gray-800 bg-gray-900 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Leaf size={20} className="text-emerald-400" />
              <h3 className="text-xl font-bold text-white">
                Stay fresh with us!
              </h3>
            </div>

            <p className="text-sm text-gray-400">
              Get updates about fresh products and special offers.
            </p>
          </div>

          <form
            className="flex w-full max-w-md items-center rounded-full border border-gray-700 bg-gray-950 p-1.5 focus-within:border-emerald-500"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              aria-label="Email address"
              required
              className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-gray-500"
            />

            <button
              type="submit"
              aria-label="Subscribe"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white transition hover:bg-emerald-400"
            >
              <ArrowRight size={19} />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center text-xs text-gray-500 sm:flex-row sm:px-6 sm:text-sm lg:px-8">
          <p>© 2026 FreshCart. All rights reserved.</p>

          <p>
            Made with <span className="text-red-500">♥</span> for fresh choices.
          </p>
        </div>
      </div>
    </footer>
  );
}
