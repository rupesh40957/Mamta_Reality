import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaBath, FaBuilding } from 'react-icons/fa';
import Link from "next/link";

const PropertyCard = ({ darkMode }) => {
  const router = useRouter();
  const { object } = router.query;

  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (object) {
      try {
        const parsedObject = JSON.parse(object);
        setProperty(parsedObject);
      } catch (error) {
        console.error('Failed to parse property data:', error);
      }
    }
  }, [object]);

  // If property data is not loaded yet
  if (!property) {
    return (
      <div className={`max-w-6xl mx-auto p-6 shadow-lg rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <Skeleton height={200} />
        <Skeleton count={5} />
      </div>
    );
  }

  const { name, location, price, size, baths, propertyType, amenities, description, images, videos } = property;

  return (
   <div className="py-16 bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
    <div className={`max-w-6xl mx-auto p-6 shadow-lg rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900  '}`}>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side: Images & Videos */}
        <div className="flex-shrink-0 w-full md:w-1/2 space-y-7">
          {/* Image carousel */}
          {images && images.length > 0 && (
            <Swiper spaceBetween={50} slidesPerView={1} navigation={{ clickable: true }} >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`${name} image ${index + 1}`}
                    className="w-full h-72 object-cover rounded-lg shadow-md transform transition duration-300 hover:scale-105"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* Video carousel */}
          {videos && videos.length > 0 && (
            <Swiper spaceBetween={25} slidesPerView={1} navigation>
              {videos.map((video, index) => (
                <SwiperSlide key={index}>
                  <div className="w-full">
                    <video controls className="w-full h-64 object-cover rounded-lg shadow-md">
                      <source src={video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Right Side: Property Details */}
        <div className="flex flex-col space-y-6 md:w-1/2 mt-10">
          <h2 className="text-4xl font-bold mb-4">{name}</h2>
          <p className="text-lg mb-4">{location}</p>

          <div className="flex flex-wrap gap-4">
            <span className="text-2xl font-semibold text-green-600 hover:text-green-700 transition duration-300">
              ₹{price}
            </span>
            <span className="text-xl">{size} sqft</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FaBath className="text-gray-600" />
              <span className="text-lg">{baths} Bathrooms</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaBuilding className="text-gray-600" />
              <span className="text-lg">Type: {propertyType}</span>
            </div>
          </div>

          <h4 className="text-xl font-semibold mt-4">Amenities</h4>
          <ul className="list-disc pl-5 space-y-1">
            {amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>

          <p className="text-lg mt-4">{description}</p>
          
          <Link
            href={`https://wa.me/${property.whatsappNumber || "9987790471"}?text=Hi, I am interested in the property: ${property.name}, which is priced at ${property.price}`}
            target="_blank"
            className="w-full inline-block bg-blue-500 text-white py-2 rounded-lg text-center hover:bg-blue-600 transition-colors duration-200"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
   </div>
  );
};

export default PropertyCard;
