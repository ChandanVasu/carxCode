"use client";

import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa"; // Import the verify icon
import RelatedCars from "./relatedCars";
import EmiCalculator from "@/components/block/emi";  


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
              <img className="rounded-md" src={item.image} alt={item.title} />
              <div>
                <div className="flex justify-between items-center mt-2">
                  <h1 className="font-semibold my-2 text-2xl">{item.title}</h1>
                  <h1 className="font-semibold my-2 text-4xl drop-shadow-lg">${item.price}</h1>
                </div>
                
                {/* Car Details Section */}
                <div className="bg-gray-100 p-4 rounded-md mt-4 grid grid-cols-2 gap-4 ">
                  <p><strong>Make:</strong> {item.make}</p>
                  <p><strong>Model:</strong> {item.model}</p>
                  <p><strong>Year:</strong> {item.year}</p>
                  <p><strong>Mileage:</strong> {item.mileage} {item.mileageUnit}</p>
                  <p><strong>Condition:</strong> {item.itemCondition}</p>
                  <p><strong>Availability:</strong> {item.availability}</p>
                  <p><strong>VIN:</strong> {item.vin}</p>
                  <p><strong>Body Type:</strong> {item.bodyType}</p>
                  <p><strong>Color:</strong> {item.color}</p>
                  <p><strong>Drive Wheel Configuration:</strong> {item.driveWheelConfiguration}</p>
                  <p><strong>Number of Doors:</strong> {item.numberOfDoors}</p>
                  <p><strong>Fuel Type:</strong> {item.fuelType}</p>
                  <p><strong>Engine:</strong> {item.vehicleEngine}</p>
                  <p><strong>Seating Capacity:</strong> {item.vehicleSeatingCapacity}</p>
                  <p><strong>Transmission:</strong> {item.vehicleTransmission}</p>
                  <p><strong>Cylinders:</strong> {item.cylinders}</p>
                </div>

                <div
                className="ck-content mt-8"
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
