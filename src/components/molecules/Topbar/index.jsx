import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FaUser from '@meronex/icons/fa/FaUser';

const Topbar = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <div className="flex flex-row justify-between mb-2">
      <h1 className="text-3xl font-sans font-bold text-red-500">FoodStore</h1>

      <Link
        className="flex gap-1 items-center text-md text-red-500 hover:bg-neutral-100 hover:rounded-lg px-1"
        to={auth?.user ? '/account' : '/login'}
      >
        {auth?.user?.full_name}
        <FaUser />
      </Link>
    </div>
  );
};

export default Topbar;
