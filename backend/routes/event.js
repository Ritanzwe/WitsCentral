// routes/events.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Event = require('../models/Event');

// Multer configuration for handling image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

const upload = multer({ storage });

// @route   POST /api/events
// @desc    Create a new event
router.post('/', upload.single('image'), async (req, res) => {
  const { title, date, time, location, category, description, price } = req.body;

  try {
    const newEvent = new Event({
      title,
      date,
      time,
      location,
      category,
      image: req.file ? `/uploads/${req.file.filename}` : '', // Path to uploaded image
      description,
      price,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
