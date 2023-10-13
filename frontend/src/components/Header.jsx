import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions/userActions';
import { Link } from 'react-router-dom';

const Header = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector(state => state.user.token);

  // Check if the user is logged in before accessing the token property.
  if (user && user.isLoggedIn) {
    console.log("Token in Header from Redux state:", token);
    console.log("Username in Header from Redux state:", user.user.username);
  }

  const dispatch = useDispatch();

  console.log("User: ", user);

  const handleLogout = () => {
    dispatch(logoutUser());
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">E-commerce Store</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products">Products</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/cart'>Cart</Link>
          </li>
          {user && user.isLoggedIn ? (      
            <>
              <li className="nav-item">
                <span className="nav-link">Welcome, {user.user.username}</span>
              </li>
              <li className='nav-item'>
                <button className='btn btn-link nav-link' onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/signup'>Signup</Link>
              </li>
            </>
          )}


          {/* <li className="nav-item">
                <a className="nav-link" href="/login">Login</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='/signup'>Signup</a>
          </li> */}

        </ul>
      </div>
    </nav>
  );
};

export default Header;
