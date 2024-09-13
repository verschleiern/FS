const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/fruit-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/fruits', require('./routes/fruits'));
app.use('/orders', require('./routes/orders'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
