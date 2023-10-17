
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const SET_USER_CART = 'SET_USER_CART';

export const addToCart = (product, quantity = 1) => ({
  type: ADD_TO_CART,
  payload: { product, quantity },
});

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  id,
});

export const increaseQuantity = (id) => ({
  type: INCREASE_QUANTITY,
  id,
});

export const decreaseQuantity = (id) => ({
  type: DECREASE_QUANTITY,
  id,
});

// ... existing imports ...

export const fetchUserCart = (userToken) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:8000/api/carts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Include authentication headers if necessary
          Authorization: `Bearer ${userToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not fetch cart.');
      }

      dispatch({
        type: SET_USER_CART, // use the constant here
        payload: data, // assuming your cart data is here
      });
    } catch (error) {
      console.error(error);
      // Optionally dispatch an action to handle the error, setting an error state
      // Dispatch failure action here
      dispatch({
        type: 'FETCH_CART_FAILURE', // new action type for handling failures
        payload: error.message || 'Could not fetch cart.',
      });
    }
  };
};

// ... other action creators ...

