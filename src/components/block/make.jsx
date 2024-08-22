import React, { useEffect, useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

const SkeletonLoader = () => (
  <div className="flex gap-8 md:gap-16 items-center w-full h-full px-3 md:px-10">
    {[...Array(9)].map((_, index) => (
      <div key={index} className="flex flex-col items-center justify-between gap-3 animate-pulse">
        <div className="h-16 w-16 md:h-24 md:w-24 bg-gray-200 rounded-full shadow-md"></div>
        <div className="h-4 w-16 md:w-24 bg-gray-200 rounded"></div>
      </div>
    ))}
  </div>
);

export default function App() {
  const [makes, setMakes] = useState([]);
  const scrollRef = useRef(null);
  const [isAppending, setIsAppending] = useState(false);
  const [loading, setLoading] = useState(true);
  const itemWidth = 80; // Adjust width for mobile
  const itemWidthMd = 96; // Width for larger screens
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL


  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/listing/make` , { cache: 'force-cache'});
        const data = await response.json();
        setMakes(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching makes:", error);
        setLoading(false);
      }
    };

    fetchMakes();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? itemWidth + 18 : itemWidthMd + 60; // Adjust for mobile and desktop
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const handleInfiniteScroll = () => {
    const scrollElement = scrollRef.current;
    const nearEnd = scrollElement.scrollLeft + scrollElement.offsetWidth >= scrollElement.scrollWidth - 200;

    if (nearEnd && !isAppending) {
      setIsAppending(true);
      setTimeout(() => {
        setMakes((prevMakes) => [...prevMakes, ...prevMakes]);
        setIsAppending(false);
      }, 500);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      scroll("right");
    }, 3000);
  
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleInfiniteScroll);
    }
  
    return () => {
      clearInterval(intervalId);
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleInfiniteScroll);
      }
    };
  }, []);

  return (
    <div className="relative w-full m-auto group md:w-9/12 px-3 md:px-0 ">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30 bg-white p-2 rounded-full shadow-lg ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <FaChevronLeft className="text-gray-700" />
      </button>

      <div
        ref={scrollRef}
        className="h-32 md:h-48 bg-white rounded-md shadow-1  overflow-x-auto no-scrollbar relative z-20 cursor-grab"
      >
        {loading ? (
          <SkeletonLoader />
        ) : (
          <div className="flex justify-start gap-8 md:gap-16 items-center w-max h-full px-3 md:px-10 ">
            {makes.map((make, index) => (
              <div key={index} className="flex flex-col items-center justify-between gap-3">
                <Link href={`/cars/make/${make.make}`}>               
                 <img
                  src={make.image}
                  alt={make.make}
                  className="h-16 w-16 md:h-24 md:w-24 object-fill rounded-full p-3 bg-white shadow-md"
                /></Link>
                <span className="text-sm md:text-base text-center">{make.make}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-30 bg-white p-2 rounded-full shadow-lg mr-1 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <FaChevronRight className="text-gray-700" />
      </button>
    </div>
  );
}
