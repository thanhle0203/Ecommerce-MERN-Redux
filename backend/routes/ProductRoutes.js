
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products
router.get('/', productController.getProducts);

// Create a new product
router.post('/', productController.createProduct);

// Update a product by id
router.put('/:id', productController.updateProduct);

// Delete a product by id
router.delete('/:id', productController.deleteProduct);

module.exports = router;
