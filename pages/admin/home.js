import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import  Properties from '@/pages/admin/properties'

export default function AdminPanel() {
  const [selectedSection, setSelectedSection] = useState("properties");

  const handleMenuClick = (section) => {
    setSelectedSection(section);
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard - Mamta Realty</title>
        <meta
          name="description"
          content="Admin dashboard to manage properties, users, and site settings."
        />
      </Head>

      {/* Admin Page Layout */}
      <div className="flex min-h-screen">
        {/* Sidebar (Static) */}
        <div className="bg-gray-800 text-white w-64 p-6">
          <h2 className="text-xl font-semibold text-center mb-6">Admin Panel</h2>
          <ul>
            <li>
              <a
                onClick={() => handleMenuClick("properties")}
                className="block py-2 px-4 rounded hover:bg-gray-700 cursor-pointer"
              >
                Properties
              </a>
            </li>
            <li>
              <a
                onClick={() => handleMenuClick("users")}
                className="block py-2 px-4 rounded hover:bg-gray-700 cursor-pointer"
              >
                Users
              </a>
            </li>
            <li>
              <a
                onClick={() => handleMenuClick("reviews")}
                className="block py-2 px-4 rounded hover:bg-gray-700 cursor-pointer"
              >
                Reviews
              </a>
            </li>
            <li>
              <a
                onClick={() => handleMenuClick("settings")}
                className="block py-2 px-4 rounded hover:bg-gray-700 cursor-pointer"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                onClick={() => handleMenuClick("logout")}
                className="block py-2 px-4 rounded hover:bg-gray-700 cursor-pointer"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-100">
          {/* Top Navbar */}
          <div className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="font-semibold text-lg">Admin Dashboard</div>
            <div>
              <button
                className="py-1 px-3 bg-blue-600 text-white rounded-lg"
                onClick={() => alert("Logging out...")}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Dynamic Content Section */}
          <div className="p-6">
            {/* Conditionally render content based on the selected menu */}
            {selectedSection === "properties" && (
              <>
                <Properties />
              </>
            )}

            {selectedSection === "users" && (
              <>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Manage Users</h2>
                <div>
                  <p>Here you can manage users who are registered on your platform.</p>
                  {/* Add table or form for user management */}
                </div>
              </>
            )}

            {selectedSection === "reviews" && (
              <>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Manage Reviews
                </h2>
                <div>
                  <p>Here you can manage property reviews submitted by users.</p>
                  {/* Add table or form for managing reviews */}
                </div>
              </>
            )}

            {selectedSection === "settings" && (
              <>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Settings</h2>
                <div>
                  <p>Manage the site settings and configurations.</p>
                  {/* Add settings form or options */}
                </div>
              </>
            )}

            {selectedSection === "logout" && (
              <>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Logout</h2>
                <div>
                  <p>Click the button below to logout from the admin panel.</p>
                  <button
                    onClick={() => alert("Logging out...")}
                    className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
