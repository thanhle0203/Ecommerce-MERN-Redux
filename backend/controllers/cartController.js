const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

exports.getCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        let cart = await Cart.findOne({ userId }).populate('products.product');
        if (!cart) {
            cart = await new Cart().save();
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.addToCart = async (req, res) => {
    const { productId, userId, quantity } = req.body;

    try { 
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = await new Cart({ userId, totalPrice: 0 }).save();
        }
        const productExists = cart.products.find(p => p.product._id.toString() === productId.toString());

        let priceOfProductBeingAdded = 0;

        if (productExists) {
            productExists.quantity += 1;
        } else {
            const product = await Product.findById(productId);
            if (!product) {
              return res.status(404).json({ message: 'Product not found. '});
              priceOfProductBeingAdded =  product.price;
            }
            const newProduct = {
                product: productId,
                quantity: quantity
            };
            cart.products.push(newProduct);
        }

        await cart.save();
        res.json(cart);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.body.userId;
    try {
        let cart = await Cart.findOne( {userId });
        cart.products = cart.products.filter(p => p.product._id.toString() !== productId.toString());

        await cart.save();
        res.json(cart);

    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

exports.updateCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.body.userId;
    if (!quantity || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid quantity value.'});
    }

    try {
        let cart = await Cart.findOne({ userId });
        const product = cart.products.find( p => product._id.toString() === productId.toString());

        if (!product) {
            return res.status(404).json({ message: 'Product not found in cart. '});
        }

        product.quantity = quantity;

        await cart.save();
        res.json(cart);

    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};