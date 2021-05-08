import { combineReducers, createStore } from 'redux';

/**
 * @reducers
 */
import user from './user/reducer';
import popup from './popup/reducer';
import loading from './loading/reducer';

const reducer = combineReducers({
  user,
  popup,
  loading
});


const store = createStore(reducer);


export {
  store
}


/**
 * @actions
 */
export * from './user/action';
export * from './popup/action';
export * from './loading/action';


/**
 * @selectors
 */
export * from './user/selector';
export * from './popup/selector';
export * from './loading/selector';