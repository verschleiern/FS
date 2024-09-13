// backend/routes/fruits.js
const express = require('express');
const router = express.Router();
const Fruit = require('../models/Fruit');
const io = require('socket.io')(require('http').createServer()); // Adjust to your setup

// Endpoint to get all fruits
router.get('/', async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.json(fruits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to handle adding to cart (if applicable)
router.post('/addToCart', async (req, res) => {
  const fruitId = req.body.fruitId;

  try {
    const fruit = await Fruit.findById(fruitId);
    if (fruit) {
      fruit.quantity -= 1;
      if (fruit.quantity <= 0) {
        await fruit.remove();
      } else {
        await fruit.save();
      }
      // Emit updated fruits to all clients
      io.emit('fruits', await Fruit.find());
      res.status(200).json(fruit);
    } else {
      res.status(404).json({ message: 'Fruit not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
