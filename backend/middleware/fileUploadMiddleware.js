const multer = require('multer');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Unique filename
  },
});

// File filter for images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image!'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Update user profile route (handle both password and image)
app.put('/api/auth/update-profile', upload.single('profilePic'), async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Handle password change
    if (currentPassword && newPassword) {
      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) return res.status(400).json({ message: 'Current password is incorrect' });

      // Hash new password and update it
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    // Handle profile picture update
    if (req.file) {
      user.profilePic = '/uploads/' + req.file.filename;  // Save image path
    }

    // Save updated user
    await user.save();
    res.json({ message: 'Profile updated successfully', profilePic: user.profilePic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});
