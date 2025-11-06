import { baseUrl } from "@/lib/api";
import { Heart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/view/${encodeURIComponent(product.name)}`}
      state={{ product }} // still works for internal navigation
      key={product._id}
      className="group flex flex-col items-center text-center bg-white ring-1 ring-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out max-w-xs w-full"
    >
      {/* Image Container */}
      <div className="bg-gray-50 rounded-xl p-6 mb-4 w-full h-48 flex items-center justify-center overflow-hidden relative">
        <img
          src={`${baseUrl}/${product.image}`}
          alt={product.name}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        {/* Overlay for hover effect */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
      </div>

      {/* Product Info */}
      <div className="space-y-3 w-full">
        {/* Name + Wishlist */}
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

        {/* Price & Discount */}
        <div className="flex items-center justify-center md:justify-start gap-3 text-sm">
          <span className="text-xl font-bold text-gray-900">
            ${product.price}
          </span>
          {product.price + product.discount > product.price && (
            <span className="text-gray-500 line-through">
              ${product.price + product.discount}
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
};

export default ProductCard;
