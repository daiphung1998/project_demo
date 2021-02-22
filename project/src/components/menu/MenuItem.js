import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'

const MenuItem = ({dataChildren}) => {
  return (
    <>
      {
        dataChildren.map((item, index) => {
          return (
            <li className="nav-item" key={index}>
              <Link className="nav-link" to={item.path}>{item.title}</Link>
              {item.children && <ul className="list__menu__children animate__fadeInUp" ><MenuItem dataChildren={item.children} /></ul>}
            </li>
          )
        })
      }
    </>
  )
}

export default MenuItem;
