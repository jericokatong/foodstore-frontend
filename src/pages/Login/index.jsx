import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { rules } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login } from '../../api/auth';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { userLogin } from '../../features/Auth/actions';
import { getCart } from '../../api/cart';

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

const Login = () => {
  const [status, setStatus] = useState(statuslist.idle);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (formData) => {
    setStatus(statuslist.process);

    let { data } = await login(formData);

    if (data.error) {
      setError('password', {
        type: 'invalidCredential',
        message: data.message,
      });

      setStatus(statuslist.error);
      return;
    }
    let { user, token } = data;
    dispatch(userLogin(user, token));

    await getCart();

    setStatus(statuslist.success);
    navigate('/');
  };

  return (
    <div className="container h-screen w-full flex justify-center items-center max-w-lg mx-auto">
      <div className="p-4 w-4/5 border shadow-2xl">
        <h1 className="text-red-500 font-bold text-center font-sans text-2xl mb-10">
          FoodStore
        </h1>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div>
            <input
              aria-invalid={errors.email ? 'true' : 'false'}
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              {...register('email', rules.email)}
            />
            {errors.email && (
              <p role="alert" className="text-red-500 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              aria-invalid={errors.password ? 'true' : 'false'}
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              {...register('password', rules.password)}
            />
            {errors.password && (
              <p role="alert" className="text-red-500 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-active btn-error w-full text-white"
            disabled={status === statuslist.process}
          >
            {status === statuslist.process ? 'Processing...' : 'Login'}
          </button>

          <div className="mx-auto text-black">
            Belum punya akun ?
            <Link to={'/register'} className="font-semibold ml-1">
              Daftar Sekarang
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
