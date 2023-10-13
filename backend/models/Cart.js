const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    ,
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            },
            min: [1, 'Quantity can not be less then 1']
        }
    }],
    totalPrice: {
        type: Number,
        default: 0,
        validate: {
            validator: function(v) {
                    return v>=0;
            },
            message: 'Total price cannot be negative'    
        }
    }
}, {
    timestamps: true
});

cartSchema.methods.getTotalPrice = async function() {
    await this.populate('products.product').execPopulate();

    

    this.totalPrice = this.products.reduce((total, product) => {
        return total + (product.quantity * product.product.price);
    }, 0);

    await this.save();
    return this.totalPrice;
}

cartSchema.methods.addItem = async function(productId, quantity = 1) {
    const cartItem = this.products.find(item => item.product.equals(productId));
    
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        this.products.push({ product: productId, quantity });
    }

    // Recalculate the total price

    await this.getTotalPrice();
    return this;
}

module.exports = mongoose.model('Cart', cartSchema);