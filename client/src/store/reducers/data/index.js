//@flow
import { combineReducers } from 'redux';
import avatars from './avatars';
import messages from './messages';

export default combineReducers({avatars, messages});

export const allAvatars = (state):Map<string, string>  => state.data.avatars