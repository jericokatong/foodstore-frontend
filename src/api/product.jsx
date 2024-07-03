import axios from 'axios';
import { Config } from '../config';

export const getProducts = async (params) => {
  return await axios.get(`${Config.api_host}/api/products`, {
    params,
  });
};
