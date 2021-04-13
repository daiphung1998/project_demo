import React from 'react'
import './style.scss'
import MenuItem from './MenuItem'
import Search from './search/Search'
import { Affix } from 'antd';
// import { NavLink } from 'react-router-dom'



const MyMenu = () => {
  // const user = useSelector(store => store.userReducer.user)
  const menu = [
    {
      title: 'Trang chủ',
      path: '/'
    },
    {
      title: 'Sản Phẩm',
      path: '/products',
      children: [
        {
          title: 'Rau xanh',
          path: '/vegetable'
        },
        {
          title: 'Củ',
          path: '/tubers',
          children: [
            {
              title: 'Quả tươi',
              path: '/t'
            },
            {
              title: 'Quả khô',
              path: '/k'
            }
          ]
        },
        {
          title: 'Quả',
          path: '/fruit',
          children: [
            {
              title: 'Quả tươi',
              path: '/t'
            },
            {
              title: 'Quả khô',
              path: '/k'
            }
          ]
        },
        {
          title: 'Nấm',
          path: '/mushroom',
          children: [
            {
              title: 'Quả tươi',
              path: '/t'
            },
            {
              title: 'Quả khô',
              path: '/k'
            }
          ]
        },
      ]
    },
    {
      title: 'Tin tức',
      path: '/vegetable'
    },
    {
      title: 'Giới thiệu',
      path: '/tubers'
    },
    {
      title: 'Liên hệ',
      path: '/fruit'
    },
    {
      title: 'Chỉ đường',
      path: '/mushroom'
    }
  ]
  return (
    <>
      <Affix offsetTop={0}>
        <div className="list__menu">
          <div className="row">
            <div className="col-6 col-sm-6 col-xl-10">
              <nav className="navbar navbar-expand-lg navbar-light ">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="nav">
                    <MenuItem dataChildren={menu} />
                    {/* {user.id === 12254225 && (
                      <li className="nav-item" key="admin">
                        <NavLink activeClassName="active" exact className="nav-link" to="/admin">Quản lý</NavLink>
                      </li>
                    )} */}
                  </ul>
                </div>
              </nav>
              </div>
            <div className="col-6 col-sm-6 col-xl-2"> <Search/> </div>
          </div>
        </div>
      </Affix>
    </>
  )
}

export default MyMenu;
