import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GuestMenuBar from '../components/GuestMenuBar';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Save the token to localStorage
        navigate('/dashboard'); // Redirect to dashboard upon successful login
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <GuestMenuBar />

      {/* Main Section */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <div className="text-center mb-6">
            <img
              src="/logo.png"
              alt="VoteSphere Logo"
              className="h-14 mx-auto mb-3"
            />
            <h2 className="text-3xl font-extrabold text-gray-800">
              Login to VoteSphere
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
              />
            </div>
            {/* Password Input */}
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
              />
            </div>
            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300"
            >
              Login
            </button>
          </form>
          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-center mt-4">{error}</p>
          )}
          {/* Redirect to Register */}
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a
                href="/register"
                className="text-blue-600 font-medium hover:underline"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2024 VoteSphere. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;
