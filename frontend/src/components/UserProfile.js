import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserInfo();
  }, []);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!user) {
    return <p className="text-center text-gray-500">Loading user info...</p>;
  }

  const electionsParticipated = user.stats?.electionsParticipated || 0;
  const electionsCreated = user.stats?.electionsCreated || 0;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-6">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Welcome to VoteSphere</h2>
        <div className="mb-4">
          <h3 className="text-2xl font-semibold text-gray-800">Welcome, {user.username}!</h3>
          <p className="text-gray-600">Role: <span className="font-medium text-indigo-600">{user.role}</span></p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600">Elections Participated: <span className="font-medium text-indigo-600">{electionsParticipated}</span></p>
          {user.role === 'admin' && (
            <p className="text-gray-600">Elections Created: <span className="font-medium text-indigo-600">{electionsCreated}</span></p>
          )}
        </div>
        <div className="mt-8 text-center">
          <a href="/logout" className="text-white bg-red-500 px-6 py-2 rounded-lg hover:bg-red-600 transition">Logout</a>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
