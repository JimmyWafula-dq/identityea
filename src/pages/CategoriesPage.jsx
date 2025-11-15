// src/pages/AllProducts.jsx
import React, { useState, useMemo, useEffect } from "react";
import { Heart, Search, Filter, ChevronDown, X } from "lucide-react";
import { Link } from "react-router-dom";
import AppLayout from "@/layout/AppLayout";
import ProductCard from "@/components/ui/productcard";
import api from "@/lib/api";

export default function CategoriesPage() {
  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [allProducts, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Products
  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products");
      // Normalize data: ensure price is number
      const normalized = res.data.map((p) => ({
        ...p,
        price: Number(p.price),
        discount: Number(p.discount) || 0,
      }));
      setProducts(normalized);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Extract unique categories and colors
  const categories = useMemo(() => {
    const cats = [
      ...new Set(allProducts.map((p) => p.category).filter(Boolean)),
    ];
    return ["All", ...cats.sort()];
  }, [allProducts]);

  const colors = useMemo(() => {
    const cols = [...new Set(allProducts.map((p) => p.color).filter(Boolean))];
    return ["All", ...cols.sort()];
  }, [allProducts]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch = product.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesColor =
        selectedColor === "All" || product.color === selectedColor;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesColor && matchesPrice;
    });
  }, [allProducts, searchTerm, selectedCategory, selectedColor, priceRange]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "discount":
        return sorted.sort((a, b) => b.discount - a.discount);
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  // Reset Filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedColor("All");
    setPriceRange([0, 500]);
    setSortBy("featured");
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <aside
            className={`fixed inset-0 z-40 lg:relative lg:inset-auto lg:z-auto bg-white lg:bg-transparent p-6 lg:p-0 transition-transform duration-300 ${
              mobileFiltersOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            } lg:block`}
          >
            <div className="lg:sticky lg:top-6 bg-white rounded-2xl shadow-lg p-6 lg:p-8 h-fit">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="w-4 h-4 text-black focus:ring-black"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-black transition">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Color</h4>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() =>
                        setSelectedColor(
                          selectedColor === color ? "All" : color
                        )
                      }
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? "ring-4 ring-black ring-offset-2"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      style={{
                        backgroundColor:
                          color === "All" ? "#e5e7eb" : color.toLowerCase(),
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Price Range
                </h4>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetFilters}
                className="w-full py-2.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600">
                  Showing{" "}
                  <strong className="text-gray-900">
                    {sortedProducts.length}
                  </strong>{" "}
                  of{" "}
                  <strong className="text-gray-900">
                    {allProducts.length}
                  </strong>{" "}
                  products
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 hidden sm:block">
                    Sort by:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="discount">Highest Discount</option>
                    <option value="name">Name A-Z</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3 xl:grid-cols-3 gap-2">
                {[...Array(6)].map((_, i) => (
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
              <>
                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* No Results */}
                {sortedProducts.length === 0 && !loading && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      No products found matching your filters.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="mt-4 text-sm font-medium text-black underline"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Pagination (Optional) */}
            {sortedProducts.length > 0 && (
              <div className="flex justify-center mt-12 gap-2">
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition">
                  1
                </button>
                <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                  2
                </button>
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition">
                  3
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </AppLayout>
  );
}
