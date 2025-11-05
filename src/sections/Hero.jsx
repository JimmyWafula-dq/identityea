// src/components/Hero.jsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"; // Import the plugin
import React from "react";

export default function Hero() {
  // Create the autoplay plugin instance (reused across carousels)
  const autoplay = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <>
      {/* ==== MAIN HERO BANNERS ==== */}
      <section className="bg-gradient-to-b from-green-50 to-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 px-4">
          {/* LEFT BANNER – Custom Tyvek */}
          <div className="relative bg-red-100 rounded-xl overflow-hidden shadow-lg">
            <div className="p-6 md:p-10 flex flex-col justify-between h-full">
              <div>
                <p className="text-xs md:text-sm text-gray-600 uppercase tracking-wider">
                  Summer Sale – Limited Time
                </p>
                <h2 className="mt-2 text-2xl md:text-4xl font-bold text-gray-800">
                  Custom Tyvek Wristbands
                </h2>
                <p className="mt-1 text-sm md:text-base text-gray-600">
                  Start from{" "}
                  <span className="text-green-700 font-semibold">$9.99</span>
                </p>
              </div>
              <button className="mt-6 w-fit bg-black hover:bg-red-500 text-white font-semibold py-2 px-6 rounded-md transition">
                Shop Now
              </button>
            </div>
            <img
              src="/images/identityea5.png"
              alt="Wristband"
              className="absolute bottom-0 right-0 w-48 md:w-64 object-contain"
            />
          </div>

          {/* RIGHT BANNERS – 40% & 20% */}
          <div className="grid grid-rows-2 gap-4">
            {/* 40% Off – Auto-playing mini carousel */}
            <div className="bg-white rounded-xl p-6 flex items-center shadow-md">
              <div className="flex-1">
                <p className="text-3xl md:text-4xl font-bold text-green-700">
                  40% Off
                </p>
                <p className="mt-1 text-sm md:text-base text-gray-700">
                  Good Deals
                </p>
                <p className="text-xs text-gray-600">Start from $9.99</p>
              </div>

              {/* TINY CAROUSEL – Auto-play, no arrows */}
              <Carousel
                opts={{
                  loop: true,
                  align: "center",
                  drag: true,
                }}
                plugins={[autoplay.current]} // Pass the plugin instance
                className="w-20 md:w-28"
              >
                <CarouselContent className="h-20 md:h-28">
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
            <div className="bg-black rounded-xl p-6 flex items-center shadow-md">
              <div className="flex-1">
                <p className="text-2xl md:text-3xl font-bold text-red-500">
                  20% Off
                </p>
                <p className="mt-1 text-sm md:text-base text-gray-300">
                  Affordable Prices
                </p>
                <p className="text-xs text-gray-400">Start from $9.99</p>
              </div>
              <img
                src="/images/fabric.webp"
                alt="Fabric"
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
            {[
              { name: "Wide Face", img: "/images/Wide-Face-Wristband.webp" },
              { name: "LShape", img: "/images/LShaped-wristband.webp" },
              { name: "Fabric", img: "/images/fabric.webp" },
              { name: "Lanyard", img: "/images/lanyard.webp" },
              { name: "Id Card", img: "/images/idcard.webp" },
              { name: "Tyvek", img: "/images/tyvek.webp" },
            ].map((cat) => (
              <div
                key={cat.name}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-red-100 transition">
                  <img src={cat.img} alt={cat.name} className="w-16 h-16" />
                </div>
                <p className="text-xs md:text-sm text-gray-700 group-hover:text-green-700">
                  {cat.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
