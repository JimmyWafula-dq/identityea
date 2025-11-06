// src/components/Products.jsx
import React, { useEffect, useState } from "react";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ui/productcard";
import api from "@/lib/api";

export default function Products() {
  // const products = [
  //   {
  //     name: "Laptop",
  //     rating: 5,
  //     originalPrice: 180,
  //     salePrice: 110,
  //     discount: "43% Off",
  //     image: "/images/fabric.webp",
  //   },
  //   {
  //     name: "Id Card",
  //     rating: 5,
  //     originalPrice: 180,
  //     salePrice: 110,
  //     discount: "30% Off",
  //     image: "/images/idcard.webp",
  //   },
  //   {
  //     name: "Lanyard",
  //     rating: 5,
  //     originalPrice: 180,
  //     salePrice: 110,
  //     discount: "45% Off",
  //     image: "/images/lanyard.webp",
  //   },
  //   {
  //     name: "Tyvek",
  //     rating: 5,
  //     originalPrice: 180,
  //     salePrice: 110,
  //     discount: "45% Off",
  //     image: "/images/identityea1.jpg",
  //   },
  // ];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products");
      setProducts(res.data);
      console.log("products", res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-10">
          Featured Products
        </h2>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-4 xl:grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 shadow-sm animate-pulse"
              >
                <div className="bg-gray-200 rounded-xl h-48 mb-4"></div>
                <div className="h-5 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.slice(0, 4).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        )}
      </div>

      <div className="w-full py-4 my-6 mx-auto text-center">
        <a href="/products" className="bg-black text-white px-6 py-2 rounded">
          View All Products
        </a>
      </div>
    </section>
  );
}
