// pages/index.js
import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { LocationMarkerIcon, CheckCircleIcon, UsersIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { SearchIcon } from '@heroicons/react/solid';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Amenities from "../public/img/amenities1.png";
import Seting from "../public/img/amenities.png";
import Image from 'next/image';
;
// SEO
import seoConfig from '../utils/seoConfig';
import MetaTags from '../components/SEO/MetaTags';





// Global Context
import { GlobalDataContext } from '../contexts/GlobalDataContext';

// (Optional) You can import additional components (like About) if needed
import About from './about';

export default function HomePage({ darkMode }) {
  // Get global data and loading state from context
  const { listingData, loading } = useContext(GlobalDataContext);

  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Adjust theme class based on darkMode boolean
  const themeClass = darkMode ? 'dark' : '';

  // Filter listings based on search query (applied on name and description)
  const filteredListings = listingData.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen text-black pb-24 ${themeClass} bg-gray-50 dark:bg-gray-800`}>
      {/* Global SEO Meta Tags */}
      <MetaTags
        title="Home - Mamta Realty"
        description="Welcome to Mamta Realty, your trusted partner in real estate solutions. Explore our wide range of properties and find your dream home today."
        image="https://www.mamtarealty.com/img/mamtarealty_logo.png"
        url="https://www.mamtarealty.com"
        keywords="real estate, property, buy home, Mamta Realty, Mumbai, Maharashtra, India"
        pageType="WebPage"
        breadcrumb={seoConfig.breadcrumb}
      />

      {/* Hero Section */}
      <div className="relative">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          loop
          pagination={{ clickable: true }}
          navigation
        >
          <SwiperSlide>
            <Image
              src={Amenities}
              alt="Banner 1"
              width={1000}
              height={1000}
              className="w-full h-[400px] object-cover"
            />




            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-75"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <h1 className="text-4xl font-bold text-center">Find Your Dream Home</h1>
              <p className="mt-4 text-lg text-center">
                Browse through thousands of listings in your city.
              </p>
              <Link href="/listing" className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Explore Now
              </Link>
            </div>

          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={Seting}
              alt="Banner 2"
              width={1000}
              height={1000}
              className="w-full h-[400px] object-cover"




            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Property Search Engine */}
      <div className="p-4 shadow-md rounded-lg mx-4 md:mx-10 flex flex-col md:flex-row items-center mt-6">
        <input
          type="text"
          placeholder="Search for properties..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:flex-grow p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          aria-label="Search for properties"
        />
        <button
          onClick={() => router.push(`/listing?search=${searchQuery}`)}
          className="mt-2 md:mt-0 md:ml-4 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <SearchIcon className="h-6 w-6" />
          <span className="ml-2">Search</span>
        </button>
      </div>

      {/* Property Sections */}
      <div className="text-center py-3">
        {loading ? (
          <p>Loading properties...</p>
        ) : listingData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] bg-gray-100 rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700">No Properties Available</h2>
            <p className="text-gray-500 text-center mt-2">
              We couldn't find any properties at the moment. Please check back later or explore other categories.
            </p>
            <button
              onClick={() => router.push('/listing')}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Explore Other Listings
            </button>
          </div>
        ) : (
          <>
            {/* Using .includes for flexible matching */}
            <SectionWithSwiper
              title="Featured Projects"
              property={listingData.filter((p) =>
                p.projectType?.toLowerCase().includes('featured')
              )}
            />
            <SectionWithSwiper
              title="Recommended for You"
              property={listingData.filter((p) =>
                p.projectType?.toLowerCase().includes('recommended')
              )}
            />
            <SectionWithSwiper
              title="Newly Launched Projects"
              property={listingData.filter((p) =>
                p.projectType?.toLowerCase().includes('newly launched')
              )}
            />
            <SectionWithSwiper
              title="Upcoming Projects"
              property={listingData.filter((p) =>
                p.projectType?.toLowerCase().includes('upcoming')
              )}
            />
            <SectionWithSwiper
              title="Ongoing Projects"
              property={listingData.filter((p) =>
                p.projectType?.toLowerCase().includes('ongoing')
              )}
            />
            <SectionWithSwiper
              title="Completed Projects"
              property={listingData.filter((p) =>
                p.projectType?.toLowerCase().includes('completed')
              )}
            />
          </>
        )}
      </div>

      {/* Optional: About Section */}
      <div className="text-center py-3">
        <About />
      </div>
    </div>
  );
}

function SectionWithSwiper({ title, property }) {
  // Debug log to verify property data is received correctly
  useEffect(() => {
    console.log(`Properties for "${title}":`, property);
  }, [property, title]);

  return (
    <div className="mt-10 px-4 sm:px-6 md:px-10 relative">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        {title}
      </h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 40 },
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
      >
        {property && property.length > 0 ? (
          property.map((project) => (
            <SwiperSlide key={project.id || project._id}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 dark:bg-gray-800 dark:text-white relative">
                <Link
                  href={{
                    pathname: `/property/${project.id || project._id}`,
                    query: { object: JSON.stringify(project) },
                  }}
                  passHref
                >
                  <div className="relative">
                    <img
                      src={project.images[0]}
                      alt={project.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-40"></div>
                  </div>
                  <div className="p-4 space-y-4">
                    {/* Project Name and Price */}
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {project.name}
                      </h3>
                      <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        ₹{project.price}
                      </span>
                    </div>
                    {/* Project Details */}
                    <div className="text-sm text-gray-500 dark:text-gray-300 space-y-2">
                      <div className="flex items-center">
                        <LocationMarkerIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        <span className="ml-2">{project.location}</span>
                      </div>
                      <div className="flex items-center">
                        <UsersIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        <span className="ml-2">
                          {project.size} | {project.baths} Baths
                        </span>
                      </div>
                    </div>
                    {/* Amenities Section */}
                    <div className="mt-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Amenities
                      </h4>
                      <ul className="text-sm grid grid-cols-2 gap-2 text-gray-600 dark:text-gray-300">
                        {project.amenities.slice(0, 4).map((amenity, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="ml-2 truncate">{amenity}</span>
                          </li>
                        ))}
                      </ul>

                    </div>
                    {/* Project Description */}
                    <p className="text-gray-600 dark:text-gray-300">
                      {project.description.substring(0, 100)}...
                    </p>
                    {/* More Details Button */}
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
            </SwiperSlide>
          ))
        ) : (
          <div>No properties available</div>
        )}
      </Swiper>
    </div>
  );
}
