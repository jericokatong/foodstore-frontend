import React from 'react';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import FaCartPlus from '@meronex/icons/fa/FaCartPlus';

const ResponsiveSidebar = ({
  toggleCategory,
  setToggleCategory,
  toggleCart,
  setToggleCart,
}) => {
  return (
    <div className="fixed md:hidden bottom-0 left-0 right-0 bg-red-500 z-30 px-4 text-white font-bold text-xs">
      <ul className="flex justify-between">
        <li
          className="flex flex-col items-center cursor-pointer transition ease-in delay-100 hover:bg-red-600 px-4 py-4"
          onClick={() => setToggleCategory(!toggleCategory)}
        >
          <BiSolidCategoryAlt className="text-xl" />
          <span>Category</span>
        </li>
        <li
          className="flex flex-col items-center cursor-pointer transition ease-in delay-100 hover:bg-red-600 px-4 py-4"
          onClick={() => setToggleCart(!toggleCart)}
        >
          <FaCartPlus className="text-xl" />
          <span>Keranjang</span>
        </li>
      </ul>
    </div>
  );
};

export default ResponsiveSidebar;
