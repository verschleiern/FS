// backend/routes/orders.js
const express = require('express');
const router = express.Router();
const Fruit = require('../models/Fruit');
const Order = require('../models/Order');
const io = require('socket.io')(require('http').createServer()); // Adjust to your setup

// Post an order
router.post('/', async (req, res) => {
  const { items } = req.body; // Expecting items as an array of { fruitId, quantity }
  try {
    let totalCost = 0;
    const orderDetails = [];

    for (let item of items) {
      const fruit = await Fruit.findById(item.fruitId);
      if (!fruit || fruit.quantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${fruit.name}` });
      }

      fruit.quantity -= item.quantity; // Decrease the quantity
      await fruit.save();

      totalCost += fruit.price * item.quantity;
      orderDetails.push({
        fruitId: item.fruitId,
        quantity: item.quantity,
        price: fruit.price,
      });
    }

    const order = new Order({ items: orderDetails, totalCost });
    await order.save();

    io.emit('updateFruit'); // Notify clients to refresh fruit data

    res.json({ totalCost, orderDetails });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('items.fruitId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
