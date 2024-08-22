import TypePgae from "./make";

export async function generateMetadata({ params }) {
  const currentYear = new Date().getFullYear(); // Get the current year

  return {
    title: `Explore the Best ${params.slug} Cars of ${currentYear} | Top Deals & Reviews`, // SEO-friendly title
    description: `Discover the best ${params.slug} cars available this year. Get top deals, expert reviews, and detailed comparisons to find your perfect car.`, // SEO-friendly description
    openGraph: {
      title: `Explore the Best ${params.slug} Cars of ${currentYear} | Top Deals & Reviews`,
      description: `Discover the best ${params.slug} cars available this year. Get top deals, expert reviews, and detailed comparisons to find your perfect car.`,
      images: [
        {
          url: '/logo.svg', 
          alt: `Best ${params.slug} Cars`
        }
      ],
    },
  };
}

export default function Page({ params }) {
  return (
    <div className="mb-10"><TypePgae slug={params.slug} /></div>
  );
}
