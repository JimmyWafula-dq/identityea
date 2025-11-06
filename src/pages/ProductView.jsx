// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import {
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import AppLayout from "@/layout/AppLayout";
import toast from "react-hot-toast";
import api, { baseUrl } from "@/lib/api";

// Related Product Card
const RelatedProductCard = ({ product }) => (
  <Link
    to={`/view/${encodeURIComponent(product.name)}`}
    key={product._id}
    className="group flex flex-col items-center text-center bg-white ring-1 ring-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out w-full"
  >
    <div className="bg-gray-50 rounded-xl p-6 mb-4 w-full h-48 flex items-center justify-center overflow-hidden relative">
      <img
        src={`${baseUrl}/${product.image}`}
        alt={product.name}
        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
    </div>

    <div className="space-y-3 w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {product.name}
        </h3>
        <button
          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
          aria-label="Add to wishlist"
        >
          <Heart className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center justify-center md:justify-start gap-3 text-sm">
        <span className="text-xl font-bold text-gray-900">
          ${product.price}
        </span>
        {product.discount > 0 && (
          <span className="text-gray-500 line-through">
            ${(product.price + product.discount).toFixed(2)}
          </span>
        )}
        {product.discount > 0 && (
          <span className="text-red-600 font-medium">
            {product.discount}% off
          </span>
        )}
      </div>
    </div>
  </Link>
);

export default function ProductView() {
  // ---------- URL & Navigation ----------
  const { name } = useParams(); // from /view/:name
  const location = useLocation();
  const { product: stateProduct } = location.state || {};

  // ---------- State ----------
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  const [selectedColor, setSelectedColor] = useState("Green");
  const [selectedSize, setSelectedSize] = useState(42);
  const [quantity, setQuantity] = useState(1);

  // ---------- Cart ----------
  const { addToCart } = useCart();

  // ---------- Fetch Product by Name ----------
  const fetchProductByName = async (productName) => {
    setLoading(true);
    try {
      const res = await api.get("/products");
      const all = res.data.map((p) => ({
        ...p,
        price: Number(p.price),
        discount: Number(p.discount) || 0,
      }));

      const decodedName = decodeURIComponent(productName);
      const found = all.find(
        (p) => p.name.toLowerCase() === decodedName.toLowerCase()
      );

      if (found) {
        setProduct(found);
        // Pre-fill color if available
        if (found.color) setSelectedColor(found.color);
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  // ---------- Fetch Related Products ----------
  const fetchRelatedProducts = async (currentId) => {
    setLoadingRelated(true);
    try {
      const res = await api.get("/products");
      const all = res.data.map((p) => ({
        ...p,
        price: Number(p.price),
        discount: Number(p.discount) || 0,
      }));

      const filtered = all
        .filter((p) => p._id !== currentId)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

      setRelatedProducts(filtered);
    } catch (error) {
      console.error("Failed to fetch related:", error);
    } finally {
      setLoadingRelated(false);
    }
  };

  // ---------- Effect: Load Product ----------
  useEffect(() => {
    if (name) {
      fetchProductByName(name);
    }
  }, [name]);

  // ---------- Effect: Load Related (after product) ----------
  useEffect(() => {
    if (product?._id) {
      fetchRelatedProducts(product._id);
    }
  }, [product]);

  // ---------- Add to Cart ----------
  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      id: `${product._id}-${selectedColor}-${selectedSize}`,
      name: product.name,
      price: product.price,
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
          {quantity} × {product.name} ({selectedColor}, {selectedSize}) added
        </span>
      </div>,
      { duration: 2500 }
    );
  };

  // ---------- Static Options ----------
  const colors = ["Green", "Black", "White", "Gray"];
  const sizes = [40, 41, 42, 43, 44, 45, 46, 47];

  // ---------- Loading / Error ----------
  if (loading) {
    return (
      <AppLayout>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-gray-100 rounded-3xl h-96"></div>
              <div className="space-y-6">
                <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="h-14 bg-gray-200 rounded-xl w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!product) {
    return (
      <AppLayout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-xl text-red-600">Product not found</p>
          <Link to="/products" className="mt-4 text-sm text-black underline">
            Back to Products
          </Link>
        </div>
      </AppLayout>
    );
  }

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
          &gt; <span className="text-black">{product.name}</span>
        </nav>
      </div>

      {/* Main Section */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image */}
          <div className="relative group">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12 flex items-center justify-center overflow-hidden shadow-inner">
              <img
                src={`${baseUrl}/${product.image}`}
                alt={product.name}
                className="max-h-96 lg:max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 rounded-3xl ring-1 ring-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center space-y-7">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
              {product.color && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-gray-600">Color:</span>
                  <div
                    className="w-6 h-6 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: product.color.toLowerCase() }}
                  />
                  <span className="text-sm font-medium text-gray-800">
                    {product.color}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.discount > 0 && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    ${(product.price + product.discount).toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded-full">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            {product.description && (
              <p className="text-gray-600 leading-relaxed text-base lg:text-lg">
                {product.description}
              </p>
            )}

            <hr className="border-gray-200" />

            {/* Color */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Color: <span className="font-normal">{selectedColor}</span>
              </h3>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === color
                        ? "border-black ring-2 ring-offset-2 ring-black"
                        : "border-gray-300 hover:border-gray-400"
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

            {/* Size */}
            {/* <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Size: <span className="font-normal">{selectedSize}</span>
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div> */}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-gray-300 rounded-xl w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-50 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-6 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-50 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all duration-200 transform active:scale-95"
              >
                <ShoppingCart className="w-5 h-5" />
                Add To Cart
              </button>

              {/* <button className="px-4 py-4 border border-gray-300 rounded-xl hover:border-black hover:bg-gray-50 transition-all duration-200 group">
                <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500 group-hover:fill-red-500 transition-all" />
              </button> */}
            </div>

            <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-semibold hover:bg-black transition-all duration-200">
              Get A quote
            </button>

            {/* Trust */}
            <div className="flex items-center gap-6 text-sm text-gray-500 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 16.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM14 16.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM3 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1H3V4zm0 3h14v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
                  </svg>
                </div>
                <span>Free Returns</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Free Delivery On Orders Over $200
            </p>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="max-w-7xl mx-auto px-4 py-12 border-t bg-gray-50">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            You Might Also Like
          </h2>
          <Link
            to="/products"
            className="text-sm font-medium text-black hover:underline"
          >
            View All
          </Link>
        </div>
        {loadingRelated ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                <div className="bg-gray-200 rounded-xl h-48 mb-4"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 w-full mx-auto md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <RelatedProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>
    </AppLayout>
  );
}
