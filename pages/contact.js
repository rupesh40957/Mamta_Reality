import Head from 'next/head';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us - Mamta Realty</title>
        <meta
          name="description"
          content="Get in touch with Mamta Realty. Contact us for inquiries, property details, or to schedule a consultation."
        />
      </Head>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="max-w-screen-lg mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p>We're here to help you with your real estate needs. Reach out to us anytime!</p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Our Contact Details</h2>
            <p className="mb-2">
              <strong>Address:</strong> 123 Main Street, City, Country
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> +1 234 567 890
            </p>
            <p className="mb-4">
              <strong>Email:</strong> contact@mamtarealty.com
            </p>
            <p>Office Hours: Monday - Friday, 9 AM - 6 PM</p>
          </div>

          {/* Google Map Embed */}
          <div className="rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0194354118496!2d144.95373631580643!3d-37.81720994205652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577c5f35fcb1c0a!2sEnvato!5e0!3m2!1sen!2sus!4v1679063019003!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12">
        <div className="max-w-screen-lg mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">Send Us a Message</h2>
          <form className="bg-white shadow-md rounded-lg p-8 max-w-lg mx-auto space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Write your message"
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Optional Links Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Useful Links</h2>
          <div className="space-x-6">
            <Link href="/about">
              About Us
            </Link>
            <Link href="/services">
              Our Services
            </Link>
            <Link href="/properties">
              Properties
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
