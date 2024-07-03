import axios from 'axios';
import { Config } from '../config';

export const getOrders = async (params) => {
  const { token } = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : {};

  const { limit, page } = params;

  const skip = page * limit - limit;

  return await axios.get(`${Config.api_host}/api/orders`, {
    params: {
      skip,
      limit,
    },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const createOrder = async (payload) => {
  const { token } = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : {};

  return await axios.post(`${Config.api_host}/api/orders`, payload, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
