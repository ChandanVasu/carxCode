"use client";
import {
  FaCheckCircle,
  FaCar,
  FaCalendarAlt,
  FaTachometerAlt,
  FaTag,
  FaClock,
  FaBarcode,
  FaCarAlt,
  FaPalette,
  FaDoorClosed,
  FaGasPump,
  FaCarSide,
  FaUsers,
  FaExchangeAlt,
  FaCogs,
} from "react-icons/fa";
import React, { useState, useEffect } from "react";
import RelatedCars from "./relatedCars";
import EmiCalculator from "@/components/block/emi";
import { Image } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";
import { FaGears } from "react-icons/fa6";

export default function ListingPage({ slug }) {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/listing`);
        let data = await response.json();

        data = data.filter((listing) => listing._id === slug);

        setListing(data);
      } catch (error) {
        console.error("Error fetching listing:", error);
        setError("Failed to load the listing. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-20 mt-3 md:mt-10">
      <div>
        {listing?.map((item) => (
          <div className="flex flex-col lg:flex-row gap-10" key={item.id}>
            <div className="w-full lg:w-3/5">
              <Image
                alt="NextUI hero Image"
                src={item.image}
                height={450}
                width={1000}
                shadow="sm"
                className="w-full image-carlist"
              />
              <div>
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mt-4 px-4 rounded-md">
                  <h1 className="font-semibold my-2 text-2xl lg:text-3xl">{item.title}</h1>
                  <h1 className="font-semibold my-2 text-4xl drop-shadow-lg">${item.price}</h1>
                </div>

                <h2 className="text-xl font-semibold mt-4 pl-4">Car Overview</h2>
                <div className="p-4 rounded-md grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: FaCar, label: "Make", value: item.make },
                    { icon: FaCarAlt, label: "Model", value: item.model },
                    { icon: FaCalendarAlt, label: "Year", value: item.year },
                    { icon: FaTachometerAlt, label: "Mileage", value: `${item.mileage} ${item.mileageUnit}` },
                    { icon: FaTag, label: "Condition", value: item.itemCondition },
                    { icon: FaClock, label: "Availability", value: item.availability },
                    { icon: FaBarcode, label: "VIN", value: item.vin },
                    { icon: FaCarAlt, label: "Body Type", value: item.bodyType },
                    { icon: FaPalette, label: "Color", value: item.color },
                    { icon: FaGears, label: "Drive Wheel", value: item.driveWheelConfiguration },
                    { icon: FaDoorClosed, label: "Doors", value: item.numberOfDoors },
                    { icon: FaGasPump, label: "Fuel Type", value: item.fuelType },
                    { icon: FaCarSide, label: "Engine", value: item.vehicleEngine },
                    { icon: FaUsers, label: "Seating", value: item.vehicleSeatingCapacity },
                    { icon: FaExchangeAlt, label: "Transmission", value: item.vehicleTransmission },
                    { icon: FaCogs, label: "Cylinders", value: item.cylinders },
                  ].map(({ icon: Icon, label, value }, index) => (
                    <p key={index} className="grid grid-cols-2 gap-4 p-2 rounded-md shadow-1">
                      <span className="flex gap-2 items-center">
                        <Icon className="text-gray-700" /> {label}:
                      </span>
                      <span>{value}</span>
                    </p>
                  ))}
                </div>

                {/* Car Features Section */}
                <div className="bg-gray-100 p-4 rounded-md mt-2">
                  <h3 className="font-semibold mb-2">Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {item.carFeature.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <FaCheckCircle className="text-green-500 mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Car Safety Features Section */}
                <div className="bg-gray-100 p-4 rounded-md mt-2">
                  <h3 className="font-semibold mb-2">Safety Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {item.carSafetyFeature.map((safety, index) => (
                      <div key={index} className="flex items-center">
                        <FaCheckCircle className="text-green-500 mr-2" />
                        <span>{safety}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <h2 className="text-xl font-semibold mt-4">Content</h2>
                <div
                  className="ck-content mt-2 "
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></div>
              </div>
            </div>

            <div className="w-full lg:w-2/5 sticky top-4 self-start lg:sticky lg:top-4">
              <h4 className="mb-3 font-semibold">Related Cars</h4>
              <RelatedCars />
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
