import Link from 'next/link';

export default function Footer(props) {
  return (
    <footer className="bg-white dark:bg-gray-800 ">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
    {props.companyName}
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/listing" className="hover:underline">
                Listing
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/blogs" className="hover:underline">
                Blogs
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/Contact" className="hover:underline">
                Contact
                </Link>
              </li>
              <li>
              <Link href="/about" className="hover:underline">
                About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Help Center
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link href="#" className="hover:underline">
                  Discord Server
                </Link>
              </li>
              <li className="mb-4">
                <Link href="#" className="hover:underline">
                  Twitter
                </Link>
              </li>
              <li className="mb-4">
                <Link href="#" className="hover:underline">
                  Facebook
                </Link>
              </li>
              <li className="mb-4">
                <Link href="#" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Legal
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link href="#" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-4">
                <Link href="#" className="hover:underline">
                  Licensing
                </Link>
              </li>
              <li className="mb-4">
                <Link href="#" className="hover:underline">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Download
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link href="#" className="hover:underline">
                  iOS
                </Link>
              </li>
              <li className="mb-4">
                <Link href="#" className="hover:underline">
                  Android
                </Link>
              </li>
              <li className="mb-4">
                <Link href="#" className="hover:underline">
                  Windows
                </Link>
              </li>
              <li className="mb-4">
                <Link href="#" className="hover:underline">
                  MacOS
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
            ©{new Date().getFullYear()} <Link href="/">{props.companyName}</Link>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
            {/* Social Media Icons */}
            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              aria-label="Facebook"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            {/* Add more social icons as necessary */}
          </div>
        </div>
      </div>
    </footer>
  );
}
