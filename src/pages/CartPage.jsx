// src/pages/CartPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import AppLayout from "@/layout/AppLayout";
import { baseUrl } from "@/lib/api";

export default function CartPage() {
  const { cart, updateQuantity, removeItem, subtotal, shipping, total } =
    useCart();

  return (
    <>
      {cart?.length === 0 ? (
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added anything yet.
          </p>
          <Link
            to="/products"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-white">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Shopping Cart
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 border"
                >
                  <img
                    src={`${baseUrl}/${item.image}`}
                    alt={item.name}
                    className="w-20 h-20 object-contain rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Size: {item.size} | Color: {item.color}
                    </p>
                    <p className="text-lg font-bold text-gray-900 mt-1">
                      ${item.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Order Summary
                </h2>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600" : ""}>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {subtotal < 200 && (
                    <p className="text-xs text-gray-500">
                      Add ${(200 - subtotal).toFixed(2)} for free shipping
                    </p>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition">
                  Get Quote
                </button>

                <Link
                  to="/products"
                  className="block text-center text-sm text-gray-600 hover:text-black mt-3"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
