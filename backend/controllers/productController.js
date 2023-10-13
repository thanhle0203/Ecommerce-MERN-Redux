
const Product = require('../models/Product');

// Get Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Create a new Product
exports.createProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    rating: req.body.rating
  })

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a product (PUT)
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found!"});
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a Product (DELETE)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!"});
    }
    await product.remove();
    res.json({ message: "Product deleted successfully!"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};