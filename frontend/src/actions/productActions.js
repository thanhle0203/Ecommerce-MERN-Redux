export const ADD_PRODUCT = 'ADD_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const addProduct = (product) => ({
    type: ADD_PRODUCT,
    product,
});

export const setProducts = (products) => ({
    type: SET_PRODUCTS,
    products,
})
