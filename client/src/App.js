//@flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Root from './components';
import store from './store';

export default class App extends Component<any> {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}