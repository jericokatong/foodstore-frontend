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
      <div>
        <FaCartPlus />
        <h1>Keranjang</h1>
        <p>Total: {formatRupiah(total)}</p>
      </div>
      {!items.length ? (
        <div className="text-center text-sm text-red-900">
          belum ada items di keranjang
        </div>
      ) : null}

      {items.map((item, index) => {
        return (
          <div key={index}>
            <img src={`${Config.api_host}/upload/${item.image_url}`} alt="" />
            <p>{item.name}</p>
            <p>{item.qty}</p>
            <button onClick={() => onItemDec(item)}>kurang</button>
            <button onClick={() => onItemInc(item)}>tambah</button>
          </div>
        );
      })}
      <button
        className="btn btn-secondary"
        disabled={!items.length}
        onClick={onCheckout}
      >
        Checkout <FaArrowRight />
      </button>
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
