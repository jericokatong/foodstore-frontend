import React from 'react';

const StatusLabel = ({ status }) => {
  switch (status) {
    case 'waiting_payment':
      return <div className="badge badge-warning">Menunggu Pembayaran</div>;

    case 'paid':
      return <div className="badge badge-success">Sudah dibayar</div>;

    case 'processing':
      return <div className="badge badge-warning">Sedang diproses</div>;

    case 'in_delivery':
      return <div className="badge badge-info">Dalam pengiriman</div>;

    case 'delivered':
      return <div className="badge badge-success">Pesanan diterima</div>;

    default:
      return <div />;
  }
};

export default StatusLabel;
