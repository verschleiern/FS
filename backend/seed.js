const mongoose = require('mongoose');
const Fruit = require('./models/Fruit');
const Order = require('./models/Order');

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb+srv://ys:test123@fruitstore.gpkqf.mongodb.net/?retryWrites=true&w=majority&appName=FruitStore', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    // Define some fruits to seed
    const fruits = [
      { name: 'Apple', quantity: 50, price: 1.2 },
      { name: 'Banana', quantity: 30, price: 0.5 },
      { name: 'Cherry', quantity: 20, price: 2.0 },
      { name: 'Durian', quantity: 5, price: 10.0 },
    ];

    // Clear the fruits and orders collection
    await Fruit.deleteMany({});
    await Order.deleteMany({});
    console.log('Old data deleted');

    // Insert new fruits
    const insertedFruits = await Fruit.insertMany(fruits);
    console.log('Fruits seeded');

    // Define some orders to seed
    const orders = [
      {
        items: [
          { fruitId: insertedFruits[0]._id, quantity: 3, price: 1.2 }, // 3 Apples
          { fruitId: insertedFruits[1]._id, quantity: 2, price: 0.5 }  // 2 Bananas
        ],
        totalCost: 4.1
      },
      {
        items: [
          { fruitId: insertedFruits[2]._id, quantity: 1, price: 2.0 }, // 1 Cherry
          { fruitId: insertedFruits[3]._id, quantity: 1, price: 10.0 }  // 1 Durian
        ],
        totalCost: 12.0
      }
    ];

    // Insert new orders
    await Order.insertMany(orders);
    console.log('Orders seeded');

  } catch (err) {
    console.error('Error:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
