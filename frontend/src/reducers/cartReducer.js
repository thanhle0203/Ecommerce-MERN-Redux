import { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY } from "../actions/cartActions";

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.product],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== action.id),
      };

    case INCREASE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(product => product.id === action.id ? { ...product, quantity: product.quantity + 1 } : product),
      };

    case DECREASE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(product => product.id === action.id && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product),
      };

    default:
      return state;
  }
};

export default cartReducer;
