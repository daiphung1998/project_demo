import React from 'react'
import { Form, Input, Button, InputNumber } from 'antd';
import {Link} from "react-router-dom"

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },

};

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const SingUp = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="singUp">
      <Form
        name="singUp"
        {...layout}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
         <Form.Item
          label="Họ Tên"
          name="hoten"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="username"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Nhập lại Password"
          name="password2"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
            <Link to="/login" >
              <Button type="primary"  htmlType="submit">
                đăng nhập
              </Button>
            </Link>

            <Button type="primary" danger htmlType="submit">
              Đăng ký
            </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SingUp;
