import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';  // Using Next.js Image component for optimization
import banner from '@/public/img/banner.jpeg';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Real Estate Listings - Mamta Realty</title>
        <meta
          name="description"
          content="Explore a wide range of properties for sale and rent. Contact Mamta Realty for the best real estate deals."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Real Estate Listings - Mamta Realty" />
        <meta
          property="og:description"
          content="Explore a wide range of properties for sale and rent. Contact Mamta Realty for the best real estate deals."
        />
        <meta
          property="og:image"
          content="/img/banner.jpeg" // Ensure your OG image is included for sharing purposes
        />
      </Head>

      {/* Hero Section */}
      <section className="bg-cover bg-center p-32" style={{
        backgroundImage: `url(${banner.src})`, // Correct path for the image in the public folder
      }}>
      </section>

      {/* Search Bar Section */}
      <div className="max-w-screen-lg mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-6">Start Your Property Search</h2>
        <div className="max-w-screen-md mx-auto">
          <form className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              placeholder="Enter Location"
              className="p-3 w-full md:w-60 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="p-3 w-full md:w-60 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Property Types</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
              <option value="commercial">Commercial Properties</option>
            </select>
            <input
              type="number"
              placeholder="Max Price"
              className="p-3 w-full md:w-60 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Property Search Section */}
      <section id="search-section" className="bg-gray-100 py-12">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">Find Properties by Type</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg">
              <h3 className="font-semibold text-lg">For Sale</h3>
              <p className="mt-2">Explore the best homes and apartments for sale.</p>
              <Link href="/for-sale">
                <button className="text-blue-600 hover:underline mt-4 block">Browse Listings</button>
              </Link>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg">
              <h3 className="font-semibold text-lg">For Rent</h3>
              <p className="mt-2">Find rental properties that suit your budget and needs.</p>
              <Link href="/for-rent">
                <button className="text-blue-600 hover:underline mt-4 block">Browse Listings</button>
              </Link>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg">
              <h3 className="font-semibold text-lg">Commercial Properties</h3>
              <p className="mt-2">Discover commercial spaces for business or investment.</p>
              <Link href="/commercial">
                <button className="text-blue-600 hover:underline mt-4 block">Browse Listings</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
   
      {/* Featured Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">Featured Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Featured Item */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src="/featured-property.jpg"
                alt="Featured Property"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">Luxury Villa</h3>
                <p className="mt-2 text-gray-500">3 Bed | 2 Bath | 2000 Sq Ft</p>
                <p className="mt-2 text-blue-600 font-bold">$1,200,000</p>
                <Link href="/property-details">
                  <button className="text-blue-600 hover:underline mt-4 block">View Details</button>
                </Link>
              </div>
            </div>
            {/* Add more featured items */}
          </div>
        </div>
      </section>

      {/* Recommended Section */}
      <section className="py-12">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">Recommended for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Recommended Property */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src="/recommended-property.jpg"
                alt="Recommended Property"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">Modern Apartment</h3>
                <p className="mt-2 text-gray-500">2 Bed | 1 Bath | 1200 Sq Ft</p>
                <p className="mt-2 text-blue-600 font-bold">$850,000</p>
                <Link href="/property-details">
                  <button className="text-blue-600 hover:underline mt-4 block">View Details</button>
                </Link>
              </div>
            </div>
            {/* Add more recommended properties */}
          </div>
        </div>
      </section>

      {/* Newly Launched Projects */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">Newly Launched Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Newly Launched Project */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src="/new-project.jpg"
                alt="New Project"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">Skyline Residency</h3>
                <p className="mt-2 text-gray-500">Affordable apartments with great amenities.</p>
                <Link href="/project-details">
                  <button className="text-blue-600 hover:underline mt-4 block">Learn More</button>
                </Link>
              </div>
            </div>
            {/* Add more newly launched projects */}
          </div>
        </div>
      </section>

      {/* Upcoming Projects */}
      <section className="py-12">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">Upcoming Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Upcoming Project */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src="/upcoming-project.jpg"
                alt="Upcoming Project"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">Future Heights</h3>
                <p className="mt-2 text-gray-500">Expected Completion: Q3 2025</p>
                <Link href="/upcoming-details">
                  <button className="text-blue-600 hover:underline mt-4 block">Get Updates</button>
                </Link>
              </div>
            </div>
            {/* Add more upcoming projects */}
          </div>
        </div>
      </section>

      {/* Move-In Options */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">Move-In Options</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="font-semibold text-lg">Move in Now</h3>
              <p className="mt-2">Ready-to-move homes available immediately.</p>
              <Link href="/move-in-now">
                <button className="text-blue-600 hover:underline mt-4 block">View Listings</button>
              </Link>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="font-semibold text-lg">Next Year</h3>
              <p className="mt-2">Homes completing in the next year.</p>
              <Link href="/next-year">
                <button className="text-blue-600 hover:underline mt-4 block">View Listings</button>
              </Link>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="font-semibold text-lg">Later</h3>
              <p className="mt-2">Plan ahead for future housing options.</p>
              <Link href="/later">
                <button className="text-blue-600 hover:underline mt-4 block">View Listings</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">What Our Clients Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Testimonial */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <p className="text-gray-600">"Mamta Realty helped us find our dream home effortlessly. Highly recommend!"</p>
              <p className="mt-4 font-semibold">- John Doe</p>
            </div>
            {/* Add more testimonials */}
          </div>
        </div>
      </section>
    </>
  );
}
