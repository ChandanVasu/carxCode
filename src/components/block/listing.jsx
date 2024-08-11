import React, { useState, useEffect } from 'react';

function Listing() {
    const [listing, setListing] = useState([]);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await fetch("https://caradmin.vercel.app/api/listing");
                const data = await response.json();
                setListing(data);
            } catch (error) {
                console.error("Error fetching listing:", error);
            }
        };

        fetchListing();
    }, []);

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {listing.map((item) => (
                    <div key={item.id} className="bg-white shadow-1 rounded-lg overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h1 className="text-base font-semibold">{item.title.length > 25 ?
                                `${item.title.substring(0, 25)}...` : item.title
                            }</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Listing;
