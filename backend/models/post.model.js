const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for forum posts
const postSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', postSchema);