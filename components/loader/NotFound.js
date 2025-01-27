import Link from 'next/link';

const NotFound = ({ mode }) => {
  return (
    <div
      className={`flex items-center justify-center h-screen ${
        mode === 'light' ? 'bg-gray-100' : 'bg-gray-900'
      }`}
    >
      <div
        className={`${
          mode === 'light' ? 'bg-white text-gray-800' : 'bg-gray-800 text-gray-200'
        } p-10 rounded-2xl shadow-lg text-center transition-all duration-300`}
      >
        <h1 className="text-6xl font-bold mb-4 animate-pulse">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="mb-8 text-lg">
          Oops! The page you're looking for doesn't seem to exist.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/" className="px-6 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:ring focus:ring-blue-300 transition-all">
              Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50 focus:ring focus:ring-blue-200 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
