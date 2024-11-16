const mongoose = require('mongoose');
const config = require('../config.json')
mongoose.connect(config.mongoURI)

const boatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Boat= mongoose.model('BoatList', boatSchema);
module.exports = Boat;