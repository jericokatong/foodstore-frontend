import React from 'react';
import PropTypes, { number, oneOfType, shape, string } from 'prop-types';
import { Config } from '../../../config';
import FaArrowRight from '@meronex/icons/fa/FaArrowRight';
import FaCartPlus from '@meronex/icons/fa/FaCartPlus';
import { sumPrice } from '../../../utils/sum-price';
import { formatRupiah } from '../../../utils/format-rupiah';
import { FaPlusCircle } from 'react-icons/fa';
import { FaCircleMinus } from 'react-icons/fa6';

const Cart = ({ items, onItemInc, onItemDec, onCheckout, toggleCart }) => {
  let total = sumPrice(items);

  return (
    <div>
      <div className="px-2">
        <div className="flex gap-2 items-center text-2xl font-sans font-medium text-red-500">
          <FaCartPlus />
          <h1>Keranjang</h1>
        </div>
        <p className="font-bold mb-2">Total: {formatRupiah(total)}</p>

        <button
          className="btn btn-error text-white w-full min-h-8 h-8 rounded-lg"
          disabled={!items.length}
          onClick={onCheckout}
        >
          Checkout <FaArrowRight />
        </button>
      </div>
      <div className="flex flex-wrap gap-5 justify-center mt-5 mb-4 px-2">
        {!items.length ? (
          <div className="text-center text-sm text-red-900">
            belum ada items di keranjang
          </div>
        ) : null}

        {items.map((item, index) => {
          return (
            <div
              key={index}
              className={`${
                toggleCart ? '' : 'hidden'
              } flex gap-5 flex-row justify-between items-center bg-red-500 w-full py-5 px-5 rounded-lg text-white md:flex md:flex-col md:justify-center md:items-center`}
            >
              <img
                className="w-14 h-14 bg-white rounded-lg"
                src={`${Config.api_host}/upload/${item.image_url}`}
                alt=""
              />
              <p className="font-bold text-start md:text-center text-wrap w-full">
                {item.name}
              </p>

              <div className="flex justify-center gap-2">
                <button onClick={() => onItemDec(item)}>
                  <FaCircleMinus />
                </button>
                <p>{item.qty}</p>
                <button onClick={() => onItemInc(item)}>
                  <FaPlusCircle />
                </button>
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
  toggleCart: PropTypes.bool,
};

export default Cart;
