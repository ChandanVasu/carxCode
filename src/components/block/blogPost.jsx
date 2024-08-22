import React, { useState, useEffect } from 'react';
import { Divider } from "@nextui-org/divider";
import Link from 'next/link';
import { Skeleton } from "@nextui-org/react"; // Import Skeleton from nextui

function Listing() {
    const [listing, setListing] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading status
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL


    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/posts`);
                let data = await response.json();

                // Sort by date from new to old
                data.sort((a, b) => new Date(b.date) - new Date(a.date));

                data = data.filter(listing => listing.visibility === "Active");


                setListing(data);
            } catch (error) {
                console.error("Error fetching listing:", error);
            } finally {
                setLoading(false); // Set loading to false once the data is fetched
            }
        };

        fetchListing();
    }, []);

    const mainListing = listing.slice(0,4)

    const renderSkeleton = () => (
        <div className="relative shadow-md rounded-lg overflow-hidden p-4">
            <Skeleton className="w-full h-48 mb-2 rounded-md" />
            <Skeleton className="h-5 w-3/4 mb-2" />
        </div>
    );

    return (
        <div className="p-4">
            <h1 className='font-bold text-2xl mb-3'>Latest Post</h1>
            {loading ? (
                // Display skeletons while loading
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array(4).fill(null).map((_, index) => (
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {mainListing.map((item) => (
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
        </div>
    );
}

export default Listing;
