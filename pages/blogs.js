import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function UserInterface({darkMode}) {
  
  const [posts, setPosts] = useState([
    { id: 1, title: 'Post 1', description: 'This is post 1 description', image: '/path/to/image1.jpg' },
    { id: 2, title: 'Post 2', description: 'This is post 2 description', image: '/path/to/image2.jpg' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');






  const filteredPosts = posts.filter((post) => {
    const search = searchTerm.trim().toLowerCase(); // Trim and convert to lowercase
    const title = post.title.toLowerCase();
    
    // Check for exact or partial matches
    return title.includes(search);
  });
  

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-8 transition-colors duration-500">
      {/* Header with Dark Mode Toggle */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold ">Explore Blogs</h1>
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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 18l6-6m0 0l-6-6m6 6H4"
      />
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
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  )}
</div>

      {/* Posts Grid */}
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
      {filteredPosts.length === 0 && (
        <p className="text-center mt-10">No posts found.</p>
      )}
    </div>
  );
}
