const Events = require("../models/events.model");

const formatDate = (date) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(new Date(date));
};


const Create_Event = async (req, res) => {
    try {
        const { title, date, time, location, category, description, price } = req.body;
        
        if (!title || !date || !time || !location || !category || !description || !price) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newEvent = new Events({
            user: req.user._id,
            title,
            date,
            time,
            category,
            location,
            image: req.file ? `/uploads/${req.file.filename}` : '', 
            description,
            price,
        });

        // Save the event
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        console.error('Error creating event:', error);
        
        if (error.name === 'ValidationError') {
            if (error.errors.price) {
                return res.status(400).json({
                    error: 'Price must be a number or "RSVP".'
                });
            }
        }

        res.status(500).json({ error: 'Server Error', error: error.message });
    }
};

const Get_All_Events = async (req, res) => {
    try {
        const events = await Events.find();

        // Format the date for each event
        const formattedEvents = events.map(event => ({
            ...event.toObject(),
            date: formatDate(event.date)
        }));

        res.status(200).json(formattedEvents);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const Get_Event_By_Id = async (req, res) => {
    try {
        const event = await Events.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Format the date for the event
        const formattedEvent = {
            ...event.toObject(),
            date: formatDate(event.date)
        };

        res.status(200).json(formattedEvent);
    } catch (error) {
        console.error('Error fetching event by ID:', error.message);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = {
    Create_Event,
    Get_All_Events,
    Get_Event_By_Id
};