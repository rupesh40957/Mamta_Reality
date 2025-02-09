import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import MetaTags from "../components/SEO/metaTags";
import { useRouter } from 'next/router';
import RanjivImage from "../public/img/ranjiv.jpg"
import SoniyaImage from '../public/img/soniya.jpg';
import AnkitImage from '../public/img/ankit.jpg';



export default function AboutPage(props) {
const darkMode = props.darkMode;


  const themeClass = darkMode === 'class' ? 'dark' : '';

  return (
    <>
      <MetaTags
        title="About Us - Mamta Realty"
        description="Mamta Realty is the leading real estate agency..."
        image="https://www.mamtarealty.com/img/mamtarealty_logo.png"
        url="https://www.mamtarealty.com/about"
        keywords="real estate, property, buy home, Mamta Realty, Mumbai, Maharashtra, India, real estate, property, buy home, Mamta Realty, Mumbai, Maharashtra, India,"
        pageType="WebPage"
        breadcrumb={[{ name: "Home", url: "/" }, { name: "About", url: "/about" }]}
      />

   

      {/* Hero Section with Background Image */}
      {/* <section
        className="bg-cover bg-center py-24 bg-blue-800 text-white"
        style={{ backgroundImage: `url(${props.companyLogo})` }}
      >
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-4">About Mamta Realty</h2>
          <p className="text-lg">Your trusted partner in real estate for over a decade in Dombivli and Kalyan.</p>
        </div>
      </section> */}
      {/* About Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-screen-lg mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">Who We Are</h2>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/3">
              <div className="relative group">
                <Image
                  src="/mamtarealty_logo.png"
                  alt="Mamta Realty Team"
                  width={400}
                  height={400}
                  className="rounded-xl shadow-2xl hover:scale-105 transition duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <div className="space-y-6">
                <p className="text-2xl font-light text-gray-700 dark:text-gray-300 leading-relaxed">
                  Mamta Realty stands as a beacon of trust and excellence in the real estate landscape of Dombivli and Kalyan. With years of dedicated service, we've built our reputation on the pillars of integrity, expertise, and client satisfaction.
                </p>
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  We specialize in both residential and commercial properties, offering comprehensive mandate-based sales that ensure secure and transparent deals. Our expert team provides personalized guidance through every step of your property journey.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
                    <h3 className="font-bold text-blue-600 dark:text-blue-400">Residential</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Expert home solutions</p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
                    <h3 className="font-bold text-blue-600 dark:text-blue-400">Commercial</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Business spaces</p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
                    <h3 className="font-bold text-blue-600 dark:text-blue-400">Consulting</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Expert guidance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision and Mission Section */}
      <section className="py-16 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-screen-lg mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
            Our Vision & Mission
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8 transform hover:scale-105 transition duration-300">
              <div className="flex items-center mb-6">
                <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full shadow-inner">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold ml-6 text-gray-800 dark:text-white bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Our Vision
                </h3>
              </div>
              <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                To be the most trusted real estate partner in Dombivli and Kalyan, ensuring seamless and transparent property transactions.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8 transform hover:scale-105 transition duration-300">
              <div className="flex items-center mb-6">
                <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full shadow-inner">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold ml-6 text-gray-800 dark:text-white bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                  Our Mission
                </h3>
              </div>
              <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                To empower buyers and sellers with expert guidance, ethical dealings, and end-to-end support. Making real estate transactions easy, honest, and profitable while driving growth in the local market.
              </p>
            </div>
          </div>
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
              <h3 className="font-semibold text-xl text-blue-600 dark:text-blue-400">2010 - Founding</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Mamta Realty was founded with a vision to provide exceptional real estate services in Dombivli and Kalyan, focusing on trust and transparency.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3 dark:bg-gray-700">
              <h3 className="font-semibold text-xl text-blue-600 dark:text-blue-400">2015 - Major Expansion</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                We expanded our portfolio, managing larger residential and commercial projects while strengthening client relationships.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3 dark:bg-gray-700">
              <h3 className="font-semibold text-xl text-blue-600 dark:text-blue-400">2020 - A Leader in Real Estate</h3>
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
                src={RanjivImage}
                alt="Ranjiv Singh - CEO & Founder"
                width={200}
                height={200}
                className="rounded-full mx-auto"
              />
              <h3 className="font-semibold text-lg mt-4 text-blue-600 dark:text-blue-400">Ranjiv Singh</h3>
              <p className="text-gray-600 dark:text-gray-300">CEO & Founder</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 dark:bg-gray-700">
              <Image
                src={SoniyaImage}
                alt="Soniya Javeri - Head of Sales"
                width={200}
                height={200}
                className="rounded-full mx-auto"

              />
              <h3 className="font-semibold text-lg mt-4 text-blue-600 dark:text-blue-400">Soniya Javeri</h3>
              <p className="text-gray-600 dark:text-gray-300">Head of Sales</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 dark:bg-gray-700">
              <Image
                src={AnkitImage}
                alt="Ankit Singh - Lead Developers"
                width={200}
                height={200}
                className="rounded-full mx-auto"

              />
              <h3 className="font-semibold text-lg mt-4 text-blue-600 dark:text-blue-400">Ankit Singh </h3>
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
                  <a href="mailto:realtymamta@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">realtymamta@gmail.com</a>
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
