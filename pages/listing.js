import Head from 'next/head';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import default Swiper styles
import 'swiper/css/navigation'; // If you're using navigation
import 'swiper/css/pagination'; // If you're using pagination

const properties = [
  {
    id: 1,
    name: 'Luxury Beachfront Apartment',
    location: 'Miami, Florida',
    price: '$3.5 Million',
    size: '2000 Sq Ft',
    baths: 3,
    images: [
      'https://images.unsplash.com/photo-1579780437367-9b1c83be4930', // Image 1 from Unsplash
      'https://images.unsplash.com/photo-1586281380402-fcf67d1fdf98', // Image 2 from Unsplash
      'https://images.unsplash.com/photo-1569605813-251fae35cb5f', // Image 3 from Unsplash
    ],
    videos: [
      'https://www.w3schools.com/html/mov_bbb.mp4', // Video from W3Schools
    ],
    description: 'A luxurious beachfront apartment with amazing views of the ocean.',
  },
];

export default function PropertyListingPage() {
  return (
    <>
      <Head>
        <title>Property Listings - Demo</title>
        <meta name="description" content="Demo property listings" />
      </Head>

      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 mb-6">
        <div className="max-w-screen-lg mx-auto text-center">
          <h1 className="text-3xl font-bold">Property Listings</h1>
          <p className="mt-2 text-lg">Browse through demo property listings</p>
        </div>
      </header>

      {/* Property Listing Section */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-screen-lg mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
              >
                {/* Swipeable Image and Video Gallery */}
                <div className="relative w-full h-48 bg-gray-200 rounded-t-lg">
                  <Swiper
                    spaceBetween={10} // Space between slides
                    slidesPerView={1} // One slide at a time
                    loop={true} // Enable loop to cycle through images/videos
                    navigation // Enable navigation arrows
                    pagination={{ clickable: true }} // Enable pagination dots
                    autoplay={{ delay: 3000 }} // Auto-swipe every 3 seconds
                    className="rounded-t-lg"
                  >
                    {/* Combine images and videos into the same Swiper */}
                    {[...property.images, ...property.videos].map((media, index) => (
                      <SwiperSlide key={index}>
                        {/* Check if the media is an image or video */}
                        {media.endsWith('.mp4') || media.endsWith('.mov') ? (
                          <video
                            src={media}
                            controls
                            className="w-full h-full object-cover rounded-t-lg"
                          ></video>
                        ) : (
                          <img
                            src={media}
                            alt={`Property Media ${index + 1}`}
                            className="w-full h-full object-cover rounded-t-lg"
                          />
                        )}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Property Details */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{property.name}</h3>
                  <p className="text-gray-500 mt-1">Location: {property.location}</p>
                  <p className="text-blue-600 mt-2 font-bold">{property.price}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {property.size} | {property.baths} Baths
                  </p>
                  <p className="text-gray-700 mt-2 text-sm">{property.description}</p>

                  <div className="mt-4">
                    <button
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                      onClick={() => alert(`View details for ${property.name}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
