import actionTypes from '../actionTypes';

/**
 * @name setUserList
 * @description action for set user reducer value
 * @param {*} value 
 * @returns redux dispatcher with user value object
 */
export const setUserList = function(value) {
  return {
    type: actionTypes.user.SET_USER_LIST,
    value
  }
}


/**
 * @name clearUserList
 * @description action for clear user reducer to initialState
 * @returns redux dispatcher
 */
export const clearUserList = function() {
  return {
    type: actionTypes.user.CLEAR_USER_LIST
  }
}