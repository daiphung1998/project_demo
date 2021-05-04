import React from 'react'
import './style.scss'
import {Link} from "react-router-dom"
import { useSelector } from 'react-redux'
import { Row, Col, Menu, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Header = () => {
  const myStore = useSelector(store => store.userReducer.user)
  const handleMenuClick = (e) => {
    message.info('Click menu');
    console.log('click', e);
  }
  return (
    <div className="header">
      <div className="header__content">
        <Row>
          <Col span={5} offset={1} className="login">
            {
              myStore.id ? (
                <div className="login__imgUser">
                  {
                    myStore.img ? <img src={myStore.img}/> : <i className="fas fa-user" />
                  }
                  <div className="login__listchose">
                    <Menu onClick={handleMenuClick}>
                      <Menu.Item key="1" icon={<UserOutlined />}>
                        thông tin cá nhân
                      </Menu.Item>
                      <Menu.Item key="2" icon={<UserOutlined />}>
                        đơn hàng
                      </Menu.Item>
                      <Menu.Item key="3" icon={<UserOutlined />}>
                        logout
                      </Menu.Item>
                    </Menu>
                  </div>
                </div>
              ) : <Link to='/login'>Đăng Nhập</Link>
            }
          </Col>
          <Col span={12} className="logo">
            <p>Logo</p>
          </Col>
          <Col span={5} className="cart">
            <Link to="/cart">
              <i className="fas fa-shopping-cart">
                <span>{myStore.cart ? myStore.cart.length : '0'}</span>
              </i>
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Header;
