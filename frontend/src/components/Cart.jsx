import React, { useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../actions/cartActions";

export const Cart = () => {
    // Assuming your Redux state structure matches the API response, 
    // you might need to access state.cartReducer.cart.items for the items array.
    // This depends on how you've stored the response in your Redux state.
    const cartItems = useSelector(state => state.cartReducer.cart || []);
    const dispatch = useDispatch();

    const handleIncreaseQuantity = (id) => {
        dispatch(increaseQuantity(id));
    }

    const handleDecreaseQuantity = (id) => {
        dispatch(decreaseQuantity(id));
    }

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    }

    // Adjust the calculation of the total to match the new structure of your cart items.
    const total = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    }, [cartItems]);

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Your Cart</h1>
            {cartItems.length ? cartItems.map(item => (
                <div key={item._id} className="mb-3 p-3 border rounded"> 
                    <p>Name: {item.name}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                    {/* Correct the onClick methods if needed based on your actual data structure */}
                    <button className="btn btn-primary me-2" onClick={() => handleIncreaseQuantity(item._id)}>+</button>
                    <button className="btn btn-primary me-2" onClick={() => handleDecreaseQuantity(item._id)}>-</button>
                    <button className="btn btn-danger" onClick={() => handleRemoveFromCart(item._id)}>Remove</button>
                </div>
            )) : <p>Your cart is empty.</p> }

            <h2>Total Price: ${total}</h2>
            <button className="btn btn-primary me-2">Go To Checkout</button>
        </div>
    );
}
