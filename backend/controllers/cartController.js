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

const createOrUpdateCart = async (userId, productId, quantity) => {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }
  
      let cart = await Cart.findOne({ user: userId });
  
      if (cart) {
        // Cart exists, so we need to check if the product is already there
        const itemIndex = cart.items.findIndex(p => p.product.equals(productId));
  
        if (itemIndex > -1) {
          // Product exists in the cart, update quantity
          cart.items[itemIndex].quantity += quantity;
        } else {
          // Product is not in cart, add now
          cart.items.push({
            product: productId,
            quantity: quantity,
            price: product.price,  // assuming price is needed and is stored here
          });
        }
        // Save the cart with updated information
        await cart.save();
      } else {
        // No cart for user, create new cart
        const newCart = new Cart({
          user: userId,
          items: [{
            product: productId,
            quantity: quantity,
            price: product.price,  // assuming price is needed and is stored here
          }],
        });
        await newCart.save();
      }
    } catch (error) {
      // It's good practice to throw the error further to be handled by the calling method
      throw error;
    }
  };
  
  exports.addToCart = async (req, res, next) => {
    try {
      const userId = req.user._id;
      const { items } = req.body;
  
      if (!items || items.length === 0) {
        return res.status(400).send('No items provided');
      }
  
      const userExists = await User.findById(userId);
      if (!userExists) {
        return res.status(404).send('User not found');
      }
  
      // If you need to validate items, consider doing it here before processing
      // For example, check if quantities are positive, product IDs are valid, etc.
  
      // Using Promise.all to allow parallel execution, which could be faster than sequential execution
      await Promise.all(items.map(({ productId, quantity }) => {
        return createOrUpdateCart(userId, productId, quantity);
      }));
  
      // After all items are processed, retrieve the cart to send it in the response
      const updatedCart = await Cart.findOne({ user: userId }).populate('items.product'); // This is assuming you have product details in items
  
      return res.status(201).send(updatedCart);
    } catch (error) {
      console.error("Error in addToCart: ", error);
      // Handle specific messages, giving clearer feedback, or keep it general to avoid exposing details
      res.status(500).send("An error occurred while adding product to cart");
    }
  };
  

// Get the current user's cart
// This middleware retrieves the current user's cart.
exports.getCart = async (req, res) => {
    try {
      // Find the cart associated with the user and populate it to get detailed information for each product.
      const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  
      if (!cart) {
        return res.status(404).json({ message: 'No cart found for this user.' });
      }
  
      // If the cart is found but is empty, you might want to handle this case specifically.
      if (cart.items.length === 0) {
        return res.status(200).json({ message: 'Your cart is empty.' });
      }
  
      // Optionally, calculate the total price dynamically instead of relying on a potentially outdated field in the database.
      let totalPrice = 0;
      cart.items.forEach(item => {
        // Ensure that the product information is complete. If not, there's a deeper issue.
        if (!item.product) {
          throw new Error('One or more products in the cart were not found. Please contact support.');
        }
        totalPrice += item.quantity * item.product.price; // assuming price is a valid field of product
      });
  
      // You can directly send the totalPrice in the response without updating the cart model.
      // This approach avoids unnecessary database writes and keeps the logic simple.
  
      // Respond with the cart information and the dynamically calculated total price.
      res.json({
        cart,  // This contains detailed product information due to the 'populate' method.
        totalPrice  // This is the up-to-date total price, calculated on the fly.
      });
    } catch (error) {
      console.error("Error in getCart: ", error);
      // Send a 500 Internal Server Error status if something unexpected happened.
      res.status(500).json({ message: 'An unexpected error occurred while retrieving your cart. Please try again later.' });
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
