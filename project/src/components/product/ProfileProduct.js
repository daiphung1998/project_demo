import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import productApi from '../../api/productApi'
import './ProfileProduct.scss'
import {addCartByProfile as addCartByProfileAction, getUser} from '../../redux/actions/userAction'
import {
  // decrementCountPayProfile,
  setEvaluate as setEvaluateAction
} from "./../../redux/actions/products";
import { Tabs, Rate, Modal, Button, notification } from 'antd';
import userApi from '../../api/userApi'

const { TabPane } = Tabs;
const openNotification = (item) => {
  notification.open({
    message: '',
    description:`Bạn đã thêm thành công một sản phẩm ${item.name} vào giỏ hàng`,
    icon: <i className="fad fa-alicorn" style={{fontSize: "40px", color: '#fe9705'}}></i>,
  });
};

const ProfileProduct = () => {
  const param = useParams()

  const user = useSelector(store => store.userReducer.user)

  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

  const dispatch = useDispatch()

  const [product, setProduct] = useState(null)
  const [number, setNumber] = useState(1)

  const [evaluate, setEvaluate] = useState(0)
  const[evaluateDefault, setEvaluateDefault] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const increment = () => {
    if (number + 1 >=  product[0].countPay) {
      setNumber(product[0].countPay)
    } else {
      setNumber(number + 1)
    }
  }

  const decrement = () => {
    if (number - 1 <= 0 ) {
      setNumber(1)
    } else {
      setNumber(number - 1)
    }
  }

  const getNumberInput = e => {
    const value = e.target.value

    if (value > product[0].countPay) {
      setNumber(product[0].countPay)
    } else {
      setNumber(value)
    }
  }

  const buyProduct = async () => {
    const data = {
      product: product[0],
      number: number
    }
    await dispatch(addCartByProfileAction(data))
    try {
      const response = await userApi.getUser()
      setTimeout(() => {
        dispatch(getUser(response))
      }, 500);
    } catch (error) {
      console.log(error);
    }
    // dispatch(decrementCountPayProfile(data))
    setNumber(1)
    openNotification(product[0])
  }
  const handleChange = (evaluate) => {
    setEvaluate(evaluate)
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    const value = {
      id: product[0].id,
      evaluate
    }
    dispatch(setEvaluateAction(value))
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getValueEvaluate = (key) => {
    let count = 0
    if (key === "3") {
      product[0].evaluates.forEach((item, index) => {
        count = count + item.point
      });
      const s = count / product[0].evaluates.length
      setEvaluateDefault(s)
    }
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
                  <h2 className="price">{product[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</h2>
                  <div className="nutrition">
                    giá trị dinh dưỡng
                  </div>
                  <div className="profile__addCart">
                    <label>Số lượng: </label>
                    <div className="addNumber">
                      <button className="minus" onClick={decrement}>-</button>
                      <input type="text" value={number} onChange={getNumberInput} />
                      <button className="plus" onClick={increment}>+</button>
                    </div>
                    <button className={product[0].countPay > 0 ? "buy" : "disabledBuy"} onClick={buyProduct} disabled = {product[0].countPay > 0 ? false : true}>Mua hàng</button>

                  </div>
                  <p>Địa chỉ: <span>aaaaa</span></p>
                </div>
              </div>
            </div>
          </div>
          <Tabs defaultActiveKey="1" type="card" onChange={getValueEvaluate}>
            <TabPane tab="Mô tả" key="1">
              mô tả sản phẩm
            </TabPane>

            <TabPane tab="Thông tin" key="2">
              thông tin sản phẩm
            </TabPane>

            <TabPane tab="Đánh giá" key="3">
              <h3>Đánh giá sản phẩm</h3>
              <span>
                <Rate
                  allowHalf
                  disabled
                  tooltips={desc}
                  onChange={handleChange}
                  value={evaluateDefault}
                />
                {
                  evaluateDefault ?
                  <span className="ant-rate-text">{desc[evaluateDefault - 1]}</span>
                  : ''
                }
              </span>
              <span className={ user && (user.id === undefined ? "evaluateDisable" :  "evaluate" )}>

                <button onClick={showModal} disabled={user && (user.id === undefined ? true : false)}>Đánh giá sản phẩm</button>
                <span style={{display: user && (user.id === undefined ? 'block' : 'none')}}>( Đằng nhập để gửi đánh giá của bạn )</span>
              </span>
              <div className="fromEvaluate">
                <Modal
                  visible={isModalVisible}
                  title="Đánh giá sản phẩm"
                  style = {{marginTop: "150px"}}
                  // onOk={handleOk}
                  // onCancel={handleCancel}
                  // footer={[
                  //   <Button key="back" onClick={handleCancel}>
                  //     Cancel
                  //   </Button>,
                  //   <Button key="submit" type="primary" onClick={handleOk}>
                  //     Gửi đánh giá
                  //   </Button>,
                  // ]}
                >
                  <span>Đánh giá của bạn về sản phẩm: </span>
                  <Rate
                      allowHalf
                      onChange={handleChange}
                      value={evaluate}
                    />
                  <div className="fromEvaluate__btn">
                    <Button key="cancel" danger  onClick={handleCancel}>
                      Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                      Gửi đánh giá
                    </Button>
                  </div>
                </Modal>
              </div>
            </TabPane>

            <TabPane tab="Bình luận" key="4">
              bình luận
            </TabPane>
          </Tabs>
        </div>
      }
    </>
  )
}

export default ProfileProduct
