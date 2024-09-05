const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isPaid: {
    type: Boolean,
    required: true,
  },
  profileImage: {
    type: String,
    default: "public/images/dummy.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Tutor', tutorSchema);
