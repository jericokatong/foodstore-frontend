import PropTypes from 'prop-types';
const ItemSidebar = ({ title, xmlns, viewBox, d, dispatch, setCategory }) => {
  return (
    <div
      className="flex flex-col items-center fill-white w-8 cursor-pointer"
      onClick={() => dispatch(setCategory(title))}
    >
      <svg xmlns={xmlns} viewBox={viewBox}>
        <path d={d} />
      </svg>
      <span>{title}</span>
    </div>
  );
};

ItemSidebar.propTypes = {
  title: PropTypes.string,
  xmlns: PropTypes.string,
  viewBox: PropTypes.string,
  d: PropTypes.string,
  dispatch: PropTypes.func,
  setCategory: PropTypes.func,
};
export default ItemSidebar;
