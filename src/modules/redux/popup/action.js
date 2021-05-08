import actionTypes from '../actionTypes';

export const setPopup = value => ({
  type: actionTypes.popup.SET_POPUP,
  value
});


export const clearPopup = () => ({
  type: actionTypes.popup.CLEAR_POPUP
});