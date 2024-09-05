const express = require('express');
const router = express.Router();
const { Get_All_Events, Create_Event, Get_Event_By_Id } = require('../controllers/events.controller');

// Route to create a new event
router.post('/', Create_Event);

// Route to get all events
router.get('/', Get_All_Events);

// Route to get event by ID
router.get('/:id', Get_Event_By_Id);


module.exports = router;