import React from "react";
import { Button } from "./ui/button";
import Logo from "@/constants";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "./CartDrawer";

const Navbar = () => {
  const { itemCount } = useCart();
  console.log("itemCount", itemCount);
  return (
    <div className="bg-black w-full sm:px-16 px-6 py-3 animate-fade-up animate-duration-[2000ms]">
      <nav class="z-50 flex items-center justify-between w-full px-6 md:px-6 backdrop-blur text-white text-sm">
        <a href="/">
          <Logo />
        </a>

        <div class="hidden md:flex items-center gap-8 transition duration-500">
          <a href="/" class="hover:text-slate-300 transition">
            Home
          </a>
          <a href="/products" class="hover:text-slate-300 transition">
            Products
          </a>
          <a href="/stories" class="hover:text-slate-300 transition">
            Stories
          </a>
          <a href="/pricing" class="hover:text-slate-300 transition">
            Pricing
          </a>
        </div>

        {/* <button class="hidden md:block px-6 py-2.5 text-black bg-white hover:bg-slate-200 active:scale-95 transition-all rounded-full">
          Contact us
        </button> */}
        <div className="flex flex-row items-center space-x-5 relative">
          <CartDrawer />
          <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
            <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur">
              Shop Now
            </button>
          </div>
        </div>
        <button id="open-menu" class="md:hidden active:scale-90 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-menu-icon lucide-menu"
          >
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
