import React, { useState, useEffect } from 'react';
import EmiCalculator from "@/components/block/emi";
import { Skeleton } from "@nextui-org/react";
import Link from 'next/link';

const renderSkeleton = () => (
    <div className="flex flex-col justify-center items-center gap-4">
        <Skeleton className="h-28 w-36 md:w-52 rounded-md mb-0" />
        <Skeleton className="h-5 w-28 rounded-md" />
    </div>
);

const SingleBox = () => {
    const [typeData, setTypeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL


    useEffect(() => {
        const fetchType = async () => {
            try {
                const res = await fetch(`${baseUrl}/api/listing/type`);
                let typeData = await res.json();
                setTypeData(typeData);
                setLoading(false);
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        };
        fetchType();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full">
                <div className='text-start mt-3 mb-3'>
                    <h1 className='text-2xl px-2 font-bold '>
                        Explore Vehicle Types
                    </h1>
                    <p className='mt-0 px-2'>
                        Browse through different vehicle categories <br /> and find the one that suits your needs.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
                        {Array(6).fill(null).map((_, index) => (
                            <div className='flex flex-col justify-center items-center' key={index}>
                                {renderSkeleton()}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 mt-4">
                        {typeData.map((item, index) => (
                            <div className='flex flex-col justify-center items-center gap-2 mb-4' key={index}>
                                <Link href={`/cars/type/${item.type}`}>  <img src={item.image} alt={item.type} className='w-52 h-28 rounded-md object-cover shadow-md p-1' /></Link>
                                <h1 className='text-base'>{item.type}</h1>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='w-full mt-1 md:mt-0'>
                <EmiCalculator />
            </div>
        </div>
    );
};

export default SingleBox;
