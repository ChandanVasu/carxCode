"use client";
import {FaCheckCircle , FaCar, FaCalendarAlt, FaTachometerAlt, FaTag, FaClock, FaBarcode, FaCarAlt, FaPalette, FaDoorClosed, FaGasPump, FaCarSide, FaUsers, FaExchangeAlt, FaCogs } from 'react-icons/fa';
import React, { useState, useEffect } from "react";
import RelatedCars from "./relatedCars";
import EmiCalculator from "@/components/block/emi";
import { Image } from "@nextui-org/react";
import { FaGears } from "react-icons/fa6";


export default function ListingPage({ slug }) {
  const [listing, setListing] = useState([]);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch("https://caradmin.vercel.app/api/listing");
        let data = await response.json();

        data = data.filter((listing) => listing._id === slug);

        setListing(data);
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };

    fetchListing();
  }, [slug]);

  return (
    <div className="mx-20 mt-10">
      <div>
        {listing.map((item) => (
          <div className="flex gap-10" key={item.id}>
            <div className="w-3/5 max-w-full">
              <Image
                alt="NextUI hero Image"
                src={item.image}
                height={450}
                width={1000}
                shadow="sm"
              />
              <div>
                <div className="flex justify-between items-center mt-4  px-4 rounded-md ">
                  <h1 className="font-semibold my-2 text-2xl">{item.title}</h1>
                  <h1 className="font-semibold my-2 text-4xl drop-shadow-lg ">${item.price}</h1>
                </div>

                <h2 className='text-xl font-semibold mt-4 pl-4'>Car Overview</h2>
                <div className=" p-4 rounded-md grid grid-cols-2 gap-4">
                <p className="grid grid-cols-2 gap-4  p-2 rounded-md shadow-1">
                  <span className='flex gap-2 items-center'>
                    <FaCar className="text-gray-700" /> Make:
                  </span>
                  <span>{item.make}</span>
                </p>
                <p className="grid grid-cols-2 gap-4  p-2 rounded-md shadow-1">
                  <span className='flex gap-2 items-center'>
                    <FaCarAlt className="text-gray-700" /> Model:
                  </span>
                  <span>{item.model}</span>
                </p>
                <p className="grid grid-cols-2 gap-4  p-2 rounded-md shadow-1">
                  <span className='flex gap-2 items-center'>
                    <FaCalendarAlt className="text-gray-700" /> Year:
                  </span>
                  <span>{item.year}</span>
                </p>
                <p className="grid grid-cols-2 gap-4  p-2 rounded-md shadow-1">
                  <span className='flex gap-2 items-center'>
                    <FaTachometerAlt className="text-gray-700" /> Mileage:
                  </span>
                  <span>{item.mileage} {item.mileageUnit}</span>
                </p>
                <p className="grid grid-cols-2 gap-4  p-2 rounded-md shadow-1">
                  <span className='flex gap-2 items-center'>
                    <FaTag className="text-gray-700" /> Condition:
                  </span>
                  <span>{item.itemCondition}</span>
                </p>
                <p className="grid grid-cols-2 gap-4  p-2 rounded-md shadow-1">
                  <span className='flex gap-2 items-center'>
                    <FaClock className="text-gray-700" /> Availability:
                  </span>
                  <span>{item.availability}</span>
                </p>
                <p className="grid grid-cols-2 gap-4  p-2 rounded-md shadow-1">
                  <span className='flex gap-2 items-center'>
                    <FaBarcode className="text-gray-700" /> VIN:
                  </span>
                  <span>{item.vin}</span>
                </p>
                <p className="grid grid-cols-2 gap-4  p-2 rounded-md shadow-1">
                  <span className='flex gap-2 items-center'>
                    <FaCarAlt className="text-gray-700" /> Body Type:
                  </span>
                  <span>{item.bodyType}</span>
                </p>
                <p className="grid grid-cols-2 gap-4  p-2 rounded-md shadow-1">
                  <span className='flex gap-2 items-center'>
                    <FaPalette className="text-gray-700" /> Color:
                  </span>
                  <span>{item.color}</span>
                </p>
                <p className="grid grid-cols-2 gap-4  p-2 rounded-md shadow-1">
                  <span className='flex gap-2 items-center'>
                    <FaGears className="text-gray-700" /> Drive Wheel:
                  </span>
                  <span>{item.driveWheelConfiguration}</span>
                </p>
                <p className="grid grid-cols-2 gap-4  p-2 rounded-md shadow-1">
                  <span className='flex gap-2 items-center'>
                    <FaDoorClosed className="text-gray-700" /> Door's:
                  </span>
                  <span>{item.numberOfDoors}</span>
                </p>
                <p className="grid grid-cols-2 gap-4  p-2 rounded-md shadow-1">
                  <span className='flex gap-2 items-center'>
                    <FaGasPump className="text-gray-700" /> Fuel Type:
                  </span>
                  <span>{item.fuelType}</span>
                </p>
                <p className="grid grid-cols-2 gap-4  p-2 rounded-md shadow-1">
                  <span className='flex gap-2 items-center'>
                    <FaCarSide className="text-gray-700" /> Engine:
                  </span>
                  <span>{item.vehicleEngine}</span>
                </p>
                <p className="grid grid-cols-2 gap-4  p-2 rounded-md shadow-1">
                  <span className='flex gap-2 items-center'>
                    <FaUsers className="text-gray-700" /> Seating:
                  </span>
                  <span>{item.vehicleSeatingCapacity}</span>
                </p>
                <p className="grid grid-cols-2 gap-4  p-2 rounded-md shadow-1">
                  <span className='flex gap-2 items-center'>
                    <FaExchangeAlt className="text-gray-700" /> Transmission:
                  </span>
                  <span>{item.vehicleTransmission}</span>
                </p>
                <p className="grid grid-cols-2 gap-4  p-2 rounded-md shadow-1">
                  <span className='flex gap-2 items-center'>
                    <FaCogs className="text-gray-700" /> Cylinders:
                  </span>
                  <span>{item.cylinders}</span>
                </p>
              </div>

                <div
                  className="ck-content mt-2"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></div>

                {/* Car Features Section */}
                <div className="bg-gray-100 p-4 rounded-md mt-4">
                  <h3 className="font-semibold mb-2">Features</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {item.carFeature.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <FaCheckCircle className="text-green-500 mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Car Safety Features Section */}
                <div className="bg-gray-100 p-4 rounded-md mt-4">
                  <h3 className="font-semibold mb-2">Safety Features</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {item.carSafetyFeature.map((safety, index) => (
                      <div key={index} className="flex items-center">
                        <FaCheckCircle className="text-green-500 mr-2" />
                        <span>{safety}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>


            </div>
            <div className="w-2/5 max-w-full">
              <h4 className="mb-3 font-semibold">Related Cars</h4>
              <RelatedCars></RelatedCars>
              <div className="mt-5">
                <EmiCalculator />

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}