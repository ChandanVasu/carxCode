"use client"
import React, { useState, useEffect } from 'react';
import { FaCar, FaGasPump, FaTachometerAlt } from 'react-icons/fa';
import { TbSteeringWheel } from 'react-icons/tb';
import { Divider } from "@nextui-org/divider";
import Link from 'next/link';
import { Skeleton } from "@nextui-org/react"; // Import Skeleton from nextui

function Listing({ slug }) {
    const [listing, setListing] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading status

    const [make, setMake] = useState(slug);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/listing`);
                let data = await response.json();

                data.sort((a, b) => new Date(b.date) - new Date(a.date));

                data = data.filter(listing => listing.visibility === "Active");


                if (slug) {
                    data = data.filter(listing => listing.make === slug);
                }

                setListing(data);
            } catch (error) {
                console.error("Error fetching listing:", error);
            } finally {
                setLoading(false); // Set loading to false once the data is fetched
            }
        };

        fetchListing();
    }, []);

    const renderSkeleton = () => (
        <div className="relative shadow-md rounded-lg overflow-hidden p-4">
            <Skeleton className="w-full h-48 mb-2 rounded-md" />
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-5 w-1/2 mb-2" />
            <Skeleton className="h-5 w-full mb-1" />
            <Skeleton className="h-5 w-full" />
        </div>
    );

    return (
        <div className="p-4">
            {loading ? (
                // Display skeletons while loading
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-1 md:px-20">
                    {Array(8).fill(null).map((_, index) => (
                        <div key={index}>{renderSkeleton()}</div>
                    ))}
                </div>
            ) : listing.length === 0 ? (
                // Display "No Data Found" message if no data
                <div className="text-center mt-20 mb-60">
                    <h2 className="text-xl font-bold">No Data Found</h2>
                    <p className="text-gray-500">Please check back later.</p>
                </div>
            ) : (
                // Display listings when data is available
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-1 md:px-20">
                    {listing.map((item) => (
                        <div key={item.id} className="relative shadow-md rounded-lg overflow-hidden bg-texcher">
                            <div className="relative z-10 p-4">
                                <div className="overflow-hidden rounded-md mb-2 relative">
                                    <Link href={`/cars/${item._id}`}>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                                        />
                                    </Link>
                                    {item.itemCondition === "Used" && (
                                        <p className='absolute top-2 left-3 bg-red-600 text-white px-2 rounded-md'>
                                            {item.itemCondition}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <h1 className="text-blue-950 text-lg font-semibold flex justify-between items-center">
                                        <Link href={`/cars/${item._id}`}>{item.title.length > 13 ? `${item.title.substring(0, 13)}...` : item.title}</Link>
                                        <p className='text-2xl drop-shadow-xl'>${item.price}</p>
                                    </h1>
                                    <Divider className='my-1 px-3' />
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
        </div>
    );
}

export default Listing;


