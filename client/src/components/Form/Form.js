import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Input, Button, Form, Col } from 'antd';
import { sendMessage } from './../../actions/chat';
import './style.less'

const FormItem = Form.Item;
const { TextArea } = Input;

function mapStateToProps(state) {
  return {

  };
}

class MessageForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        this.props.sendMessage(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="Form" onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input placeholder="Email"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('message', {
            rules: [{ required: true, message: 'Please input your message!', whitespace: true }],
          })(
            <TextArea rows={3} placeholder="Message"/>
          )}
        </FormItem>
        <FormItem>
          <Col span={5} offset={19} ><Button type="primary" htmlType="submit">SUBMIT</Button></Col>
        </FormItem>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage }, dispatch);

export default  Form.create()(connect(mapStateToProps,mapDispatchToProps)(MessageForm));