const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');

// Get all forum posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Create a new forum post
router.post('/', async (req, res) => {
  try {
    const { content } = req.body;

    const post = new Post({
      content,
    });

    await post.save();
    res.status(201).json({ success: true, post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

module.exports = router;
