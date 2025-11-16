import React from "react";

const Promotional = () => {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap');
          * { font-family: 'Poppins', sans-serif; }
        `}
      </style>

      <div className="max-w-7xl py-16 md:pl-24 md:w-full mx-2 md:mx-auto flex flex-col items-start justify-center text-left bg-gradient-to-b from-red-900 to-black rounded-2xl p-10 text-white overflow-hidden relative">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_#ffffff_1px,_transparent_1px)] bg-[length:30px_30px]"></div>
        </div>

        {/* Trust Bar */}
        <div className="flex items-center gap-6 z-10">
          <div className="flex -space-x-3">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
              alt="Event organizer"
              className="size-10 rounded-full border-2 border-white shadow-md hover:-translate-y-1 transition z-10"
            />
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
              alt="Event planner"
              className="size-10 rounded-full border-2 border-white shadow-md hover:-translate-y-1 transition z-20"
            />
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
              alt="Conference host"
              className="size-10 rounded-full border-2 border-white shadow-md hover:-translate-y-1 transition z-30"
            />
          </div>

          <div>
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="16"
                  height="15"
                  viewBox="0 0 13 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-red-500"
                >
                  <path
                    d="M5.85536 0.463527C6.00504 0.00287118 6.65674 0.00287028 6.80642 0.463526L7.82681 3.60397C7.89375 3.80998 8.08572 3.94946 8.30234 3.94946H11.6044C12.0888 3.94946 12.2901 4.56926 11.8983 4.85397L9.22687 6.79486C9.05162 6.92219 8.97829 7.14787 9.04523 7.35388L10.0656 10.4943C10.2153 10.955 9.68806 11.338 9.2962 11.0533L6.62478 9.11244C6.44954 8.98512 6.21224 8.98512 6.037 9.11244L3.36558 11.0533C2.97372 11.338 2.44648 10.955 2.59616 10.4943L3.61655 7.35388C3.68349 7.14787 3.61016 6.92219 3.43491 6.79486L0.763497 4.85397C0.37164 4.56927 0.573027 3.94946 1.05739 3.94946H4.35944C4.57606 3.94946 4.76803 3.80998 4.83497 3.60397L5.85536 0.463527Z"
                    fill="currentColor"
                  />
                </svg>
              ))}
            </div>
            <p className="text-sm text-gray-300">
              Trusted by 5,000+ event organizers in Kenya
            </p>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-[52px] md:leading-[62px] font-bold max-w-2xl mt-6 bg-gradient-to-r from-white to-red-100 text-transparent bg-clip-text">
          Premium Wristbands for Unforgettable Events
        </h1>

        {/* Subheadline */}
        <p className="mt-4 text-lg text-gray-200 max-w-xl">
          Secure entry. VIP access. Custom branding. Delivered fast across
          Kenya.
        </p>

        {/* CTA Button */}
        <a
          href="/products"
          className="mt-8 px-10 py-3.5 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-700 hover:shadow-red-600/30 transition-all duration-300 flex items-center gap-2 group"
        >
          Explore Wristbands
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>

        {/* Optional: Stats */}
        <div className="mt-12 flex gap-8 text-sm">
          <div>
            <p className="text-3xl font-bold text-white">50K+</p>
            <p className="text-gray-400">Wristbands Delivered</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">4.9★</p>
            <p className="text-gray-400">Customer Rating</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">24hr</p>
            <p className="text-gray-400">Express Printing</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Promotional;
