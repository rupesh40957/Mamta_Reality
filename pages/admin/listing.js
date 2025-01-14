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
    images: ['/property-placeholder.jpg'],
    videos: [],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  },
];

export default function AdminListing() {
  const [properties, setProperties] = useState(initialProperties);
  const [editingProperty, setEditingProperty] = useState(null);

  // Add Property
  const handleAddProperty = () => {
    const newProperty = {
      id: properties.length + 1,
      name: '',
      location: '',
      price: '',
      size: '',
      baths: 1,
      images: [],
      videos: [],
      description: '',
    };
    setEditingProperty(newProperty);
  };

  // Save property (add/edit)
  const handleSave = (updatedProperty) => {
    const updatedProperties = properties.some((property) => property.id === updatedProperty.id)
      ? properties.map((property) =>
          property.id === updatedProperty.id ? updatedProperty : property
        )
      : [...properties, updatedProperty];
    setProperties(updatedProperties);
    setEditingProperty(null);
  };

  // Handle Edit
  const handleEditClick = (property) => {
    setEditingProperty({ ...property });
  };

  // Cancel Editing
  const handleCancel = () => {
    setEditingProperty(null);
  };

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProperty({
      ...editingProperty,
      [name]: value,
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setEditingProperty({
      ...editingProperty,
      images: [...(editingProperty.images || []), ...newImages],
    });
  };

  // Handle video upload
  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newVideos = files.map((file) => URL.createObjectURL(file));
    setEditingProperty({
      ...editingProperty,
      videos: [...(editingProperty.videos || []), ...newVideos],
    });
  };

  // Remove image
  const removeImage = (index) => {
    const updatedImages = [...editingProperty.images];
    updatedImages.splice(index, 1);
    setEditingProperty({
      ...editingProperty,
      images: updatedImages,
    });
  };

  // Remove video
  const removeVideo = (index) => {
    const updatedVideos = [...editingProperty.videos];
    updatedVideos.splice(index, 1);
    setEditingProperty({
      ...editingProperty,
      videos: updatedVideos,
    });
  };

  // Delete Property
  const handleDeleteProperty = (id) => {
    const updatedProperties = properties.filter((property) => property.id !== id);
    setProperties(updatedProperties);
  };

  return (
    <>
      <Head>
        <title>Admin - Edit Property Listings</title>
        <meta
          name="description"
          content="Admin panel to manage and edit property listings for Mamta Realty."
        />
      </Head>
      {/* Edit/Add Property Form Section */}
       <button
            onClick={handleAddProperty}
            className="mt-8 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Add New Property
          </button>
      {editingProperty && (
        <section className="bg-gray-100 py-8">
          <div className="max-w-screen-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
              {editingProperty.id ? 'Edit Property' : 'Add New Property'}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(editingProperty);
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700">Property Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingProperty.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={editingProperty.location}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Price</label>
                <input
                  type="text"
                  name="price"
                  value={editingProperty.price}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={editingProperty.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Upload Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="w-full"
                />
                <div className="flex flex-wrap mt-4 gap-2">
                  {editingProperty.images?.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Property Image ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Upload Videos</label>
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleVideoUpload}
                  className="w-full"
                />
                <div className="flex flex-wrap mt-4 gap-2">
                  {editingProperty.videos?.map((video, index) => (
                    <div key={index} className="relative">
                      <video
                        src={video}
                        controls
                        className="w-32 h-24 rounded-lg"
                      ></video>
                      <button
                        onClick={() => removeVideo(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  {editingProperty.id ? 'Save Changes' : 'Add Property'}
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* Admin Property Listing Section */}
      <section className="py-8">
        <div className="max-w-screen-lg mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Manage Properties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
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
                    {property.size} | {property.baths} Baths
                  </p>
                  <p className="text-gray-700 mt-2 text-sm">{property.description}</p>
                  <button
                    onClick={() => handleEditClick(property)}
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProperty(property.id)}
                    className="mt-4 ml-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </>
  );
}
