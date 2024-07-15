import { Pemandangan } from '../../assets';
import { Sidebar, Topbar } from '../../components/molecules';
import { useDispatch, useSelector } from 'react-redux';
import { Config } from '../../config';
import {
  fetchProducts,
  goToNextPage,
  gotToPrevPage,
  setCategory,
  setKeyword,
  toggleTag,
} from '../../features/Products/actions';
import { useEffect } from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import { tags } from './tags';
import Cart from '../../components/molecules/Cart';
import { addItem, removeItem } from '../../features/Cart/actions';
import { useNavigate } from 'react-router-dom';
import { formatRupiah } from '../../utils/format-rupiah';

const Home = () => {
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
      <div className="flex gap-5 items-center justify-center">
        {tags[products.category]
          ? tags[products.category].map((tag, index) => {
              return (
                <div className="flex items-center" key={index}>
                  <input
                    type="checkbox"
                    className="checkbox cursor-pointer"
                    id={`checkbox-${index}`}
                    onChange={() => dispatch(toggleTag(tag))}
                  />
                  <label
                    htmlFor={`checkbox-${index}`}
                    className="cursor-pointer"
                  >
                    {tag}
                  </label>
                </div>
              );
            })
          : ''}
      </div>
      <div className="flex flex-row bg-neutral-100 overflow-hidden">
        <Sidebar dispatch={dispatch} setCategory={setCategory} />
        <div className="w-screen h-screen flex flex-col sm:flex sm:flex-row">
          <div className="shop-cart bg-neutral-200 w-full h-40 sm:w-60 sm:h-full sm:overflow-y-auto">
            <Cart
              items={cart}
              onItemInc={(item) => dispatch(addItem(item))}
              onItemDec={(item) => dispatch(removeItem(item))}
              onCheckout={() => navigate('/checkout')}
            />
          </div>
          <div className="main-content bg-neutral-50 w-full h-full overflow-y-scroll flex flex-col items-center">
            <div className="container mx-auto px-5 mb-5">
              <Topbar />
              <label className="input input-bordered flex items-center gap-2 rounded-full !outline-none">
                <input
                  type="text"
                  className="grow"
                  placeholder="cari makanan favoritmu..."
                  value={products.keyword}
                  onChange={(e) => dispatch(setKeyword(e.target.value))}
                />
              </label>
            </div>
            {products.status === 'process' && !products.data.length ? (
              <div className="flex justify-center">
                <BounceLoader color="red" />
              </div>
            ) : null}
            <div className="flex justify-center items-center px-5">
              <div className="flex gap-7 flex-wrap">
                {products.data.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className="card w-72 h-52 bg-white shadow-xl box-content overflow-hidden"
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
                              }
                              dispatch(addItem(product));
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
            <div className="join grid grid-cols-2 mt-8 mb-40">
              <button
                className="join-item btn btn-outline"
                onClick={() => dispatch(gotToPrevPage())}
              >
                Previous page
              </button>
              <button
                className="join-item btn btn-outline"
                onClick={() => dispatch(goToNextPage())}
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
