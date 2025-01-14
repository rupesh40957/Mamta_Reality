import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const AdminListing = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: '3 BHK Apartment',
      location: 'Andheri, Mumbai',
      price: '₹1.25 Crore',
      size: '1200 Sq Ft',
      baths: '2 Baths',
    },
    {
      id: 2,
      title: '2 BHK Apartment',
      location: 'Bandra, Mumbai',
      price: '₹90 Lakh',
      size: '950 Sq Ft',
      baths: '2 Baths',
    },
    {
      id: 3,
      title: '4 BHK House',
      location: 'Lower Parel, Mumbai',
      price: '₹2.5 Crore',
      size: '1800 Sq Ft',
      baths: '3 Baths',
    },
  ]);

  const handleDelete = (id) => {
    const newProperties = properties.filter(property => property.id !== id);
    setProperties(newProperties);
  };

  const handleEdit = (id) => {
    alert(`Edit functionality for property with ID: ${id}`);
    // Here you can implement the logic for editing a property, such as showing a form or navigating to an edit page.
  };

  return (
    <>
      <Head>
        <title>Admin - Property Listings</title>
        <meta name="description" content="Manage property listings for sale and rent." />
      </Head>

      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-blue-800 text-white p-4">
          <h2 className="text-2xl font-semibold mb-8">Admin Panel</h2>
          <ul>
            <li>
              <Link href="/admin/dashboard">
                <a className="w-full text-left px-4 py-2 mb-4 bg-blue-700 hover:bg-blue-600 rounded-lg">Dashboard</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/listings">
                <a className="w-full text-left px-4 py-2 mb-4 bg-blue-700 hover:bg-blue-600 rounded-lg">Manage Listings</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/settings">
                <a className="w-full text-left px-4 py-2 mb-4 bg-blue-700 hover:bg-blue-600 rounded-lg">Settings</a>
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-semibold mb-6">Property Listings</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(property => (
              <div
                key={property.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold">{property.title}</h3>
                <p className="text-gray-500 mt-1">Location: {property.location}</p>
                <p className="text-blue-600 mt-2 font-bold">{property.price}</p>
                <p className="text-sm text-gray-500 mt-1">{property.size} | {property.baths}</p>
                <div className="mt-4 flex justify-between">
                  <button
                    className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
                    onClick={() => handleEdit(property.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    onClick={() => handleDelete(property.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminListing;
