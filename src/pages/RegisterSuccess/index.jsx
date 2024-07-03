import React from 'react';
import { Link } from 'react-router-dom';

const RegisterSuccess = () => {
  return (
    <div>
      <h1>Pendaftaran berhasil</h1>
      <p>Silahkan masuk ke aplikasi</p>

      <br />

      <Link to={'/login'}>Masuk</Link>
    </div>
  );
};

export default RegisterSuccess;
