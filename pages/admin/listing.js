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

export default function AdminListing() {
  const [properties, setProperties] = useState(initialProperties);
  const [editingProperty, setEditingProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState({});  // State to control description toggle

  // Filter properties based on search query
  const [searchQuery, setSearchQuery] = useState('');
  const filteredProperties = properties.filter((property) =>
    [property.name, property.location, property.price, property.propertyType]
      .some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const openModal = (property = null) => {
    setEditingProperty(property || {
      id: properties.length + 1,
      name: '',
      location: '',
      price: '',
      size: '',
      baths: 1,
      propertyType: '',
      amenities: [],
      images: [],
      videos: [],
      description: '',
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingProperty(null);
    setShowModal(false);
  };

  const handleSave = () => {
    const updatedProperties = properties.some((property) => property.id === editingProperty.id)
      ? properties.map((property) =>
          property.id === editingProperty.id ? editingProperty : property
        )
      : [...properties, editingProperty];
    setProperties(updatedProperties);
    closeModal();
  };

  const handleDeleteProperty = () => {
    const updatedProperties = properties.filter((property) => property.id !== deleteConfirm);
    setProperties(updatedProperties);
    setDeleteConfirm(null);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const images = files.map((file) => URL.createObjectURL(file));
    setEditingProperty({ ...editingProperty, images: [...editingProperty.images, ...images] });
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    const videos = files.map((file) => URL.createObjectURL(file));
    setEditingProperty({ ...editingProperty, videos: [...editingProperty.videos, ...videos] });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = editingProperty.images.filter((_, i) => i !== index);
    setEditingProperty({ ...editingProperty, images: updatedImages });
  };

  const handleRemoveVideo = (index) => {
    const updatedVideos = editingProperty.videos.filter((_, i) => i !== index);
    setEditingProperty({ ...editingProperty, videos: updatedVideos });
  };

  const toggleDescription = (id) => {
    setShowFullDescription((prev) => ({
      ...prev,
      [id]: !prev[id],  // Toggle description visibility
    }));
  };

  return (
    <>
      <Head>
        <title>Admin - Edit Property Listings</title>
        <meta name="description" content="Admin panel to manage and edit property listings for Mamta Realty." />
      </Head> 

      <div className="py-4 bg-gray-100">
        <div className="max-w-screen-lg mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center px-4">
          <button
            onClick={() => openModal()}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Add New Property
          </button>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, location, or price"
            className="mt-4 sm:mt-0 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-80"
          />
        </div>
      </div>

      <section className="py-8">
        <div className="max-w-screen-lg mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Manage Properties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
              >
                <img
                  src={property.images[0] || '/property-placeholder.jpg'}
                  alt="Property"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{property.name}</h3>
                  <p className="text-gray-500 mt-1">Location: {property.location}</p>
                  <p className="text-blue-600 mt-2 font-bold">{property.price}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {property.size} | {property.baths} Baths | {property.propertyType}
                  </p>

                  <p className="text-gray-700 mt-2 text-sm">
                    {showFullDescription[property.id]
                      ? property.description
                      : `${property.description.substring(0, 100)}...`}
                    <button
                      onClick={() => toggleDescription(property.id)}
                      className="text-blue-500 ml-2"
                    >
                      {showFullDescription[property.id] ? 'Read Less' : 'Read More'}
                    </button>
                  </p>

                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => openModal(property)}
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(property.id)}
                      className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition w-full sm:w-auto"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-semibold text-center text-gray-700">
              {editingProperty?.id ? 'Edit Property' : 'Add New Property'}
            </h2>
            <form className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700">Property Name</label>
                <input
                  type="text"
                  value={editingProperty.name}
                  onChange={(e) => setEditingProperty({ ...editingProperty, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Location</label>
                <input
                  type="text"
                  value={editingProperty.location}
                  onChange={(e) => setEditingProperty({ ...editingProperty, location: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Price</label>
                <input
                  type="text"
                  value={editingProperty.price}
                  onChange={(e) => setEditingProperty({ ...editingProperty, price: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Size (Sq Ft)</label>
                <input
                  type="text"
                  value={editingProperty.size}
                  onChange={(e) => setEditingProperty({ ...editingProperty, size: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Property Type</label>
                <input
                  type="text"
                  value={editingProperty.propertyType}
                  onChange={(e) => setEditingProperty({ ...editingProperty, propertyType: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Amenities</label>
                <input
                  type="text"
                  placeholder="Comma-separated (e.g., Gym, Pool)"
                  value={editingProperty.amenities.join(', ')}
                  onChange={(e) =>
                    setEditingProperty({
                      ...editingProperty,
                      amenities: e.target.value.split(',').map((a) => a.trim()),
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  value={editingProperty.description}
                  onChange={(e) => setEditingProperty({ ...editingProperty, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">Images</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  multiple
                />
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {editingProperty.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img src={image} alt={`Property image ${index}`} className="w-full h-32 object-cover rounded-lg" />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">Videos</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  multiple
                />
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {editingProperty.videos.map((video, index) => (
                    <div key={index} className="relative">
                      <video src={video} controls className="w-full h-32 rounded-lg" />
                      <button
                        onClick={() => handleRemoveVideo(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={closeModal}
                  className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-sm p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-center text-gray-700">
              Are you sure you want to delete this property?
            </h2>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProperty}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
