import React from 'react';
import { Link } from 'react-router-dom';
import { FaCircleCheck } from 'react-icons/fa6';

const RegisterSuccess = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="h-4/5 flex flex-col items-center">
        <h1 className="font-bold font-sans text-3xl mb-3 text-center tracking-wider">
          Pendaftaran berhasil!
        </h1>
        <p className="mb-10 font-sans">Silahkan masuk ke aplikasi</p>
        <FaCircleCheck className="text-8xl text-green-400" />

        <br />
        <br />

        <Link
          className="btn w-4/5 rounded-md bg-green-400 text-white font-sans hover:bg-green-600"
          to={'/login'}
        >
          Masuk
        </Link>
      </div>
    </div>
  );
};

export default RegisterSuccess;
