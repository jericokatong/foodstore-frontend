import {
  ERROR_FETCHING_PRODUCT,
  SET_CATEGORY,
  SET_KEYWORD,
  SET_TAGS,
  START_FETCHING_PRODUCT,
  SUCCESS_FETCHING_PRODUCT,
  SET_PAGE,
  TOGGLE_TAG,
  NEXT_PAGE,
  PREV_PAGE,
} from './constants';
import { getProducts } from '../../api/product';
import debounce from 'debounce-promise';

export const startFetchingProducts = () => {
  return {
    type: START_FETCHING_PRODUCT,
  };
};

export const errorFetchingProducts = () => {
  return {
    type: ERROR_FETCHING_PRODUCT,
  };
};

export const successFetchingProducts = ({ data, count }) => {
  return {
    type: SUCCESS_FETCHING_PRODUCT,
    data,
    count,
  };
};

let debouncedFetchProducts = debounce(getProducts, 1000);

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingProducts());

    let perPage = getState().products.perPage || 9;
    let currentPage = getState().products.currentPage || 1;
    let tags = getState().products.tags || [];
    let keyword = getState().products.keyword || '';
    let category = getState().products.category || '';

    const params = {
      limit: perPage,
      skip: currentPage * perPage - perPage,
      q: keyword,
      tags,
      category,
    };

    try {
      let {
        data: { data, count },
      } = await debouncedFetchProducts(params);
      dispatch(successFetchingProducts({ data, count }));
    } catch (error) {
      dispatch(errorFetchingProducts());
    }
  };
};

export const setPage = (number = 1) => {
  return {
    type: SET_PAGE,
    currentPage: number,
  };
};

export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

export const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    category,
  };
};

export const setTags = (tags) => {
  return {
    type: SET_TAGS,
    tags,
  };
};

export const clearTags = () => {
  return setTags([]);
};

export const toggleTag = (tag) => {
  return {
    type: TOGGLE_TAG,
    tag,
  };
};

export const goToNextPage = () => {
  return {
    type: NEXT_PAGE,
  };
};

export const gotToPrevPage = () => {
  return {
    type: PREV_PAGE,
  };
};
