

import Head from "next/head";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AdminListing() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    property: null,
  });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/admin/property-listing");
      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }
      const data = await response.json();
      setProperties(data.properties);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch properties");
      toast.error("Failed to fetch properties"); // Show error toast
      setLoading(false);
    }
  };

  const openModal = (property = null) => {
    setModalState({
      isOpen: true,
      type: property ? "edit" : "add",
      property: property || {
        name: "",
        location: "",
        price: "",
        size: "",
        baths: 1,
        propertyType: "",
        amenities: [],
        images: [],
        videos: [],
        description: "",
        projectType: "Featured Projects",
      },
    });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null, property: null });
  };

  const handleSave = async () => {
    // Validate required fields
    if (!modalState.property) {
      toast.error("Property data is missing");
      return;
    }

    const requiredFields = [
      'name',
      'location', 
      'price',
      'size',
      'propertyType',
      'description',
      'projectType'
    ];

    const missingFields = requiredFields.filter(field => !modalState.property[field]);

    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (!modalState.property.images || modalState.property.images.length === 0) {
      toast.error("At least one image is required");
      return;
    }
    try {
      const url =
        modalState.type === "edit"
          ? `/api/auth/admin/property-listing?id=${modalState.property._id}`
          : "/api/auth/admin/property-listing";

      const method = modalState.type === "edit" ? "PUT" : "POST";

      console.log(modalState.property);
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modalState.property),
      });

      if (!response.ok) {
        // throw new Error("Failed to save property");
        toast.error("Failed to save property ");
      }

      fetchProperties();
      closeModal();
      toast.success(
        modalState.type === "edit"
          ? "Property updated successfully"
          : "Property added successfully"
      ); // Success notification
    } catch (err) {
      toast.error("Failed to save property"); // Show error toast
    }
  };

  const handleDeleteProperty = async () => {
    try {
      const response = await fetch(
        `/api/auth/admin/property-listing?id=${deleteConfirm}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        // throw new Error("Failed to delete property");
        toast.error("Failed to delete property");
      }

      fetchProperties();
      setDeleteConfirm(null);
      toast.success("Property deleted successfully"); // Success notification
    } catch (err) {
      toast.error("Failed to delete property"); // Show error toast
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const images = files.map((file) => URL.createObjectURL(file));
    setModalState({
      ...modalState,
      property: {
        ...modalState.property,
        images: [...modalState.property.images, ...images],
      },
    });
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    const videos = files.map((file) => URL.createObjectURL(file));
    setModalState({
      ...modalState,
      property: {
        ...modalState.property,
        videos: [...modalState.property.videos, ...videos],
      },
    });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = modalState.property.images.filter(
      (_, i) => i !== index
    );
    setModalState({
      ...modalState,
      property: { ...modalState.property, images: updatedImages },
    });
  };

  const handleRemoveVideo = (index) => {
    const updatedVideos = modalState.property.videos.filter(
      (_, i) => i !== index
    );
    setModalState({
      ...modalState,
      property: { ...modalState.property, videos: updatedVideos },
    });
  };

  const filteredProperties = properties.filter((property) =>
    [
      property.name,
      property.location,
      property.price,
      property.propertyType,
    ].some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className='text-gray-900'>
      <Head>
        <title>Admin - Edit Property Listings</title>
        <meta
          name="description"
          content="Admin panel to manage and edit property listings for Mamta Realty."
        />
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
          <button
            onClick={() => openModal()}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Add New Property
          </button>
          
        
        </div>
      </div>

      <section className="py-8">
        <div className="max-w-screen-lg mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
            Manage Properties
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div
                key={property._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
              >
                <img
                  src={property.images[0] || "/property-placeholder.jpg"}
                  alt="Property"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {property.name}
                  </h3>
                  <p className="text-gray-500 mt-1">
                    Location: {property.location}
                  </p>
                  <p className="text-blue-600 mt-2 font-bold">
                    {property.price}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {property.size} | {property.baths} Baths |{" "}
                    {property.propertyType}
                  </p>
                  <p className="text-gray-700 mt-2 text-sm">
                    {property.description.substring(0, 100)}...
                  </p>
                  <p className="text-gray-500 mt-2 text-sm">
                    Project Type: {property.projectType}
                  </p>
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => openModal(property)}
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(property._id)}
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
      {/* Loading State */}
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-lg font-semibold text-gray-700">Loading properties...</p>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg">
          <div className="flex items-center">
            <div className="py-1">
              <svg className="w-6 h-6 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
            <button 
              onClick={() => setError(null)}
              className="ml-auto pl-3"
            >
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* No Results State */}
      {!loading && filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No properties found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria or add a new property.</p>
          <button
            onClick={() => openModal()}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Add New Property
          </button>
        </div>
      )}

      {modalState.isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-semibold text-center text-gray-700">
              {modalState.type === "edit"
                ? "Edit Property"
                : "Add New Property"}
            </h2>
            <form
              className="space-y-4 mt-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Project Type
                </label>
                <select
                  value={modalState.property.projectType}
                  onChange={(e) =>
                    setModalState({
                      ...modalState,
                      property: {
                        ...modalState.property,
                        projectType: e.target.value,
                      },
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="Featured Projects">Featured Projects</option>
                  <option value="Recommended for You">
                    Recommended for You
                  </option>
                  <option value="Newly Launched Projects">
                    Newly Launched Projects
                  </option>
                  <option value="Upcoming Projects">Upcoming Projects</option>
                  <option value="Ongoing Projects">Ongoing Projects</option>
              <option value="Completed Projects">Completed Projects</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Property Name
                </label>
                <input
                  type="text"
                  value={modalState.property.name}
                  onChange={(e) =>
                    setModalState({
                      ...modalState,
                      property: {
                        ...modalState.property,
                        name: e.target.value,
                      },
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  value={modalState.property.location}
                  onChange={(e) =>
                    setModalState({
                      ...modalState,
                      property: {
                        ...modalState.property,
                        location: e.target.value,
                      },
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Price
                </label>
                <input
                  type="text"
                  value={modalState.property.price}
                  onChange={(e) =>
                    setModalState({
                      ...modalState,
                      property: {
                        ...modalState.property,
                        price: e.target.value,
                      },
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Size (Sq Ft)
                </label>
                <input
                  type="text"
                  value={modalState.property.size}
                  onChange={(e) =>
                    setModalState({
                      ...modalState,
                      property: {
                        ...modalState.property,
                        size: e.target.value,
                      },
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Baths
                </label>
                <input
                  type="number"
                  value={modalState.property.baths}
                  onChange={(e) =>
                    setModalState({
                      ...modalState,
                      property: {
                        ...modalState.property,
                        baths: Number.parseInt(e.target.value, 10),
                      },
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Property Type
                </label>
                <input
                  type="text"
                  value={modalState.property.propertyType}
                  onChange={(e) =>
                    setModalState({
                      ...modalState,
                      property: {
                        ...modalState.property,
                        propertyType: e.target.value,
                      },
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Amenities
                </label>
                <input
                  type="text"
                  placeholder="Comma-separated (e.g., Gym, Pool)"
                  value={modalState.property.amenities.join(", ")}
                  onChange={(e) =>
                    setModalState({
                      ...modalState,
                      property: {
                        ...modalState.property,
                        amenities: e.target.value
                          .split(",")
                          .map((a) => a.trim()),
                      },
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  value={modalState.property.description}
                  onChange={(e) =>
                    setModalState({
                      ...modalState,
                      property: {
                        ...modalState.property,
                        description: e.target.value,
                      },
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  multiple
                />
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {modalState.property.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Property image ${index}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
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
                <label className="block text-sm font-semibold text-gray-700">
                  Videos
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  multiple
                />
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {modalState.property.videos.map((video, index) => (
                    <div key={index} className="relative">
                      <video
                        src={video}
                        controls
                        className="w-full h-32 rounded-lg"
                      />
                      <button
                        type="button"
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
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
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
    </div>
  );
}
