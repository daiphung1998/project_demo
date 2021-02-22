import {
  GET_PRODUCT,
  DECREMENT_COUNT_PAY,
  DECREMENT_COUNT_PAY_PROFILE,
  DECREMENT_COUNT_PAY_BY_CART,
  INCREMENT_COUNT_PAY_BY_CART,
  ONCHANGE_NUMBER_INPUT_BY_CART
} from '../actionType'

export const getProduct = (payload) => {
  return {
    type: GET_PRODUCT,
    payload
  }
}

export const decrementCountPay = (payload) => {
  return {
    type: DECREMENT_COUNT_PAY,
    payload
  }
}

export const decrementCountPayProfile = (payload) => {
  return {
    type: DECREMENT_COUNT_PAY_PROFILE,
    payload
  }
}

export const decrementCountPayByCart = (payload) => {
  return {
    type: DECREMENT_COUNT_PAY_BY_CART,
    payload
  }
}

export const incrementCountPayByCart = (payload) => {
  return {
    type: INCREMENT_COUNT_PAY_BY_CART,
    payload
  }
}

export const onchangeInputPayByCart = (payload) => {
  return {
    type: ONCHANGE_NUMBER_INPUT_BY_CART,
    payload
  }
}
