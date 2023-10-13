import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Product } from './Product';
import { setProducts } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';

export const ProductPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    fetch('http://localhost:8000/api/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        dispatch(setProducts(data.products));
        console.log('Product data:', data.products);
        console.log('Products:', products);
      })
      .catch((error) => {
        console.error('Fetch error:', error.message);
      });
  }, [dispatch]);

  useEffect(() => {
    console.log('Updated products:', products);
  }, [products]);

  const dispatchAddToCart = (productId) => {
    fetch('http://localhost:8000/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        dispatch(addToCart(productId));
        setSuccessMessage('Product added to cart successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        console.error('Failed to add product to cart.');
      }
    })
    .catch(err => console.log('Error:', err));
    
  }

  return (
    <div className='container mt-4'>
      <h1>Products</h1>
      {successMessage && (
        <div className='alert alert-success' role="alert">
          {successMessage}
        </div>
      )}
      <div className="row">
        {Array.isArray(products) && products.map((product) => (
          <div className='col-md-4 mb-4' key={product.id}>
            <Product {...product} addToCart={dispatchAddToCart} />
          </div>
        ))}
      </div>
    </div>
  );
};
