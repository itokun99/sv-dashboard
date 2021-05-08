import actionTypes from '../actionTypes';

const initialState = {
  list: {
    data: [],
    loading: false,
    pagination: {
      total: 0,
      page: 1,
      totalPage: 1
    }
  }
}

export default function user (state = initialState, action) {
  switch (action.type) {
    case actionTypes.user.SET_USER_LIST:
      return {
        ...state,
        list: {
          ...state.list,
          ...action.value
        }
      }
    case actionTypes.user.CLEAR_USER_LIST:
      return {
        ...state,
        list: initialState
      }
    default:
      return state;
  }
}