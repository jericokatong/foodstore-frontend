import React, { useState } from 'react';
import { Topbar } from '../../components/molecules';
import { useSelector, useDispatch } from 'react-redux';
import { clearItems } from '../../features/Cart/actions';
import { Config } from '../../config';
import { formatRupiah } from '../../utils/format-rupiah';
import { sumPrice } from '../../utils/sum-price';
import { useAddressData } from '../../hooks/address';
import { Link, useNavigate, redirect } from 'react-router-dom';
import FaArrowLeft from '@meronex/icons/fa/FaArrowLeft';
import FaArrowRight from '@meronex/icons/fa/FaArrowRight';
import FaRegCheckCircle from '@meronex/icons/fa/FaRegCheckCircle';
import { createOrder } from '../../api/order';

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, status, limit, page, count, setPage } = useAddressData();

  const handleCreateOrder = async () => {
    let payload = {
      delivery_fee: Config.global_ongkir,
      delivery_address: selectedAddress._id,
    };

    let { data } = await createOrder(payload);

    if (data?.error) return;

    navigate(`/invoice/${data._id}`);
    dispatch(clearItems());
  };

  if (!cart.length) return redirect('/');
  return (
    <div className="h-screen">
      <Topbar />
      Checkout
      <ul className="timeline">
        <li>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`h-5 w-5 ${activeStep === 0 ? 'text-red-500' : ''}`}
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box">Item</div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`h-5 w-5 ${activeStep === 1 ? 'text-red-500' : ''}`}
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box">Alamat</div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`h-5 w-5 ${activeStep === 2 ? 'text-red-500' : ''}`}
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box">Konfirmasi</div>
        </li>
      </ul>
      {activeStep === 0 ? (
        <div>
          <h1>Langkah Pertama</h1>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Nama Produk</th>
                  <th>Jumlah</th>
                  <th>Harga Satuan</th>
                  <th>Harga Total</th>
                </tr>
              </thead>
              <tbody>
                {cart &&
                  cart.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={`${Config.api_host}/upload/${item.image_url}`}
                          width={48}
                          alt={item.name}
                        />
                        {item.name}
                      </td>
                      <td>{item.qty}</td>
                      <td>{formatRupiah(item.price)}</td>
                      <td>{formatRupiah(item.price * item.qty)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <br />
            <div className="text-right">
              <p>Subtotal: {formatRupiah(sumPrice(cart))}</p>
              <button
                className="btn btn-warning"
                onClick={() =>
                  activeStep === 2
                    ? setActiveStep(2)
                    : setActiveStep(activeStep + 1)
                }
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {activeStep === 1 ? (
        <div>
          Langkah Kedua
          <div className="">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Nama Alamat</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <th>
                      <input
                        type="radio"
                        name="radio-3"
                        className="radio radio-secondary"
                        onClick={() => setSelectedAddress(item)}
                        checked={selectedAddress === item ? true : false}
                      />
                    </th>
                    <td>
                      <div>
                        <h1 className="font-bold">{item.nama}</h1> <br />
                        <p>
                          {item.provinsi}, {item.kabupaten}, {item.kecamatan},{' '}
                          {item.kelurahan}
                        </p>
                        <br />
                        <p>{item.detail}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="join grid grid-cols-2">
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

            {!data.length && status === 'success' ? (
              <div>
                <Link to={'/alamat-pengiriman/tambah'}>
                  Kamu belum memiliki alamat pengiriman <br /> <br />
                  <button className="btn">Tambah Alamat</button>
                </Link>
              </div>
            ) : null}
          </div>
          <button
            className="btn"
            onClick={() =>
              activeStep === 0
                ? setActiveStep(0)
                : setActiveStep(activeStep - 1)
            }
          >
            <FaArrowLeft /> ke langkah sebelumnya
          </button>
          <button
            className="btn"
            disabled={!selectedAddress}
            onClick={() =>
              activeStep === 2
                ? setActiveStep(2)
                : setActiveStep(activeStep + 1)
            }
          >
            ke langkah berikutnya <FaArrowRight />
          </button>
        </div>
      ) : null}
      {activeStep === 2 ? (
        <div>
          Langkah Ketiga
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}

              <tbody>
                <tr>
                  <th>Alamat</th>
                  <td>
                    {selectedAddress.nama} <br />
                    {selectedAddress.provinsi}, {selectedAddress.kabupaten},{' '}
                    {selectedAddress.kecamatan}, {selectedAddress.kelurahan}{' '}
                    <br />
                    {selectedAddress.detail}
                  </td>
                </tr>

                <tr>
                  <th>Subtotal</th>
                  <td>{formatRupiah(sumPrice(cart))}</td>
                </tr>

                <tr>
                  <th>Ongkir</th>
                  <td>{formatRupiah(Config.global_ongkir)}</td>
                </tr>

                <tr>
                  <th>Total</th>
                  <td>
                    {formatRupiah(
                      sumPrice(cart) + parseInt(Config.global_ongkir)
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              className="btn"
              onClick={() =>
                activeStep === 0
                  ? setActiveStep(0)
                  : setActiveStep(activeStep - 1)
              }
            >
              <FaArrowLeft /> ke langkah sebelumnya
            </button>
            <button className="btn" onClick={handleCreateOrder}>
              <FaRegCheckCircle />
              Bayar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Checkout;
