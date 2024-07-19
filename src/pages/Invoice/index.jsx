import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInvoiceByOrderId } from '../../api/invoice';
import { BounceLoader } from 'react-spinners';
import { formatRupiah } from '../../utils/format-rupiah';
import { Config } from '../../config';
import { StatusLabel } from '../../components/atoms';
import { Topbar } from '../../components/molecules';
import axios from 'axios';

const Invoice = () => {
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('process');
  const [initiatingPayment, setInitiating] = useState(false);
  const [requestError, setRequestError] = useState(false);

  let { order_id } = useParams();

  const handlePayment = async () => {
    setInitiating(true);

    await axios.put(`${Config.api_host}/api/invoices/${order_id}/payment`);

    // console.log('ini token: ', token);

    // if (!token) {
    //   setRequestError(true);
    // }

    setInitiating(false);
    // window.snap.pay(token);

    getInvoiceByOrderId(order_id)
      .then(({ data }) => {
        // cek apakah ada error
        if (data?.error) {
          setError(data.message || 'Terjadi kesalahan yang tidak diketahui');
        }

        setInvoice(data);
        console.log(data);
      })
      .finally(() => setStatus('idle'));
  };

  useEffect(() => {
    getInvoiceByOrderId(order_id)
      .then(({ data }) => {
        // cek apakah ada error
        if (data?.error) {
          setError(data.message || 'Terjadi kesalahan yang tidak diketahui');
        }

        setInvoice(data);
        console.log(data);
        setError('');
      })
      .finally(() => setStatus('idle'));
  }, [order_id]);

  if (error.length) {
    return (
      <div>
        <h1 className="font-bold">Terjadi kesalahan</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (status === 'process') {
    return (
      <div className="w-full h-screen flex justify-center">
        <BounceLoader />
      </div>
    );
  }

  return (
    <div className="px-5">
      <Topbar />
      <h1 className="text-black font-bold px-1 mb-5">Invoice</h1>

      <div className="overflow-x-auto mb-10 shadow-lg">
        <table className="table">
          <thead className="bg-red-500">
            <tr className="h-10">
              <td className="rounded-tl-lg w-1/2"></td>
              <td className="rounded-tr-lg w-1/2"></td>
            </tr>
          </thead>
          <tbody className="text-black">
            <tr>
              <th>Status</th>
              <td>
                <StatusLabel status={invoice?.payment_status} />
              </td>
            </tr>

            <tr>
              <th>Order ID</th>
              <td className="font-semibold">
                # {invoice?.order?.order_number}
              </td>
            </tr>
            <tr>
              <th>Total amount</th>
              <td className="font-semibold">{formatRupiah(invoice?.total)}</td>
            </tr>

            <tr>
              <th>Billed to</th>
              <td className="font-semibold">
                <p className="font-bold">{invoice?.user?.full_name}</p>
                <p>{invoice?.user?.email}</p>
                <br />
                <br />
                {invoice?.delivery_address?.detail} <br />
                {invoice?.delivery_address?.kelurahan},{' '}
                {invoice?.delivery_address?.kecamatan} <br />
                {invoice?.delivery_address?.kabupaten} <br />
                {invoice?.delivery_address?.provinsi}
              </td>
            </tr>

            <tr>
              <th>Payment to</th>
              <td className="font-semibold">
                {Config.owner}
                <br />
                {Config.contact}
                <br />
                {Config.billing.account_no}
                <br />
                {Config.billing.bank_name}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {invoice.payment_status !== 'paid' ? (
        <div className="w-full flex justify-end mb-5">
          <button
            className="btn btn-error text-white"
            onClick={handlePayment}
            disabled={initiatingPayment}
          >
            {initiatingPayment ? 'Loading ...' : 'Bayar'}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Invoice;
