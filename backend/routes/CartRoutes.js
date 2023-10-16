const express = require('express');
const { addToCart, getCart, updateCart, deleteItem, emptyCart } = require('../controllers/cartController');
const authenticateUser = require('../middlewares/authenticateUser');

const router = express.Router();

router.post('/', authenticateUser, addToCart);
router.get('/', authenticateUser, getCart);
router.put('/:itemId', authenticateUser, updateCart);
router.delete('/:itemId', authenticateUser, deleteItem);
router.delete('/', authenticateUser, emptyCart);

module.exports = router;
