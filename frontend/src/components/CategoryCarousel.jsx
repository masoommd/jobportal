import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/redux/jobSlice";

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Scientist",
    "Graphic Designer",
    "Fullstack Developer",
  ];

  const searchJobHandler = (query) => {
      dispatch(setSearchQuery(query));
      navigate("/browse");
    }
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-10">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <Button onClick={()=>searchJobHandler(cat)} variant="outline" className="rounded-full border-none bg-gray-100 hover:bg-gray-200" key={index}>
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="border-none bg-gray-100 hover:bg-gray-200" />
        <CarouselNext className="border-none bg-gray-100 hover:bg-gray-200" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
