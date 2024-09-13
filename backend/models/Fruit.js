// backend/models/Fruit.js
const mongoose = require('mongoose');

const FruitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Fruit = mongoose.model('Fruit', FruitSchema);

module.exports = Fruit;
