// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const fruitRoutes = require('./routes/fruits');
const orderRoutes = require('./routes/orders');
const Fruit = require('./models/Fruit');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());
app.use('/fruits', fruitRoutes);
app.use('/orders', orderRoutes);

// Root route for testing
app.get('/', (req, res) => {
  res.send('API is working');
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://ys:test123@fruitstore.gpkqf.mongodb.net/?retryWrites=true&w=majority&appName=FruitStore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Emit fruit updates
const emitFruits = async () => {
  try {
    const fruits = await Fruit.find({});
    io.emit('fruits', fruits);
  } catch (error) {
    console.error('Error fetching fruits:', error);
  }
};

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Emit fruits when a user connects
  emitFruits();

  socket.on('addToCart', async (fruitId) => {
    try {
      const fruit = await Fruit.findById(fruitId);
      if (fruit && fruit.quantity > 0) {
        fruit.quantity -= 1;
        await fruit.save();
        emitFruits(); // Emit updated fruits list
      }
    } catch (error) {
      console.error('Error updating fruit quantity:', error);
    }
  });

  socket.on('removeFromCart', async (fruitId) => {
    try {
      const fruit = await Fruit.findById(fruitId);
      if (fruit) {
        fruit.quantity += 1;
        await fruit.save();
        emitFruits(); // Emit updated fruits list
      }
    } catch (error) {
      console.error('Error updating fruit quantity:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
