import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image'; // For optimized image rendering (optional)
import { FaSearch } from 'react-icons/fa';
import { LocationMarkerIcon, CheckCircleIcon, UsersIcon } from '@heroicons/react/solid';
import MetaTags from '../components/SEO/metaTags';
import seoConfig from '../utils/seoConfig';
import { GlobalDataContext } from '../contexts/GlobalDataContext';

export default function ListingPage({ darkMode }) {
  // Retrieve listingData and loading from the global context
  const { listingData, loading } = useContext(GlobalDataContext);

  // Local state for search query and properties
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState(listingData || []);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { search } = router.query;

  // If there's a search query in the URL, update the searchQuery state
  useEffect(() => {
    if (search) {
      setSearchQuery(search);
    }
  }, [search]);

  // Ensure our local properties state is updated when listingData changes
  useEffect(() => {
    setProperties(listingData);
  }, [listingData]);

  // Filter properties based on the search query
  // Convert each field to a string to avoid errors if a field is a number
  const filteredProperties = properties.filter((property) =>
    [property.name, property.location, property.price, property.propertyType].some((field) =>
      String(field).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      {/* Property Listings Section */}
      <section className="py-16 bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
        <MetaTags
          title="Property Listings - Mamta Realty"
          description="Explore our wide range of properties. Find your dream home today."
          image="https://www.mamtarealty.com/img/mamtarealty_logo.png"
          url="https://www.mamtarealty.com/listing"
          keywords="real estate, property, buy home, Mamta Realty, Mumbai, Maharashtra, India"
          pageType="WebPage"
          breadcrumb={seoConfig.breadcrumb}
        />

        {/* Search Bar */}
        <div className="justify-items-center mb-8">
          <h3 className="text-3xl font-semibold mb-6 text-center">Property Listings</h3>
          <div className="mb-6 flex relative w-full max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search properties..."
              className={`w-full py-3 px-5 border rounded-lg text-lg focus:ring-4 transition-all duration-200 ease-in-out ${
                darkMode
                  ? 'bg-gray-800 text-white border-blue-500 focus:ring-blue-500'
                  : 'bg-white text-gray-900 border-gray-900 focus:ring-blue-600'
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search properties"
            />
            <button
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-3 rounded-full ${
                darkMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } transition-all duration-200 ease-in-out`}
              aria-label="Search"
            >
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-24">
          {loading ? (
            <p className="text-center text-gray-500">Loading properties...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <div
                    key={property._id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 dark:bg-gray-800 dark:text-white relative"
                  >
                    <Link
                      href={{
                        pathname: `/property/${property._id}`,
                        query: { object: JSON.stringify(property) },
                      }}
                      passHref
                    >
                      <div className="relative">
                        <img
                          src={property.images[0]}
                          alt={property.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-40"></div>
                      </div>

                      <div className="p-4 space-y-4">
                        {/* Property Name and Price */}
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {property.name}
                          </h3>
                          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                            ₹{property.price}
                          </span>
                        </div>

                        {/* Property Details */}
                        <div className="text-sm text-gray-500 dark:text-gray-300 space-y-2">
                          <div className="flex items-center">
                            <LocationMarkerIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                            <span className="ml-2">{property.location}</span>
                          </div>
                          <div className="flex items-center">
                            <UsersIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                            <span className="ml-2">
                              {property.size} | {property.baths} Baths
                            </span>
                          </div>
                        </div>

                        {/* Amenities Section */}
                        <div className="mt-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            Amenities
                          </h4>
                          <ul className="text-sm grid grid-cols-2 gap-2 text-gray-600 dark:text-gray-300">
                            {property.amenities.slice(0, 4).map((amenity, index) => (
                              <li key={index} className="flex items-center">
                                <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span className="ml-2 truncate">{amenity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Property Description */}
                        <p className="text-gray-600 dark:text-gray-300">
                          {property.description.substring(0, 100)}...
                        </p>

                        {/* Contact Button */}
                        <div className="mt-3 text-center">
                          <Link
                            href="https://wa.me/9987790471"
                            target="_blank"
                            className="w-full inline-block bg-blue-500 text-white py-2 rounded-lg text-center hover:bg-blue-600 transition-colors duration-200"
                          >
                            Contact
                          </Link>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center h-[350px] bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <svg
                      width="140"
                      height="140"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mb-4 opacity-80"
                    >
                      <path
                        d="M3 9L12 3L21 9V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9Z"
                        stroke="#9CA3AF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 9L12 15L21 9"
                        stroke="#6B7280"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h2 className="text-2xl font-semibold text-gray-800">No Properties Found</h2>
                    <p className="text-gray-500 text-center mt-2 leading-relaxed">
                      We couldn't find any properties matching your criteria.
                      Try changing the filters or explore other categories.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
