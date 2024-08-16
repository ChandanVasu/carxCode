"use client"
import React from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Make from "@/components/block/make";
import Listing from "@/components/block/listing";
import FiltterList from "@/components/block/filtterList";
import EmiCalculator from "@/components/block/emi";  

export default function App() {
  return (
    <div>
      <div className="top-main relative">
        <img
          className="w-full h-500 object-fill object-top relative"
          src="/duplo24.jpg"
          alt="Showroom" />
        <div className="h-full w-full absolute top-0 left-0 flex justify-between items-center px-5 md:px-20 flex-col md:flex-row pt-4">
          <div className="mw-1/2 pr-0 md:pr-10 text-center md:text-start mt-0 md:mt-3">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-900 via-blue-800 to-black bg-clip-text text-transparent leading-tight">
              Experience Excellence with CarsX
            </h1>
            <p className="text-xl mb-2 md:mb-8 bg-gradient-to-r from-purple-900 via-blue-800 to-black bg-clip-text text-transparent leading-relaxed">
              Unlock unbeatable offers on the newest models and take the wheel of your dream car today.
            </p>
          </div>

          <img className="h-72 md:w-1/2  w-full object-contain drop-shadow-lg" src="/cars.png" alt="Cars" />
        </div>
      </div>
      <div className="-mt-20">
        <Make />
      </div>

      <div className="lisitng-box mt-4 px-0 md:px-20">
        <FiltterList />
      </div>
    </div>
  );
}
