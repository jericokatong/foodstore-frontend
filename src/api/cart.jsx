import axios from 'axios';
import { Config } from '../config';
import store from '../config/Redux/store';
import { setItems } from '../features/Cart/actions';

export const saveCart = async (token, cart) => {
  return await axios.put(
    `${Config.api_host}/api/carts`,
    { items: cart },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getCart = async () => {
  let { token } = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : {};

  if (!token) return;

  let { data } = await axios.get(`${Config.api_host}/api/carts`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!data.error) {
    store.dispatch(setItems(data));
  }
};
