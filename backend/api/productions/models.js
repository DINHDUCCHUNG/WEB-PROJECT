const mongoose = require('mongoose');
// image
// name
// prize
const ProductionSchema = new mongoose.Schema({
    image: String,
    title: String,
    category: String,
    description: String,
    prize: Number
});

const ProductionModel = mongoose.model('Production',ProductionSchema);

module.exports = ProductionModel;