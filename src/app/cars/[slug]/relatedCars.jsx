import React, { useState, useEffect } from 'react';
import { FaCar, FaGasPump, FaTachometerAlt } from 'react-icons/fa';
import { TbSteeringWheel } from 'react-icons/tb';
import { Divider } from "@nextui-org/divider";
import { Skeleton } from "@nextui-org/react";
import Link from 'next/link';

function Listing() {
    const [listing, setListing] = useState([]);
    const [loading, setLoading] = useState(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL


    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/listing`);
                let data = await response.json();

                // Sort by date from new to old
                data.sort((a, b) => new Date(b.date) - new Date(a.date));

                setListing(data);
            } catch (error) {
                console.error("Error fetching listing:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchListing();
    }, []);

    const limitedListing = listing.slice(0, 6);

    const renderSkeleton = () => (
        <div className="flex bg-white shadow-1 rounded-lg overflow-hidden bg-texcher1 relative">
            <div className="w-2/4">
                <Skeleton className="h-40 w-full object-fill" />
            </div>
            <div className="w-2/4 px-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-8 w-1/2 mb-2" />
                <Divider className="my-2" />
                <div className="mb-2 flex justify-between">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-5 w-1/3" />
                </div>
                <div className="mb-2 flex justify-between">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-5 w-1/3" />
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <React.Fragment key={index}>
                        {renderSkeleton()}
                    </React.Fragment>
                ))}
            </div>
        );
    }

    return (
        <div className="">
            <div className="grid grid-cols-1 gap-4">
                {limitedListing.map((item) => (
                    <div key={item.id} className="flex bg-white shadow-1 rounded-lg overflow-hidden bg-texcher1 relative">
                        <div className="w-2/6 md:w-2/4">
                            <Link href={`/cars/${item._id}`} >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-fill"
                                /></Link>

                        </div>
                        <div className="w-4/6 px-4 md:w-2/4 flex flex-col justify-start gap-1">
                            <Link href={`/cars/${item._id}`} >
                                <h1 className="text-blue-950 text-lg font-semibold ">
                                    {item.title.length > 20 ? `${item.title.substring(0, 20)}...` : item.title}
                                </h1></Link>

                            <p className="text-2xl font-semibold text-blue-950 ">${item.price}</p>

                            {/* Hidden on mobile, visible on medium and larger screens */}
                            <Divider className='my-2 hidden md:block' />
                            <div className='hidden md:grid grid-cols-2'>
                                <p className="flex items-center mb-1"><FaGasPump className="mr-2 text-blue-950" />{item.fuelType}</p>
                                <p className="flex items-center mb-1"><FaCar className="mr-2 text-blue-950" /> {item.bodyType} </p>
                            </div>
                            <div className='hidden md:grid grid-cols-2'>
                                <p className="flex items-center mb-1"><FaTachometerAlt className="mr-2 text-blue-950" /> {item.mileage} {item.mileageUnit} </p>
                                <p className="flex items-center"><TbSteeringWheel className="mr-2 text-blue-950" /> {item.vehicleTransmission} </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Listing;
