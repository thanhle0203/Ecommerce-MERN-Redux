import { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, SET_USER_CART } from "../actions/cartActions";

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItemIndex = state.cart.findIndex((item) => item._id === action.payload.product._id);
      if (existingItemIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += action.payload.quantity; // Update quantity directly
        return { ...state, cart: updatedCart };
      } 
      // If it's not in the cart, add the new item with its quantity
      return { ...state, cart: [...state.cart, { ...action.payload.product, quantity: action.payload.quantity }] };

    case SET_USER_CART:
      return { ...state, cart: action.payload }; // Directly set the cart from payload if it's the entire cart.

    case REMOVE_FROM_CART:
      return { ...state, cart: state.cart.filter(item => item._id !== action.id) }; // Check the correct ID field

    case INCREASE_QUANTITY:
      // Similar approach as ADD_TO_CART for existing item
      return {
        ...state,
        cart: state.cart.map(item =>
          item._id === action.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case DECREASE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item._id === action.id
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        ),
      };

    default:
      return state;
  }
};


export default cartReducer;
