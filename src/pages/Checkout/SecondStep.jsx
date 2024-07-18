import React from 'react';
import FaArrowLeft from '@meronex/icons/fa/FaArrowLeft';
import FaArrowRight from '@meronex/icons/fa/FaArrowRight';
import { Link } from 'react-router-dom';

const SecondStep = ({
  data,
  selectedAddress,
  setSelectedAddress,
  page,
  setPage,
  status,
  activeStep,
  setActiveStep,
  count,
  limit,
}) => {
  return (
    <div>
      <div>
        <table className={`table shadow-lg ${!data.length ? 'hidden' : ''}`}>
          {/* head */}
          <thead className="bg-red-500 text-sm text-white">
            <tr>
              <th className="w-1/2 rounded-tl-lg"></th>
              <th className="w-1/2 rounded-tr-lg">Nama Alamat</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <th className="px-20">
                  <input
                    type="radio"
                    name="radio-3"
                    className="radio radio-error"
                    onClick={() => setSelectedAddress(item)}
                    checked={selectedAddress === item ? true : false}
                  />
                </th>
                <td>
                  <div>
                    <h1 className="font-bold">{item.nama}</h1>
                    <p className="font-medium">
                      {item.provinsi}, {item.kabupaten}, {item.kecamatan},{' '}
                      {item.kelurahan}, {item.detail}
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className={`join grid grid-cols-2 max-w-60 mx-auto mt-5 mb-5 ${
            !data.length ? 'hidden' : ''
          }`}
        >
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

        {!data.length && status === 'success' ? (
          <div className="mt-10 mb-20 flex justify-center items-center">
            <Link className="flex flex-col" to={'/alamat-pengiriman/tambah'}>
              <span className="font-mono">
                Kamu belum memiliki alamat pengiriman!
              </span>{' '}
              <br />
              <button className="btn btn-error text-white">
                Tambah Alamat
              </button>
            </Link>
          </div>
        ) : null}
      </div>

      <div className="w-full flex justify-between">
        <button
          className="btn bg-neutral-700 text-white"
          onClick={() =>
            activeStep === 0 ? setActiveStep(0) : setActiveStep(activeStep - 1)
          }
        >
          <FaArrowLeft /> Sebelumnya
        </button>
        <button
          className="btn btn-error text-white"
          disabled={!selectedAddress}
          onClick={() =>
            activeStep === 2 ? setActiveStep(2) : setActiveStep(activeStep + 1)
          }
        >
          Selanjutnya <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default SecondStep;
