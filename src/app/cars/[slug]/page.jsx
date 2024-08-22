import ListingPage from "./carPost";

export async function generateMetadata({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  const response = await fetch(`${baseUrl}/api/listing`);
  let data = await response.json();

  const listing = data.find((item) => item._id === params.slug);

  if (listing) {
    return {
      title: `${listing.title} | ${listing.year} | ${listing.color} | ${listing.fuelType} | ${listing.bodyType}`,  // Combine title and price here
      openGraph: {
        title: `${listing.title} | ${listing.year} | ${listing.color} | ${listing.fuelType} | ${listing.bodyType}`,  // Combine title and price here
        description: `Check out this ${listing.year} ${listing.title} with ${listing.color} color, ${listing.fuelType} fuel type, and ${listing.bodyType} body type.`,
        images: [
          {
            url: listing.image,
            width: 1200,
            height: 630,
            alt: `${listing.title} Image`,
          },
        ],
      },
    };
  }

  return {
    title: "Listing Not Found",
    openGraph: {
      title: "Listing Not Found",
      description: "The listing you are looking for was not found.",
    },
  };
}

export default function Page({ params }) {
  return <div className="mb-10"><ListingPage slug={params.slug} /></div>;
}
