import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function UserInterface({ darkMode }) {
  const [posts, setPosts] = useState([]); // Initialize as an empty array
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch posts from an API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch('/api/user/get-blogs'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data.blogs); // Set fetched posts
      } catch (err) {
        setError('Failed to fetch posts. Please try again later.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search term
  const filteredPosts = posts.filter((post) => {
    const search = searchTerm.trim().toLowerCase();
    const title = post.title.toLowerCase();
    const description = post.description.toLowerCase();
    return title.includes(search) || description.includes(search);  
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-8 transition-colors duration-500">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Explore Blogs</h1>
      </header>

      {/* Search Bar */}
      <div className="relative max-w-lg mx-auto mb-8">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300"
        />
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 dark:text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 18l6-6m0 0l-6-6m6 6H4" />
          </svg>
        </div>
        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Posts Section */}
      {loading ? (
        <p className="text-center">Loading posts...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-xl">{post.title}</h3>
                  <p className="mt-2">
                    {post.description.length > 100
                      ? `${post.description.substring(0, 100)}...`
                      : post.description}
                  </p>
                  <Link
                    href={{
                      pathname: `/blogpost/${post.id}`,
                      query: { object: JSON.stringify(post) },
                    }}
                    className="text-blue-500 dark:text-blue-300 mt-4 inline-block"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* No Posts Found */}
          {filteredPosts.length === 0 && <p className="text-center mt-10">No posts found.</p>}
        </>
      )}
    </div>
  );
}
