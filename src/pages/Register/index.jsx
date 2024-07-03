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
    <div>
      <div>Register</div>

      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="full-name" className="block">
            Nama Lengkap
          </label>
          <input
            aria-invalid={errors.full_name ? 'true' : 'false'}
            name="full-name"
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            {...register('full_name', rules.full_name)}
          />
          {errors.full_name && <p role="alert">{errors.full_name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            aria-invalid={errors.email ? 'true' : 'false'}
            name="email"
            type="text"
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
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            {...register('password', rules.password)}
          />
          {errors.password && <p role="alert">{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="password_confirmation" className="block">
            Konfirmasi Password
          </label>
          <input
            aria-invalid={errors.password_confirmation ? 'true' : 'false'}
            name="password_confirmation"
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            {...register('password_confirmation', rules.password_confirmation)}
          />
          {errors.password_confirmation && (
            <p role="alert">{errors.password_confirmation.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-active btn-primary"
          disabled={status === statuslist.process}
        >
          {status === statuslist.process ? 'Sedang memproses' : 'Mendaftar'}
        </button>
      </form>
      <p>
        Sudah punya akun?<Link to={'/login'}>Masuk Sekarang</Link>
      </p>
    </div>
  );
};

export default Register;
