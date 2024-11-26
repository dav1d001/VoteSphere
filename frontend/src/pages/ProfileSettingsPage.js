import React, { useState, useEffect } from 'react';
import UserMenuBar from '../components/UserMenuBar'; // Ensure UserMenuBar is imported

const ProfileSettingsPage = () => {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null); // For uploading profile picture
  const [previewPic, setPreviewPic] = useState(null); // To preview the uploaded picture
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Fetch user details
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/user', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
        } else {
          setError('Failed to fetch user details.');
        }
      } catch {
        setError('An error occurred while fetching user details.');
      }
    };

    fetchUser();
  }, []);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewPic(URL.createObjectURL(file)); // Show a preview of the image
    }
  };

  const handleSaveChanges = async () => {
    setError(null);
    setSuccess(null);

    if (newPassword && newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    try {
      const formData = new FormData();
      if (profilePic) formData.append('profilePic', profilePic); // Add the profile picture
      if (currentPassword) formData.append('currentPassword', currentPassword);
      if (newPassword) formData.append('newPassword', newPassword);

      const response = await fetch('http://localhost:5000/api/auth/update-profile', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: formData, // Send the FormData to the backend
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Profile updated successfully!');
        setUser({ ...user, profilePic: data.profilePic }); // Update local state
        setCurrentPassword('');
        setNewPassword('');
      } else {
        setError(data.message || 'Failed to update profile.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Use the UserMenuBar to maintain the user navigation */}
      <UserMenuBar user={user} />
      
      <div className="flex justify-center items-center pt-8">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Profile Settings</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          {/* Profile Picture Section */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Profile Picture</h3>
            {previewPic ? (
              <img
                src={previewPic}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover mb-2"
              />
            ) : user?.profilePic ? (
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mb-2"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 mb-2 flex items-center justify-center">
                <span className="text-gray-700">No Image</span>
              </div>
            )}
            <input
              type="file"
              onChange={handleProfilePicChange}
              accept="image/*"
              className="block w-full text-gray-600"
            />
          </div>

          {/* Change Password Section */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Change Password</h3>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-3"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          {/* Save Changes Button */}
          <button
            onClick={handleSaveChanges}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
