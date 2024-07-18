import React from 'react';

const StatusLabel = ({ status }) => {
  switch (status) {
    case 'waiting_payment':
      return (
        <div className="badge badge-warning p-5 md:p-2 rounded-lg">
          Menunggu Pembayaran
        </div>
      );

    case 'paid':
      return (
        <div className="badge badge-success p-5 md:p-2 rounded-lg">
          Sudah dibayar
        </div>
      );

    case 'processing':
      return (
        <div className="badge badge-warning p-5 md:p-2 rounded-lg">
          Sedang diproses
        </div>
      );

    case 'in_delivery':
      return (
        <div className="badge badge-info p-5 md:p-2 rounded-lg">
          Dalam pengiriman
        </div>
      );

    case 'delivered':
      return (
        <div className="badge badge-success p-5 md:p-2 rounded-lg">
          Pesanan diterima
        </div>
      );

    default:
      return <div />;
  }
};

export default StatusLabel;
