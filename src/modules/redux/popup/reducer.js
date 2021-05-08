import actionTypes from '../actionTypes';


const initialState = {
  title: '',
  message: '',
  visible: false,
  onPressLeft: () => {},
  onPressRight: null,
  leftButtonTitle: 'Okay',
  rightButtonTitle: 'Cancel'
}


const popup = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.popup.SET_POPUP:
      return {
        ...state,
        ...action.value
      }
    case actionTypes.popup.CLEAR_POPUP:
      return initialState
    default:
      return state;
  }
}

export default popup;