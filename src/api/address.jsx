import axios from 'axios';
import { Config } from '../config';

export const getAddress = async (params) => {
  let { token } = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : {};

  return await axios.get(`${Config.api_host}/api/delivery-addresses`, {
    params: {
      limit: params.limit,
      skip: params.page * params.limit - params.limit,
    },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const createAddress = async (payload) => {
  let { token } = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : {};

  return await axios.post(
    Config.api_host + '/api/delivery-addresses',
    payload,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};
