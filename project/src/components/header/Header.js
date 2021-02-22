import React from 'react'
import { Row, Col } from 'antd'
import './style.scss'
import {Link} from "react-router-dom"
import { useSelector } from 'react-redux'

const Header = () => {
  const newCart = useSelector(store => store.userReducer.user.cart)
  return (
    <div className="header">
      <div className="header__content">
        <Row>
          <Col span={5} offset={1} className="login">
            <Link to='#'>Đăng Nhập</Link>
          </Col>
          <Col span={12} className="logo">
            <p>Logo</p>
          </Col>
          <Col span={5} className="cart">
            <Link to="/cart">
              <i className="fas fa-shopping-cart">
                <span>{newCart ? newCart.length : '0'}</span>
              </i>
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Header;
