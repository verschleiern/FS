// backend/models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  items: [
    {
      fruitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Fruit', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    },
  ],
  totalCost: { type: Number, required: true },
}, {
  timestamps: true
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
