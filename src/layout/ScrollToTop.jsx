// src/components/ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Modern browsers (Chrome 61+, FF 58+, Safari 15.4+)
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // Fallback for older browsers
    // document.documentElement.scrollTop = 0;
  }, [pathname]);

  return null;
}
