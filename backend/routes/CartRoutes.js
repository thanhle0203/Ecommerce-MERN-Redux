const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authenticateUser');

const {
    getCart,
    addToCart, 
    removeFromCart,
    updateCart
} = require('../controllers/cartController');

router.get('/', authenticateUser, getCart);
router.post('/', authenticateUser, addToCart);
router.post('/remove', authenticateUser, removeFromCart);
router.post('/update', authenticateUser, updateCart);

module.exports = router;