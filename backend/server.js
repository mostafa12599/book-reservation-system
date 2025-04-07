const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());


mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/book-reservation', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));


const User = require('./models/User');
const Book = require('./models/Book');
const Reservation = require('./models/Reservation');

const auth = require('./middleware/auth');

app.use('/api/users', require('./routes/users'));
app.use('/api/books', require('./routes/books'));
app.use('/api/reservations', require('./routes/reservations'));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));