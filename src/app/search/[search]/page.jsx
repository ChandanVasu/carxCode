"use client"
import React, { useState, useEffect } from 'react';
import { Divider } from "@nextui-org/divider";
import Link from 'next/link';
import { Skeleton } from "@nextui-org/react";

import { FaCar, FaGasPump, FaTachometerAlt } from 'react-icons/fa';
import { TbSteeringWheel } from 'react-icons/tb';

function Listing({ params }) {
    const [listing, setListing] = useState([]);
    const [loading, setLoading] = useState(true);

    const [listingCars, setListingCars] = useState([]);
    const [loadingCars, setLoadingCars] = useState(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL


    const searchQuery = params?.search?.toLowerCase() || "";

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/posts`);
                let data = await response.json();

                data.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                data = data.filter(listing => listing.visibility === "Active");


                setListing(data);
            } catch (error) {
                console.error("Error fetching listing:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchListingCars = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/listing`);
                let data = await response.json();

                data.sort((a, b) => new Date(b.date) - new Date(a.date));

                data = data.filter(listing => listing.visibility === "Active");


                setListingCars(data.slice(0, 4)); // Get the latest 4 listings
            } catch (error) {
                console.error("Error fetching listing:", error);
            } finally {
                setLoadingCars(false);
            }
        };

        fetchListing();
        fetchListingCars();
    }, []);

    const filteredListing = listing.filter(item =>
        item.title.toLowerCase().includes(searchQuery)
    );

    const filteredListingCars = listingCars.filter(item =>
        item.title.toLowerCase().includes(searchQuery)
    );

    const renderSkeleton = () => (
        <div className="relative shadow-md rounded-lg overflow-hidden p-4">
            <Skeleton className="w-full h-48 mb-2 rounded-md" />
            <Skeleton className="h-5 w-3/4 mb-2" />
        </div>
    );

    const isDataEmpty = filteredListing.length === 0 && filteredListingCars.length === 0;

    return (
        <div className="px-2 md:px-20 my-4">
            <h1>Search: {params.search}</h1>
            {loading || loadingCars ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array(8).fill(null).map((_, index) => (
                        <div key={index}>{renderSkeleton()}</div>
                    ))}
                </div>
            ) : isDataEmpty ? (
                <div className="text-center mt-20 mb-60">
                    <h2 className="text-xl font-bold">No Data Found</h2>
                    <p className="text-gray-500">Please check back later.</p>
                </div>
            ) : (
                <>
                    {filteredListing.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredListing.map((item) => (
                                <div key={item.id} className="relative shadow-md rounded-lg overflow-hidden bg-texcher">
                                    <div className="relative z-10 p-4">
                                        <div className="overflow-hidden rounded-md mb-2 relative">
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="w-full h-48 object-fill transition-transform duration-300 ease-in-out transform hover:scale-110"
                                            />
                                            {item.itemCondition === "Used" && (
                                                <p className='absolute top-2 left-3 bg-red-600 text-white px-2 rounded-md'>
                                                    {item.itemCondition}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <Link href={`/blog/${item._id}`}>
                                                <h1 className="text-blue-950 text-lg font-semibold flex justify-between items-center">
                                                    {item.title.length > 20 ? `${item.title.substring(0, 20)}...` : item.title}
                                                </h1>
                                            </Link>
                                            <p className='text-base'>Last Update: {item.date}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {filteredListingCars.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                            {filteredListingCars.map((item) => (
                                <div key={item.id} className="relative shadow-md rounded-lg overflow-hidden bg-texcher">
                                    <div className="relative z-10 p-4">
                                        <div className="overflow-hidden rounded-md mb-2 relative">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-48 object-fill transition-transform duration-300 ease-in-out transform hover:scale-110"
                                            />
                                            {item.itemCondition === "Used" && (
                                                <p className='absolute top-2 left-3 bg-red-600 text-white px-2 rounded-md'>
                                                    {item.itemCondition}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <Link href={`/cars/${item._id}`}>
                                                <h1 className="text-blue-950 text-lg font-semibold flex justify-between items-center">
                                                    {item.title.length > 13 ? `${item.title.substring(0, 13)}...` : item.title}
                                                    <p className='text-2xl drop-shadow-xl'>${item.price}</p>
                                                </h1>
                                            </Link>
                                            <Divider className='my-1 px-3'></Divider>
                                            <div className='flex justify-between items-center'>
                                                <p className="flex items-center"><FaGasPump className="mr-2 text-blue-950" />{item.fuelType}</p>
                                                <p className="flex items-center"><FaCar className="mr-2 text-blue-950" /> {item.bodyType} </p>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <p className="flex items-center"><FaTachometerAlt className="mr-2 text-blue-950" /> {item.mileage} {item.mileageUnit} </p>
                                                <p className="flex items-center"><TbSteeringWheel className="mr-2 text-blue-950" /> {item.vehicleTransmission} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Listing;
