// src/pages/ProductDetail.jsx
import React, { useState } from "react";
import {
  Star,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext"; // <-- NEW
import AppLayout from "@/layout/AppLayout";
import toast from "react-hot-toast"; // <-- optional toast

// Reusable Related-Product Card (unchanged)
const RelatedProductCard = ({ product }) => (
  <div className="group flex flex-col">
    <div className="bg-gray-50 rounded-2xl p-4 mb-3 w-full h-40 flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="max-h-full max-w-full object-contain"
      />
    </div>
    <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
    <div className="flex items-center gap-1 mt-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i < product.rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
    <p className="text-lg font-bold text-gray-900 mt-1">${product.salePrice}</p>
  </div>
);

export default function ProductView() {
  // ---------- UI State ----------
  const [selectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Green");
  const [selectedSize, setSelectedSize] = useState(42);
  const [quantity, setQuantity] = useState(1);

  // ---------- Product from navigation ----------
  const { product } = useLocation().state;
  // console.log("prod", product);

  // ---------- Cart ----------
  const { addToCart } = useCart(); // <-- NEW

  // ---------- Add-to-Cart Handler ----------
  const handleAddToCart = () => {
    const cartItem = {
      id: `${product.id}-${selectedColor}-${selectedSize}`, // unique per variant
      name: product.name,
      salePrice: product.salePrice,
      image: product.image,
      color: selectedColor,
      size: selectedSize,
      quantity,
    };

    addToCart(cartItem);
    toast.success(
      <div className="flex items-center gap-2">
        <Check className="w-5 h-5 text-green-600" />
        <span>
          {quantity} × {product.name} ({selectedColor}, {selectedSize}) added to
          cart
        </span>
      </div>,
      { duration: 2500 }
    );
  };

  // ---------- Static data (you can replace with real data) ----------
  const colors = ["Green", "Black", "White", "Gray"];
  const sizes = [40, 41, 42, 43, 44, 45, 46, 47];

  const relatedProducts = [
    {
      id: 1,
      name: "PulseSneaks Pro",
      rating: 5,
      salePrice: 140,
      image: "/images/related-1.webp",
    },
    {
      id: 2,
      name: "AirPulse V2",
      rating: 4,
      salePrice: 120,
      image: "/images/related-2.webp",
    },
    {
      id: 3,
      name: "FlexRun Lite",
      rating: 5,
      salePrice: 110,
      image: "/images/related-3.webp",
    },
    {
      id: 4,
      name: "SpeedPulse X",
      rating: 5,
      salePrice: 155,
      image: "/images/related-4.webp",
    },
  ];

  return (
    <AppLayout>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <nav className="text-sm text-gray-500">
          <Link to="/" className="hover:text-black">
            Home
          </Link>{" "}
          &gt;{" "}
          <Link to="/products" className="hover:text-black">
            Products
          </Link>{" "}
          &gt; <span className="text-black">{product?.name}</span>
        </nav>
      </div>

      {/* Main Product Section */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery (kept minimal – you can expand) */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-lime-50 to-white rounded-2xl p-8 shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-contain max-h-96 mx-auto"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                {[...Array(product.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="text-sm text-gray-600">
                  (234 Total Reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-gray-900">
              ${product.salePrice}
            </div>

            {/* Description (you can pull from product.description) */}
            <p className="text-gray-600 leading-relaxed">
              Step into style and comfort with the PulseSneaks Relax 4. These
              sneakers feature a breathable mesh upper for comfort during long
              wear, a cushioned insole for support, and a durable rubber outsole
              for traction. Perfect for casual outings or light workouts.
            </p>

            <hr className="border-gray-200" />

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Color: <span className="font-normal">{selectedColor}</span>
              </h3>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? "border-black ring-2 ring-offset-2 ring-black"
                        : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor:
                        color === "Green"
                          ? "#84cc16"
                          : color === "Black"
                          ? "#000000"
                          : color === "White"
                          ? "#ffffff"
                          : "#9ca3af",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-sm font-medium rounded-lg border transition-all ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-6 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-100"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* ---------- ADD TO CART ---------- */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add To Cart
              </button>

              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:border-black transition">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-black transition">
              Buy Now
            </button>

            <p className="text-xs text-gray-500">
              Free Delivery On Orders Over $200
            </p>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="max-w-7xl mx-auto px-4 py-12 border-t">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
          Related Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <RelatedProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
