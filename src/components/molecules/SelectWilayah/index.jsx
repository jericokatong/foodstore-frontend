import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Config } from '../../../config';
import PropTypes, { string, number } from 'prop-types';

const SelectWilayah = ({
  tingkat = 'provinsi',
  kodeInduk,
  onChange,
  value,
  register,
}) => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    axios
      .get(`${Config.api_host}/api/wilayah/${tingkat}?kode_induk=${kodeInduk}`)
      .then(({ data }) => setData(data))
      .finally(() => setIsFetching(false));
  }, [kodeInduk, tingkat, value]);

  return (
    <div>
      <select
        className="select select-bordered w-full max-w-xs"
        onChange={onChange}
        value={value || ''}
        {...register}
      >
        <option value="">{tingkat}</option>
        {data.map((wilayah, index) => (
          <option
            key={index}
            label={wilayah.nama}
            value={JSON.stringify(wilayah)}
          >
            {wilayah.nama}
          </option>
        ))}
      </select>
    </div>
  );
};

SelectWilayah.propTypes = {
  tingkat: PropTypes.oneOf(['provinsi', 'kabupaten', 'kecamatan', 'desa']),
  kodeInduk: PropTypes.oneOfType([number, string]),
  onChange: PropTypes.func,
};

export default SelectWilayah;
