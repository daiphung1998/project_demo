import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';

const FromEdit = () => {
  const [visible, setVisible] = useState(false)
  render (
    <div>
      <Modal
        visible={visible}
        title="Điền thông tin"
        // onOk={handleOk}
        // onCancel={handleCancel}
      >
        <Form
          name="basic"
          form={form}
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
        >
          <label>Họ tên:</label>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' },
              ({ getFieldValue }) => ({
                validator(rule, value = "") {
                  const re = /^[a-zA-Z]+$/;
                  if (value.length > 0 && !re.test(value)) {
                    return Promise.reject("Minimum 10 characters");
                  } else {
                    return Promise.resolve();
                  }
                }
              })
            ]}
          >
            <Input />
          </Form.Item>
          <label>Số điện thoại:</label>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: 'Please input your phone!' },
              ({ getFieldValue }) => ({
                validator(rule, value = "") {
                  const re = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                  if (value.length > 0 && !re.test(value)) {
                    return Promise.reject("Minimum 10 characters");
                  } else {
                    return Promise.resolve();
                  }
                }
              })
            ]}
          >
            <Input />
          </Form.Item>
          <label>Email:</label>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' },
              ({ getFieldValue }) => ({
                validator(rule, value = "") {
                  //eslint-disable-next-line
                  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                  if (value.length > 0 && !re.test(value)) {
                    return Promise.reject("email chưa đúng đinh dạng");
                  } else {
                    return Promise.resolve();
                  }
                }
              })
            ]}
          >
            <Input />
          </Form.Item>
          <label>Địa chỉ:</label>
          <Form.Item
            name="address"
            rules={[{ required: true, message: 'Please input your address!' },
              ({ getFieldValue }) => ({
                validator(rule, value = "") {
                  if (value.length > 0 && value.length < 10) {
                    return Promise.reject("Minimum 10 characters");
                  } else {
                    return Promise.resolve();
                  }
                }
              })
            ]}
          >
            <Input />
          </Form.Item>
            <Form.Item  className="groupButton">
              <Button className="btnSubmit" type="primary" danger onClick={onReset}>
                Huỷ
              </Button>
              <Button className="btnSubmit" type="primary" htmlType="submit" >
                Đặt hàng
              </Button>
            </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default FromEdit;
