import React from 'react'
import { Card, notification } from 'antd'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addCart as addCartAction, getUser} from '../../redux/actions/userAction'
import userApi from '../../api/userApi'
// import { decrementCountPay as decrementCountPayAction } from '../../redux/actions/products'

const openNotification = (item) => {
  notification.open({
    message: '',
    description:`Bạn đã thêm thành công một sản phẩm ${item.name} vào giỏ hàng`,
    icon: <i className="fad fa-alicorn" style={{fontSize: "40px", color: '#fe9705'}}></i>,
  });
};

const CardItem = ({item}) => {
  const dispatch = useDispatch()
  const addToCart = async () => {
    dispatch(addCartAction(item))
    try {
      const response = await userApi.getUser()
      await setTimeout(() => {
        dispatch(getUser(response))
      }, 100);
    } catch (error) {
      console.log(error);
    }

    // dispatch(decrementCountPayAction(item))
    openNotification(item)
  }
  return (
    <>
      <Card
        className="item__card"
        hoverable
        cover={<img alt="example" src={item.img}/>}
      >
        <p>{item.name}</p>
        <h3>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</h3>
        <Link to={`/products/${item.id}`}>
          <button className="item__card--seeMore">Xem thêm</button>
        </Link>
        <Link to={`#`}>
          <button
            className={item.countPay > 0 ? "item__card--buy" : "item__card--disabledBuy"}
            disabled = {item.countPay > 0 ? false : true}
            onClick={addToCart} >Mua Ngay</button>
        </Link>
      </Card>
    </>
  )
}

export default CardItem
