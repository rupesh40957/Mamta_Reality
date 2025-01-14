import Head from 'next/head';
import Link from 'next/link';

export default function Listing() {
  return (
    <>
      <Head>
        <title>Property Listings - Mamta Realty</title>
        <meta
          name="description"
          content="Explore a wide range of properties for sale and rent. Search and filter properties tailored to your needs with Mamta Realty."
        />
      </Head>

      {/* Filters Section */}
      <section className="bg-gray-100 py-8">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-2xl font-semibold mb-4 text-center">Find Your Ideal Property</h1>
          <form className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-4 rounded-lg shadow">
            <input
              type="text"
              placeholder="Search by location"
              className="p-3 w-full sm:w-1/4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="p-3 w-full sm:w-1/4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">Property Type</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>
            <select className="p-3 w-full sm:w-1/4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">Price Range</option>
              <option value="0-50">Under ₹50 Lakh</option>
              <option value="50-100">₹50 Lakh - ₹1 Crore</option>
              <option value="100-200">₹1 Crore - ₹2 Crore</option>
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 w-full sm:w-auto"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Listings Section */}
      <section className="py-8">
        <div className="max-w-screen-lg mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-center">Properties for Sale</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Property Card */}
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src="/property-placeholder.jpg"
                  alt="Property"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">3 BHK Apartment</h3>
                  <p className="text-gray-500 mt-1">Location: Andheri, Mumbai</p>
                  <p className="text-blue-600 mt-2 font-bold">₹1.25 Crore</p>
                  <p className="text-sm text-gray-500 mt-1">1200 Sq Ft | 2 Baths</p>
                  <Link href="/property-details">
                    <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="py-8">
        <div className="max-w-screen-lg mx-auto flex justify-center">
          <nav className="flex space-x-4">
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Previous</button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {page}
              </button>
            ))}
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Next</button>
          </nav>
        </div>
      </section>
    </>
  );
}
