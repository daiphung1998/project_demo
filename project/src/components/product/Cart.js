import React, { useState, useRef,useEffect } from 'react'
import { Table, Button } from 'antd';
import './cart.scss'
import { useDispatch, useSelector } from 'react-redux'
import {incrementProject as incrementProjectAction,
  decrementProject as decrementProjectAction,
  deleteItemCart as deleteItemCartAction,
  numberInputProject as numberInputProjectAction,
  deleteListItemCart as deleteListItemCartAction,
  payCart as payCartAction
} from '../../redux/actions/userAction'
import {
  decrementCountPayByCart as decrementCountPayByCartAction,
  incrementCountPayByCart as incrementCountPayByCartAction,
  onchangeInputPayByCart as onchangeInputPayByCartAction
} from './../../redux/actions/products'

const Cart = () => {
  const dispatch = useDispatch()

  const listProduct = useSelector(store => store.productReducer)
  const products =  useSelector(store => store.userReducer.user.cart)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState(false)
  let totalMoney = 0
  products.forEach(item => {
    totalMoney = totalMoney  + (item.price * item.count)
  });

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'img',
      render: text => {
        return (
          <div className = "cart__box-img">
            <img src={text} alt=""/>
          </div>
        )
      }
    },
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'name',
      render: text => {
        return (
          <div className = "cart__box-text">
            <p>{text}</p>
          </div>
        )
      }
    },
    {
      title: 'Giá sản phẩm',
      dataIndex: 'price',
      render: text => {
        return (
          <div className = "cart__box-text">
            <p>{text} VND</p>
          </div>
        )
      }
    },
    {
      title: 'Số lượng',
      dataIndex: 'count',
      render: (text, record) => {
        return (
          <div className = "cart__box-count">
            <button
              className="cart__box-text--minus"
              onClick={() => decrement(record.id)}
              disabled = {record.count === 1  ? true : false}
            >-</button>
              <input
                type="text" value={text}
                id={record.id}
                onChange={numberInput}
                onClick={laygiatri}
              />
            <button
              className="cart__box-text--plus"
              onClick={() => increment(record.id)}
              disabled = {record.count > record.countPay  ? true : false}
            >+</button>
          </div>
        )
      }
    },
    {
      title: 'ĐVT',
      dataIndex: 'dvt',
      render: (text, record) => {
        return (
          <div>
            {text}
          </div>
        )
      }
    },
    {
      title: 'Thành tiền',
      dataIndex: 'thanhtien',
      render: (text, record) => {
        return (
          <div className = "cart__box-text">
            <p>{record.price * record.count} VND</p>
          </div>
        )
      }
    },
    {
      title: 'Xoá',
      dataIndex: 'delete',
      render: (text, record) => {
        return (
          <>
             <Button danger onClick={() => deleteItem(record.id)}>Xoá</Button>
          </>
        )
      }
    },
  ];
  const onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const laygiatri = (event) => {
    setNumber(event.target.value)
  }
  // const timeRef = useRef(null)
  const [number, setNumber] = useState(1)
  const handleInput = useRef(number)

  useEffect(() => {
    if ( handleInput.current === "") {
      handleInput.current = 0
    }else {
      handleInput.current = number
    }
  },[number])

  const numberInput = (event) => {
    const index = listProduct.findIndex(item => item.id === Number(event.target.id))
    let a = 0
    if ( event.target.value === "" || isNaN(event.target.value)) {
      setNumber(0)
    }else {
      a = event.target.value
      if (event.target.value > listProduct[index].countPay) {
        a = listProduct[index].countPay
      }
      setNumber(a)
    }

    const newNumber = {
      value: a,
      numberCurrent: Number(number),
      id: Number(event.target.id)
    }
    dispatch(numberInputProjectAction(newNumber))
    dispatch(onchangeInputPayByCartAction(newNumber))
  }

  const increment = (id) => {
    dispatch(incrementProjectAction(id))
    dispatch(incrementCountPayByCartAction(id))
  }

  const decrement = (id) => {
    dispatch(decrementProjectAction(id))
    dispatch(decrementCountPayByCartAction(id))
  }

  const deleteItem = (id) => {
    dispatch(deleteItemCartAction(id))
  }

  const deleteListItem = () => {
    const newArr = []
    selectedRowKeys.forEach(item => {
      newArr.push(listProduct[item - 1].id)
    })
    setLoading(true)
    dispatch(deleteListItemCartAction(newArr))
    setTimeout(() => {
      setSelectedRowKeys([])
      setLoading(false)
    }, 500);
  };

  const payCart = () => {
    const newArr = []
    selectedRowKeys.forEach(item => {
      newArr.push(listProduct[item -1])
    })
    dispatch(payCartAction(newArr))
    setTimeout(() => {
      deleteListItem()
    }, 500);
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div className="cart">
      <Table
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={products}/>
      <h2>Tổng tiền: <span>{totalMoney}</span> VND</h2>
      <div className="cart__button">
        <Button
          type="primary"
          onClick={deleteListItem}
          disabled={!hasSelected}
          loading={loading} >
          Xoá
        </Button>

        <Button
          className="cart__button--pay"
          type="primary"
          onClick={payCart}
          disabled={!hasSelected}
          loading={loading}>
          Tiến hành thanh Toán
        </Button>
      </div>
    </div>
  )
}

export default Cart
