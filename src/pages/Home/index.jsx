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

const Home = () => {
  let dispatch = useDispatch();
  let products = useSelector((state) => state.products);
  let cart = useSelector((state) => state.cart);
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
    console.log(products);
  }, [
    dispatch,
    products.currentPage,
    products.keyword,
    products.category,
    products.tags,
  ]);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Topbar />
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="cari makanan favoritmu..."
          value={products.keyword}
          onChange={(e) => dispatch(setKeyword(e.target.value))}
        />
      </label>
      {tags[products.category].map((tag, index) => {
        return (
          <div
            className="cursor-pointer"
            key={index}
            onClick={() => dispatch(toggleTag(tag))}
          >
            {tag}
          </div>
        );
      })}
      <div className="flex flex-row bg-neutral-100 overflow-hidden">
        <Sidebar dispatch={dispatch} setCategory={setCategory} />
        <div className="w-screen h-screen flex flex-col sm:flex sm:flex-row">
          <div className="shop-cart bg-neutral-200 w-full h-40 sm:w-60 sm:h-full">
            <Cart
              items={cart}
              onItemInc={(item) => dispatch(addItem(item))}
              onItemDec={(item) => dispatch(removeItem(item))}
              onCheckout={() => navigate('/checkout')}
            />
          </div>
          <div className="main-content bg-neutral-50 w-full h-full overflow-y-scroll flex flex-col items-center">
            main content
            {products.status === 'process' && !products.data.length ? (
              <div className="flex justify-center">
                <BounceLoader color="red" />
              </div>
            ) : null}
            <div className="grid grid-cols-3 gap-4">
              {products.data.map((product, index) => {
                return (
                  <div
                    key={index}
                    className="card w-50 bg-base-100 shadow-xl box-content overflow-hidden"
                  >
                    <figure className="">
                      <img
                        className="object-cover"
                        src={`${Config.api_host}/upload/${product.image_url}`}
                        alt={product.name}
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{product.name}</h2>
                      <p>{product.price}</p>
                      <div className="card-actions justify-end">
                        <button
                          className="btn btn-primary"
                          onClick={() => dispatch(addItem(product))}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
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
