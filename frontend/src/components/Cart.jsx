import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../actions/cartActions";

export const Cart = () => {
    const cart = useSelector(state => state.cartReducer.cart);
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

    const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2);

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Your Cart</h1>
            {cart.map(product => (
                <div key={product.id} className="mb-3 p-3 border rounded">
                    <p>Name: {product.name}</p>
                    <p>Price: ${product.price.toFixed(2)}</p>
                    <p>Quantity: {product.quantity}</p>
                    <button className="btn btn-primary me-2" onClick={() => handleIncreaseQuantity(product.id)}>+</button>
                    <button className="btn btn-primary me-2"  onClick={() => handleDecreaseQuantity(product.id)}>-</button>
                    <button className="btn btn-danger"  onClick={() => handleRemoveFromCart(product.id)}>Remove</button>
                </div>
            ))}

            <h2>Total Price: ${total}</h2>
            <button className="btn btn-primary me-2">Go To Checkout</button>
        </div>
    );
}