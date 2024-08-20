import React, { useState, useEffect } from 'react';
import EmiCalculator from "@/components/block/emi";
import Link from 'next/link';

// Helper function to truncate HTML content
const truncateHTML = (html, length) => {
    // Create a temporary element to strip out the HTML tags
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;

    // Extract text content
    const text = tempElement.textContent || tempElement.innerText || '';

    // Truncate the text content
    const truncatedText = text.length > length ? text.slice(0, length) + '...' : text;

    // Create a new element to set truncated text back to HTML
    const truncatedElement = document.createElement('div');
    truncatedElement.textContent = truncatedText;

    return truncatedElement.innerHTML; // Return as HTML
};

const SingleBox = () => {
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

    const mainListing = listing.slice(0, 1); // Get only the first listing

    return (
        <div className='flex flex-col md:flex-row justify-between gap-4'>

            <div className='w-full md:w-1/2 flex flex-col gap-8'>

                {mainListing.map((item, index) => (
                    <div className='flex flex-col md:flex-row gap-4 p-4 shadow-md rounded-md' key={index}>
                        <img className='rounded-md w-full md:w-1/2 h-48 md:h-56 object-cover' src={item.image} alt={item.title} />
                        <div>
                            <h1 className="text-blue-950 text-lg md:text-2xl font-semibold">
                                <Link href={`/cars/${item._id}`}>
                                    {item.title.length > 13 ? `${item.title.substring(0, 13)}...` : item.title}
                                </Link>
                            </h1>
                            <p className='text-lg md:text-2xl drop-shadow-xl mt-1'>${item.price}</p>
                            <div
                                className="ck-content mt-2 text-slate-400 text-sm md:text-base"
                                dangerouslySetInnerHTML={{ __html: truncateHTML(item.description, 80) }}
                            ></div>
                            <p className='text-sm md:text-base'>Last Update: {item.date}</p>
                            <div className='mt-2 flex flex-wrap gap-2'>
                                <p className='bg-emerald-100 px-2 rounded-md py-1 text-sm md:text-base'>{item.year}</p>
                                <p className='bg-emerald-100 px-2 rounded-md py-1 text-sm md:text-base'>{item.make}</p>
                                <p className='bg-emerald-100 px-2 rounded-md py-1 text-sm md:text-base'>{item.bodyType}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='w-full md:w-1/2 mt-4 md:mt-0'>
                <EmiCalculator />
            </div>
        </div>
    );
}

export default SingleBox;
