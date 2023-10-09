const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');

app.use(cors());
// Middleware to parse JSON data
app.use(bodyParser.json())

const PORT = process.env.PORT || 8000;

// Sample data
const products = [
    { id: 1, name: "Product A", price: 50, description: "Description for product A", rating: 4},
    { id: 2, name: "Product B", price: 100, description: "Description for product B", rating: 5},
];

// Endpoint for products
app.get('/api/products', (req, res) => {
    res.json({ products });
    console.log(products);
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})