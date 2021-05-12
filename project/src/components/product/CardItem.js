import React from 'react'
import { Card, notification } from 'antd'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addCart as addCartAction, getUser} from '../../redux/actions/userAction'

//import userApi from '../../api/userApi'
// import { decrementCountPay as decrementCountPayAction } from '../../redux/actions/products'

const openNotification = (item) => {
  notification.open({
    message: '',
    description:<span>Bạn đã thêm thành công một sản phẩm <b>{item.name}</b> vào giỏ hàng</span>,
    icon: <i class="fab fa-optin-monster" style={{fontSize: "50px", color: '#fe9705'}}></i>,
  });
};

const CardItem = ({item}) => {
  const dispatch = useDispatch()
  const addToCart = async () => {
    await dispatch(addCartAction(item))
    setTimeout(() => {
      openNotification(item)
    }, 500);
    // dispatch(decrementCountPayAction(item))
  }
  return (
    <>
      <Card
        className="item__card"
        hoverable
        cover={<img alt="example" src={item.img}/>}
      >
        {
          item.sale > 0 && (<div className="item__card__sale">{item.sale}%</div>)
        }
        <h3>{item.name}</h3>
        <div className="item__card__groupPrice">
          {
            item.sale > 0 && (
              <span className="item__card--priceSale">{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</span>
            )
          }
          <span className="item__card--price">{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</span>
        </div>
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
