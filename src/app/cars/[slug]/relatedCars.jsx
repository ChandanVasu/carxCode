import React, { useState, useEffect } from 'react';
import { FaCar, FaGasPump, FaTachometerAlt } from 'react-icons/fa';
import { TbSteeringWheel } from 'react-icons/tb';
import { Divider } from "@nextui-org/divider";

function Listing() {
    const [listing, setListing] = useState([]);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await fetch("https://caradmin.vercel.app/api/listing");
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

    const limitedListing = listing.slice(0, 6);

    return (
        <div className="">
            <div className="grid grid-cols-1 gap-4">
                {limitedListing.map((item) => (
                    <div key={item.id} className="flex bg-white shadow-1 rounded-lg overflow-hidden bg-texcher1 relative">
                        <div className="w-2/4 ">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-40 object-fill"
                            />
                        </div>
                        <div className="w-2/4 px-4">
                            <h1 className="text-blue-950 text-lg font-semibold mb-2">
                                {item.title.length > 20 ? `${item.title.substring(0, 20)}...` : item.title}
                            </h1>
                            <p className="text-2xl font-semibold text-blue-950 mb-2">${item.price}</p>
                            <Divider className='my-2 ' />
                            <div className='mb-2 flex justify-between'>
                                <p className="flex items-center mb-1"><FaGasPump className="mr-2 text-blue-950" />{item.fuelType}</p>
                                <p className="flex items-center mb-1"><FaCar className="mr-2 text-blue-950" /> {item.bodyType} </p>
                            </div>
                            <div className='mb-2 flex justify-between'>
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
