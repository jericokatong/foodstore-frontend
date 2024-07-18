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
    <div className="px-5">
      <Topbar />
      <h1 className="px-1 text-black font-bold mb-6">Pesanan Anda</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-red-500 text-white text-lg">
            <tr>
              <th className="border-r-2 border-red-500 rounded-tl-lg"></th>
              <th className="border-r-2 border-red-500">Items</th>
              <th className="border-r-2 border-red-500">Total</th>
              <th className="rounded-tr-lg">Invoice</th>
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
                  <th className="text-black">
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
                  <th className="">
                    <Link
                      className="btn bg-gray-600 w-36 h-9 min-h-9 text-white font-sans"
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
      <div className="join grid grid-cols-2 mt-8 max-w-60 mx-auto">
        <button
          className="join-item btn btn-outline"
          onClick={() => (page === 1 ? setPage(1) : setPage(page - 1))}
          disabled={page === 1}
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
          disabled={page === Math.ceil(count / limit)}
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
