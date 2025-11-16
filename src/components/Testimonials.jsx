import React from "react";

const Testimonials = () => {
  const cardsData = [
    {
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "Sarah Kamau",
      handle: "@sarah_eventsKE",
      date: "April 20, 2025",
      quote:
        "IdentityEA wristbands made check-in at our 5,000-person music festival a breeze. Durable, vibrant, and delivered on time!",
    },
    {
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "James Omondi",
      handle: "@jamesconferences",
      date: "May 10, 2025",
      quote:
        "Used the VIP gold wristbands for our annual tech summit. Guests loved the premium feel — no more paper tickets!",
    },
    {
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
      name: "Linet Wanjiku",
      handle: "@linet_weddings",
      date: "June 5, 2025",
      quote:
        "Custom printed wristbands for 300 wedding guests — waterproof, tear-proof, and looked stunning in photos. Highly recommend!",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
      name: "Kevin Mutiso",
      handle: "@kevin_sportsKE",
      date: "March 28, 2025",
      quote:
        "Ordered 10,000 Tyvek wristbands for the Nairobi Marathon. Fast delivery, great pricing, and zero fakes at the gate.",
    },
  ];

  const CreateCard = ({ card }) => (
    <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0">
      <div className="flex gap-2">
        <img
          className="size-11 rounded-full object-cover"
          src={card.image}
          alt={`${card.name}'s profile`}
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="font-medium">{card.name}</p>
            <svg
              className="mt-0.5 text-blue-500"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0zm.75 8.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zM6.5 3.5a.5.5 0 0 0-1 0v3a.5.5 0 0 0 1 0v-3z"
                fill="currentColor"
              />
            </svg>
          </div>
          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>
      <p className="text-sm py-4 text-gray-800 italic">"{card.quote}"</p>
      <div className="flex items-center justify-between text-slate-500 text-xs">
        <div className="flex items-center gap-1">
          <span>Posted on</span>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-500 transition-colors"
          >
            <svg
              width="11"
              height="10"
              viewBox="0 0 11 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m.027 0 4.247 5.516L0 10h.962l3.742-3.926L7.727 10H11L6.514 4.174 10.492 0H9.53L6.084 3.616 3.3 0zM1.44.688h1.504l6.64 8.624H8.082z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
        <p>{card.date}</p>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .marquee-inner {
          animation: marqueeScroll 30s linear infinite;
        }

        .marquee-reverse {
          animation-direction: reverse;
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-inner {
            animation: none;
          }
        }
      `}</style>

      <div className="w-full flex flex-row justify-center items-center py-8 sm:py-12">
        <h1 className="text-2xl text-center md:text-4xl font-bold text-gray-900">
          What Event Organizers Say
        </h1>
      </div>

      {/* Top Row */}
      <div className="marquee-row w-full mx-auto max-w-7xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
        <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={`top-${index}`} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
      </div>

      {/* Bottom Row (Reverse) */}
      <div className="marquee-row w-full mx-auto max-w-7xl overflow-hidden relative mt-8">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
        <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={`bottom-${index}`} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
      </div>
    </>
  );
};

export default Testimonials;
