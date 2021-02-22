import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import productApi from '../../api/productApi'
import './ProfileProduct.scss'
import {addCartByProfile as addCartByProfileAction} from '../../redux/actions/userAction'
import { decrementCountPayProfile } from "./../../redux/actions/products";

const ProfileProduct = () => {
  const param = useParams()

  const dispatch = useDispatch()

  const [product, setProduct] = useState(null)
  const [number, setNumber] = useState(1)

  const fetchProduct = async () => {
    try {
      const response = await productApi.getById(param.id)
      setProduct(response)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  const increment = () => {
    if (number + 1 >=  product[0].countPay) {
      setNumber(product[0].countPay)
    } else {
      setNumber(number + 1)
    }
  }

  const decrement = () => {
    if (number - 1 === 0 ) {
      setNumber(1)
    } else {
      setNumber(number - 1)
    }
  }

  const numberInput = e => {
    const value = e.target.value
    if (value > product[0].countPay) {
      setNumber(product[0].countPay)
    } else {
      setNumber(value)
    }
  }

  const buyProduct = () => {
    const data = {
      product: product[0],
      number: number
    }
    dispatch(addCartByProfileAction(data))
    dispatch(decrementCountPayProfile(data))
    setNumber(1)
  }
  return (
    <>
      {
        product &&
        <div>
          <div className="row">
            <div className="col-lg-3">
              <div className= "box" >
                <div className="search__title">
                  <p>SẢN PHẨM NỔI BẬT</p>
                </div>
                <div className="search__content">
                  <h1>danh sách sản phẩm nổi bật </h1>
                </div>
              </div>
            </div>
            <div className="col-lg-9 profile">
              <div className="row">
                <div className="col-md-7">
                  <img src={product[0].img} alt="img"/>
                </div>
                <div className="col-md-5 profile__content">
                  <h2 className="title">{product[0].name}</h2>
                  <p className="status">Trạng Thái:
                    { product[0].countPay > 0 ? (
                      <span className="status--stocking"> <i className="fas fa-check"></i> Còn hàng</span>
                    ) : (
                      <span className="status--OutOfStock"> <i className="fas fa-times"></i> Hết hàng</span>
                    )}
                    </p>
                  <h2 className="price">{product[0].price} VND</h2>
                  <div className="nutrition">
                    giá trị dinh dưỡng
                  </div>
                  <div className="profile__addCart">
                    <label>Số lượng: </label>
                    <div className="addNumber">
                      <button className="minus" onClick={decrement}>-</button>
                      <input type="text" value={number} onChange={numberInput} />
                      <button className="plus" onClick={increment}>+</button>
                    </div>
                    <button className={product[0].countPay > 0 ? "buy" : "disabledBuy"} onClick={buyProduct} disabled = {product[0].countPay > 0 ? false : true}>Mua hàng</button>
                  </div>
                  <p>Địa chỉ: <span>aaaaa</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default ProfileProduct
