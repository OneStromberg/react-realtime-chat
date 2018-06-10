//@flow
import { Record, List } from 'immutable';
import { actionTypes } from './../../../constants';

type Message = {
  email: string,
  message: string,
  date: number,
}

const initialState:List<Message> = List();

export default (state: List<Message> = initialState, action: any): List<Message> => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.RECEIVED_MESSAGES: {
      return state.unshift(...payload)
    }
    default:
      return state;
  }
}