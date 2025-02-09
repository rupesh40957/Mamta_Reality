import Head from "next/head";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiSearch, 
  FiLoader,
  FiRefreshCw // Refresh icon from react-icons
} from "react-icons/fi";
import { useAdminContext } from "../../contexts/AdminContext"; // Ensure correct path

export default function AdminListing() {
  // Global context: listings data and CRUD functions
  const {
    listings,
    totalListings, // total count of listings from API
    fetchListings, // function: async (page, limit) => { … }
    addListing,    // function to add a property; expects FormData
    updateListing, // function to update a property; expects id and FormData
    deleteListing, // function to delete a property; expects id
    loading,
    error,
  } = useAdminContext();

  // Local UI state
  const [saving, setSaving] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null, // "add" or "edit"
    property: null,
  });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10; // properties per page

  // Fetch listings on mount and when page changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchListings(page, limit);
      } catch (err) {
        toast.error("Error fetching properties");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Handler to manually refresh listings
  const handleRefresh = async () => {
    try {
      await fetchListings(page, limit);
      toast.success("Listings refreshed");
    } catch (err) {
      toast.error("Failed to refresh listings");
    }
  };

  // Open modal for adding or editing a property
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
    setSaving(false);
  };

  // Handle saving a property (add or update)
  const handleSave = async () => {
    if (!modalState.property) {
      toast.error("Property data is missing");
      return;
    }

    // Trim string fields for validation
    const trimmedProperty = {
      ...modalState.property,
      name: modalState.property.name.trim(),
      location: modalState.property.location.trim(),
      price: modalState.property.price.toString().trim(),
      size: modalState.property.size.toString().trim(),
      propertyType: modalState.property.propertyType.trim(),
      description: modalState.property.description.trim(),
      projectType: modalState.property.projectType.trim(),
    };

    const requiredFields = [
      "name",
      "location",
      "price",
      "size",
      "propertyType",
      "description",
      "projectType",
    ];
    const missingFields = requiredFields.filter(
      (field) => !trimmedProperty[field] || trimmedProperty[field] === ""
    );

    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    if (!modalState.property.images || modalState.property.images.length === 0) {
      toast.error("At least one image is required");
      return;
    }

    setSaving(true);

    // Create FormData to send files and other fields
    const formData = new FormData();
    formData.append("name", trimmedProperty.name);
    formData.append("location", trimmedProperty.location);
    formData.append("price", trimmedProperty.price);
    formData.append("size", trimmedProperty.size);
    formData.append("baths", trimmedProperty.baths);
    formData.append("propertyType", trimmedProperty.propertyType);
    formData.append("description", trimmedProperty.description);
    formData.append("projectType", trimmedProperty.projectType);
    formData.append("amenities", JSON.stringify(trimmedProperty.amenities));

    // Append images
    modalState.property.images.forEach((imgFile) => {
      formData.append("images", imgFile);
    });
    // Append videos
    modalState.property.videos.forEach((vidFile) => {
      formData.append("videos", vidFile);
    });

    try {
      if (modalState.type === "edit") {
        // Assuming property has an _id field in edit mode
        await updateListing(modalState.property._id, formData);
        toast.success("Property updated successfully");
      } else {
        await addListing(formData);
        toast.success("Property added successfully");
      }
      await fetchListings(page, limit);
      closeModal();
    } catch (err) {
      console.error("Error saving property:", err);
      toast.error("Failed to save property");
    } finally {
      setSaving(false);
    }
  };

  // Handle deletion of a property
  const handleDeleteProperty = async () => {
    try {
      await deleteListing(deleteConfirm);
      toast.success("Property deleted successfully");
      await fetchListings(page, limit);
      setDeleteConfirm(null);
    } catch (err) {
      console.error("Error deleting property:", err);
      toast.error("Failed to delete property");
    }
  };

  // Handle image uploads (store File objects directly)
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        setModalState((prevState) => ({
          ...prevState,
          property: {
            ...prevState.property,
            images: [...prevState.property.images, file],
          },
        }));
      } else {
        toast.error("Only image files are allowed");
      }
    });
  };

  // Handle video uploads
  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (file.type.startsWith("video/")) {
        setModalState((prevState) => ({
          ...prevState,
          property: {
            ...prevState.property,
            videos: [...prevState.property.videos, file],
          },
        }));
      } else {
        toast.error("Only video files are allowed");
      }
    });
  };

  // Remove image from modal state
  const handleRemoveImage = (index) => {
    const updatedImages = modalState.property.images.filter((_, i) => i !== index);
    setModalState((prevState) => ({
      ...prevState,
      property: { ...prevState.property, images: updatedImages },
    }));
  };

  // Remove video from modal state
  const handleRemoveVideo = (index) => {
    const updatedVideos = modalState.property.videos.filter((_, i) => i !== index);
    setModalState((prevState) => ({
      ...prevState,
      property: { ...prevState.property, videos: updatedVideos },
    }));
  };

  // Filter listings based on search query
  const filteredProperties = listings.filter((property) =>
    ['name', 'location', 'price', 'propertyType'].some((key) => {
      const value = property[key] ? property[key].toString().toLowerCase() : "";
      return value.includes(searchQuery.toLowerCase());
    })
  );

  // Calculate total pages for pagination
  const totalPages = Math.ceil(totalListings / limit);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-900">
        <div className="flex items-center justify-center space-x-2">
          <FiLoader className="w-8 h-8 animate-spin text-blue-600" />
          <span>Loading properties...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="text-gray-900">
      <Head>
        <title>Admin - Edit Property Listings</title>
        <meta
          name="description"
          content="Admin panel to manage and edit property listings for Mamta Realty."
        />
      </Head>

      {/* Search Bar, Refresh & Add Button */}
      <div className="py-4 bg-gray-100">
        <div className="max-w-screen-lg mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center px-4">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, location, or price"
                className="mt-4 sm:mt-0 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <FiSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
            </div>
            <button
              onClick={handleRefresh}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center"
            >
              <FiRefreshCw className="mr-2" />
              Refresh Listings
            </button>
          </div>
          <button
            onClick={() => openModal()}
            className="mt-4 sm:mt-0 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition flex items-center"
          >
            <FiPlus className="mr-2" />
            Add New Property
          </button>
        </div>
      </div>

      {/* Listings Display */}
      <section className="py-8">
        <div className="max-w-screen-lg mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
            Manage Properties
          </h2>
          {filteredProperties.length > 0 ? (
            <>
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
                      <h3 className="text-lg font-semibold text-gray-800">{property.name}</h3>
                      <p className="text-gray-500 mt-1">Location: {property.location}</p>
                      <p className="text-blue-600 mt-2 font-bold">{property.price}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {property.size} | {property.baths} Baths | {property.propertyType}
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
                          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center w-full sm:w-auto"
                        >
                          <FiEdit className="mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(property._id)}
                          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition flex items-center justify-center w-full sm:w-auto"
                        >
                          <FiTrash2 className="mr-2" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center items-center mt-8 space-x-4">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className={`py-2 px-4 rounded-lg ${
                    page === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Previous
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
                  disabled={page === totalPages}
                  className={`py-2 px-4 rounded-lg ${
                    page === totalPages
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No properties found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search criteria or add a new property.
              </p>
              <button
                onClick={() => openModal()}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center mx-auto"
              >
                <FiPlus className="mr-2" />
                Add New Property
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Modal for Add/Edit Property */}
      {modalState.isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-semibold text-center text-gray-700">
              {modalState.type === "edit" ? "Edit Property" : "Add New Property"}
            </h2>
            <form
              className="space-y-4 mt-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              {/* Project Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Project Type
                </label>
                <select
                  value={modalState.property.projectType}
                  onChange={(e) =>
                    setModalState((prevState) => ({
                      ...prevState,
                      property: { ...prevState.property, projectType: e.target.value },
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="Featured Projects">Featured Projects</option>
                  <option value="Recommended for You">Recommended for You</option>
                  <option value="Newly Launched Projects">Newly Launched Projects</option>
                  <option value="Upcoming Projects">Upcoming Projects</option>
                  <option value="Ongoing Projects">Ongoing Projects</option>
                  <option value="Completed Projects">Completed Projects</option>
                </select>
              </div>

              {/* Property Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Property Name
                </label>
                <input
                  type="text"
                  value={modalState.property.name}
                  onChange={(e) =>
                    setModalState((prevState) => ({
                      ...prevState,
                      property: { ...prevState.property, name: e.target.value },
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  value={modalState.property.location}
                  onChange={(e) =>
                    setModalState((prevState) => ({
                      ...prevState,
                      property: { ...prevState.property, location: e.target.value },
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Price
                </label>
                <input
                  type="text"
                  value={modalState.property.price}
                  onChange={(e) =>
                    setModalState((prevState) => ({
                      ...prevState,
                      property: { ...prevState.property, price: e.target.value },
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Size */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Size (Sq Ft)
                </label>
                <input
                  type="text"
                  value={modalState.property.size}
                  onChange={(e) =>
                    setModalState((prevState) => ({
                      ...prevState,
                      property: { ...prevState.property, size: e.target.value },
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Baths */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Baths
                </label>
                <input
                  type="number"
                  value={modalState.property.baths}
                  onChange={(e) =>
                    setModalState((prevState) => ({
                      ...prevState,
                      property: { ...prevState.property, baths: Number.parseInt(e.target.value, 10) },
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  min="0"
                />
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Property Type
                </label>
                <input
                  type="text"
                  value={modalState.property.propertyType}
                  onChange={(e) =>
                    setModalState((prevState) => ({
                      ...prevState,
                      property: { ...prevState.property, propertyType: e.target.value },
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Amenities
                </label>
                <input
                  type="text"
                  placeholder="Comma-separated (e.g., Gym, Pool)"
                  value={modalState.property.amenities.join(", ")}
                  onChange={(e) =>
                    setModalState((prevState) => ({
                      ...prevState,
                      property: {
                        ...prevState.property,
                        amenities: e.target.value.split(",").map((a) => a.trim()),
                      },
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  value={modalState.property.description}
                  onChange={(e) =>
                    setModalState((prevState) => ({
                      ...prevState,
                      property: { ...prevState.property, description: e.target.value },
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Images Upload */}
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
                        src={typeof image === "string" ? image : URL.createObjectURL(image)}
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

              {/* Videos Upload */}
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
                        src={typeof video === "string" ? video : URL.createObjectURL(video)}
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

              {/* Form Buttons */}
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
                  disabled={saving}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                >
                  {saving ? (
                    <>
                      <FiLoader className="w-5 h-5 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
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
                onClick={() => handleDeleteProperty()}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 flex items-center justify-center"
              >
                <FiTrash2 className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
