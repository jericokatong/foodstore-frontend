import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Sidebar,
  Topbar,
  Cart,
  ResponsiveSidebar,
} from '../../components/molecules';
import { Config } from '../../config';
import {
  fetchProducts,
  goToNextPage,
  gotToPrevPage,
  setCategory,
  setKeyword,
  toggleTag,
} from '../../features/Products/actions';
import BounceLoader from 'react-spinners/BounceLoader';
import { tags } from './tags';
import { addItem, removeItem } from '../../features/Cart/actions';
import { formatRupiah } from '../../utils/format-rupiah';
import { IoArrowUpCircle } from 'react-icons/io5';
import { SearchInput } from '../../components/atoms';

const Home = () => {
  const [toggleCategory, setToggleCategory] = useState(false);
  const [toggleCart, setToggleCart] = useState(false);
  let dispatch = useDispatch();
  let products = useSelector((state) => state.products);
  let auth = useSelector((state) => state.auth);
  let cart = useSelector((state) => state.cart);
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [
    dispatch,
    products.currentPage,
    products.keyword,
    products.category,
    products.tags,
  ]);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex flex-row bg-neutral-100 overflow-hidden">
        <ResponsiveSidebar
          toggleCategory={toggleCategory}
          setToggleCategory={setToggleCategory}
          toggleCart={toggleCart}
          setToggleCart={setToggleCart}
        />
        <Sidebar
          dispatch={dispatch}
          setCategory={setCategory}
          toggleCategory={toggleCategory}
          setToggleCategory={setToggleCategory}
        />
        <div className="w-screen h-screen flex flex-col sm:flex sm:flex-row">
          {/* CART */}
          <div
            className={`${
              toggleCart
                ? 'fixed top-0 left-0 right-0 bottom-0 overflow-y-scroll z-30 translate-y-0'
                : 'fixed top-0 left-0 right-0 bottom-0 -translate-y-full'
            } transition ease-in-out delay-150 duration-300 shop-cart bg-neutral-200 w-full md:w-60 md:h-full md:overflow-y-auto md:transform-none md:static`}
          >
            <IoArrowUpCircle
              className="cursor-pointer mx-auto text-3xl text-red-500 mt-3 hover:bg-slate-300 rounded-md md:hidden"
              onClick={() => setToggleCart(!toggleCart)}
            />
            <Cart
              items={cart}
              onItemInc={(item) => dispatch(addItem(item))}
              onItemDec={(item) => dispatch(removeItem(item))}
              onCheckout={() => navigate('/checkout')}
              toggleCart={toggleCart}
            />
          </div>

          <div className="main-content bg-neutral-50 w-full h-full overflow-y-scroll flex flex-col items-center">
            <div className="container mx-auto px-5">
              <Topbar />
              <SearchInput
                products={products}
                dispatch={dispatch}
                setKeyword={setKeyword}
              />
            </div>

            <div
              className={`flex gap-5 items-center justify-start flex-wrap w-full px-8 ${
                tags[products.category] === '' ? '' : 'mb-3 mt-3'
              }`}
            >
              {tags[products.category]
                ? tags[products.category].map((tag, index) => {
                    return (
                      <div
                        className="form-control bg-red-500 rounded-lg w-36 px-2"
                        key={index}
                      >
                        <label className="label cursor-pointer flex gap-2 items-center justify-center">
                          <span className="label-text font-mono text-white capitalize">
                            {tag}
                          </span>
                          <input
                            type="checkbox"
                            className="toggle toggle-error"
                            onChange={() => dispatch(toggleTag(tag))}
                          />
                        </label>
                      </div>
                    );
                  })
                : ''}
            </div>

            {products.status === 'process' && !products.data.length ? (
              <div className="flex justify-center">
                <BounceLoader color="red" />
              </div>
            ) : null}
            <div className="flex justify-center items-center px-8">
              <div className="flex gap-7 flex-wrap justify-center md:justify-center">
                {products.data.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className="card w-72 h-57 md:h-52 md:w-64 md:max-w-72 bg-white shadow-xl box-content overflow-hidden"
                    >
                      <figure>
                        <div className="border-black bg-red-500 w-full flex items-center justify-center">
                          <img
                            className="object-cover w-36 h-36"
                            src={`${Config.api_host}/upload/${product.image_url}`}
                            alt={product.name}
                          />
                        </div>
                      </figure>
                      <div className="card-body h-28 flex flex-row justify-between items-center py-3">
                        <div>
                          <h2 className="card-title">{product.name}</h2>
                          <p>{formatRupiah(product.price)}</p>
                        </div>
                        <div className="card-actions justify-end">
                          <button
                            className="btn bg-red-500 text-white"
                            onClick={() => {
                              if (!auth.user) {
                                navigate('/login');
                              } else {
                                dispatch(addItem(product));
                              }
                            }}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="join grid grid-cols-2 mt-8 mb-20">
              <button
                className="join-item btn btn-outline"
                onClick={() => dispatch(gotToPrevPage())}
                disabled={products.currentPage === 1}
              >
                Previous page
              </button>
              <button
                className="join-item btn btn-outline"
                onClick={() => dispatch(goToNextPage())}
                disabled={
                  products.currentPage ===
                  Math.ceil(products.totalItems / products.perPage)
                }
              >
                Next
              </button>
              <p>Page: {products.currentPage}</p>
              <p>
                Total Page: {Math.ceil(products.totalItems / products.perPage)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
