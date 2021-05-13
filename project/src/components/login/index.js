import React, { useEffect, useState } from 'react'
import { Form, Input, Button } from 'antd';
import {Link , useHistory } from "react-router-dom"
import UserApi from '../../api/userApi'
import './style.scss';


const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
};
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const Login = ({}) => {
  const history = useHistory();
  const [listUser, setListUser] = useState({})

  const fetchUser = async () => {
    const response = await UserApi.getUser()
    setListUser(response)
  }

  useEffect (() => {
    fetchUser();
  },[])

  const onFinish = (values) => {

    const user = listUser.filter(item => (item.userName === values.username && item.password === values.password))
    if (user.length > 0) {
      const passwordBase = btoa(user[0].id)
      localStorage.setItem('userID', passwordBase);
      history.push('/')
    } else {
      alert("sai tài khoản mật khẩu")
    }
    //console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    //console.log('Failed:', errorInfo);
  };

  const onFinishPasswordRetrieval = (values) => {
    //console.log('Success:', values);
  };

  const onFinishFailedPasswordRetrieval = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };

  return (
    <div className="login">
      <div className="row">
        <div className="col-6 login__left">
          <p>Nếu bạn đã có tài khoản, đăng nhập tại đây</p>
          <Form
            name="login"
            {...layout}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
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

            <Form.Item {...tailLayout}>
              <Button className="login__btn--login" type="primary" htmlType="submit">
                Đăng nhập
              </Button>
              <Link to='/singup'>
                <Button type="primary" danger htmlType="submit">
                  Đăng ký
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </div>

        <div className="col-6 login__right">
          <p>Bạn quên mật khẩu? Nhập địa chỉ email để lấy lại mật khẩu qua email.</p>
          <Form
            name="password retrieval"
            initialValues={{ remember: true }}
            onFinish={onFinishPasswordRetrieval}
            onFinishFailed={onFinishFailedPasswordRetrieval}
          >
            <Form.Item
              label="UsernameRetrieval"
              name="usernameRetrieval"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Lấy lại mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login;
