import React, { useState, useEffect } from 'react';
import { FaCar, FaGasPump, FaTachometerAlt } from 'react-icons/fa';
import { TbSteeringWheel } from 'react-icons/tb';
import { Divider } from "@nextui-org/divider";

import Link from 'next/link';


function Listing() {
    const [listing, setListing] = useState([]);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await fetch("https://caradmin.vercel.app/api/posts");
                let data = await response.json();

                // Sort by date from new to old
                data.sort((a, b) => new Date(b.date) - new Date(a.date));

                setListing(data);
            } catch (error) {
                console.error("Error fetching listing:", error);
            }
        };

        fetchListing();
    }, []);


    return (
        <div className="p-4">
            <h1 className='font-bold text-2xl'>Latest Post</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {listing.map((item) => (
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
                                <Link href={`/blog/${item._id}`}>  <h1 className="text-blue-950 text-lg font-semibold flex justify-between items-center">
                                    {item.title.length > 20 ? `${item.title.substring(0, 20)}...` : item.title}
                                </h1></Link>
                                <p className='text-base'>Last Update: {item.date}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Listing;
