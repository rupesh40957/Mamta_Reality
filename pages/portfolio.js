import Head from 'next/head';
import Link from 'next/link';

export default function PortfolioPage() {
  return (
    <>
      <Head>
        <title>Portfolio - Your Name</title>
        <meta name="description" content="Showcase of projects, skills, and testimonials. Learn more about my work." />
      </Head>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
          <p className="text-lg mb-6">Explore my work, skills, and testimonials.</p>
          <Link href="#projects">
            <button className="bg-white text-blue-600 py-3 px-6 rounded-lg shadow-md hover:bg-gray-200">
              View Projects
            </button>
          </Link>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-12">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">About Me</h2>
          <p className="text-gray-700 max-w-screen-md mx-auto">
            Hi, I'm [Your Name], a [Your Profession] with expertise in [Your Skills]. I specialize in delivering high-quality 
            projects that drive results. Passionate about creating innovative solutions and achieving client satisfaction.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 bg-gray-100">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">My Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Project Card */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src="/project-image1.jpg"
                alt="Project 1"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">Project Title 1</h3>
                <p className="text-gray-600 mt-2">Brief description of the project.</p>
                <Link href="/project-details">
                  <button className="text-blue-600 hover:underline mt-4 block">View Details</button>
                </Link>
              </div>
            </div>
            {/* Repeat for more projects */}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">What Clients Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Testimonial */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <p className="text-gray-600">"This is the best professional I've worked with. Amazing results and great communication!"</p>
              <p className="mt-4 font-semibold">- Client Name</p>
            </div>
            {/* Repeat for more testimonials */}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 bg-blue-600 text-white">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <p className="mb-4">Have a project in mind or want to connect? Reach out below!</p>
          <form className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 w-full mb-4 rounded-lg border-none"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 w-full mb-4 rounded-lg border-none"
              required
            />
            <textarea
              placeholder="Your Message"
              className="p-3 w-full mb-4 rounded-lg border-none"
              rows="4"
              required
            />
            <button
              type="submit"
              className="bg-white text-blue-600 py-2 px-6 rounded-full hover:bg-gray-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
