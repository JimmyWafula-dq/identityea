// src/pages/AllProducts.jsx
import React, { useState, useMemo } from "react";
import { Heart, Star, Search, Filter, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import AppLayout from "@/layout/AppLayout";

// Reusable Product Card Component
const ProductCard = ({ product }) => (
  <div className="group flex flex-col">
    <div className="bg-gray-50 rounded-2xl p-6 mb-4 w-full h-48 flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="max-h-full max-w-full object-contain"
      />
    </div>

    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <button className="text-gray-400 hover:text-red-500 transition">
          <Heart className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-start">
        {[...Array(product.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className="text-lg font-bold text-gray-900">
          ${product.salePrice}
        </span>
        <span className="text-gray-400 line-through">
          ${product.originalPrice}
        </span>
        <span className="text-red-600 font-medium">{product.discount}</span>
      </div>
    </div>
  </div>
);

export default function ProductsPage() {
  // Full product list
  const allProducts = [
    {
      id: 1,
      name: "Wide Face Wristband",
      category: "Wristbands",
      size: "Wide",
      color: "Red",
      rating: 5,
      salePrice: 110,
      originalPrice: 180,
      discount: "39% Off",
      image: "/images/Wide-Face-Wristband.webp",
    },
    {
      id: 2,
      name: "L-Shaped Wristband",
      category: "Wristbands",
      size: "L",
      color: "Blue",
      rating: 5,
      salePrice: 95,
      originalPrice: 150,
      discount: "37% Off",
      image: "/images/LShaped-wristband.webp",
    },
    {
      id: 3,
      name: "Fabric Wristband",
      category: "Wristbands",
      size: "Standard",
      color: "Black",
      rating: 4,
      salePrice: 120,
      originalPrice: 200,
      discount: "40% Off",
      image: "/images/fabric.webp",
    },
    {
      id: 4,
      name: "Lanyard",
      category: "Accessories",
      size: "Standard",
      color: "Green",
      rating: 5,
      salePrice: 80,
      originalPrice: 140,
      discount: "43% Off",
      image: "/images/lanyard.webp",
    },
    {
      id: 5,
      name: "ID Card Holder",
      category: "Accessories",
      size: "Standard",
      color: "White",
      rating: 5,
      salePrice: 60,
      originalPrice: 110,
      discount: "45% Off",
      image: "/images/idcard.webp",
    },
    {
      id: 6,
      name: "Tyvek Wristband",
      category: "Wristbands",
      size: "Standard",
      color: "Yellow",
      rating: 5,
      salePrice: 70,
      originalPrice: 130,
      discount: "46% Off",
      image: "/images/tyvek.webp",
    },
    {
      id: 7,
      name: "Custom Tyvek",
      category: "Wristbands",
      size: "Custom",
      color: "Purple",
      rating: 5,
      salePrice: 130,
      originalPrice: 220,
      discount: "41% Off",
      image: "/images/identityea1.jpg",
    },
    {
      id: 8,
      name: "Event Pass",
      category: "Accessories",
      size: "Standard",
      color: "Orange",
      rating: 4,
      salePrice: 90,
      originalPrice: 160,
      discount: "44% Off",
      image: "/images/idcard.webp",
    },
  ];

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSize =
        selectedSize === "All" || product.size === selectedSize;
      const matchesColor =
        selectedColor === "All" || product.color === selectedColor;
      const matchesPrice =
        product.salePrice >= priceRange[0] &&
        product.salePrice <= priceRange[1];

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSize &&
        matchesColor &&
        matchesPrice
      );
    });
  }, [searchTerm, selectedCategory, selectedSize, selectedColor, priceRange]);

  // Sort Logic
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.salePrice - b.salePrice);
      case "price-high":
        return sorted.sort((a, b) => b.salePrice - a.salePrice);
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  // Extract unique values for filters
  const categories = ["All", ...new Set(allProducts.map((p) => p.category))];
  const sizes = ["All", ...new Set(allProducts.map((p) => p.size))];
  const colors = ["All", ...new Set(allProducts.map((p) => p.color))];

  return (
    <>
      {/* Header */}
      <AppLayout>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside
              className={`lg:w-64 ${
                mobileFiltersOpen ? "block" : "hidden lg:block"
              } bg-white p-6 rounded-lg shadow-sm`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button
                  className="lg:hidden"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  ×
                </button>
              </div>

              {/* Search (Mobile) */}
              <div className="mb-6 lg:hidden">
                <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                  <Search className="w-4 h-4 text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent outline-none text-sm w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Categories</h4>
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 cursor-pointer py-1"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="w-4 h-4 text-red-600"
                    />
                    <span className="text-sm">{cat}</span>
                  </label>
                ))}
              </div>

              {/* Size */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        setSelectedSize(selectedSize === size ? "All" : size)
                      }
                      className={`px-3 py-1 text-xs rounded-full border ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Color</h4>
                <div className="flex gap-2 flex-wrap">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() =>
                        setSelectedColor(
                          selectedColor === color ? "All" : color
                        )
                      }
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color
                          ? "ring-2 ring-offset-2 ring-black"
                          : ""
                      }`}
                      style={{
                        backgroundColor:
                          color === "All" ? "#ccc" : color.toLowerCase(),
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Top Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <p className="text-sm text-gray-600">
                  Showing <strong>{sortedProducts.length}</strong> of{" "}
                  <strong>{allProducts.length}</strong> results
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border rounded-lg px-3 py-1"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-10 gap-2">
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                  1
                </button>
                <button className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center">
                  2
                </button>
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                  3
                </button>
              </div>
            </main>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
