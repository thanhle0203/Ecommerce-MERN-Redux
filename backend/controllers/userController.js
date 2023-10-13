const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// exports.signup = async (req, res, next) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         const error = new Error('Validation failed.');
//         error.statusCode = 422;
//         error.data = errors.array();
//         throw error;
//     }
//     const user = await User.create(req.body);
//     res.status(201).json({ status: 'success', data: user });
//   } catch (err) {
//     //res.status(400).json({ status: 'fail', message: err.message});
//     next(err);
//   }
// };

exports.signup = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          const error = new Error('Validation failed.');
          error.statusCode = 422;
          error.data = errors.array();
          throw error;
      }
  
      // Extract only the fields that you expect
      const { username, firstName, lastName, email, password } = req.body;
  

      // Check if password confirmation matches
      if (password !== req.body.confirmPassword) {
        return res.status(400).json({ status: 'fail', message: 'Passwords do not match' });
      }
  
  
      // Create the user with the extracted and validated data
      const user = await User.create({
        username,
        firstName,
        lastName,
        email,
        //password: hashedPassword,
        password: password,
        // any other fields you want to store
      });

      // This token will expire in 1 hour
    const token = jwt.sign({ userId: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
    
  
      // You might want to avoid sending back the entire user object for security reasons
      res.status(201).json({ status: 'success', data: { id: user._id, email: user.email, token } });
  
    } catch (err) {
      next(err);
    }
  };

  
exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    // Log the incoming request body
    console.log("Received credentials:", req.body);
    
    const { email, password} = req.body;
    const user = await User.findOne({ email }).select('+password');
    console.log(user);


    if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ status: 'fail', message: 'Incorrect email or password' });
    }


    console.log("Comparing passwords...");
    const passwordMatches = await bcrypt.compare(password, user.password);
    console.log("Password matches:", passwordMatches);


    console.log("Starting login process...");
    console.log("Request body:", req.body);


    //const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log("Token: ", token);

    res.status(200).json({ 
      status: 'success', 
      token, 
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    }) ;

  } catch (err) {
    //res.status(400).json({ status: 'fail', message: err.message });
    console.error(err);
    next(err);
  }

}