import { useForm } from 'react-hook-form';
import { rules } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerUser } from '../../api/auth';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const schema = yup.object({
  full_name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match'),
});

const Register = () => {
  const [status, setStatus] = useState(statuslist.idle);
  const navigate = useNavigate();

  let {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (formData) => {
    setStatus(statuslist.process);

    let { data } = await registerUser(formData);

    if (data.error) {
      let fields = Object.keys(data.fields);
      fields.forEach((field) => {
        setError(field, {
          type: 'server',
          message: data.fields[field]?.properties?.message,
        });
      });

      setStatus(statuslist.error);
      return;
    }

    setStatus(statuslist.success);
    navigate('/register/berhasil');
  };
  return (
    <div className="container mx-auto h-screen w-full flex justify-center items-center">
      <div className="p-4 w-4/5 shadow-2xl border">
        <h1 className="text-red-500 font-sans text-2xl font-bold text-center mb-10">
          FoodStore
        </h1>

        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div>
            <input
              aria-invalid={errors.full_name ? 'true' : 'false'}
              name="full-name"
              type="text"
              placeholder="Nama Lengkap"
              className="input input-bordered w-full max-w-xs"
              {...register('full_name', rules.full_name)}
            />
            {errors.full_name && (
              <p role="alert" className="ml-1 text-red-500">
                {errors.full_name.message}
              </p>
            )}
          </div>

          <div>
            <input
              aria-invalid={errors.email ? 'true' : 'false'}
              name="email"
              type="text"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs"
              {...register('email', rules.email)}
            />
            {errors.email && (
              <p role="alert" className="ml-1 text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              aria-invalid={errors.password ? 'true' : 'false'}
              name="password"
              type="text"
              placeholder="Password"
              className="input input-bordered w-full max-w-xs"
              {...register('password', rules.password)}
            />
            {errors.password && (
              <p role="alert" className="ml-1 text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <input
              aria-invalid={errors.password_confirmation ? 'true' : 'false'}
              name="password_confirmation"
              type="text"
              placeholder="Konfirmasi Password"
              className="input input-bordered w-full max-w-xs"
              {...register(
                'password_confirmation',
                rules.password_confirmation
              )}
            />
            {errors.password_confirmation && (
              <p role="alert" className="ml-1 text-red-500">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-active btn-error text-white w-full"
            disabled={status === statuslist.process}
          >
            {status === statuslist.process ? 'Processing...' : 'Mendaftar'}
          </button>
          <p className="text-center">
            Sudah punya akun?
            <Link to={'/login'} className="ml-1 text-black font-semibold">
              Masuk Sekarang
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
