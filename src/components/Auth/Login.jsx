import React, { Component, PropTypes } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const FormItem = Form.Item;
const LoginClass = ({ form, location, dispatch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = form.getFieldsValue();
    dispatch({ type: 'auth/login', data:
    {
      username: formData.userName,
      password: formData.password,
      redirect: location.query,
      dispatch,
    } })
  }

  const { getFieldProps, getFieldsValue } = form;

  return (
    <Form inline onSubmit={handleSubmit}>
      <FormItem
        label="账户"
      >
        <Input
          placeholder="请输入账户名"
          {...getFieldProps('userName')}
        />
      </FormItem>
      <FormItem
        label="密码"
      >
        <Input
          type="password" placeholder="请输入密码"
          {...getFieldProps('password')}
        />
      </FormItem>
      <Button type="primary" htmlType="submit">登录</Button>
    </Form>)
}

const Login = Form.create()(LoginClass);
function mapStateToProps({ auth }) {
  return {
    data: auth,
  }
}
export default connect(mapStateToProps)(Login);
