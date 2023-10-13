import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../reducers/userReducer';
import productReducer from '../reducers/productReducer';
import cartReducer from '../reducers/cartReducer';

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
  cartReducer: cartReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;