import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productReducer from '../reducers/productReducer';

const rootReducer = combineReducers({
  products: productReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;