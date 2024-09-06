const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // Path to product image, optional
    default: 'https://placehold.jp/150x150.png',
  },
  shop: {
    type: Schema.Types.ObjectId,
    ref: 'Shop', // Reference to the shop the product belongs to
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
