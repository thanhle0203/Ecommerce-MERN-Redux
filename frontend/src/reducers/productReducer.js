import { ADD_PRODUCT, SET_PRODUCTS } from "../actions/productActions";

const initialState = {
    products: [],
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.product],
            };
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.products,
            }
        default:
            return state;
    }
};

export default productReducer;