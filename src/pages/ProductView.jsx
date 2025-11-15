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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuoteCart } from "@/context/QuoteCartContext";

// Related Product Card
const RelatedProductCard = ({ product }) => (
  <Link
    to={`/view/${encodeURIComponent(product.name)}`}
    key={product._id}
    className="group flex flex-col items-center text-center bg-white ring-1 ring-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out w-full"
  >
    <div className="bg-gray-50 rounded-xl p-6 mb-4 w-full h-48 flex items-center justify-center overflow-hidden relative">
      <img
        src={`${baseUrl}/${product.image || product.images?.[0]}`}
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
          Kes. {product.price}
        </span>
        {product.discount > 0 && (
          <span className="text-gray-500 line-through">
            Kes. {(product.price + product.discount).toFixed(2)}
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
  const { name } = useParams();
  const location = useLocation();
  const { product: stateProduct } = location.state || {};
  const { addQuoteItem } = useQuoteCart();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  const [selectedColor, setSelectedColor] = useState("Green");
  const [selectedSize, setSelectedSize] = useState(42);
  const [quantity, setQuantity] = useState(1);
  const [selectedTier, setSelectedTier] = useState("");

  const { addToCart } = useCart();

  // Fetch Product by Name
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
        if (found.color) setSelectedColor(found.color);

        // Set first image as main
        const firstImage = found.images?.[0] || found.image;
        if (firstImage) setMainImage(`${baseUrl}/${firstImage}`);

        // Auto-select first available tier
        const firstTier =
          found.category.fixed && found.category.fixed !== ""
            ? "fixed"
            : Object.keys(found.category).find(
                (k) =>
                  k !== "_id" &&
                  k !== "name" &&
                  k !== "fixed" &&
                  found.category[k] &&
                  found.category[k] !== ""
              );
        setSelectedTier(firstTier || "");
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

  // Fetch Related Products
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

  useEffect(() => {
    if (name) {
      fetchProductByName(name);
    }
  }, [name]);

  useEffect(() => {
    if (product?._id) {
      fetchRelatedProducts(product._id);
    }
  }, [product]);

  // Add to Cart
  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      id: `${product._id}-${selectedColor}-${selectedSize}`,
      name: product.name,
      price: product.price,
      image: mainImage,
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

  // WhatsApp Quote
  const sendQuoteToWhatsApp = () => {
    if (!product || !selectedTier) return;

    const tierInfo =
      product.category.fixed && product.category.fixed !== ""
        ? { key: "fixed", label: "Fixed Price", price: product.category.fixed }
        : {
            key: selectedTier,
            label: {
              twotonine: "200 - 999 Pcs",
              onetonineteen: "1,000 - 1,999 Pcs",
              twothousandtonine: "2,000 - 9,999 Pcs",
              tenthousandtotwenty: "10,000 - 20,000 Pcs",
              printed: "Printed",
            }[selectedTier],
            price: product.category[selectedTier],
          };

    addQuoteItem({
      productId: product._id,
      productName: product.name,
      image: mainImage.split("/").pop(),
      categoryName: product.category.name,
      tierKey: tierInfo.key,
      tierLabel: tierInfo.label,
      price: Number(tierInfo.price),
      quantity: 1,
    });

    const message = encodeURIComponent(
      `Quote Request\n\n` +
        `Product: ${product.name}\n` +
        `Category: ${product.category.name}\n` +
        `Tier: ${tierInfo.label}\n` +
        `Price: Kes. ${tierInfo.price}\n\n` +
        `Please confirm availability.`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const colors = ["Green", "Black", "White", "Gray"];
  const sizes = [40, 41, 42, 43, 44, 45, 46, 47];

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

  // Get all images
  const allImages =
    product.images?.length > 0 ? product.images : [product.image];

  // Check if fixed price exists
  const hasFixedPrice = product.category.fixed && product.category.fixed !== "";

  return (
    <AppLayout>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <nav className="text-sm text-gray-500">
          <Link to="/" className="hover:text-black">
            Home
          </Link>{" "}
          >{" "}
          <Link to="/products" className="hover:text-black">
            Products
          </Link>{" "}
          > <span className="text-black">{product.name}</span>
        </nav>
      </div>

      {/* Main Section */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* ---------- IMAGE GALLERY ---------- */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12 flex items-center justify-center overflow-hidden shadow-inner">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="max-h-96 lg:max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 rounded-3xl ring-1 ring-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.map((img, idx) => {
                  const imgUrl = `${baseUrl}/${img}`;
                  const isActive = mainImage === imgUrl;
                  return (
                    <button
                      key={idx}
                      onClick={() => setMainImage(imgUrl)}
                      className={`relative rounded-xl overflow-hidden transition-all duration-200 ${
                        isActive
                          ? "ring-2 ring-black ring-offset-2"
                          : "ring-1 ring-gray-300 hover:ring-gray-400"
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`${product.name} ${idx + 1}`}
                        className="w-full h-20 object-cover"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-black/10"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
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

            {/* PRICING SECTION */}
            <div className="flex flex-col items-baseline gap-3">
              <div className="flex flex-row items-center gap-2">
                <span className="text-xl font-bold text-gray-900">Pricing</span>
                {hasFixedPrice && (
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    Fixed
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 w-full gap-4">
                {hasFixedPrice ? (
                  // Fixed Price Only
                  <div className="col-span-2 bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <div className="text-sm font-medium text-green-800">
                      Fixed Price
                    </div>
                    <div className="text-lg font-bold text-green-900">
                      Kes. {product.category.fixed}
                    </div>
                  </div>
                ) : (
                  // Tiered Pricing
                  <>
                    {product.category.twotonine && (
                      <div className="space-y-1">
                        <div className="text-sm">200 - 999 Pcs</div>
                        <div className="text-xs font-medium">
                          Kes. {product.category.twotonine}
                        </div>
                      </div>
                    )}
                    {product.category.onetonineteen && (
                      <div className="space-y-1">
                        <div className="text-sm">1,000 - 1,999 Pcs</div>
                        <div className="text-xs font-medium">
                          Kes. {product.category.onetonineteen}
                        </div>
                      </div>
                    )}
                    {product.category.twothousandtonine && (
                      <div className="space-y-1">
                        <div className="text-sm">2,000 - 9,999 Pcs</div>
                        <div className="text-xs font-medium">
                          Kes. {product.category.twothousandtonine}
                        </div>
                      </div>
                    )}
                    {product.category.tenthousandtotwenty && (
                      <div className="space-y-1">
                        <div className="text-sm">10,000 - 20,000 Pcs</div>
                        <div className="text-xs font-medium">
                          Kes. {product.category.tenthousandtotwenty}
                        </div>
                      </div>
                    )}
                    {product.category.printed && (
                      <div className="space-y-1">
                        <div className="text-sm text-red-600">Printed</div>
                        <div className="text-xs font-medium text-red-600">
                          Kes. {product.category.printed}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {product.description && (
              <p className="text-gray-600 leading-relaxed text-base lg:text-md">
                {product.description}
              </p>
            )}

            <hr className="border-gray-200" />

            {/* QUOTE DIALOG */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-semibold hover:bg-black transition-all duration-200">
                  Get A Quote
                </button>
              </DialogTrigger>
              <DialogContent className="bg-white rounded-xl max-w-lg">
                <DialogHeader>
                  <DialogTitle>Request Quote</DialogTitle>
                  <DialogDescription className="space-y-4">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        {product.category.name}
                      </p>
                    </div>

                    {/* Tier Selection */}
                    {hasFixedPrice ? (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Fixed Price</p>
                        <label className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                          <input
                            type="radio"
                            checked={selectedTier === "fixed"}
                            onChange={() => setSelectedTier("fixed")}
                            className="w-4 h-4 text-green-600"
                          />
                          <div>
                            <div className="font-medium">
                              Kes. {product.category.fixed}
                            </div>
                            <div className="text-xs text-gray-600">
                              Fixed Price
                            </div>
                          </div>
                        </label>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">
                          Select Quantity Tier
                        </p>
                        {[
                          { key: "twotonine", label: "200 - 999 Pcs" },
                          { key: "onetonineteen", label: "1,000 - 1,999 Pcs" },
                          {
                            key: "twothousandtonine",
                            label: "2,000 - 9,999 Pcs",
                          },
                          {
                            key: "tenthousandtotwenty",
                            label: "10,000 - 20,000 Pcs",
                          },
                          {
                            key: "printed",
                            label: "Printed",
                            class: "text-red-600",
                          },
                        ].map(
                          (tier) =>
                            product.category[tier.key] && (
                              <label
                                key={tier.key}
                                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer transition"
                              >
                                <input
                                  type="radio"
                                  name="tier"
                                  checked={selectedTier === tier.key}
                                  onChange={() => setSelectedTier(tier.key)}
                                  className="w-4 h-4 text-black"
                                />
                                <div>
                                  <div
                                    className={`font-medium ${
                                      tier.class || ""
                                    }`}
                                  >
                                    Kes. {product.category[tier.key]}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {tier.label}
                                  </div>
                                </div>
                              </label>
                            )
                        )}
                      </div>
                    )}

                    <button
                      onClick={sendQuoteToWhatsApp}
                      disabled={!selectedTier}
                      className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                    >
                      Send Quote Request via WhatsApp
                    </button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

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
              Free Delivery On Orders Over Kes. 20,000
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
