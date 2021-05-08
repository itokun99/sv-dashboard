import { useState } from 'react';

/**
 * @name getPaginationItems
 * @description helper for create array of number pagination items
 * @param {*} totalPage 
 * @returns array number pagination
 */
const getPaginationItems = (totalPage = 1) => {
  let result = [];
  let i = 1;
  do {
    result.push(i);
    i++
  } while(i <= totalPage)

  return result;
}

/**
 * @name getPaginationTotalPage
 * @description helper for calculate to get pagination total page
 * @param {*} totalData 
 * @param {*} limit 
 * @returns number of total page
 */
const getPaginationTotalPage = (totalData, limit) => {
  let totalPage = totalData / limit;
    // has decimal value
  totalPage = totalPage > parseInt(totalPage) ? parseInt(totalPage + 1) : totalPage;

  return totalPage;
}


/**
 * @name useForm custom hook for create form
 * @param {*} initialState
 */
 export const useForm = initialState => {
  const [state, setState] = useState(initialState);

  const onChangeState = (value, field) => {
    if (field === 'reset') {
      return setState(initialState);
    }

    if (field === 'multiple') {
      return setState(prevState => ({
        ...prevState,
        ...value
      }));
    }

    return setState(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  return [state, onChangeState];
};


export const helper = {
  getPaginationItems,
  getPaginationTotalPage
}