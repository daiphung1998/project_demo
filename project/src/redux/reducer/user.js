import userApi from '../../api/userApi';
import { v4 as uuidv4 } from 'uuid';

import {
  GET_USERS,
  ADD_CART,
  INCREMENT_PROJECT,
  DECREMENT_PROJECT,
  DELETE_ITEM_CART,
  NUMBER_INPUT,
  DELETE_LIST_ITEM_CART,
  PAY_CART,
  ADD_CART_BY_PROFILE,
  PAY_CART_NO_USER,
  ADD_CART_NO_USER
} from '../actionType'

const initialState = {
  user: {
    cart: [],
  }
}

const useReducer  = (state = initialState, action) => {
  const user = {...state.user}
  const cart = user.cart
  const oder = user.oder

  switch (action.type) {
    case GET_USERS:{
      return {
        ...state,
        user: action.payload
      }
    }
    // gộp các mặt hàng khi chưa đăng nhập và sau khi đăng nhập có trước ở tài khoản
    // lặp cart ko có user xem có chùng với sản phẩm nào trong tài khoản
    // có thì cộng 2 count lại còn không có thì thêm mới cart

    case ADD_CART: {
      let cartAction = user.cart
      let newUser = {}
      if (cartAction.length >= 0) {
        const index = cartAction.findIndex(item => item.id === action.payload.id)
        if (index !== -1) {
          const newData = {
            ...cartAction[index],
            count: cartAction[index].count + 1,
          }

          cartAction.splice(index, 1 , newData)
          newUser = {
            ...user,
            cart: cartAction
          }

          userApi.addCart(user.id, newUser)
        } else {
          const newData = {
            id: action.payload.id,
            name: action.payload.name,
            img: action.payload.img,
            price: action.payload.price,
            countPay: action.payload.countPay,
            count: 1,
          }
          cartAction.push(newData)
          newUser = {
            ...user,
            cart: cartAction
          }

          userApi.addCart(user.id, newUser)
        }
      } else {
        const newData = {
          id: action.payload.id,
          name: action.payload.name,
          img: action.payload.img,
          price: action.payload.price,
          countPay: action.payload.countPay,
          count: 1,
        }
        cartAction.push(newData)
        newUser = {
          ...user,
          cart: cartAction
        }
        userApi.addCart(user.id, newUser)
      }
      return {
        ...state,
        user: newUser
      }
    }
    /* falls through */

    case ADD_CART_BY_PROFILE: {
      let cartAction = user.cart
      let newData = {}
      let newUser = {}
        const index = cartAction.findIndex(item => item.id === action.payload.product.id)
        if (index !== -1) {
          newData = {
            ...cartAction[index],
            count: cartAction[index].count + action.payload.number,
          }

          cartAction.splice(index, 1 , newData)
          newUser = {
            ...user,
            cart: cartAction
          }
          userApi.addCart(user.id, newUser)
        } else {
          newData = {
            id: action.payload.product.id,
            name: action.payload.product.name,
            img: action.payload.product.img,
            price: action.payload.product.price,
            count: action.payload.number,
          }
          cartAction.push(newData)
          newUser = {
            ...user,
            cart: cartAction
          }
          userApi.addCart(user.id, newUser)
        }
        return {
          ...state,
          user: newUser
        }
    }

    case INCREMENT_PROJECT:{
      const index = cart.findIndex(item => item.id === action.payload)
        if (index !== -1) {
          const number = cart[index].count + 1;
          if (number >= cart[index].countPay) {
            cart[index].count = cart[index].countPay
          } else {
            cart[index].count =number
          }
        }
        userApi.addCart(user.id, user)
        return {
          ...state,
          user: user
        }
    }

    case DECREMENT_PROJECT:{
      const index = cart.findIndex(item => item.id === action.payload)
        if (index !== -1) {
          if (cart[index].count  - 1 === 0 ) {
            cart[index].count = 1
          }
          else {
            cart[index].count = cart[index].count  - 1
          }

        }

      userApi.addCart(user.id, user)
      return {
        ...state,
        user: user
      }
    }

    case NUMBER_INPUT: {
      const index = cart.findIndex(item => item.id === action.payload.id)
      if(isNaN(action.payload.value) || action.payload.value <= 0) {

          cart[index].count = 1

          userApi.addCart(user.id, user)
          return {
            ...state,
            user: user
          }
      } else {
        if (Number(action.payload.value) > cart[index].countPay) {
          cart[index].count = cart[index].countPay
        } else {
          cart[index].count = Number(action.payload.value)
        }

        userApi.addCart(user.id, user)
        return {
          ...state,
          user: user
        }
      }
    }

    case DELETE_ITEM_CART: {
      user.cart = user.cart.filter(item => item.id !== action.payload)
      userApi.addCart(user.id, user)
      return {
        ...state,
        user: user
      }
    }

    case DELETE_LIST_ITEM_CART: {
      action.payload.forEach(elem => {
        user.cart = user.cart.filter(item => item.id !== elem)
      });
      userApi.addCart(user.id, user)
      return {
        ...state,
        user: user
      }
    }

    case PAY_CART: {
      const listProduct = []
      let money = 0
      action.payload.forEach(item => {
        cart.forEach(elem => {
          if (item === elem.id ) {
            listProduct.push(elem)
            money = money + (elem.price * elem.count)
          }
        })
      })
      const newOder = {
        id: uuidv4(),
        listProduct: listProduct,
        money: money,
        status: 0,
      }
      oder.push(newOder)
      userApi.addCart(user.id, user)
      return {
        ...state,
        user: user
      }
    }

    case PAY_CART_NO_USER: {
      console.log(action.payload);
      // action.payload.listId.forEach(item => {
      //   cart.forEach(elem => {
      //     if (item === elem.id && elem.count !== 0) {
      //       oder.push(elem)
      //     }
      //   })
      // })
      // user.profile = action.payload.profile
      // return {
      //   ...state,
      //   user: user
      // }
      return state
    }

    case ADD_CART_NO_USER: {
      const cartLocal = localStorage.getItem('cart')
      if(cartLocal) {
        console.log('add localStorage', action.payload);
      } else {
        const cart = []
        const newData = {
          id: action.payload.id,
          name: action.payload.name,
          img: action.payload.img,
          price: action.payload.price,
          countPay: action.payload.countPay,
          count: 1,
        }
        cart.push(newData)
        console.log(cart);
        localStorage.setItem('cart', JSON.stringify(cart))
        console.log('new add localStorage', action.payload);
      }
      return state
    }

    default:
      return state
  }
}

export default useReducer
