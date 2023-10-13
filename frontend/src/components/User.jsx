import React from 'react';
import { useDispatch } from 'react-redux';
import { signupUser, loginUser } from '../actions/userActions';

const User = () => {
  const dispatch = useDispatch();

  const handleSignup = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
        username: formData.get('username'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    };
    dispatch(signupUser(userData));
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      email: formData.get('email'),
      password: formData.get('password')
    };
    dispatch(loginUser(userData));
  }


  return (
    <div className="container mt-5">
        {/* Signup form */}
        <div className="card p-4 mb-5">
          <h2 className="text-center">Sign Up</h2>
          <form onSubmit={handleSignup}>
              <div className="form-group">
                  <input type="text" name="username" className="form-control" placeholder="Username" required />
              </div>
              <div className="form-group">
                  <input type="text" name="firstName" className="form-control" placeholder="First Name" required />
              </div>
              <div className="form-group">
                  <input type="text" name="lastName" className="form-control" placeholder="Last Name" required />
              </div>
              <div className="form-group">
                  <input type="email" name="email" className="form-control" placeholder="Email" required />
              </div>
              <div className="form-group">
                  <input type="password" name="password" className="form-control" placeholder="Password" required />
              </div>
              <div className="form-group">
                  <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password" required />
              </div>
              <div className="form-group text-center">
                  <button type='submit' className="btn btn-primary">Sign Up</button>
              </div>
          </form>
        </div>

        {/* Login form */}
        <div className="card p-4">
          <h2 className="text-center">Login</h2>
          <form onSubmit={handleLogin}>
              <div className="form-group">
                  <input type="email" name="email" className="form-control" placeholder="Email" required />
              </div>
              <div className="form-group">
                  <input type="password" name="password" className="form-control" placeholder="Password" required />
              </div>
              <div className="form-group text-center">
                  <button type='submit' className="btn btn-success">Login</button>
              </div>
          </form>
        </div>
    </div>
  );
}

export default User;
