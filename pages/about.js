import Head from 'next/head';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us - Mamta Realty</title>
        <meta
          name="description"
          content="Learn more about Mamta Realty, a trusted real estate company providing exceptional services in property sales and development."
        />
      </Head>

      {/* Hero Section with Background Image */}
      <section
        className="bg-cover bg-center py-24 text-white"
        style={{ backgroundImage: "url('/about-hero.jpg')" }}
      >
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-4">About Mamta Realty</h2>
          <p className="text-lg">Your trusted partner in real estate for over a decade.</p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Who We Are</h2>
          <div className="flex justify-center items-center gap-8">
            <div className="w-1/3">
              <Image
                src="/company-image.jpg"
                alt="Mamta Realty Team"
                width={300}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div className="w-2/3 text-left">
              <p className="text-xl text-gray-700">
                Mamta Realty is a leading real estate agency that specializes in property sales and development. 
                With years of experience in the market, we have earned a reputation for providing exceptional 
                service and high-quality properties. Our team is dedicated to helping clients find their dream homes 
                and make informed real estate decisions. Whether you're buying, selling, or renting, Mamta Realty is here 
                to guide you every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision and Mission Section */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Our Vision & Mission</h2>
          <p className="text-xl">
            At Mamta Realty, our vision is to become the most trusted and innovative real estate company, bringing 
            quality homes to every corner of the market. We are driven by our mission to offer unparalleled services 
            in property sales, rentals, and development, ensuring satisfaction and long-term relationships with our clients.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-12">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-600">Integrity</h3>
              <p className="mt-2 text-gray-700">
                We value honesty and transparency in all our dealings, ensuring trust and credibility with our clients.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-600">Customer Centricity</h3>
              <p className="mt-2 text-gray-700">
                Our customers' needs and satisfaction are our top priority, and we always go the extra mile to meet them.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-600">Innovation</h3>
              <p className="mt-2 text-gray-700">
                We embrace technology and new ideas to stay ahead in the real estate market and offer the best services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Our Journey</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {/* Timeline Item */}
            <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3">
              <h3 className="font-semibold text-xl">2010 - Founding</h3>
              <p className="mt-2 text-gray-700">
                Mamta Realty was founded with a commitment to provide exceptional real estate services and value to clients.
              </p>
            </div>
            {/* Timeline Item */}
            <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3">
              <h3 className="font-semibold text-xl">2015 - Major Expansion</h3>
              <p className="mt-2 text-gray-700">
                We expanded our operations, handling more projects and diversifying into residential and commercial properties.
              </p>
            </div>
            {/* Timeline Item */}
            <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3">
              <h3 className="font-semibold text-xl">2020 - A Leader in Real Estate</h3>
              <p className="mt-2 text-gray-700">
                Mamta Realty became one of the leading names in real estate, known for innovation and client satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Team Member */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <Image
                src="/team-member1.jpg"
                alt="Team Member"
                width={200}
                height={200}
                className="rounded-full mx-auto"
              />
              <h3 className="font-semibold text-lg mt-4">John Doe</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            {/* Team Member */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <Image
                src="/team-member2.jpg"
                alt="Team Member"
                width={200}
                height={200}
                className="rounded-full mx-auto"
              />
              <h3 className="font-semibold text-lg mt-4">Jane Smith</h3>
              <p className="text-gray-600">Head of Sales</p>
            </div>
            {/* Team Member */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <Image
                src="/team-member3.jpg"
                alt="Team Member"
                width={200}
                height={200}
                className="rounded-full mx-auto"
              />
              <h3 className="font-semibold text-lg mt-4">Mark Johnson</h3>
              <p className="text-gray-600">Lead Developer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-screen-lg mx-auto text-center">
          <p>&copy; 2023 Mamta Realty. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}
