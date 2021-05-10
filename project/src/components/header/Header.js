import React, { useEffect, useState } from 'react'
import './style.scss'
import {Link} from "react-router-dom"
import { useSelector } from 'react-redux'
import { Row, Col, Menu, message, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import userApi from '../../api/userApi'


const Header = () => {
  const myStore = useSelector(store => store.userReducer.user)
  const [myUser, setMyUser] = useState(myStore)

  useEffect(() => {
    fetchUser()
  }, [myStore])

  const fetchUser = async () => {
    const response = await userApi.getUser()
    setMyUser(response)
  }
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
              myStore && (
                myUser.id ? (
                  <div className="login__imgUser">
                    {
                      myUser.img ? <img src={myUser.img} alt="abc"/> : <i className="fas fa-user" />
                    }
                    <div className="login__listchose">

                      <Menu onClick={handleMenuClick}>

                        <Menu.Item key="1" icon={<UserOutlined />}>
                          <Link to='/login'>
                            thông tin cá nhân
                          </Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UserOutlined />}>
                          <Link to='/login'>
                            đơn hàng
                          </Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UserOutlined />}>
                          <Link to='/login'>
                            logout
                          </Link>
                        </Menu.Item>
                      </Menu>
                    </div>
                  </div>
                ) : <Link to='/login'>Đăng Nhập</Link>
              )
            }
          </Col>
          <Col span={12} className="logo">
            <p>Logo</p>
          </Col>
          <Col span={5} className="cart">
            <Link to="/cart">
              <i className="fas fa-shopping-cart">
                {
                  myUser && (
                    <span>{myUser.cart ? myUser.cart.length : 0}</span>
                  // <Badge count={myUser.cart ? myUser.cart.length : 0} overflowCount={50}>
                  //   <a href="#" className="head-example" />
                  // </Badge>
                  )
                }
              </i>
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Header;
