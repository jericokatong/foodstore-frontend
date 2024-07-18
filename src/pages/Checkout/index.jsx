import React, { useState } from 'react';
import { Topbar } from '../../components/molecules';
import { useSelector, useDispatch } from 'react-redux';
import { clearItems } from '../../features/Cart/actions';
import { Config } from '../../config';
import { formatRupiah } from '../../utils/format-rupiah';
import { sumPrice } from '../../utils/sum-price';
import { useAddressData } from '../../hooks/address';
import { useNavigate, redirect } from 'react-router-dom';
import { createOrder } from '../../api/order';
import { HiTemplate } from 'react-icons/hi';
import { FaAddressCard } from 'react-icons/fa6';
import { FaCircleCheck } from 'react-icons/fa6';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, status, limit, page, count, setPage } = useAddressData();

  const handleCreateOrder = async () => {
    let payload = {
      delivery_fee: Config.global_ongkir,
      delivery_address: selectedAddress._id,
    };

    let { data } = await createOrder(payload);

    if (data?.error) return;

    navigate(`/invoice/${data._id}`);
    dispatch(clearItems());
  };

  if (!cart.length) return redirect('/');
  return (
    <div className="px-5">
      <Topbar />
      <h1 className="font-sans font-bold text-black px-1 mb-6">Checkout</h1>

      <div className="flex items-center justify-center gap-1 md:w-full md:justify-between md:gap-5 mb-7">
        <div
          className={`${
            activeStep === 0 ? 'bg-red-500 text-white' : 'text-slate-500'
          } border shadow-xl w-28 md:w-2/3 h-20 md:h-32 flex flex-col items-center justify-center gap-1 rounded-lg`}
        >
          <div>
            <HiTemplate className="text-3xl md:text-6xl" />
          </div>
          <h1 className="text-sm md:text-lg">Item</h1>
        </div>

        <div
          className={`${
            activeStep === 0 ? 'bg-slate-500' : 'bg-red-500'
          }  w-14 md:w-full h-[2px] rounded-md`}
        ></div>

        <div
          className={`${
            activeStep === 1 ? 'bg-red-500 text-white' : 'text-slate-500'
          } border shadow-xl w-28 md:w-2/3 h-20 md:h-32 flex flex-col items-center justify-center gap-1 rounded-lg`}
        >
          <div>
            <FaAddressCard className="text-3xl md:text-6xl" />
          </div>
          <h1 className="text-sm md:text-lg">Alamat</h1>
        </div>

        <div
          className={`${
            activeStep === 2 ? 'bg-red-500' : 'bg-slate-500'
          }  w-14 md:w-full h-[2px] rounded-md`}
        ></div>

        <div
          className={`${
            activeStep === 2 ? 'bg-red-500 text-white' : 'text-slate-500'
          } border shadow-xl w-28 md:w-2/3 h-20 md:h-32 flex flex-col items-center justify-center gap-1 rounded-lg`}
        >
          <div>
            <FaCircleCheck className="text-3xl md:text-6xl" />
          </div>
          <h1 className="text-sm md:text-lg">Konfirmasi</h1>
        </div>
      </div>
      {activeStep === 0 ? (
        <FirstStep
          cart={cart}
          formatRupiah={formatRupiah}
          sumPrice={sumPrice}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      ) : null}

      {activeStep === 1 ? (
        <SecondStep
          data={data}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          page={page}
          setPage={setPage}
          status={status}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          count={count}
          limit={limit}
        />
      ) : null}
      {activeStep === 2 ? (
        <ThirdStep
          selectedAddress={selectedAddress}
          formatRupiah={formatRupiah}
          sumPrice={sumPrice}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          cart={cart}
          handleCreateOrder={handleCreateOrder}
        />
      ) : null}
    </div>
  );
};

export default Checkout;
