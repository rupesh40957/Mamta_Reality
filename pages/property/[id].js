
// Property Page
// This page is used to display the property details


import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaBath, FaBuilding } from 'react-icons/fa';
import Link from "next/link";
import { FaWhatsapp } from 'react-icons/fa';

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
    <div className="min-h-screen text-black  bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className={`max-w-6xl mx-auto p-3 sm:p-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {/* Quick Actions Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-3 shadow-lg flex z-50 lg:hidden border-t dark:border-gray-700">
          <Link
            href={`https://wa.me/${property.whatsappNumber || "9987790471"}`}
            target="_blank"
            className="flex-1 mx-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-full text-center text-sm font-medium flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 hover:from-green-600 hover:to-green-700 transition-all"
          >
            <FaWhatsapp className="text-lg" />
            Chat Now
          </Link>
          <button 
            onClick={() => window.location.href = `tel:${property.phoneNumber || "9987790471"}`}
            className="flex-1 mx-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-full text-center text-sm font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call Now
          </button>
        </div>

        {/* Property Title Card */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-xl">
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{name}</h1>
          <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-lg">{location}</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Media Gallery */}
          <div className="w-full lg:w-3/5 space-y-6">
            {/* Image Carousel */}
            {images && images.length > 0 && (
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Swiper 
                  spaceBetween={0} 
                  slidesPerView={1} 
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  loop={true}
                  className="mySwiper"
                >
                  {images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative group aspect-[16/9] sm:aspect-[16/10] md:aspect-[16/9]">
                        <img
                          src={image}
                          alt={`${name} image ${index + 1}`}
                          className="absolute inset-0 w-full h-full object-contain sm:object-cover transition-transform duration-300 group-hover:scale-105"
                          onClick={() => window.open(image, '_blank')}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 px-3 py-1 rounded-full text-sm">
                          {index + 1}/{images.length}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {/* Video Gallery */}
            {videos && videos.length > 0 && (
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                <h3 className="text-xl font-semibold mb-4">Property Videos</h3>
                <Swiper 
                  spaceBetween={10} 
                  slidesPerView={1} 
                  navigation
                  pagination={{ clickable: true }}
                  className="mySwiper"
                >
                  {videos.map((video, index) => (
                    <SwiperSlide key={index}>
                      <div className="aspect-video">
                        <video 
                          controls 
                          className="w-full h-full object-contain rounded-lg"
                          poster="/video-thumbnail.jpg"
                          preload="metadata"
                        >
                          <source src={video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="text-center mt-2 text-sm text-gray-500">
                  Swipe or use arrows to view all videos
                </div>
              </div>
            )}

            {/* Thumbnail Grid for Quick Navigation */}
            {images && images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {images.slice(0, 4).map((image, index) => (
                  <div 
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => document.querySelector('.mySwiper').swiper.slideTo(index)}
                  >
                    <img 
                      src={image} 
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rest of the component remains the same */}
          {/* Property Details Section */}
          <div className="w-full lg:w-2/5 space-y-6">
            {/* Price & Size Card */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">₹{price}</span>
                <span className="text-xl text-gray-600 dark:text-gray-300">{size} sqft</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-3 rounded-xl">
                  <FaBath className="text-blue-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Bathrooms</p>
                    <p className="font-semibold">{baths}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-3 rounded-xl">
                  <FaBuilding className="text-blue-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Property Type</p>
                    <p className="font-semibold">{propertyType}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities Card */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-semibold mb-4">Premium Amenities</h3>
              <div className="grid grid-cols-2 gap-4">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-semibold mb-4">About This Property</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
            </div>

            {/* Desktop Contact Buttons */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <Link
                href={`https://wa.me/${property.whatsappNumber || "9987790471"}?text=Hi, I am interested in ${name}`}
                target="_blank"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl text-center font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/20"
              >
         WhatsApp
              </Link>
              <button
                onClick={() => window.location.href = `tel:${property.phoneNumber || "9987790471"}`}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl text-center font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/20"
              >
                Call Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
