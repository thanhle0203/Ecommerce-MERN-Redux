import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../actions/userActions';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector(state => state.user.error);
  const isLoading = useSelector(state => state.user.isLoading);

  
  // Declare the token at the top level of the component.
  const token = useSelector(state => state.user.token);

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    console.log("Sending:", userData);
    await dispatch(loginUser(userData));

    console.log("User data: ", userData);
    
  };

  useEffect(() => {
    // Log the token to the console after the user has logged in successfully.
    console.log("Token from Redux state:", token);
    if (token) {
        navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="container mt-5">
      {/* Show loading state to user */}
      {isLoading && <p>Loading...</p>}

      {/* Show error state to user */}
      {error && <p>{error.message}</p>}

      {/* Login form */}
      <div className="card p-4">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleLogin}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" className="form-control" placeholder="Email" required />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
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

export default Login;
