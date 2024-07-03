import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from '../../features/Auth/reducer';
import productReducer from '../../features/Products/reducer';
import cartReducer from '../../features/Cart/reducer';

const composerEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
});

const store = createStore(
  rootReducer,
  composerEnhancer(applyMiddleware(thunk))
);

export default store;
