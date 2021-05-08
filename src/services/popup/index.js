import { setPopup, clearPopup, store } from '../../modules';

export const showPopup = (option = {}) => {
  store.dispatch(setPopup({
    visible: true,
    ...option
  }));
};

export const hidePopup = () => {
  store.dispatch(clearPopup())
}