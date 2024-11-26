import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import GuestMenuBar from '../components/GuestMenuBar';
import logo from '../assets/logo.png';


const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50">
      <header className="bg-gray-800 text-white py-4 shadow-lg">
  <div className="container mx-auto flex justify-between items-center px-6">
    {/* Logo */}
    <Link to="/" className="flex items-center text-white text-2xl font-bold hover:text-blue-400 transition">
    <img src={logo} alt="VoteSphere Logo" className="h-10 w-10 mr-3" />
      VoteSphere
    </Link>
    <GuestMenuBar />
  </div>
</header>


      {/* Main Section */}
      <main className="flex-grow flex flex-col justify-center items-center text-center py-16 px-4">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-6 animate-fade-in">
          Secure. Transparent. Decentralized Voting.
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mb-8">
          Experience the next generation of voting with VoteSphere. Join us today to make your voice count in a safe and transparent way.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-transparent border-2 border-blue-600 text-blue-600 py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 hover:text-white transition duration-300"
          >
            Register
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <div className="container mx-auto space-y-4">
          <p>&copy; 2024 VoteSphere. All Rights Reserved.</p>
          {/* Social Media Links */}
          <div className="flex justify-center space-x-6 text-lg">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61567162375034"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://x.com/AkintayoDav3/followers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-400 transition"
              aria-label="Instagram"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.linkedin.com/in/david-akintayo-0ba201290/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-500 transition"
              aria-label="LinkedIn"
            >
            </a>
          </div>
          {/* Links for Policies */}
          <nav className="space-x-4">
            <Link to="/terms" className="hover:text-blue-400 transition">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-blue-400 transition">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
