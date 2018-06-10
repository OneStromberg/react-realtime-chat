//@flow
import { actionTypes } from './../../constants';
import Action from './../../actions/Action';

type State = {
  popups: Array<string>,
  error: string|any
}

const initial = {
  popups: [],
  error: null
}

export default (state:State = initial, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SHOW_POPUP: {
      let popupName = payload;
      if (popupName) {
          let { popups } = state;
          if (popups.indexOf(popupName) === -1) {
            return {...state, popups:[...popups, popupName]}
          }
      }
      return state;
    }
    case actionTypes.RUNTIME_ERROR:
      state.error = payload;
      return state;
    default:
      return state;
  }
}