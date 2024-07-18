import { ItemSidebar } from '../../atoms';
import { RiDashboardHorizontalLine } from 'react-icons/ri';
import { IoFastFoodSharp } from 'react-icons/io5';
import { RiDrinksFill } from 'react-icons/ri';
import { FaCookie } from 'react-icons/fa';
import { GiCakeSlice } from 'react-icons/gi';
import { useState } from 'react';
import { FaArrowCircleDown } from 'react-icons/fa';

const Sidebar = ({
  dispatch,
  setCategory,
  toggleCategory,
  setToggleCategory,
}) => {
  const [activeItem, setActiveItem] = useState('Semua');

  return (
    <div
      className={`${
        toggleCategory
          ? 'fixed flex flex-col justify-between items-center left-0 right-0 bottom-0 top-0 z-40 translate-y-0'
          : 'fixed flex flex-col justify-between items-center left-0 right-0 bottom-0 top-0 z-40 translate-y-full'
      } transition ease-in delay-150 duration-300 side-bar bg-red-400 md:w-[70px] text-white md:flex md:flex-col md:gap-4 md:items-center md:justify-start md:py-5 md:static md:transform-none`}
    >
      <div className="w-full md:flex md:flex-col md:gap-2">
        <ItemSidebar
          title="Semua"
          icon={<RiDashboardHorizontalLine />}
          dispatch={dispatch}
          setCategory={setCategory}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          toggleCategory={toggleCategory}
          setToggleCategory={setToggleCategory}
        />

        <ItemSidebar
          title="Utama"
          icon={<IoFastFoodSharp />}
          dispatch={dispatch}
          setCategory={setCategory}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          toggleCategory={toggleCategory}
          setToggleCategory={setToggleCategory}
        />

        <ItemSidebar
          title="Minuman"
          icon={<RiDrinksFill />}
          dispatch={dispatch}
          setCategory={setCategory}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          toggleCategory={toggleCategory}
          setToggleCategory={setToggleCategory}
        />

        <ItemSidebar
          title="Snack"
          icon={<FaCookie />}
          dispatch={dispatch}
          setCategory={setCategory}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          toggleCategory={toggleCategory}
          setToggleCategory={setToggleCategory}
        />

        <ItemSidebar
          title="Pastry"
          icon={<GiCakeSlice />}
          dispatch={dispatch}
          setCategory={setCategory}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          toggleCategory={toggleCategory}
          setToggleCategory={setToggleCategory}
        />
      </div>
      <div
        onClick={() => setToggleCategory(!toggleCategory)}
        className="mb-7 cursor-pointer md:hidden"
      >
        <div className="p-3 hover:bg-red-700 rounded-md transition delay-75">
          <FaArrowCircleDown className="text-xl" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
