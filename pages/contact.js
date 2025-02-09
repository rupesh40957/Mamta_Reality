import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import MetaTags from "../components/SEO/MetaTags";
import seoConfig from '../utils/seoConfig';

export default function ContactPage(props) {
  const { darkMode } = props;
  useEffect(() => {
    // Add dark mode class to <html> tag on component mount (if desired)
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
      document.documentElement.classList.add('dark');
    }  }, []);


  const themeClass = darkMode === 'class' ? 'dark' : '';

  return (
    <div className='text-black'>
 <MetaTags
        title=" Contact Us - Mamta Realty"
        description="Get in touch with Mamta Realty. Contact us for inquiries, property details, or to schedule a consultation."
        image="https://www.mamtarealty.com/img/mamtarealty_logo.png"
        url="https://www.mamtarealty.com/contact"
        keywords="real estate, property, buy home, contact us, property details, inquiries, schedule a consultation , Mamta Realty, Mumbai, Maharashtra, India, contact us, property details, inquiries, schedule a consultation , Mamta Realty, Mumbai, Maharashtra, India,"
        pageType="WebPage"
        breadcrumb={seoConfig.breadcrumb}

      />  


      {/* Hero Section */}
      <section className=" bg-blue-600 text-white py-12 dark:bg-blue-900 dark:text-gray-300">
        <div className="max-w-screen-lg mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p>We're here to help you with your real estate needs. Reach out to us anytime!</p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6 dark:bg-gray-900 dark:text-white">
            <h2 className="text-2xl font-bold mb-4">Our Contact Details</h2>
            <p className="mb-2  ">
              <strong className=''>Address:</strong> <strong className='text-red-400'>Mamta reality Trinity building Ground floor , Nr. Modern English School, Devi Chowk, dombivali West 421202</strong>
            </p>
            <p className="mb-2">
              <strong >Phone:</strong> <strong className=' text-red-400'> 99877 90471</strong>
            </p>
            <p className="mb-4">
              <strong>Email:</strong> <strong className='text-red-400'> contact@mamtarealty.com</strong>
            </p>
            <p className=''>Office Hours:<strong className='text-red-400'> Monday -  Sanday , 10 AM - 7 PM</strong></p>
          </div>

          {/* Google Map Embed */}
          <div className="rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d293.8253394947141!2d73.08265105670941!3d19.219448247846792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1737444218062!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: '0' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
