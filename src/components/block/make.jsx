// "use client";
import React, { useEffect, useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function App() {
  const [makes, setMakes] = useState([]);
  const scrollRef = useRef(null);
  const [isAppending, setIsAppending] = useState(false);

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch("https://caradmin.vercel.app/api/listing/make");
        const data = await response.json();
        setMakes(data);
      } catch (error) {
        console.error("Error fetching makes:", error);
      }
    };

    fetchMakes();
  }, []);

  const scroll = (direction) => {
    const scrollAmount = 160;
    if (direction === "left") {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
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
    <div className="relative w-9/12 m-auto group">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30 bg-white p-2 rounded-full shadow-lg ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <FaChevronLeft className="text-gray-700" />
      </button>

      <div
        ref={scrollRef}
        className="h-48 bg-white rounded-md shadow-1 overflow-x-auto no-scrollbar relative z-20 cursor-grab"
      >
        <div className="flex justify-start gap-16 items-center w-max h-full px-10">
          {makes.map((make, index) => (
            <div key={index} className="flex flex-col items-center justify-between gap-3">
              <img
                src={make.image}
                alt={make.make}
                className="h-24 w-24 object-fill rounded-full p-3 bg-white shadow-md"
              />
              <span className="text-base text-center">{make.make}</span>
            </div>
          ))}
        </div>
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
