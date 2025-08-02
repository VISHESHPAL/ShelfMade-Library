import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Dashboard = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-6">Admin Panel</h2>
        <ul className="space-y-3 text-gray-700 font-medium">
          <li>
            <Link
              to="/admin/add-book"
              className={`block px-4 py-2 rounded hover:bg-red-100 ${
                location.pathname === '/admin/add-book' ? 'bg-red-100' : ''
              }`}
            >
              📚 Add Book
            </Link>
          </li>
          <li>
            <Link
              to="/admin/all-users"
              className={`block px-4 py-2 rounded hover:bg-red-100 ${
                location.pathname === '/admin/all-users' ? 'bg-red-100' : ''
              }`}
            >
              👥 All Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/all-books"
              className={`block px-4 py-2 rounded hover:bg-red-100 ${
                location.pathname === '/admin/all-books' ? 'bg-red-100' : ''
              }`}
            >
              📖 All Books
            </Link>
          </li>
        </ul>
      </div>

      {/* Dynamic Content */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default Dashboard;
