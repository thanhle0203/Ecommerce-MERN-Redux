const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: [1, 'Quantity can not be less than 1']
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalPrice: {
    type: Number,
    default: 0,
      message: 'Total price cannot be negative'
  }
  }
, {
  timestamps: true
});

// Before saving the cart, calculate the total price
cartSchema.pre('save', function(next) {
  this.totalPrice = this.items.reduce((total, item) => {
    return total + (item.quantity * item.price);
  }, 0);
  next();
});


module.exports = mongoose.model('Cart', cartSchema);
