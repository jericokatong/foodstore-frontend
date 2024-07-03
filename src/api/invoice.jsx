import axios from 'axios';
import { Config } from '../config';

export const getInvoiceByOrderId = async (order_id) => {
  const { token } = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : {};

  return await axios.get(`${Config.api_host}/api/invoices/${order_id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
