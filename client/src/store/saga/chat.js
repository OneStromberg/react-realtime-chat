import { eventChannel } from 'redux-saga'
import { takeEvery, put, call, fork, select, take } from 'redux-saga/effects';
import Nes from 'nes';
import md5 from 'js-md5';

import Action from './../../actions/Action';
import error from './error';
import { actionTypes, SOCKET_URI } from './../../constants';
import { allAvatars } from './../reducers/data';
import * as Api from './../../api';

const client = new Nes.Client(SOCKET_URI);

function* getMessages(n = 1) {
  try {
    let messages = yield call(Api.getMessages, n);
    if (messages) {
      yield put(Action(actionTypes.RECEIVED_MESSAGES, messages));
      let avatars = yield select(allAvatars);
      messages.reduce((acc, m) => {
        if (m.email && !avatars[m.email]){
          avatars[m.email] = md5(m.email.toLowerCase());
        }
        return avatars;
      }, avatars);
      yield put(Action(actionTypes.RECEIVED_AVATARS, avatars));
    }
  } catch(e) {
    yield error(e);
  }
}

function* getInitialMessages(){
  try {
    yield call(getMessages, 10);
  } catch(e) {
    yield error(e);
  }
}

export function* sendMessage({ payload }){
  if (!payload) {
    return yield error('Wrong input');
  }
  const { email, message } = payload;
  yield call(Api.sendMessage, email, message);
}

function* createSocketChannel() {
  try {
    yield client.connect();
    return eventChannel(emit => {
      client.onUpdate = emit;
      const unsubscribe = () => {
        client.unsubscribe('/added-message')
      }
      return unsubscribe
    })
  } catch(e) {
    yield error(e);
  }
}

function* recieveNewMessage(){
  const socketChannel = yield call(createSocketChannel);

  while (true) {
    const payload = yield take(socketChannel);
    yield call(getMessages, 1);
  }
}

function* lastActivity({ payload }){
  if (!payload) {
    return yield error('Wrong input');
  }

  try {
    const { email } = payload;
    let lastUserActivity = yield call(Api.lastActivity, email);
    if (lastUserActivity) {
      yield put(Action(actionTypes.SET_LAST_ACTIVITY, lastUserActivity));
    }
  } catch(e) {
    yield error(e);
  }
}

export default function* initChat(){
  yield takeEvery(actionTypes.SEND_MESSAGE, sendMessage);
  yield takeEvery(actionTypes.GET_LAST_ACTIVITY, lastActivity);
  yield call(getInitialMessages);
  yield fork(recieveNewMessage);
}