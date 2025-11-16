// src/components/CreationsGallery.jsx
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const creations = [
  { id: 1, image: "/images/band2.jpeg", alt: "Tyvek wristbands - VIP event" },
  { id: 2, image: "/images/band3.jpeg", alt: "Custom printed wristbands" },
  { id: 3, image: "/images/band4.jpeg", alt: "Neon glow wristbands" },
  { id: 4, image: "/images/band12.jpeg", alt: "Corporate event badges" },
  { id: 5, image: "/images/band7.jpeg", alt: "Festival wristbands" },
  { id: 6, image: "/images/band8.jpeg", alt: "Waterproof Tyvek bands" },
  { id: 7, image: "/images/band9.jpeg", alt: "Multi-color wristbands" },
  { id: 8, image: "/images/band1.jpeg", alt: "Premium VIP access" },
];

export default function CreationsGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setSelectedImage(creations[index]);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrev = () => {
    const newIndex =
      currentIndex === 0 ? creations.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(creations[newIndex]);
  };

  const goToNext = () => {
    const newIndex =
      currentIndex === creations.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedImage(creations[newIndex]);
  };

  return (
    <>
      {/* ===== GALLERY SECTION ===== */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Our Latest <span className="text-red-600">Creations</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              A curated showcase of premium wristbands and badges crafted for
              events across Kenya
            </p>
          </div>

          {/* Masonry Grid - Responsive */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {creations.map((item, index) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                onClick={() => openLightbox(index)}
              >
                {/* Image */}
                <div className="aspect-square relative">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs md:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity delay-75">
                      {item.alt}
                    </p>
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <svg
                      className="w-4 h-4 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile "View All" */}
          <div className="mt-8 md:hidden text-center">
            <button
              onClick={() => openLightbox(0)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-shadow shadow-lg"
            >
              View Gallery
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== LIGHTBOX MODAL ===== */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 md:right-4 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Image Container */}
            <div className="relative aspect-square md:aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={selectedImage.image}
                alt={selectedImage.alt}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Caption */}
            <div className="mt-4 text-center">
              <p className="text-white/90 text-sm md:text-base font-medium">
                {selectedImage.alt}
              </p>
              <p className="text-white/60 text-xs mt-1">
                {currentIndex + 1} / {creations.length}
              </p>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Thumbnail Strip - Desktop */}
            <div className="hidden md:flex justify-center gap-2 mt-6 overflow-x-auto pb-2">
              {creations.map((thumb, i) => (
                <button
                  key={thumb.id}
                  onClick={() => {
                    setCurrentIndex(i);
                    setSelectedImage(thumb);
                  }}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    i === currentIndex
                      ? "border-red-600 scale-110"
                      : "border-white/30 hover:border-white/60"
                  }`}
                >
                  <img
                    src={thumb.image}
                    alt={thumb.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
