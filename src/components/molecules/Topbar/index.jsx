import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FaUser from '@meronex/icons/fa/FaUser';

const Topbar = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <div className="flex flex-row justify-between">
      <div>FoodStore</div>
      <Link
        className="flex gap-3 items-center"
        to={auth?.user ? '/account' : '/login'}
      >
        {auth?.user?.full_name}
        <FaUser />
      </Link>
    </div>
  );
};

export default Topbar;
