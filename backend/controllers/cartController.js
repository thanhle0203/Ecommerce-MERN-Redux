const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

// This is middleware that checks the user's session or token and adds their info to the request.
function authenticate(req, res, next) {
    // pseudo-code, this logic will depend on how you handle authentication
    const user = getUserFromSession(req); // or getUserFromToken for JWT setups

    if (!user) {
        return res.status(401).send('You need to log in.');
    }

    // add the user to the request
    req.user = user;
    next();
}

exports.addToCart = async (req, res, next) => {
    try {
      const userId = req.user._id;
      const { items } = req.body; // Adjust this line to receive items.
  
      if (!items || items.length === 0) {
        return res.status(400).send('No items provided');
      }
  
      // Check if the user exists before processing further
      const userExists = await User.findById(userId);
      if (!userExists) {
        return res.status(404).send('User not found');
      }
  
      // Assuming you might want to add multiple items in one request.
      // Loop through each item intended for the cart
for (let item of items) {
    const { productId, quantity } = item; // extract productId and quantity from current item
    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).send('One or more products were not found');
    }

    let cart = await Cart.findOne({ user: userId }); // Use userId to find the cart

    if (cart) {
        // Cart exists for user, so we need to check if the product is already in the cart
        const itemIndex = cart.items.findIndex(p => p.product.equals(productId)); // find index of the product in the items array

        if (itemIndex > -1) {
            // Product exists in the cart, update the quantity and price
            cart.items[itemIndex].quantity += quantity; // update quantity
            cart.items[itemIndex].price = product.price; // ensure price is up to date
        } else {
            // Product is not in the cart, add it as a new item
            cart.items.push({
                product: productId,
                quantity: quantity,
                price: product.price,
            });
        }
        // Since we modified our cart, we need to save the changes
        await cart.save(); // this will run the 'pre save' middleware to update the totalPrice before actually saving
    } else {
        // No cart exists, create a new one
        const newCartData = {
            user: userId,
            items: [{
                product: productId,
                quantity: quantity,
                price: product.price,
            }],
        };
        cart = new Cart(newCartData); // create a new Cart instance
        await cart.save(); // save the newly created cart
    }
}

// After processing all items, we can return the updated cart as a response
return res.status(201).send(cart);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while adding product to cart");
    }
  };
  

// Get the current user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'No cart found for this user.' });
    }

    // Optionally, to calculate the total price dynamically
    let totalPrice = 0;
    cart.items.forEach(item => {
      totalPrice += item.quantity * item.product.price;
    });
    cart.totalPrice = totalPrice; // assuming totalPrice is a field in Cart model

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the current user's cart
exports.updateCart = async (req, res) => {
  try {
    const { items } = req.body; // items: [{ product, quantity }]

    // Calculate total price and validate items
    let totalPrice = 0;
    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product with id ${item.product} not found.` });
      }
      totalPrice += item.quantity * product.price;
    }

    // Update the cart with new items and total price
    const updatedCart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items, totalPrice },
      { new: true, runValidators: true }
    ).populate('items.product');

    if (!updatedCart) {
      return res.status(404).json({ message: 'No cart found for this user.' });
    }

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an item from the current user's cart
exports.deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params; // The id of the item to be deleted

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'No cart found for this user.' });
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(item => item._id.equals(itemId));
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'No item found in the cart.' });
    }

    // Remove the item and recalculate the total price
    const [removed] = cart.items.splice(itemIndex, 1);
    cart.totalPrice -= removed.quantity * removed.product.price; // assuming product price is stored in the cart item

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Empty the current user's cart
exports.emptyCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [], totalPrice: 0 },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: 'No cart found for this user.' });
    }

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
