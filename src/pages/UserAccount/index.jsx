import React from 'react';
import { Topbar } from '../../components/molecules';
import FaHome from '@meronex/icons/fa/FaHome';
import FaAddressBook from '@meronex/icons/fa/FaAddressBook';
import FaArrowRight from '@meronex/icons/fa/FaArrowRight';
import FaFileInvoice from '@meronex/icons/fa/FaFileInvoice';
import { Link } from 'react-router-dom';

const UserAccount = () => {
  return (
    <div className="px-5">
      <div className="w-full">
        <Topbar />
        <h1 className="text-black font-bold font-sans px-1">Akun Anda</h1>
      </div>
      <div className="w-full flex mt-4 flex-row gap-4 items-center justify-center flex-wrap">
        <Link to={'/'}>
          <div className="card bg-base-100 w-48 shadow-xl">
            <div className="card-body flex items-center bg-red-500 rounded-lg text-white">
              <FaHome className="text-2xl" />
              <h2 className="card-title">Beranda</h2>
            </div>
          </div>
        </Link>

        <Link to={'/alamat-pengiriman'}>
          <div className="card bg-base-100 w-48 shadow-xl">
            <div className="card-body flex justify-center items-center bg-red-500 rounded-lg text-white">
              <FaAddressBook className="text-2xl" />
              <h2 className="card-title">Alamat</h2>
            </div>
          </div>
        </Link>

        <Link to={'/pesanan'}>
          <div className="card bg-base-100 w-48 shadow-xl">
            <div className="card-body flex justify-center items-center bg-red-500 rounded-lg text-white">
              <FaFileInvoice className="text-2xl" />
              <h2 className="card-title">Pesanan</h2>
            </div>
          </div>
        </Link>

        <Link to={'/logout'}>
          <div className="card bg-base-100 w-48 shadow-xl">
            <div className="card-body flex justify-center items-center bg-red-500 rounded-lg text-white">
              <FaArrowRight className="text-2xl" />
              <h2 className="card-title">Logout</h2>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserAccount;
