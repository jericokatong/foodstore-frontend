import { useState, useCallback, useEffect } from 'react';
import { getAddress } from '../api/address';

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

export const useAddressData = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState(statuslist.idle);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  let fetchAddress = useCallback(async () => {
    setStatus(statuslist.process);

    let {
      data: { data, count, error },
    } = await getAddress({ page, limit });

    if (error) {
      setStatus(statuslist.error);
      return;
    }

    setStatus(statuslist.success);
    setData(data);
    setCount(count);
  }, [page, limit]);

  useEffect(() => {
    fetchAddress();
  }, [fetchAddress]);

  return {
    data,
    count,
    status,
    page,
    limit,
    setPage,
    setLimit,
  };
};
