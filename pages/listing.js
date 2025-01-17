import Head from 'next/head';
import { useState } from 'react';

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
    images: ['/property-placeholder.jpg'],
    videos: [],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  },
  {
    id: 2,
    name: '2 BHK Apartment',
    location: 'Borivali, Mumbai',
    price: '₹95 Lakh',
    size: '900 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Security', 'Garden', 'Clubhouse'],
    images: ['/property-placeholder.jpg'],
    videos: [],
    description: 'A cozy 2 BHK apartment in a family-friendly neighborhood.',
  },
];

export default function UserListing() {
  const [properties, setProperties] = useState(initialProperties);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter properties based on search query
  const filteredProperties = properties.filter((property) =>
    [property.name, property.location, property.price, property.propertyType]
      .some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const openModal = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProperty(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <Head>
        <title>Property Listings</title>
        <meta name="description" content="Browse available properties for sale and rent." />
      </Head>

      <div className="py-4 bg-gray-100">
        <div className="max-w-screen-lg mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center px-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, location, or price"
            className="mt-4 sm:mt-0 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-80"
          />
          <button className="mt-4 sm:mt-0 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
            Advanced Filters
          </button>
        </div>
      </div>

      <section className="py-8">
        <div className="max-w-screen-lg mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-700">Available Properties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">No properties found</div>
            ) : (
              filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <img
                    src={property.images[0] || '/property-placeholder.jpg'}
                    alt="Property"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800">{property.name}</h3>
                    <p className="text-gray-500 mt-1">Location: {property.location}</p>
                    <p className="text-blue-600 mt-2 font-bold">{property.price}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {property.size} | {property.baths} Baths | {property.propertyType}
                    </p>

                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => openModal(property)}
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Modal for Detailed View */}
      {isModalOpen && selectedProperty && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-semibold text-center text-gray-700">{selectedProperty.name}</h2>
            <div className="mt-4">
              <img
                src={selectedProperty.images[0] || '/property-placeholder.jpg'}
                alt="Property"
                className="w-full h-64 object-cover rounded-lg"
              />
              <p className="text-gray-500 mt-4">Location: {selectedProperty.location}</p>
              <p className="text-blue-600 mt-2 font-bold">{selectedProperty.price}</p>
              <p className="text-sm text-gray-500 mt-1">
                {selectedProperty.size} | {selectedProperty.baths} Baths | {selectedProperty.propertyType}
              </p>
              <p className="text-gray-700 mt-4">{selectedProperty.description}</p>

              <h4 className="mt-6 text-lg font-semibold text-gray-700">Amenities:</h4>
              <ul className="list-disc pl-6 mt-2 text-gray-600">
                {selectedProperty.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>

              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={closeModal}
                  className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
                >
                  Close
                </button>
                <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                  Contact Owner
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
