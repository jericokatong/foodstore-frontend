import React from 'react';

const SearchInput = ({ products, dispatch, setKeyword }) => {
  return (
    <label className="input input-bordered flex items-center gap-2 rounded-full !outline-none h-9">
      <input
        type="text"
        className="grow"
        placeholder="cari makanan favoritmu..."
        value={products.keyword}
        onChange={(e) => dispatch(setKeyword(e.target.value))}
      />
    </label>
  );
};

export default SearchInput;
