const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default:"public/images/dummy.jpg"
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'serviceProvider'],
    default: 'student',
  },
  contactInfo: {
    phone: String,
    address: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('User', userSchema);
