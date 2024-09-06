const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model to represent shop owners
    required: true,
  },
  image: {
    type: String, // Path to shop image, optional
    default: 'https://placehold.jp/150x150.png',
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
  }],
  contactInfo: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Shop', shopSchema);
