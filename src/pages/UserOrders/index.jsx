import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Topbar } from '../../components/molecules';
import { StatusLabel } from '../../components/atoms';
import { formatRupiah } from '../../utils/format-rupiah';
import { sumPrice } from '../../utils/sum-price';
import FaFileInvoiceDollar from '@meronex/icons/fa/FaFileInvoiceDollar';
import { getOrders } from '../../api/order';

const UserOrders = () => {
  const [pesanan, setPesanan] = useState([]);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchPesanan = useCallback(async () => {
    setStatus('process');

    let { data } = await getOrders({ limit, page });

    if (data.error) {
      setStatus('error');
      return;
    }

    setStatus('success');
    setPesanan(data.data);
    setCount(data.count);
  }, [page, limit]);

  useEffect(() => {
    fetchPesanan();
  }, [fetchPesanan]);

  console.log(pesanan);

  return (
    <div>
      <Topbar />
      UserOrders
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Items</th>
              <th>Total</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {pesanan &&
              pesanan.map((item, index) => (
                <tr key={index}>
                  <th>
                    # {item.order_number} <br />
                    <StatusLabel status={item.status} />
                  </th>
                  <th>
                    {item.order_items.map((item, index) => (
                      <div>
                        {item.name} {item.qty} <br />
                      </div>
                    ))}
                  </th>
                  <th>
                    {formatRupiah(
                      sumPrice(item.order_items) + item.delivery_fee
                    )}
                  </th>
                  <th>
                    <Link
                      className="btn bg-gray-500"
                      to={`/invoice/${item._id}`}
                    >
                      Invoice
                    </Link>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="join grid grid-cols-2 mt-8 mb-40">
        <button
          className="join-item btn btn-outline"
          onClick={() => (page === 1 ? setPage(1) : setPage(page - 1))}
        >
          Previous page
        </button>
        <button
          className="join-item btn btn-outline"
          onClick={() =>
            page === Math.ceil(count / limit)
              ? setPage(Math.ceil(count / limit))
              : setPage(page + 1)
          }
        >
          Next
        </button>
        <p>Page: {page}</p>
        <p>Total Page: {Math.ceil(count / limit)}</p>
      </div>
    </div>
  );
};

export default UserOrders;
