import { fork } from 'redux-saga/effects';
import chat from './chat';

export function* init(){
  yield fork(chat);
}

export default function* rootSaga() {
  yield init();
}