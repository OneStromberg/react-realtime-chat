import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Avatar, List, Input, Icon, Layout, Modal } from 'antd'
import { GRAVATAR_URI } from './../../constants';

import './style.less'

const { Content, Header } = Layout;

var ChatItem = ({ message, avatar, email, onClick }) => {
  return (<List.Item className="ChatItem">
    <List.Item.Meta
            avatar={<Avatar onClick={() => onClick(avatar, email)} shape="square" size="large" src={`${GRAVATAR_URI}/${avatar}`}/>}
            title={<b>{email}</b>}
            description={message}
          />
  </List.Item>)
}

const Filter = ({ onChange }) => {
  return (
    <Input
      placeholder="Filter"
      prefix={<Icon type="search" />}
      onChange={onChange}
    />
  )
}

class ChatHistory extends PureComponent {
  state = {
    filter: ""
  }
  onFilterChange = ({target: { value }}) => {
    this.setState({
      filter: value && value.toLowerCase()
    });
  }
  onInfoOpen = (avatar, email) => {
    const { messages } = this.props;
    const firstMessage = messages.find(el => el.email == email);
    if (firstMessage) {
      Modal.info({
        title: email,
        content: <div>
          <Avatar shape="square" size="large" src={`${GRAVATAR_URI}/${avatar}`}/>
          <div>Last active at <b>{moment(firstMessage.date).format('LLL')}</b></div>
        </div>,
      });
    }
  }
  render() {
    const { messages, avatars } = this.props;
    const { filter } = this.state;
    let filtredMessages;
    if (filter) {
      filtredMessages = messages.filter((m) => {
        return m.email.indexOf(filter) !== -1
      });
    } else {
      filtredMessages = messages;
    }
    return (
      <Layout className="ChatHistory">
        <Header>
          <Filter onChange={this.onFilterChange}/>
        </Header>
        <Content>
          <List bordered={false} dataSource={filtredMessages} renderItem={({email, ...props}) => (
            <ChatItem onClick={this.onInfoOpen} {...props} email={email} avatar={avatars.get(email)}/>
          )} />
        </Content>
      </Layout>
    );
  }
}

function mapStateToProps({ data: {  messages, avatars } }) {
  return {
    messages, 
    avatars
  };
}

export default connect(mapStateToProps)(ChatHistory);