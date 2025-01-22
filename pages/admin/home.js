import { useState } from "react";
import Blogs from '@/pages/admin/blogs.js'
import Leads from '@/pages/admin/leads'
import Listing from '@/pages/admin/listing'
import { FaChartLine ,FaBars, FaTimes, FaUsers, FaBuilding, FaClipboardList } from "react-icons/fa";

// Define the menuItems array inside the component or import if it's in a separate file
const menuItems = [
  // { name: "Dashboard", path: "dashboard" },
  { name: "Listing", path: "listing" },
  { name: "Blogs", path: "blogs" },
  // { name: "Leads", path: "leads" },
  { name: "Logout", path: "logout" },
];

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function to render dynamic content based on selected menu
  const renderContent = () => {
    switch (selectedMenu) {
      case "dashboard":
      return   (
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Dashboard Header */}
          <h2 className="text-3xl font-semibold mb-6">Dashboard Overview</h2>

          {/* Key Metrics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Total Users</h3>
                <p className="text-2xl">1,230</p>
              </div>
              <FaUsers className="text-4xl" />
            </div>
            <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Total Properties</h3>
                <p className="text-2xl">450</p>
              </div>
              <FaBuilding className="text-4xl" />
            </div>
            <div className="bg-yellow-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Total Sales</h3>
                <p className="text-2xl">$1,500,000</p>
              </div>
              <FaChartLine className="text-4xl" />
            </div>
            <div className="bg-purple-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Pending Tasks</h3>
                <p className="text-2xl">12</p>
              </div>
              <FaClipboardList className="text-4xl" />
            </div>
          </div>

          {/* Recent Activity Feed Section */}
          <h3 className="text-2xl font-semibold mb-4">Recent Activity</h3>
          <div className="bg-white shadow-md rounded-lg p-6">
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="flex-shrink-0">
                  <FaUsers className="text-blue-600 text-2xl" />
                </div>
                <div className="ml-4">
                  <p className="font-semibold">New user registered</p>
                  <p className="text-sm text-gray-600">John Doe signed up for an account.</p>
                </div>
              </li>
              <li className="flex items-center">
                <div className="flex-shrink-0">
                  <FaBuilding className="text-green-600 text-2xl" />
                </div>
                <div className="ml-4">
                  <p className="font-semibold">New property added</p>
                  <p className="text-sm text-gray-600">A 3-bedroom apartment was listed.</p>
                </div>
              </li>
              <li className="flex items-center">
                <div className="flex-shrink-0">
                  <FaChartLine className="text-yellow-600 text-2xl" />
                </div>
                <div className="ml-4">
                  <p className="font-semibold">Sale completed</p>
                  <p className="text-sm text-gray-600">A property was sold for $450,000.</p>
                </div>
              </li>
              <li className="flex items-center">
                <div className="flex-shrink-0">
                  <FaClipboardList className="text-purple-600 text-2xl" />
                </div>
                <div className="ml-4">
                  <p className="font-semibold">New task assigned</p>
                  <p className="text-sm text-gray-600">Complete the review for the new listings.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Performance Chart Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Performance Chart</h3>
            <div className="bg-white shadow-md rounded-lg p-6">
              {/* You can integrate chart libraries like Chart.js or Recharts here */}
              <div className="bg-gray-300 h-48 rounded-lg">Chart Placeholder</div>
              <p className="text-center mt-4 text-sm text-gray-500">Performance over the last 30 days</p>
            </div>
          </div>
        </div>
      )
        case "listing":
        return <Listing />
      case "blogs":
        return <Blogs />
      case "leads":
        return <Leads />
        case "logout":
          return <div className="bg-white shadow-md rounded-lg p-6"> Logout Content</div>;
      default:
        return <div className="bg-white shadow-md rounded-lg p-6">Please Menu Correct Choice  </div>;
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
         {/* The Navbar and Footer bar is Hide   */}
         <style jsx global>{`
           nav {
            display: none;
           }
            footer {
            display: none;
           }
   `}</style>
      {/* Sidebar */}
      <div className={`w-64 bg-blue-900 text-white p-4 ${sidebarOpen ? "block" : "hidden"} md:block`}>
        <h2 className="text-2xl font-semibold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                // href={`${item.path}`}
                href="#"
                onClick={() => setSelectedMenu(item.path)}
                className={`hover:bg-blue-700 p-2 rounded block ${selectedMenu === item.path ? "bg-blue-700" : ""}`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Hamburger Menu for Small Screens */}
      <div className="md:hidden p-4" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <FaTimes className="text-white" /> : <FaBars className="text-white" />}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="mb-6 hidden md:block">
          <h1 className="text-3xl font-semibold text-blue-500">Admin Dashboard</h1>
        </header>

        {/* Render Dynamic Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Home;
