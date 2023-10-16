const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const globalErrorHandler = require('./middlewares/errorMiddleware');

const app = express();
const cors = require('cors');

app.use(cors());
// Middleware to parse JSON data
//app.use(bodyParser.json())
app.use(express.json());
app.use(globalErrorHandler);

const PORT = process.env.PORT || 8000;

require('dotenv').config();

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://shoppingcart:shoppingcart@cluster0.rmabkgg.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected...');
}).catch(err => console.log(err));

// mongoose.connection.once('open', () => {
//     console.log('Connected to MongoDB');
// })

const userRoutes = require('./routes/UserRoutes')
const productRoutes = require('./routes/ProductRoutes');
const cartRoutes = require('./routes/CartRoutes');

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})



