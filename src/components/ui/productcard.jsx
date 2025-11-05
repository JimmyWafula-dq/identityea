import { Heart, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/view/${product.name}`}
      // send data to next page in state
      state={{ product }}
      key={product.id}
      className="group flex flex-col items-center text-center bg-white-100 ring-1 ring-gray-200 rounded-lg p-3 shadow-sm group-hover:shadow-md transition-shadow "
    >
      {/* Image Container */}
      <div className="bg-gray-50 rounded-2xl p-6 mb-4 w-full h-48 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-2 w-full">
        {/* Name + Wishlist */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
          <button className="text-gray-400 hover:text-red-500 transition">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Rating */}
        <div className="flex justify-center md:justify-start">
          {[...Array(product.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        {/* Price & Discount */}
        <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
          <span className="text-lg font-bold text-gray-900">
            ${product.salePrice}
          </span>
          <span className="text-gray-400 line-through">
            ${product.originalPrice}
          </span>
          <span className="text-red-600 font-medium">{product.discount}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
