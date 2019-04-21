const mongoose = require('mongoose');
// image
// name
// prize
const ProductionSchema = new mongoose.Schema({
    image: String,
    name: String,
    prize: Number
});

const ProductionModel = mongoose.model('Production',ProductionSchema);

module.exports = ProductionModel;