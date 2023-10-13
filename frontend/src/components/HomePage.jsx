import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Product } from './Product';
import { setProducts } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';

const HomePage = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.user);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
      fetch('http://localhost:8000/api/products')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json();
        })
        .then((data) => {
          dispatch(setProducts(data.products));
        })
        .catch((error) => {
            console.error('Fetch error:', error.message);
        })
    }, [dispatch]);

    const dispatchAddToCart = (productId) => {
    console.log('Attempting to add to cart: ', productId);

      if (!user) {
        console.error('User is not logged in.');
        return;
      }

      console.log('User is logged in, sending request to /api/cart');

      fetch('http://localhost:8000/api/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ productId, userId: user.id }),
      })
      .then(res => {
        console.log('Response from /api/cart: ', res);
        return res.json();
      })
      .then(data => {
        console.log('Data received from /api/cart: ', data);
        if (data.success) {
            dispatch(addToCart(productId));
            setSuccessMessage('Product added to cart successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } else {
            console.error('failed to add product to cart.')
        }
      })
      .catch (err => console.log('Error: ', err));
    }

    return (
        <div className="container mt-5">
            <h1>Welcome to E-commerce Store</h1>
            <p>Welcome to our online store. Discover our range of products and enjoy a seamless shopping experience.</p>
            
            <h2>Our Products</h2>
            {successMessage && (
              <div className='alert alert-success' role='alert'>
                {successMessage}
              </div>
            )}

            <div className='row'>
                {Array.isArray(products) && products.map((product) => (
                    <div className='col-md-4 mb-4' key={product.id}>
                        <Product {...product}  addToCart={dispatchAddToCart} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
