// src/components/LoadingScreen.jsx
import React from "react";
import { Loader2 } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      {/* Minimal Centered Spinner */}
      <div className="flex flex-col items-center gap-6">
        {/* Animated Spinner – Red stroke */}
        <Loader2 className="w-12 h-12 animate-spin text-red-600" />

        {/* Subtle pulsing dot pattern */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-red-600 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 150}ms`,
                animationDuration: "1.2s",
              }}
            />
          ))}
        </div>

        {/* Optional: Minimal text */}
        <p className="text-sm text-gray-500 font-medium tracking-wider">
          Loading IdentityEA...
        </p>
      </div>
    </div>
  );
}
