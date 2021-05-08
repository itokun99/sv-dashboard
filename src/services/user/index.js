import { API } from '../../configs';
import { store, setUserList } from '../../modules';
import { helper } from '../../utils';



/**
 * @name getUsers
 * @description service call for get user list data
 * @param {*} payload 
 */
export const getUsers = async function (payload) {
  store.dispatch(setUserList({ loading: true }));
  const response = await API.getUsers(payload);
  
  if(!response || !response.data) {
    store.dispatch(setUserList({ loading: false }));
    throw response;
  }

  if(payload?.pagination) {
    const { data, total } = response;
    
    //calculate totalpage
    const totalPage = helper.getPaginationTotalPage(total, payload?.pagination?.limit);

    store.dispatch(setUserList({
      loading: false,
      pagination: {
        page: payload?.pagination?.page,
        total,
        totalPage,
      },
      data
    }));

    return response;
  }

  const  { data } = response;

  store.dispatch(setUserList({
    loading: false,
    data
  }));

  return response;
}

/**
 * @name getUserById
 * @description service call for get user data by id
 * @param {*} id 
 * @returns 
 */
export const getUserById = async function (id) {
  const payload = {
    path: id
  };
  const response = await API.getUsers(payload);
  
  if(!response || !response.data) {
    throw response;
  }

  // coz the response is array object, when zero index in array is empty, 
  // throw the error with message
  if(!response.data[0]) {
    return Promise.reject({
      message: 'User not found'
    })
  }

  // return just user object
  return response.data[0];
}

/**
 * @name createUser
 * @description service call for user creation
 * @param {*} form is body payload
 * @returns 
 */
export const createUser = async function (form) {
  const payload = {
    body: form
  };

  const response = await API.insertUser(payload);

  if(!response) {
    throw response;
  }

  return response;
}

/**
 * @name updateUser
 * @description service call for update user
 * @param {*} id user id
 * @param {*} form body payload
 * @returns 
 */
export const updateUser = async function (id, form) {
  const payload = {
    path: id,
    body: form
  }

  const response = await API.updateUser(payload);

  if(!response) {
    throw response;
  }

  return response;
}


/**
 * @name deleteUser
 * @description service call for delete user
 * @param {*} id user id
 * @returns 
 */
export const deleteUser = async function(id) {
  const payload = {
    path: id
  }

  const response = await API.deleteUser(payload);

  if(!response) {
    throw response;
  }

  return response;
}