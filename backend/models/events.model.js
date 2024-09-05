const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true 
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false // Change to true if image is mandatory
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: mongoose.Schema.Types.Mixed, // Allows different types
    validate: {
      validator: function(value) {
        return typeof value === 'number' || value === 'RSVP';
      },
      message: 'Price must be a number or "RSVP".'
    },
    required: true
  }
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
