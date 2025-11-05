import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

const HomeCarousel = () => {
  const items = [
    {
      id: 1,
      text: "Home",
      bgcolor: "bg-lime-500",
    },
    {
      id: 3,
      text: "Home",
      bgcolor: "bg-blue-500",
    },
    {
      id: 4,
      text: "Home",
      bgcolor: "bg-orange-500",
    },
  ];
  return (
    <div className="w-full py-8">
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent className="space-x-2 w-[97%] mx-auto">
          {items.map((item) => (
            <CarouselItem
              key={item.id}
              className={`${item.bgcolor} h-60 rounded-xl`}
            >
              <h1>{item.text}</h1>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
