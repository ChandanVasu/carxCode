"use client"
import React, { useState, useEffect } from 'react';
import { FaCar, FaGasPump, FaTachometerAlt } from 'react-icons/fa';
import { TbSteeringWheel } from 'react-icons/tb';
import { Divider } from "@nextui-org/divider";
import { Select, SelectItem } from "@nextui-org/react";
import { Image, Skeleton } from "@nextui-org/react";
import { Slider } from "@nextui-org/react";
import Link from 'next/link';

function Listing() {
    const [listing, setListing] = useState([]);
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const [priceValue, setPrice] = useState([0]); // Initialize price value as [0]

    // Fetch car makes for the select dropdown
    useEffect(() => {
        const fetchMakes = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/listing/make`);
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
                const response = await fetch(`${baseUrl}/api/listing/model?make=${selectedMake}`);
                const data = await response.json();
                setModels(data);
                setSelectedModel(""); // Reset selected model when make changes
            } catch (error) {
                console.error("Error fetching models:", error);
            }
        };

        fetchModels();
    }, [selectedMake]);

    // Fetch listings based on selected make, model, and price
    useEffect(() => {
        const fetchListings = async () => {
            setLoading(true); // Start loading
            try {
                const response = await fetch(`${baseUrl}/api/listing`);
                let data = await response.json();

                if (selectedMake) {
                    data = data.filter(listing => listing.make === selectedMake);
                }

                if (selectedModel) {
                    data = data.filter(listing => listing.model === selectedModel);
                }

                if (priceValue[0] > 0) {
                    const plainPriceValue = parseInt(priceValue[0].toString().replace(/,/g, ''), 10);
                    data = data.filter(listing => parseInt(listing.price.replace(/,/g, ''), 10) <= plainPriceValue);
                }

                data = data.filter(listing => listing.visibility === "Active");

                data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setListing(data);
            } catch (error) {
                console.error("Error fetching listings:", error);
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchListings();
    }, [selectedMake, selectedModel, priceValue]);

    const renderSkeleton = () => (
        <div className="listingCard p-4 mb-4 rounded-lg flex flex-col gap-1 listing-card shadow-md bg-white ">
            <Skeleton className="h-[180px] w-[100%] rounded-xl mb-2" />
            <Skeleton className="h-5 w-[100%] mb-1" />
            <Skeleton className="h-5 w-[60%] mb-1" />
        </div>
    );

    return (
        <div className="">

            <div className=' w-full   flex flex-col justify-center items-center bg-texcher1 mb-8 py-4'>
                <div className='text-center mt-3'>
                    <h1 className='text-2xl p-2 md:text-3xl font-bold md:font-medium'>
                        Filter Cars by Make, Model, and Price Range
                    </h1>
                    <p className='mt-2 p-2'>
                        Easily search for cars by selecting the make, model, and price range to streamline your filtering process.
                    </p>
                </div>

                <div className='flex justify-center gap-3 md:gap-10 items-center mt-5 flex-col md:flex-row  '>

                    <div className="mb-1">
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

                    <div className="mb-1">
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

                    <div className="flex flex-col gap-0 w-full h-full max-w-md items-start justify-center mb-1">
                        <Slider
                            formatOptions={{ style: "currency", currency: "USD" }}
                            step={1000}
                            maxValue={1000000}
                            minValue={0}
                            value={priceValue}
                            onChange={setPrice}
                            classNames={{
                                base: "max-w-md gap-3 w-80",
                                track: "border-s-secondary-100",
                                filler: "bg-gradient-to-r from-secondary-100 to-secondary-500"
                            }}
                            renderThumb={(props) => (
                                <div
                                    {...props}
                                    className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                                >
                                    <span className="transition-transform bg-gradient-to-br shadow-small from-secondary-100 to-secondary-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
                                </div>
                            )}
                        />
                        <p className="text-default-500 font-medium text-small">
                            Selected budget: {Array.isArray(priceValue) && priceValue.map((b) => `$${b}`).join(" – ")}
                        </p>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mx-20">
                    {renderSkeleton()}
                    {renderSkeleton()}
                    {renderSkeleton()}
                    {renderSkeleton()}
                    {renderSkeleton()}
                    {renderSkeleton()}
                    {renderSkeleton()}
                    {renderSkeleton()}
                </div>
            ) : listing.length === 0 ? (
                <div className='mx-20 m-auto flex justify-center'>
                    <img className='w-96 h-96' src="/nodata.jpg" alt="" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-1 md:mx-20">
                    {listing.map(item => (
                        <div key={item.id} className="relative shadow-md rounded-lg overflow-hidden bg-texcher">
                            <div className="relative z-10 p-4">
                                <div className="relative mb-2 overflow-hidden rounded-md">
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
                                        <p className="flex items-center"><FaCar className="mr-2 text-blue-950" /> {item.bodyType}</p>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <p className="flex items-center"><FaTachometerAlt className="mr-2 text-blue-950" /> {item.mileage} {item.mileageUnit}</p>
                                        <p className="flex items-center"><TbSteeringWheel className="mr-2 text-blue-950" />{item.vehicleTransmission}</p>
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
