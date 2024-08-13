import React, { useState, useEffect } from 'react';
import { FaCar, FaGasPump, FaTachometerAlt } from 'react-icons/fa';
import { TbSteeringWheel } from 'react-icons/tb';
import { Divider } from "@nextui-org/divider";
import { Select, SelectItem } from "@nextui-org/react";

function Listing() {
    const [listing, setListing] = useState([]);
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState(""); // State for selected model
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]); // State for models

    // Fetch car makes for the select dropdown
    useEffect(() => {
        const fetchMakes = async () => {
            try {
                const response = await fetch("https://caradmin.vercel.app/api/listing/make");
                const data = await response.json();
                setMakes(data);
            } catch (error) {
                console.error("Error fetching makes:", error);
            }
        };

        fetchMakes();
    }, []);

    // Fetch models based on selected make
    useEffect(() => {
        const fetchModels = async () => {
            if (!selectedMake) return;

            try {
                const response = await fetch(`https://caradmin.vercel.app/api/listing/model?make=${selectedMake}`);
                const data = await response.json();
                setModels(data);
                setSelectedModel(""); // Reset selected model when make changes
            } catch (error) {
                console.error("Error fetching models:", error);
            }
        };

        fetchModels();
    }, [selectedMake]);

    // Fetch listings based on selected make and model
    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await fetch("https://caradmin.vercel.app/api/listing");
                let data = await response.json();

                if (selectedMake) {
                    data = data.filter(listing => listing.make === selectedMake);
                }

                if (selectedModel) {
                    data = data.filter(listing => listing.model === selectedModel);
                }

                data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setListing(data);
            } catch (error) {
                console.error("Error fetching listings:", error);
            }
        };

        fetchListings();
    }, [selectedMake, selectedModel]);

    return (
        <div className="p-4">
            <div className='flex justify-center gap-10 '>
                <div className="mb-4">
                    <Select
                        placeholder="Select a make"
                        value={selectedMake}
                        color='secondary'
                        labelPlacement="outside"
                        onChange={(e) => {
                            setSelectedMake(e.target.value);
                            setSelectedModel(""); // Reset selected model when make changes
                        }}
                        className="max-w-xs w-80">
                        {makes.map(make => (
                            <SelectItem key={make.make} value={make.make}>
                                {make.make}
                            </SelectItem>
                        ))}
                    </Select>
                </div>

                <div className="mb-4">
                    <Select
                        placeholder="Select a model"
                        value={selectedModel}
                        color='secondary'
                        labelPlacement="outside"
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="max-w-xs w-80"
                        isDisabled={!selectedMake} // Disable if no make is selected
                    >
                        {models.map(model => (
                            <SelectItem key={model.model} value={model.model}>
                                {model.model}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {listing.length === 0 ? (
                    <p>No cars available for the selected make and model.</p>
                ) : (
                    listing.map(item => (
                        <div key={item.id} className="relative shadow-md rounded-lg overflow-hidden bg-texcher">
                            <div className="relative z-10 p-4">
                                <div className="relative mb-2 overflow-hidden rounded-md">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                                    />
                                    {item.itemCondition === "Used" && (
                                        <p className='absolute top-2 left-3 bg-red-600 text-white px-2 rounded-md'>
                                            {item.itemCondition}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <h1 className="text-blue-950 text-lg font-semibold flex justify-between items-center">
                                        {item.title.length > 13 ? `${item.title.substring(0, 13)}...` : item.title}
                                        <p className='text-2xl drop-shadow-xl'>${item.price}</p>
                                    </h1>
                                    <Divider className='my-1 px-3' />
                                    <div className='flex justify-between items-center'>
                                        <p className="flex items-center"><FaGasPump className="mr-2 text-blue-950" />{item.fuelType}</p>
                                        <p className="flex items-center"><FaCar className="mr-2 text-blue-950" /> {item.bodyType}</p>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <p className="flex items-center"><FaTachometerAlt className="mr-2 text-blue-950" /> {item.mileage} {item.mileageUnit}</p>
                                        <p className="flex items-center"><TbSteeringWheel className="mr-2 text-blue-950" /> {item.vehicleTransmission}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Listing;
