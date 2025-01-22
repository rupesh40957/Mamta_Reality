import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

function BlogPost() {
  const router = useRouter();
  const { object } = router.query; // Extracting the post data from query params
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (object) {
      try {
        const parsedData = JSON.parse(object);
        setPostData(parsedData);
      } catch (err) {
        setError("Failed to load post data.");
      } finally {
        setLoading(false);
      }
    }
  }, [object]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (typeof window !== 'undefined') {
      const currentMode = document.documentElement.classList.contains('dark');
      if (currentMode) {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-gray-500 text-xl">Loading post...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (!postData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-gray-500 text-xl">No post found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-4xl mx-auto p-8">
        {/* Post Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">{postData.title}</h1>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {new Date(postData.date).toLocaleDateString()}
          </p>
        </div>

        {/* Post Image */}
        {postData.image && (
          <div className="mb-6">
            <Image
              src={postData.image}
              alt={postData.title}
              width={800} // Width for optimization
              height={400} // Height for optimization
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Post Content */}
        <div className="prose lg:prose-xl text-gray-700 dark:text-gray-300">
          <div
            dangerouslySetInnerHTML={{
              __html: postData.description,
            }}
          />
        </div>

        {/* Go Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/blogs')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
