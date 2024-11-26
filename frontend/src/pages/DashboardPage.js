import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import MenuBar from '../components/UserMenuBar'; // Updated to include a collapsible menu

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch user details.');

        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        setError(err.message);
      }
    };

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchUserDetails();
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 font-lato">
      {/* Collapsible Hamburger Menu */}
      <MenuBar />

      {/* Dashboard Content */}
      <div className="flex flex-col items-center pt-8 px-4">
        <div className="w-full max-w-3xl mb-6 bg-white shadow-md rounded-lg p-6">
          {user && <UserProfile />}
        </div>
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mt-4">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
