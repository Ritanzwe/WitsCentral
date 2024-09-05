var express = require('express');
const Services = require('../models/services.model');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/services', async (req, res) => {
  try {
    const { service } = req.body;
    const newService = new Services({ service });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/services', async (req, res) => {
  try {
    const allService = await Services.find({});
    res.status(200).json(allService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Services.findById(id);
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/services/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { service } = req.body;
      if (!service) return res.status(400).json({ error: 'Service name is required' });

      const updatedService = await Services.findByIdAndUpdate(id, { service }, { new: true, runValidators: true });
      if (!updatedService) return res.status(404).json({ error: 'Service not found' });

      res.status(200).json(updatedService);
  } catch (error) {
      console.error('Update service error:', error.message); 
      res.status(500).json({ error: error.message });
  }
});

// Route to delete a service
router.delete('/services/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const deletedService = await Services.findByIdAndDelete(id);
      if (!deletedService) return res.status(404).json({ error: 'Service not found' });
      res.status(200).json({ error: 'Service deleted' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


module.exports = router;
