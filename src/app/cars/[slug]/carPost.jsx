"use client";

import React, { useState, useEffect } from "react";

export default function ListingPage({ slug }) {
  const [listing, setListing] = useState([]);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch("https://caradmin.vercel.app/api/listing");
        let data = await response.json();

        data = data.filter((listing) => listing._id === slug);

        setListing(data);
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };

    fetchListing();
  }, [slug]);

  return (
    <div className="mx-20 mt-10">
      {listing.map((item) => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <div
            className="ck-content"
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></div>
        </div>
      ))}
    </div>
  );
}
