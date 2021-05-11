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
  const [keyActive, setKeyActive] = useState('')

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

  const onActive = (key) => {
    setKeyActive(key)
    console.log(key);
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

                      {/* <Menu onClick={handleMenuClick}>
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
                      </Menu> */}
                      <ul>
                        <Link to='/login'>
                          <li onClick={() => onActive(1)}
                            style={{backgroundColor: keyActive === 1 ? '#ccc' : ''}}
                          >
                            <i className="fas fa-user-tie"> thông tin cá nhân</i>
                          </li>
                        </Link>

                        <Link to='/login'>
                          <li onClick={() => onActive(2)} style={{backgroundColor: keyActive === 2 ? '#ccc' : ''}}>
                            đơn hàng
                          </li>
                        </Link>

                        <Link to='/login'>
                          <li onClick={() => onActive(3)} style={{backgroundColor: keyActive === 3 ? '#ccc' : ''}}>
                            <i className="fas fa-sign-out-alt"> logout</i>
                          </li>
                        </Link>
                      </ul>
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

            <i className="fab fa-opencart">
                {
                  myUser && (<span>{myUser.cart ? myUser.cart.length : 0}</span>)
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
