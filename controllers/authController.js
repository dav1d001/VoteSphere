const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// Register a new user (voter)
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Check if username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword, role: 'voter' });
    await newUser.save();

    res.status(200).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, message: 'Failed to register user' });
  }
};

// Register an admin user (only admins can create admins)
exports.registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Only allow admins to register other admins
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can create other admins.' });
    }

    // Check if username is already taken
    const existingAdmin = await User.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hash the password for the new admin
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new admin user
    const newAdmin = new User({ username, password: hashedPassword, role: 'admin' });
    await newAdmin.save();

    res.status(200).json({ success: true, message: 'Admin user registered successfully.' });
  } catch (error) {
    console.error('Error registering admin user:', error);
    res.status(500).json({ success: false, message: 'Failed to register admin user.' });
  }
};

// Log in a user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ success: true, token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ success: false, message: 'Failed to log in' });
  }
};

// Get user details (with role and stats)
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user: { id: user._id, username: user.username, role: user.role } });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch user details' });
  }
};

// Log out a user
exports.logoutUser = (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
};

// Update Profile Controller
exports.updateProfile = async (req, res) => {
  const userId = req.user.userId;
  const { currentPassword, newPassword } = req.body;
  const profilePic = req.file?.path; // Assuming you're handling file uploads with Multer

  try {
    const user = await User.findById(userId);

    // Verify current password if provided
    if (currentPassword && !(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(400).json({ message: 'Incorrect current password.' });
    }

    // Update password if newPassword is provided
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    // Update profile picture if provided
    if (profilePic) {
      user.profilePic = profilePic;
    }

    await user.save();
    res.status(200).json({ success: true, message: 'Profile updated successfully.', profilePic: user.profilePic });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Failed to update profile.' });
  }
};
// Update user profile
exports.updateProfile = async (req, res) => {
  const { username, profileImage } = req.body; // Example fields
  const userId = req.user.userId; // Assumes token middleware sets `req.user`

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Update user fields
    if (username) user.username = username;
    if (profileImage) user.profileImage = profileImage;

    await user.save();
    res.status(200).json({ success: true, message: 'Profile updated successfully.', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Failed to update profile.' });
  }
};
