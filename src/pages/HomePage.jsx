import React from "react";
import AppLayout from "../layout/AppLayout";
import Hero from "@/sections/Hero";
import Example from "@/sections/Test";
import HomeCarousel from "@/sections/HomeCarousel";
import Creations from "@/components/Creations";
import { Faq } from "@/components/Faq";
import Promotional from "@/components/Promotional";
import Testimonials from "@/components/Testimonials";
import Products from "@/sections/Products";
import { CartDrawer } from "@/components/CartDrawer";

const HomePage = () => {
  return (
    <div>
      <AppLayout>
        <div className="w-full">
          <Hero />
          <Products />
          <Creations />
          {/* <Promotional /> */}
          <Testimonials />
          <Faq />
          <Promotional />
        </div>
      </AppLayout>
    </div>
  );
};

export default HomePage;
