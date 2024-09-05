// models/Service.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    service: {
        type: String,
        required: true,
        trim: true
    },
});

module.exports = mongoose.model('Service', serviceSchema);
