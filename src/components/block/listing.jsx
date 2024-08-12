import React, { useState, useEffect } from 'react';
import { FaCar, FaGasPump, FaTachometerAlt } from 'react-icons/fa';
import { TbSteeringWheel } from 'react-icons/tb';

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
                    <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="p-4">
                            <div className="overflow-hidden rounded-md mb-2">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-48 object-fill transition-transform duration-300 ease-in-out transform hover:scale-110"
                                />
                            </div>
                            <div>
                                <h1 className="text-blue-950 text-lg font-semibold flex justify-between items-center">
                                    {item.title.length > 13 ? `${item.title.substring(0, 13)}...` : item.title}
                                    <p className='text-2xl text-orange-600'>${item.price}</p>
                                </h1>
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
        </div>
    );
}

export default Listing;
