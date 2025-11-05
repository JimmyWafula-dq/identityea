// src/components/Products.jsx
import React from "react";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function Products() {
  const products = [
    {
      name: "Laptop",
      rating: 5,
      originalPrice: 180,
      salePrice: 110,
      discount: "43% Off",
      image: "/images/fabric.webp",
    },
    {
      name: "Id Card",
      rating: 5,
      originalPrice: 180,
      salePrice: 110,
      discount: "30% Off",
      image: "/images/idcard.webp",
    },
    {
      name: "Lanyard",
      rating: 5,
      originalPrice: 180,
      salePrice: 110,
      discount: "45% Off",
      image: "/images/lanyard.webp",
    },
    {
      name: "Tyvek",
      rating: 5,
      originalPrice: 180,
      salePrice: 110,
      discount: "45% Off",
      image: "/images/identityea1.jpg",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-10">
          Featured Products
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center"
            >
              {/* Image Container */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-4 w-full h-48 flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
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
                  <h3 className="text-lg font-medium text-gray-900">
                    {product.name}
                  </h3>
                  <button className="text-gray-400 hover:text-red-500 transition">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                {/* Rating */}
                <div className="flex justify-center md:justify-start">
                  {[...Array(product.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
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
                  <span className="text-red-600 font-medium">
                    {product.discount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full py-4 my-6 mx-auto text-center">
        <Link to="/products" className="bg-black text-white px-6 py-2 rounded">
          View All Products
        </Link>
      </div>
    </section>
  );
}
