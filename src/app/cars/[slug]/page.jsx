import ListingPage from "./carPost";

export async function generateMetadata({ params }) {
  const response = await fetch("https://caradmin.vercel.app/api/listing");
  let data = await response.json();

  const listing = data.find((item) => item._id === params.slug);

  if (listing) {
    return {
      title: `${listing.title} | ${listing.year} | ${listing.color} |  ${listing.fuelType} |  ${listing.bodyType}`,  // Combine title and price here
      openGraph: {
        title: `${listing.title} | ${listing.year} | ${listing.color} |  ${listing.fuelType} |  ${listing.bodyType}`,  // Combine title and price here
      },
    };
  }

  return {
    title: "Listing Not Found",
    openGraph: {
      title: "Listing Not Found",
    },
  };
}

export default function Page({ params }) {
  return <div className="mb-10"><ListingPage slug={params.slug} /></div>;
}
