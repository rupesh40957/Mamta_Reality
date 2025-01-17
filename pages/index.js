import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { SearchIcon } from '@heroicons/react/solid';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter projects based on search query
  const filteredFeaturedProjects = featuredProjects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRecommendedProjects = recommendedProjects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNewlyLaunchedProjects = newlyLaunchedProjects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUpcomingProjects = upcomingProjects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
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
            <img src="/banner1.jpg" alt="Banner 1" className="w-full h-[400px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-75"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <h1 className="text-4xl font-bold text-center">Find Your Dream Home</h1>
              <p className="mt-4 text-lg text-center">Browse through thousands of listings in your city.</p>
              <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">Explore Now</button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img src="/banner2.jpg" alt="Banner 2" className="w-full h-[400px] object-cover" />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Property Search Engine */}
      <div className="p-4 bg-white shadow-md mt-2 rounded-lg mx-4 md:mx-10 flex items-center justify-center">
        <input
          type="text"
          placeholder="Search for properties..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="ml-4 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 flex items-center">
          <SearchIcon className="h-6 w-6" />
          <span className="ml-2">Search</span>
        </button>
      </div>
      <div className="text-center"> 

        {/* Featured Projects Section with Swiper */}
        <SectionWithSwiper title="Featured Projects" projects={filteredFeaturedProjects} />

        {/* Recommended for You */}
        <SectionWithSwiper title="Recommended for You" projects={filteredRecommendedProjects} />

        {/* Newly Launched Projects */}
        <SectionWithSwiper title="Newly Launched Projects" projects={filteredNewlyLaunchedProjects} />

        {/* Upcoming Projects */}
        <SectionWithSwiper title="Upcoming Projects" projects={filteredUpcomingProjects} />

      </div>

      {/* Customer Testimonials */}
      <TestimonialsSection />
    </div>
  );
}

function SectionWithSwiper({ title, projects }) {
  const slidesPerView = 4; // Number of cards per slide
  const chunkedProjects = [];
  
  // Chunk the projects into groups of 'slidesPerView'
  for (let i = 0; i < projects.length; i += slidesPerView) {
    chunkedProjects.push(projects.slice(i, i + slidesPerView));
  }

  return (
    <div className="mt-10 px-4 md:px-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3000 }}
        navigation
      >
        {chunkedProjects.map((projectChunk, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {projectChunk.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
                >
                  <img src={project.image} alt={project.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-gray-600 mt-2">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}


function TestimonialsSection() {
  return (
    <div className="bg-blue-50 py-10 px-4 md:px-10 mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Happy Customers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
              <p className="text-gray-500">{testimonial.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}





// Example Data
const featuredProjects = [
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
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  },
];

const recommendedProjects = [
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
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  },
];

const newlyLaunchedProjects = [
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
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  },
];

const upcomingProjects = [
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
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  },
];

const testimonials = [
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
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  }, {
    id: 1,
    name: '3 BHK Apartment',
    location: 'Andheri, Mumbai',
    price: '₹1.25 Crore',
    size: '1200 Sq Ft',
    baths: 2,
    propertyType: 'Apartment',
    amenities: ['Gym', 'Swimming Pool', 'Parking'],
    images: ['/property-placeholder.jpg'],
    description: 'A spacious 3 BHK apartment located in the heart of Andheri.',
  },
];
