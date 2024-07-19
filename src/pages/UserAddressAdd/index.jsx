import React, { useEffect } from 'react';
import { rules } from './validation';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import SelectWilayah from '../../components/molecules/SelectWilayah';
import { createAddress } from '../../api/address';

const UserAddressAdd = () => {
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  let allFields = watch();

  const updateValue = (field, value) =>
    setValue(field, value, { shouldValidate: true, shouldDirty: true });

  const onSubmit = async (formData) => {
    const payload = {
      nama: formData.nama_alamat,
      detail: formData.detail_alamat,
      provinsi: JSON.parse(formData.provinsi).nama,
      kabupaten: JSON.parse(formData.kabupaten).nama,
      kecamatan: JSON.parse(formData.kecamatan).nama,
      kelurahan: JSON.parse(formData.kelurahan).nama,
    };

    let { data } = await createAddress(payload);

    if (data.error) {
      return;
    }

    navigate('/alamat-pengiriman');
  };

  useEffect(() => {
    setValue('kabupaten', null);
    setValue('kecamatan', null);
    setValue('kelurahan', null);
  }, [allFields.provinsi, setValue]);

  useEffect(() => {
    setValue('kecamatan', null);
    setValue('kelurahan', null);
  }, [allFields.kabupaten, setValue]);

  useEffect(() => {
    setValue('kelurahan', null);
  }, [allFields.kecamatan, setValue]);

  return (
    <div className="w-full flex justify-center items-center rounded-lg">
      <div className="my-5 border shadow-lg p-3">
        <h1 className="font-sans font-bold text-red-500 text-center text-xl mb-10">
          Tambah Alamat
        </h1>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <div>
            <label htmlFor="nama-alamat" className="block">
              Nama Alamat
            </label>
            <input
              aria-invalid={errors.nama_alamat ? 'true' : 'false'}
              name="nama_alamat"
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              {...register('nama_alamat', rules.nama_alamat)}
            />
            {errors.nama_alamat && (
              <p role="alert">{errors.nama_alamat.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="provinsi" className="block">
              Provinsi
            </label>
            <SelectWilayah
              onChange={(option) =>
                updateValue('provinsi', option.target.value)
              }
              name="provinsi"
              value={getValues().provinsi}
              register={register('provinsi', rules.provinsi)}
            />
            {errors.provinsi && <p role="alert">{errors.provinsi.message}</p>}
          </div>

          <div>
            <label htmlFor="kabupaten-kote" className="block">
              Kabupaten/Kota
            </label>
            <SelectWilayah
              tingkat={'kabupaten'}
              kodeInduk={
                getValues().provinsi && JSON.parse(getValues().provinsi).kode
              }
              onChange={(option) =>
                updateValue('kabupaten', option.target.value)
              }
              value={getValues().kabupaten}
              register={register('kabupaten', rules.kabupaten)}
            />
            {errors.kabupaten && <p role="alert">{errors.kabupaten.message}</p>}
          </div>

          <div>
            <label htmlFor="kecamatan" className="block">
              Kecamatan
            </label>
            <SelectWilayah
              tingkat={'kecamatan'}
              kodeInduk={
                getValues().kabupaten && JSON.parse(getValues().kabupaten).kode
              }
              onChange={(option) =>
                updateValue('kecamatan', option.target.value)
              }
              value={getValues().kecamatan}
              register={register('kecamatan', rules.kecamatan)}
            />
            {errors.kabupaten && <p role="alert">{errors.kabupaten.message}</p>}
          </div>

          <div>
            <label htmlFor="kelurahan" className="block">
              Kelurahan
            </label>
            <SelectWilayah
              tingkat={'desa'}
              kodeInduk={
                getValues().kecamatan && JSON.parse(getValues().kecamatan).kode
              }
              onChange={(option) =>
                updateValue('kelurahan', option.target.value)
              }
              value={getValues().kelurahan}
              register={register('kelurahan', rules.kelurahan)}
            />
            {errors.kelurahan && <p role="alert">{errors.kelurahan.message}</p>}
          </div>

          <div>
            <label htmlFor="detail-alamat" className="block">
              Detail Alamat
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Detail Alamat"
              name="detail_alamat"
              {...register('detail_alamat', rules.detail_alamat)}
            ></textarea>
            {errors.detail_alamat && (
              <p role="alert">{errors.detail_alamat.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-error text-white h-9 min-h-9"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserAddressAdd;
