import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';

export const Product = ({ _id, name, price, description, rating }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    console.log("Dispatching product:", { id: _id, name, price, description, rating, quantity: 1 });

    dispatch(addToCart({ id: _id, name, price, description, rating, quantity: 1}))
  }

  return (
    // <div className="col-md-4 mb-4">
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>{name}</h5>
          <h6 className='card-subtitle mb-2 text-muted'>Price: ${price}</h6>
          <p>{description}</p>
          <div>Rating: {'*'.repeat(rating)}</div>
          <button 
            onClick={handleAddToCart} 
            className="btn btn-primary"
          >
            Add to Cart
          </button>
        </div>
      </div>
    // </div>
  );
}
