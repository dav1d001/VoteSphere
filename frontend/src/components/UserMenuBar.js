import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

const UserMenuBar = ({ user }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          to="/dashboard"
          className="flex items-center text-white text-2xl font-bold hover:text-blue-400 transition"
        >
          <img src="/logo.png" alt="VoteSphere Logo" className="h-10 w-10 mr-3" />
          VoteSphere
        </Link>

        {/* Hamburger Menu */}
        <button
          onClick={toggleDrawer}
          className="text-white hover:text-blue-400 focus:outline-none"
        >
          <FiMenu className="w-8 h-8" />
        </button>
      </div>

      {/* Drawer Menu (Hamburger Navigation) */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gray-900 text-white transform ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 z-20`}
      >
        <div className="flex items-center justify-between px-4 py-4 bg-gray-800">
          <h2 className="text-xl font-bold">Navigation</h2>
          <button
            onClick={toggleDrawer}
            className="text-white hover:text-blue-400 focus:outline-none"
          >
            <IoMdClose className="w-6 h-6" />
          </button>
        </div>
        <div className="mt-6 space-y-6 px-4">
          <Link
            to="/dashboard"
            className="block text-lg px-4 py-2 hover:bg-gray-700 rounded transition"
            onClick={toggleDrawer}
          >
            Dashboard
          </Link>
          {user?.role === 'admin' && (
            <Link
              to="/create-election"
              className="block text-lg px-4 py-2 hover:bg-gray-700 rounded transition"
              onClick={toggleDrawer}
            >
              Create Election
            </Link>
          )}
          <Link
            to="/cast-vote"
            className="block text-lg px-4 py-2 hover:bg-gray-700 rounded transition"
            onClick={toggleDrawer}
          >
            Cast Vote
          </Link>
          <Link
            to="/results"
            className="block text-lg px-4 py-2 hover:bg-gray-700 rounded transition"
            onClick={toggleDrawer}
          >
            Results
          </Link>
          <Link
            to="/profile-settings"
            className="block text-lg px-4 py-2 hover:bg-gray-700 rounded transition"
            onClick={toggleDrawer}
          >
            Profile Settings
          </Link>
          <button
            onClick={() => {
              handleLogout();
              toggleDrawer();
            }}
            className="block w-full text-left px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Backdrop for Drawer */}
      {isDrawerOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
        ></div>
      )}
    </nav>
  );
};

export default UserMenuBar;
