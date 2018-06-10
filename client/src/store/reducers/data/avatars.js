//@flow
import { Map } from 'immutable';
import md5 from 'js-md5';
import { actionTypes } from './../../../constants';

const initialState:Map<string, string> = Map();

export default (state: Map<string, string> = initialState, action: any):Map<string, string> => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.RECEIVED_MESSAGES: {
      payload.forEach((m) => {
        if (m.email && !state.has(m.email)){
          state = state.set(m.email, md5(m.email.toLowerCase()));
        }
      });
      return state;
    }
    default:
      return state;
  }
}