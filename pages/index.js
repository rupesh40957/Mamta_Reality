import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Contact from '../pages/contact';
import 'swiper/css';
import { LocationMarkerIcon, CheckCircleIcon, UsersIcon } from '@heroicons/react/solid';
import { SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function HomePage({ darkMode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState([]);  // To store project data
  const [loading, setLoading] = useState(true);  // To handle loading state
  const router = useRouter();
  
  // Fetch projects data from an API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/user/get-listing');
        const data = await response.json();
        setProjects(data.properties);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on search query
  const filteredProjects = (projects) =>
    projects.filter(
      (project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Handle dark mode classes
  const themeClass = darkMode === 'class' ? 'dark' : '';
    

  return (
    <div className={`min-h-screen text-black pb-24 ${themeClass} bg-gray-50 dark:bg-gray-800`}>
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
            <img
              src="/banner1.jpg"
              alt="Banner 1"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-75"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <h1 className="text-4xl font-bold text-center">Find Your Dream Home</h1>
              <p className="mt-4 text-lg text-center">Browse through thousands of listings in your city.</p>
              <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Explore Now
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/banner2.jpg"
              alt="Banner 2"
              className="w-full h-[400px] object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Property Search Engine */}
      <div className="p-4  shadow-md rounded-lg mx-4 md:mx-10 flex flex-col md:flex-row items-center mt-6">
        
        <input
          type="text"
          placeholder="Search for properties..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
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

      {/* Projects Sections */}
      <div className="text-center py-3">
        {loading ? (
          <p>Loading projects...</p>
        ) : (
          <>
            <SectionWithSwiper title="Featured Projects" projects={projects.filter(p => p.projectType === 'Featured Projects')} />
            <SectionWithSwiper title="Recommended for You" projects={projects.filter(p => p.projectType === 'Recommended for You')} />
            <SectionWithSwiper title="Newly Launched Projects" projects={projects.filter(p => p.projectType === 'Newly Launched Projects')} />
            <SectionWithSwiper title="Upcoming Projects" projects={projects.filter(p => p.projectType === 'Upcoming Projects')} />
            <SectionWithSwiper title="Ongoing Projects" projects={projects.filter(p => p.projectType === 'Ongoing Projects')} />
            <SectionWithSwiper title="Completed Projects" projects={projects.filter(p => p.projectType === 'Completed Projects')} />
          </>

        )}
        <Contact />
      </div>
    </div>
  );
}

// function SectionWithSwiper({ title, projects }) {
//   return (
//     <div className="mt-10 px-4 sm:px-6 md:px-10 relative">
//       <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800 dark:text-white">{title}</h2>
      
//       <Swiper
//         spaceBetween={20}
//         slidesPerView={1}
//         breakpoints={{
//           640: { slidesPerView: 2, spaceBetween: 20 },
//           768: { slidesPerView: 3, spaceBetween: 30 },
//           1024: { slidesPerView: 4, spaceBetween: 40 },
//         }}
//         loop={true}
//         autoplay={{
//           delay: 3000, // Delay between slides in milliseconds
//           disableOnInteraction: false, // Keep autoplay running after user interaction
//         }}
//         navigation={true}
//       >
//         {projects.map((project) => (
//           <SwiperSlide key={project.id}>
//             <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 dark:bg-gray-800 dark:text-white relative">
              
//               {/* Image Section with overlay */}
            
//                 <Link
//                 href={{
//                   pathname: `/property/${project.id}`,
//                   query: { object: JSON.stringify(project) },
//                 }}
//                 passHref
//               >
//                 <div className="relative">
//                   <img
//                     src={project.images[0]}
//                     alt={project.name}
//                     className="w-full h-48 object-cover rounded-t-lg"
//                   />
                   
//                   <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-40"></div>
//                 </div>
//                 </Link>
//                 <div className="p-4 space-y-4">
//                   {/* Project Name and Price */}
//                   <div className="flex justify-between items-center mb-2">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{project.name}</h3>
//                     <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
//                       ₹{project.price}
//                     </span>
//                   </div>

//                   {/* Project Details */}
//                   <div className="text-sm text-gray-500 dark:text-gray-300 space-y-2">
//                     <div className="flex items-center">
//                       <LocationMarkerIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                       <span className="ml-2">{project.location}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <UsersIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                       <span className="ml-2">{project.size} | {project.baths} Baths</span>
//                     </div>
//                   </div>

//                   {/* Amenities Section */}
//                   <div className="mt-4">
//                     <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Amenities</h4>
//                     <ul className="text-sm text-gray-600 dark:text-gray-300 mt-2">
//                       {project.amenities.map((amenity, index) => (
//                         <li key={index} className="flex items-center mt-1">
//                           <CheckCircleIcon className="h-4 w-4 text-green-500" />
//                           <span className="ml-2">{amenity}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
                  

//                   {/* Project Description */}
//                   <p className="text-gray-600 dark:text-gray-300">{project.description.substring(0, 500)}...</p>

//                   {/* More details button */}
//                   <div className="mt-3 text-center"> 
//                     <Link
//                       href={`https://wa.me/9987790471`}
//                       target="_blank"
//                       className="w-full inline-block bg-blue-500 text-white py-2 rounded-lg text-center hover:bg-blue-600 transition-colors duration-200"
//                     >
//                       Contact
//                     </Link>
//                   </div>
//                 </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }



function SectionWithSwiper({ title, projects }) {
  useEffect(() => {
    console.log('Projects:', projects); // Debugging: Check if projects data is being passed correctly
  }, [projects]); // Runs every time `projects` changes

  return (
    <div className="mt-10 px-4 sm:px-6 md:px-10 relative">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800 dark:text-white">{title}</h2>
      
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
          delay: 3000, // Delay between slides in milliseconds
          disableOnInteraction: false, // Keep autoplay running after user interaction
        }}
        navigation={true}
      >
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <SwiperSlide key={project.id}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 dark:bg-gray-800 dark:text-white relative">
                <Link
                  href={{
                    pathname: `/property/${project.id}`,
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
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{project.name}</h3>
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
                        <span className="ml-2">{project.size} | {project.baths} Baths</span>
                      </div>
                    </div>

                    {/* Amenities Section */}
                    <div className="mt-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Amenities</h4>
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
                    <p className="text-gray-600 dark:text-gray-300">{project.description.substring(0, 100)}...</p>

                    {/* More details button */}
                    <div className="mt-3 text-center"> 
                      <Link
                        href={`https://wa.me/9987790471`}
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
          <div>No properties available</div> // Handle the case where there are no projects
        )}
      </Swiper>
    </div>
  );
}