export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  product,
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
