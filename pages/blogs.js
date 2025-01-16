import Head from 'next/head';
import Link from 'next/link';

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>Our Blog - Mamta Realty</title>
        <meta name="description" content="Latest news, tips, and insights from the real estate world." />
      </Head>

      <section className="py-12 bg-gray-100">
        <div className="max-w-screen-lg mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8">Real Estate Blog</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Blog Post */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src="/blog-image1.jpg"
                alt="Blog Post 1"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2">How to Choose Your First Home</h3>
                <p className="text-gray-600 mb-4">
                  Buying your first home can be overwhelming. Here are a few tips to make the process easier.
                </p>
                <Link href="/blog-post1">
                  <button className="text-blue-600 hover:underline">Read More</button>
                </Link>
              </div>
            </div>

            {/* Blog Post */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src="/blog-image2.jpg"
                alt="Blog Post 2"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2">The Rise of Smart Homes</h3>
                <p className="text-gray-600 mb-4">
                  Smart homes are the future! Learn about the latest advancements in home automation.
                </p>
                <Link href="/blog-post2">
                  <button className="text-blue-600 hover:underline">Read More</button>
                </Link>
              </div>
            </div>

            {/* Blog Post */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src="/blog-image3.jpg"
                alt="Blog Post 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2">Top 5 Neighborhoods to Invest In</h3>
                <p className="text-gray-600 mb-4">
                  Wondering where to invest in real estate? Here are the top 5 neighborhoods that are thriving.
                </p>
                <Link href="/blog-post3">
                  <button className="text-blue-600 hover:underline">Read More</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
