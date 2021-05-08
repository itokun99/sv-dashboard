/**
 * @name userListSelector
 * @description selector for get list from user reducer 
 * @param {*} state store
 * @returns user list object
 */
export const userListSelector = function (state) {
  return state.user.list;
}