const express = require('express');
const userController = require('../controllers/userController');
const { body } = require('express-validator');
const router = express.Router();

router.post('/signup', [
    body('username').notEmpty().withMessage('Username is required'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    })
], userController.signup);


//router.post('/signup', userController.signup);
// router.post('/login', userController.login);
router.post('/login', [
  body('email').isEmail().withMessage('Provide a valid email'),
  body('password').exists().withMessage('Password is required')
], userController.login);

module.exports = router;