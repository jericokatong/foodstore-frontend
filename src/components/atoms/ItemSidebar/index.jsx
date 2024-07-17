import PropTypes from 'prop-types';
const ItemSidebar = ({
  title,
  icon,
  dispatch,
  setCategory,
  activeItem,
  setActiveItem,
  toggleCategory,
  setToggleCategory,
}) => {
  return (
    <div
      className={`font-sans font-medium flex flex-col items-center fill-white cursor-pointer w-full p-2 ${
        activeItem === title
          ? 'bg-red-500 rounded-lg'
          : 'hover:bg-red-500 hover:rounded-lg'
      }`}
      onClick={() => {
        dispatch(setCategory(title));
        setActiveItem(title);
        if (toggleCategory === true) {
          setToggleCategory(!toggleCategory);
        }
      }}
    >
      <div className="text-xl">{icon}</div>
      <span className="text-xs">{title}</span>
    </div>
  );
};

ItemSidebar.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.object,
  dispatch: PropTypes.func,
  setCategory: PropTypes.func,
  activeItem: PropTypes.string,
  setActiveItem: PropTypes.func,
  toggleCategory: PropTypes.bool,
  setToggleCategory: PropTypes.func,
};
export default ItemSidebar;
