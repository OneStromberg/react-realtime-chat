//@flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Layout } from 'antd';
import { connect } from 'react-redux';

import Form from './Form';
import ChatHistory from './ChatHistory';
import './style.less'

const { Content } = Layout;


class Root extends Component<any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <Content>
          <Form />
          <ChatHistory />
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { key } = state;
  return { key };
}

//const mapDispatchToProps = dispatch => bindActionCreators({ actions }, dispatch);

export default connect(mapStateToProps, /*mapDispatchToProps*/)(Root);
