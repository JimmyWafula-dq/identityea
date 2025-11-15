// Navbar.tsx
import React, { useState } from "react";
import { Button } from "./ui/button";
import Logo from "@/constants";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "./CartDrawer";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();

  /* ---------- Mobile menu state ---------- */
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((v) => !v);
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* ---------- MAIN BAR ---------- */}
      <div className="bg-black w-full px-4 sm:px-16 py-3">
        <nav className="relative z-50 flex items-center justify-between text-white text-sm">
          {/* Logo */}
          <a href="/" onClick={closeMobile}>
            <Logo />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="hover:text-slate-300 transition">
              Home
            </a>
            <a href="/products" className="hover:text-slate-300 transition">
              Products
            </a>
            <a href="/about" className="hover:text-slate-300 transition">
              About
            </a>
          </div>

          {/* Desktop actions (only visible on md+) */}
          <div className="hidden md:flex items-center gap-4">
            <CartDrawer />
            {user ? (
              <button
                onClick={logout}
                className="px-5 py-2 rounded-full bg-white/15 hover:bg-white/25 transition"
              >
                Logout
              </button>
            ) : (
              <a
                href="/products"
                className="rainbow relative z-0 overflow-hidden p-0.5 rounded-full hover:scale-105 transition duration-300"
              >
                <button className="px-8 py-3 text-sm font-medium text-white bg-gray-900/80 rounded-full backdrop-blur">
                  Shop Now
                </button>
              </a>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            id="open-menu"
            onClick={toggleMobile}
            className="md:hidden p-2 active:scale-90 transition"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu"
            >
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          </button>
        </nav>
      </div>

      {/* ---------- MOBILE FULL-SCREEN MENU ---------- */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-md transition-opacity duration-300 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobile}
      />
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-black/95 backdrop-blur-lg flex flex-col p-6 transform transition-transform duration-500 ease-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={closeMobile}
          className="self-end p-2 mb-8 active:scale-90 transition"
          aria-label="Close menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation links */}
        <nav className="flex flex-col gap-6 text-lg text-white">
          <a
            href="/"
            onClick={closeMobile}
            className="hover:text-slate-300 transition"
          >
            Home
          </a>
          <a
            href="/products"
            onClick={closeMobile}
            className="hover:text-slate-300 transition"
          >
            Products
          </a>
          <a
            href="/about"
            onClick={closeMobile}
            className="hover:text-slate-300 transition"
          >
            About
          </a>
        </nav>

        {/* Cart & Auth (inside mobile menu) */}
        <div className="mt-10 flex flex-col gap-4">
          <CartDrawer />
          {user ? (
            <button
              onClick={() => {
                logout();
                closeMobile();
              }}
              className="w-full py-3 rounded-full bg-white/15 hover:bg-white/25 transition"
            >
              Logout
            </button>
          ) : (
            <a
              href="/products"
              onClick={closeMobile}
              className="rainbow relative z-0 overflow-hidden p-0.5 rounded-full hover:scale-105 transition duration-300"
            >
              <button className="w-full py-3 text-sm font-medium text-white bg-gray-900/80 rounded-full backdrop-blur">
                Shop Now
              </button>
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
