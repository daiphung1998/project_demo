import React from 'react'
import { Card } from 'antd'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addCart as addCartAction } from '../../redux/actions/userAction'
import { decrementCountPay as decrementCountPayAction } from '../../redux/actions/products'

const CardItem = ({item}) => {
  const dispatch = useDispatch()
  const addToCart = () => {
    dispatch(addCartAction(item))
    dispatch(decrementCountPayAction(item))
  }

  return (
    <>
      <Card
        className="item__card"
        hoverable
        cover={<img alt="example" src={item.img}/>}
      >
        <p>{item.name}</p>
        <h2>{item.price}</h2>
        <Link to={`/product/${item.id}`}>
          <button className="item__card--seeMore">Xem thêm</button>
        </Link>
        <Link to={`#`}>
          <button className={item.countPay > 0 ? "item__card--buy" : "item__card--disabledBuy"} disabled = {item.countPay > 0 ? false : true} onClick={addToCart}>Mua Ngay</button>
        </Link>
      </Card>
    </>
  )
}

export default CardItem
