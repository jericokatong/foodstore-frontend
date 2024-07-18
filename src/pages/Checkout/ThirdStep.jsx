import React from 'react';
import { Config } from '../../config';
import FaArrowLeft from '@meronex/icons/fa/FaArrowLeft';
import FaRegCheckCircle from '@meronex/icons/fa/FaRegCheckCircle';

const ThirdStep = ({
  selectedAddress,
  formatRupiah,
  sumPrice,
  activeStep,
  setActiveStep,
  cart,
  handleCreateOrder,
}) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table shadow-lg mb-10">
          {/* head */}
          <thead className="bg-red-500">
            <tr className="h-10">
              <td className="rounded-tl-lg w-1/2"></td>
              <td className="rounded-tr-lg w-1/2"></td>
            </tr>
          </thead>

          <tbody className="text-black font-medium">
            <tr>
              <th>Alamat</th>
              <td>
                {selectedAddress.nama} <br />
                {selectedAddress.provinsi}, {selectedAddress.kabupaten},
                {selectedAddress.kecamatan}, {selectedAddress.kelurahan},{' '}
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
                {formatRupiah(sumPrice(cart) + parseInt(Config.global_ongkir))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-between mb-2">
        <button
          className="btn bg-neutral-700 text-white h-9 min-h-9"
          onClick={() =>
            activeStep === 0 ? setActiveStep(0) : setActiveStep(activeStep - 1)
          }
        >
          <FaArrowLeft /> Sebelumnya
        </button>
        <button
          className="btn btn-error text-white h-9 min-h-9"
          onClick={handleCreateOrder}
        >
          <FaRegCheckCircle />
          Bayar
        </button>
      </div>
    </div>
  );
};

export default ThirdStep;
