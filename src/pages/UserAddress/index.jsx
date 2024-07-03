import React from 'react';
import TopBar from '../../components/molecules/Topbar';
import { useAddressData } from '../../hooks/address';
import { Link } from 'react-router-dom';

const UserAddress = () => {
  let { data, limit, page, status, count, setPage } = useAddressData();

  return (
    <div>
      <TopBar />
      <p>Alamat pengiriman</p>

      <Link className="btn btn-neutral" to={'/alamat-pengiriman/tambah'}>
        Tambah Baru
      </Link>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item.nama}</td>
                <td>
                  {item.provinsi}, {item.kabupaten}, {item.kecamatan},{' '}
                  {item.kelurahan} <br />
                  {item.detail}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {status === 'success' && !data.length ? (
          <div>
            Kamu belum menambahkan alamat pengiriman.
            <Link className="btn btn-neutral" to={'/alamat-pengiriman/tambah'}>
              Tambah Baru
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserAddress;
