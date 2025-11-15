// src/components/CartDrawer.jsx
"use client";

import * as React from "react";
import { ShoppingCart, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import CartPage from "@/pages/CartPage";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const { itemCount } = useCart();
  return (
    <Drawer className="">
      <DrawerTrigger asChild>
        <button className="relative cursor-pointer">
          <svg
            width="18"
            height="18"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <button className="absolute -top-2 -right-3 text-xs text-white bg-red-500 w-[18px] h-[18px] rounded-full">
            {itemCount}
          </button>
        </button>
      </DrawerTrigger>

      <DrawerContent className="max-h-screen flex flex-col bg-white">
        {/* Header */}
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <DrawerTitle>Your Cart</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="w-5 h-5" />
              </Button>
            </DrawerClose>
          </div>
          <DrawerDescription>
            Review your items before checkout
          </DrawerDescription>
        </DrawerHeader>

        {/* Scrollable Cart Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <CartPage />
        </div>

        {/* Fixed Footer */}
        <DrawerFooter className="border-t bg-white pt-4">
          <Button className="w-full" size="lg">
            Get Quote
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full mt-2 rounded-xl">
              Continue Shopping
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
