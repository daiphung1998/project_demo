import {
  GET_PRODUCT,
  DECREMENT_COUNT_PAY,
  DECREMENT_COUNT_PAY_PROFILE,
  DECREMENT_COUNT_PAY_BY_CART,
  INCREMENT_COUNT_PAY_BY_CART,
  ONCHANGE_NUMBER_INPUT_BY_CART
} from '../actionType'

const initialState = []

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return state = action.payload

    case DECREMENT_COUNT_PAY: {
      const newArr = [...state]

      newArr.forEach(item => {
        if (item.id === action.payload.id) {
          item.countPay = item.countPay - 1
        }
      })
      return state = [...newArr]
    }

    case DECREMENT_COUNT_PAY_PROFILE: {
      const newArr = [...state]
      newArr.forEach(item => {
        if (item.id === action.payload.product.id) {
          item.countPay = item.countPay - action.payload.number
        }
      })
      console.log(newArr);
      return state = [...newArr]
    }

    case DECREMENT_COUNT_PAY_BY_CART: {
      const newArr = [...state]

      newArr.forEach(item => {
        if (item.id === action.payload) {
          item.countPay = item.countPay + 1
        }
      })
      return state = [...newArr]
    }

    case INCREMENT_COUNT_PAY_BY_CART: {
      const newArr = [...state]

      newArr.forEach(item => {
        if (item.id === action.payload) {
          item.countPay = item.countPay - 1
        }
      })
      return state = [...newArr]
    }

    case ONCHANGE_NUMBER_INPUT_BY_CART: {
      const newArr = [...state]

      newArr.forEach(item => {
        if (item.id === action.payload.id) {
            console.log(action.payload.value);
        }
      })
      return state = [...newArr]
    }

    default:
      return state
  }
}

export default productReducer
