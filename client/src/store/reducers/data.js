//@flow
import { actionTypes } from './../../constants';

type State = {
  messages: Array<any>,
  avatars: any
}

const initialState:State = {
  messages: [],
  avatars: {}
}

export default (state:State = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.RECEIVED_AVATARS: {
      return {...state, avatars: {...payload} }
    }
    case actionTypes.RECEIVED_MESSAGES: {
      return {...state, messages: [...payload, ...state.messages] }
    }
    default:
      return state;
  }
}

export const allAvatars = state => state.data.avatars