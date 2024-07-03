import store from '../config/Redux/store';
import { saveCart } from '../api/cart';

let currentAuth;
let currentCart;

const listener = () => {
  let previousAuth = currentAuth;
  let previousCart = currentCart;

  currentAuth = store.getState().auth;
  currentCart = store.getState().cart;

  let { token } = currentAuth;

  if (currentAuth !== previousAuth) {
    localStorage.setItem('auth', JSON.stringify(currentAuth));
    saveCart(token, currentCart);
  }

  if (currentCart !== previousCart) {
    localStorage.setItem('cart', JSON.stringify(currentCart));
    saveCart(token, currentCart);
  }
};

const listen = () => {
  store.subscribe(listener);
};

export { listen };
