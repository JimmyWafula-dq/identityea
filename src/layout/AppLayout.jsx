import React from "react";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import Banner from "@/components/Banner";

const AppLayout = ({ children }) => {
  return (
    <div>
      <Banner />
      <Navbar />
      <div className="w-full sm:px-16 px-6 min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default AppLayout;
