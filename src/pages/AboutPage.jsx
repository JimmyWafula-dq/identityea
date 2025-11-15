import Loader from "@/components/kokonutui/loader";
import Promotional from "@/components/Promotional";
import Testimonials from "@/components/Testimonials";
import AppLayout from "@/layout/AppLayout";
import React from "react";

const AboutPage = () => {
  return (
    <div>
      <AppLayout>
        <div className="w-full mx-auto max-w-7xl sm:px-16 px-6 sm:py-8 py-4">
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="w-full h-full">
              <img
                src="./images/identityea1.jpg"
                className="w-full h-ful rounded-tr-3xl rounded-bl-3xl"
                alt=""
              />
            </div>
            <div className="w-full h-full space-y-6">
              <p className="text-2xl font-semibold">
                About Identity<span className="text-red-500">ea</span>{" "}
              </p>
              <p className="text-sm text-gray-800">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Pariatur soluta assumenda explicabo illo at, distinctio dolore
                illum fuga consectetur sint ratione animi? Possimus, ipsam porro
                praesentium debitis molestiae expedita a?
              </p>
              <p className="text-sm text-gray-800">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Pariatur soluta assumenda explicabo illo at, distinctio dolore
                illum fuga consectetur sint ratione animi? Possimus, ipsam porro
                praesentium debitis molestiae expedita a?
              </p>
            </div>
          </div>

          {/* testimonials */}
          <Testimonials />
          <Promotional />
        </div>
      </AppLayout>
    </div>
  );
};

export default AboutPage;
