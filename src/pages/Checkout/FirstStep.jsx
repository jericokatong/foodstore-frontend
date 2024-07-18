import React from 'react';
import { Config } from '../../config';
import FaArrowRight from '@meronex/icons/fa/FaArrowRight';

const FirstStep = ({
  cart,
  formatRupiah,
  sumPrice,
  activeStep,
  setActiveStep,
}) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table shadow-lg">
          {/* head */}
          <thead className="bg-red-500 text-white text-sm">
            <tr>
              <th className="rounded-tl-lg">Nama Produk</th>
              <th>Jumlah</th>
              <th>Harga Satuan</th>
              <th className="rounded-tr-lg">Harga Total</th>
            </tr>
          </thead>
          <tbody className="text-black font-medium">
            {cart &&
              cart.map((item, index) => (
                <tr key={index}>
                  <td className="flex items-center gap-3">
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
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <p className="text-lg font-bold">
                  Subtotal: {formatRupiah(sumPrice(cart))}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <div className="w-full flex justify-end">
          <button
            className="btn btn-error w-36 h-8 min-h-8 text-white"
            onClick={() =>
              activeStep === 2
                ? setActiveStep(2)
                : setActiveStep(activeStep + 1)
            }
          >
            Selanjutnya
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstStep;
