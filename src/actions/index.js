import { REMOVE_ITEM, CHECK_ITEM, UPDATE_INPUT, UPDATE_LIST } from './actionTypes';

export const updateList = value => ({
  type: UPDATE_LIST,
  value: value
});

export const updateInput = value => ({
  type: UPDATE_INPUT,
  value: value
});

export const checkItem = index => {
  return {
    type: CHECK_ITEM,
    index: index
  };
};

export const deleteItem = index => {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: REMOVE_ITEM,
        index: index
      });
    }, 2000);
  };
};
