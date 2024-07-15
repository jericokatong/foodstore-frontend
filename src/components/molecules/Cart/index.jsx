import React from 'react';
import PropTypes, { number, oneOfType, shape, string } from 'prop-types';
import { Config } from '../../../config';
import FaArrowRight from '@meronex/icons/fa/FaArrowRight';
import FaCartPlus from '@meronex/icons/fa/FaCartPlus';
import { sumPrice } from '../../../utils/sum-price';
import { formatRupiah } from '../../../utils/format-rupiah';

const Cart = ({ items, onItemInc, onItemDec, onCheckout }) => {
  let total = sumPrice(items);

  return (
    <div>
      <div className="px-2">
        <div className="flex gap-2 items-center text-2xl font-sans font-medium text-red-500">
          <FaCartPlus />
          <h1>Keranjang</h1>
        </div>
        <p className="font-bold">Total: {formatRupiah(total)}</p>

        <button
          className="btn btn-secondary w-full"
          disabled={!items.length}
          onClick={onCheckout}
        >
          Checkout <FaArrowRight />
        </button>
      </div>
      <div className="flex flex-wrap gap-5 justify-center mt-5 mb-40">
        {!items.length ? (
          <div className="text-center text-sm text-red-900">
            belum ada items di keranjang
          </div>
        ) : null}

        {items.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col justify-center items-center"
            >
              <img
                className="w-20"
                src={`${Config.api_host}/upload/${item.image_url}`}
                alt=""
              />

              <p>{item.name}</p>
              <p>{item.qty}</p>
              <div className="flex justify-between gap-2">
                <button onClick={() => onItemDec(item)}>kurang</button>
                <button onClick={() => onItemInc(item)}>tambah</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Cart.propTypes = {
  items: PropTypes.arrayOf(
    shape({
      _id: string.isRequired,
      name: string.isRequired,
      qty: oneOfType([string, number]).isRequired,
    })
  ),
  onItemDec: PropTypes.func,
  onItemInc: PropTypes.func,
  onCheckout: PropTypes.func,
};

export default Cart;
