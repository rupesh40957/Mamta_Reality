import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // For optimized image rendering
import { FaSearch } from 'react-icons/fa';

const initialProperties = [
  {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['https://dummyimage.com/720x400' , 'https://dummyimage.com/720x500',  'https://dummyimage.com/720x900'],
    videos: ['https://www.youtube.com/watch?v=AU-hut9lGQ4&list=RDAU-hut9lGQ4&start_radio=1', 'https://www.youtube.com/watch?v=AU-hut9lGQ4&list=RDAU-hut9lGQ4&start_radio=1'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  },
];

export default function ListingPage({ darkMode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState(initialProperties);

  // Filter properties based on search query
  const filteredProperties = properties.filter((property) =>
    [property.name, property.location, property.price, property.propertyType]
      .some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      {/* Property Listings */}
      <section className="py-16 bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
        {/* Search Bar */}
        <div className="justify-items-center mb-8">
          <h3 className="text-3xl font-semibold mb-6 text-center">Property Listings</h3>
          <div className="mb-6 flex relative w-full max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search properties..."
              className={`w-full py-3 px-5 border rounded-lg text-lg focus:ring-4 transition-all duration-200 ease-in-out 
              ${darkMode ? 'bg-gray-800 text-white border-blue-500 border focus:ring-blue-500' : 'bg-white text-gray-900 border-gray-900 focus:ring-blue-600'}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search properties"
            />
            <button
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-3 rounded-full 
              ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'} 
              transition-all duration-200 ease-in-out`}
              aria-label="Search"
            >
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105 dark:bg-gray-800 dark:border-gray-700"
                >
                  {/* Property Image */}
                  <Link
                    href={{
                      pathname: `/property/${property.id}`,
                      query: { object: JSON.stringify(property) },
                    }}
                    passHref
                  >
                    <Image
                      src={property.images[0]}
                      alt={`Image of ${property.name}`}
                      width={500}
                      height={350}
                      className="w-full h-56 object-cover rounded-t-lg transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                  </Link>

                  <div className="p-6">
                    {/* Property Name */}
                    <h5 className="text-2xl font-semibold mb-3">{property.name}</h5>

                    {/* Property Location */}
                    <p className="text-sm mb-4">{property.location}</p>

                    {/* Price */}
                    <span className="text-3xl font-bold">{property.price}</span>

                    {/* Property Details */}
                    <div className="mt-4 space-y-1">
                      <p className="text-sm">{property.size} sqft</p>
                      <p className="text-sm">{property.propertyType}</p>
                      <p className="text-sm">{property.baths} Bathrooms</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="px-6 pb-6">
                    <Link
                      href={`https://wa.me/${property.whatsappNumber || "9987790471"}?text=Hi, I am interested in the property: ${property.name}, which is priced at ${property.price}`}
                      target="_blank"
                      className="w-full inline-block bg-blue-500 text-white py-2 rounded-lg text-center hover:bg-blue-600 transition-colors duration-200"
                    >
                      Contact
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No properties found matching your search criteria.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
