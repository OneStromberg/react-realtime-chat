//@flow
import { combineReducers } from 'redux';

import data from './data';
import app from './app';

export default combineReducers({
  data,
  app
});