// src/components/Hero.jsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useApi } from "@/context/ApiContext";
import { baseUrl } from "@/lib/api";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { Link } from "react-router-dom";

/* -------------------------------------------------
   DEFAULT BANNERS (used when DB entry is missing)
   ------------------------------------------------- */
const DEFAULT_BANNERS = {
  banner1: {
    bannerId: "banner1",
    title: "Custom Tyvek Wristbands",
    subtitle: "Summer Sale – Limited Time",
    discount: "",
    priceLine: "Start from $9.99",
    buttonText: "Shop Now",
    buttonLink: "/products",
    image: "/images/identityea5.png", // fallback local image
    bgColor: "#FCE7F3", // light pink
  },
  banner2: {
    bannerId: "banner2",
    title: "Good Deals",
    subtitle: "",
    discount: "40% Off",
    priceLine: "Start from $9.99",
    buttonText: "Shop Now",
    buttonLink: "/products",
    image: "/images/tyvek.webp",
    bgColor: "#FFFFFF",
  },
  banner3: {
    bannerId: "banner3",
    title: "Affordable Prices",
    subtitle: "",
    discount: "20% Off",
    priceLine: "Start from $9.99",
    buttonText: "Shop Now",
    buttonLink: "/products",
    image: "/images/fabric.webp",
    bgColor: "#000000",
  },
};

/* -------------------------------------------------
   Helper: get banner with fallback
   ------------------------------------------------- */
function getBanner(banners = [], id) {
  const found = banners.find((b) => b.bannerId === id);
  if (found) {
    // Build full image URL if it comes from uploads folder
    const img = found.image?.startsWith("http")
      ? found.image
      : `${baseUrl}/${found.image}`;
    return { ...found, image: img };
  }
  return DEFAULT_BANNERS[id];
}

/* -------------------------------------------------
   Main Component
   ------------------------------------------------- */
export default function Hero() {
  const { categories, banners } = useApi();

  // Autoplay plugin (re-used)
  const autoplay = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  // Resolve the three banners (with fallbacks)
  const banner1 = getBanner(banners, "banner1");
  const banner2 = getBanner(banners, "banner2");
  const banner3 = getBanner(banners, "banner3");
  const fileUrl = "https://server.identityea.com/";

  return (
    <>
      {/* ==== MAIN HERO BANNERS ==== */}
      <section className="bg-gradient-to-b from-green-50 to-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 px-4">
          {/* LEFT BIG BANNER */}
          <div
            className="relative rounded-xl overflow-hidden shadow-lg"
            style={{ backgroundColor: banner1.bgColor }}
          >
            <div className="p-6 md:p-10 flex flex-col justify-between h-full">
              <div>
                {banner1.subtitle && (
                  <p className="text-xs md:text-sm text-gray-600 uppercase tracking-wider">
                    {banner1.subtitle}
                  </p>
                )}
                <h2 className="mt-2 text-2xl md:text-4xl font-bold text-gray-800">
                  {banner1.title}
                </h2>
                {banner1.priceLine && (
                  <p className="mt-1 text-sm md:text-base text-gray-600">
                    starts from ${banner1.priceLine.split("$")[0]}
                    <span className="text-green-700 font-semibold">
                      {banner1.priceLine.split("$")[1]}
                    </span>
                  </p>
                )}
              </div>

              <Link
                to={banner1.buttonLink}
                className="mt-6 w-fit bg-black hover:bg-red-500 text-white font-semibold py-2 px-6 rounded-md transition"
              >
                {banner1.buttonText}
              </Link>
            </div>

            <img
              src={banner1.image}
              alt={banner1.title}
              className="absolute bottom-0 right-0 w-48 md:w-64 object-contain"
            />
          </div>

          {/* RIGHT MINI BANNERS */}
          <div className="grid grid-rows-2 gap-4">
            {/* 40% Off – with tiny autoplay carousel */}
            <div
              className="rounded-xl p-6 flex items-center shadow-md"
              style={{ backgroundColor: banner2.bgColor }}
            >
              <div className="flex-1">
                {banner2.discount && (
                  <p className="text-3xl md:text-4xl font-bold text-green-700">
                    {banner2.discount}
                  </p>
                )}
                {banner2.title && (
                  <p className="mt-1 text-sm md:text-base text-gray-700">
                    {banner2.title}
                  </p>
                )}
                {banner2.priceLine && (
                  <p className="text-xs text-gray-600">{banner2.priceLine}</p>
                )}
              </div>

              {/* Tiny carousel – auto-plays */}
              <Carousel
                opts={{ loop: true, align: "center" }}
                plugins={[autoplay.current]}
                className="w-20 md:w-28"
              >
                <CarouselContent className="h-20 md:h-28">
                  {/* You can replace these with dynamic images later */}
                  <CarouselItem>
                    <img
                      src="/images/idcard.webp"
                      alt="ID Card"
                      className="w-full h-full object-contain"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src="/images/tyvek.webp"
                      alt="Tyvek"
                      className="w-full h-full object-contain"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src="/images/fabric.webp"
                      alt="Fabric"
                      className="w-full h-full object-contain"
                    />
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>

            {/* 20% Off */}
            <div
              className="rounded-xl p-6 flex items-center shadow-md"
              style={{
                backgroundColor: banner3.bgColor,
                color: banner3.bgColor === "#000000" ? "#fff" : "#000",
              }}
            >
              <div className="flex-1">
                {banner3.discount && (
                  <p className="text-2xl md:text-3xl font-bold text-red-500">
                    {banner3.discount}
                  </p>
                )}
                {banner3.title && (
                  <p className="mt-1 text-sm md:text-base text-gray-300">
                    {banner3.title}
                  </p>
                )}
                {banner3.priceLine && (
                  <p className="text-xs text-gray-400">{banner3.priceLine}</p>
                )}
              </div>

              <img
                src={banner3.image}
                alt={banner3.title}
                className="w-20 md:w-28 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==== SHOP BY CATEGORY ==== */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-center text-lg md:text-xl font-semibold text-gray-800 mb-6">
            Shop by category
          </h3>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-8">
            {categories?.map((cat) => (
              <a
                href={`/products?category=${cat.name}`}
                key={cat._id}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-red-100 transition">
                  <img
                    src={`${baseUrl}/${cat.image}`}
                    alt={cat.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <p className="text-xs md:text-sm text-gray-700 group-hover:text-green-700">
                  {cat.name}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
