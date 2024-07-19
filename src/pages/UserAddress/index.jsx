import React from 'react';
import TopBar from '../../components/molecules/Topbar';
import { useAddressData } from '../../hooks/address';
import { Link } from 'react-router-dom';

const UserAddress = () => {
  let { data, limit, page, status, count, setPage } = useAddressData();

  return (
    <div className="px-5">
      <TopBar />
      <h1 className="font-sans text-black font-bold px-1 mb-10">Alamat</h1>

      <Link
        className="btn btn-error text-white h-8 min-h-8 w-32 uppercase font-extralight mb-5"
        to={'/alamat-pengiriman/tambah'}
      >
        Tambah Baru
      </Link>
      <div
        className={`overflow-x-auto ${
          status === 'success' && !data.length ? 'hidden' : ''
        }`}
      >
        <table className="table border-collapse">
          {/* head */}
          <thead className="bg-red-500 text-white">
            <tr>
              <th className="border-b-2 border-r-2 border-red-500 rounded-tl-lg font-semibold w-1/2 text-lg">
                Nama
              </th>
              <th className="border-b-2 border-red-500 rounded-tr-lg font-semibold w-1/2 text-lg">
                Detail
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data.map((item, index) => (
              <tr key={index}>
                <td className="text-black font-bold font-sans text-sm">
                  {item.nama}
                </td>
                <td className="text-black font-bold text-justify text-sm">
                  {item.provinsi}, {item.kabupaten}, {item.kecamatan},{' '}
                  {item.kelurahan} <br />
                  {item.detail}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={2} className="border-b-2">
                <div className="join grid grid-cols-2 max-w-60 mx-auto">
                  <button
                    className="join-item btn btn-outline rounded-none"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    Previous page
                  </button>
                  <button
                    className="join-item btn btn-outline"
                    onClick={() => setPage(page + 1)}
                    disabled={page === Math.ceil(count / limit)}
                  >
                    Next
                  </button>
                  <p>Page: {page}</p>
                  <p>Total Page: {Math.ceil(count / limit)}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {status === 'success' && !data.length ? (
        <div>Kamu belum menambahkan alamat pengiriman.</div>
      ) : null}
    </div>
  );
};

export default UserAddress;
