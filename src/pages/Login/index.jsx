import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { rules } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login } from '../../api/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../features/Auth/actions';

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
    console.log(formData);
    setStatus(statuslist.process);

    let { data } = await login(formData);

    console.log(data);
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

    navigate('/');

    setStatus(statuslist.success);
  };

  return (
    <div>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            aria-invalid={errors.email ? 'true' : 'false'}
            name="email"
            type="email"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            {...register('email', rules.email)}
          />
          {errors.email && <p role="alert">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            aria-invalid={errors.password ? 'true' : 'false'}
            name="password"
            type="password"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            {...register('password', rules.password)}
          />
          {errors.password && <p role="alert">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="btn btn-active btn-primary"
          disabled={status === statuslist.process}
        >
          {status === statuslist.process ? 'Sedang memproses' : 'Mendaftar'}
        </button>
      </form>
    </div>
  );
};

export default Login;
