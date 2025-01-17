import { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaList, FaBlog, FaPhoneAlt, FaInfoCircle, FaSun, FaMoon, FaSearch } from 'react-icons/fa';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const [darkMode, setDarkMode] = useState(false);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false);  // Close menu on mobile after selection
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className={`transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} sticky top-0 z-50 shadow-md`}>
      <div className="max-w-screen-xl flex justify-between items-center mx-auto p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/64/Google_logo_2015.svg"
            alt="Logo"
            className="h-8 transition-transform hover:scale-110"
          />
        </Link>

        {/* Search Bar */}
        {/* <div className="hidden sm:flex flex-1 items-center space-x-2 max-w-xl">
          <input
            type="text"
            className="w-screen py-2 px-4 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-600 dark:bg-gray-800 dark:text-white dark:border-gray-700"
            placeholder="Search"
          />
          <button className="bg-blue-600 text-white py-2 px-4 rounded-r-lg hover:bg-blue-700 transition-colors">
            <FaSearch />
          </button>
        </div> */}

        {/* Navbar Links */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-8">
            {[
              { link: '/', label: 'Home', icon: <FaHome /> },
              { link: '/listing', label: 'Listing', icon: <FaList /> },
              { link: '/blogs', label: 'Blogs', icon: <FaBlog /> },
              { link: '/contact', label: 'Contact', icon: <FaPhoneAlt /> },
              { link: '/about', label: 'About', icon: <FaInfoCircle /> },
            ].map(({ link, label, icon }, idx) => (
              <li key={idx}>
                <Link
                  href={link}
                  className={`relative   text-lg font-medium py-2 px-3 hover:text-blue-600 transition-colors ${activeLink === link ? 'text-blue-600' : ''}`}
                  onClick={() => handleLinkClick(link)}
                >
                  {icon}
                  {label}
                  {activeLink === link && <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-lg"></span>}
                </Link>
              </li>
            ))}
          </ul>

          {/* Dark Mode Toggle */}
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-800" />}
          </button>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden w-full bg-white dark:bg-gray-800">
          <ul className="flex flex-col p-4 space-y-4">
            {[
              { link: '/', label: 'Home', icon: <FaHome /> },
              { link: '/listing', label: 'Listing', icon: <FaList /> },
              { link: '/blogs', label: 'Blogs', icon: <FaBlog /> },
              { link: '/contact', label: 'Contact', icon: <FaPhoneAlt /> },
              { link: '/about', label: 'About', icon: <FaInfoCircle /> },
            ].map(({ link, label, icon }, idx) => (
              <li key={idx}>
                <Link
                  href={link}
                  className={`block text-lg py-2 px-3 font-medium text-gray-900 dark:text-white hover:text-blue-600 transition-colors ${activeLink === link ? 'text-blue-600' : ''}`}
                  onClick={() => handleLinkClick(link)}
                >
                  {icon}
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
