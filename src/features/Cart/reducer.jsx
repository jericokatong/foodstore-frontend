import { ADD_ITEM, REMOVE_ITEM, CLEAR_ITEMS, SET_ITEMS } from './constants';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      console.log('ini state add item: ', state);
      console.log('ini action: ', action);
      if (state.find((item) => item.product._id === action.item.product._id)) {
        console.log('masuk di if');
        return state.map((item) => ({
          ...item,
          qty:
            item.product._id === action.item.product._id
              ? item.qty + 1
              : item.qty,
        }));
      } else {
        console.log('masuk di else');
        return [...state, { ...action.item, qty: 1 }];
      }

    case REMOVE_ITEM:
      return state
        .map((item) => ({
          ...item,
          qty: item._id === action.item._id ? item.qty - 1 : item.qty,
        }))
        .filter((item) => item.qty > 0);

    case CLEAR_ITEMS:
      return [];

    case SET_ITEMS:
      return action.items;

    default:
      return state;
  }
};

export default reducer;
