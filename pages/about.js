import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

export default function AboutPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      const isDark = savedTheme === 'dark';
      setDarkMode(isDark);
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    const theme = newMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', newMode);
  }, [darkMode]);

  return (
    <>
      <Head>
        <title>About Us - Mamta Realty</title>
        <meta
          name="description"
          content="Learn more about Mamta Realty, a trusted real estate company providing exceptional services in property sales and development in Dombivli and Kalyan."
        />
      </Head>

   

      {/* Hero Section with Background Image */}
      <section
        className="bg-cover bg-center py-24 text-white"
        style={{ backgroundImage: "url('/about-hero.jpg')" }}
      >
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-4">About Mamta Realty</h2>
          <p className="text-lg">Your trusted partner in real estate for over a decade in Dombivli and Kalyan.</p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Who We Are</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <Image
                src="/company-image.jpg"
                alt="Mamta Realty Team"
                width={300}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div className="w-full md:w-2/3 text-left">
              <p className="text-xl text-gray-700 dark:text-gray-300">
                Mamta Realty is a trusted name in real estate, dedicated to providing seamless property transactions in Dombivli and Kalyan. We specialize in both residential and commercial properties, offering mandate-based sales to ensure secure, transparent deals for buyers and sellers alike. Our expert team guides clients every step of the way, ensuring a hassle-free experience and the best deals in the market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision and Mission Section */}
      <section className="py-12 bg-blue-600 text-white dark:bg-blue-800">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Our Vision & Mission</h2>
          <p className="text-xl">
            At Mamta Realty, our vision is to be the most trusted real estate partner in Dombivli and Kalyan, ensuring seamless and transparent property transactions. Our mission is to empower buyers and sellers with expert guidance, ethical dealings, and end-to-end support. We aim to make real estate transactions easy, honest, and profitable, driving growth in the local real estate market.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6 dark:bg-gray-700">
              <h3 className="font-semibold text-lg text-blue-600 dark:text-blue-400">Integrity</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                We believe in honesty, transparency, and ethical real estate dealings, ensuring trust in every transaction.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 dark:bg-gray-700">
              <h3 className="font-semibold text-lg text-blue-600 dark:text-blue-400">Customer Centricity</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Our clients come first; we focus on delivering personalized solutions and exceptional service.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 dark:bg-gray-700">
              <h3 className="font-semibold text-lg text-blue-600 dark:text-blue-400">Innovation</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                We embrace new ideas and modern technology to enhance the property buying and selling experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">Our Journey</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3 dark:bg-gray-700">
              <h3 className="font-semibold text-xl">2010 - Founding</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Mamta Realty was founded with a vision to provide exceptional real estate services in Dombivli and Kalyan, focusing on trust and transparency.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3 dark:bg-gray-700">
              <h3 className="font-semibold text-xl">2015 - Major Expansion</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                We expanded our portfolio, managing larger residential and commercial projects while strengthening client relationships.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3 dark:bg-gray-700">
              <h3 className="font-semibold text-xl">2020 - A Leader in Real Estate</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Mamta Realty became a leading name in real estate, known for mandate-based sales, expert guidance, and customer-centric services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6 dark:bg-gray-700">
              <Image
                src="/team-member1.jpg"
                alt="Ranjiv Singh - CEO & Founder"
                width={200}
                height={200}
                className="rounded-full mx-auto"
              />
              <h3 className="font-semibold text-lg mt-4">Ranjiv Singh</h3>
              <p className="text-gray-600 dark:text-gray-300">CEO & Founder</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 dark:bg-gray-700">
              <Image
                src="/team-member2.jpg"
                alt="Soniya Javeri - Head of Sales"
                width={200}
                height={200}
                className="rounded-full mx-auto"
              />
              <h3 className="font-semibold text-lg mt-4">Soniya Javeri</h3>
              <p className="text-gray-600 dark:text-gray-300">Head of Sales</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 dark:bg-gray-700">
              <Image
                src="/team-member3.jpg"
                alt="Ankit Singh & Rupesh Prasad - Lead Developers"
                width={200}
                height={200}
                className="rounded-full mx-auto"
              />
              <h3 className="font-semibold text-lg mt-4">Ankit Singh & Rupesh Prasad</h3>
              <p className="text-gray-600 dark:text-gray-300">Lead Developers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-screen-lg mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800 dark:text-white">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Office Location</h3>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  Mamta Realty, Trinity Building, Ground Floor,<br/>Nr. Modern English School, Devi Chowk,<br/>Dombivli West, 421202
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Contact Details</h3>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <a href="tel:9987811471" className="hover:text-blue-600 transition-colors">9987811471</a>
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <a href="mailto:contact@mamtarealty.com" className="hover:text-blue-600 transition-colors">contact@mamtarealty.com</a>
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Monday - Sunday, 10 AM - 7 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
