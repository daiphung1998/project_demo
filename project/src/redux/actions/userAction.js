import { GET_USERS,
  ADD_CART,
  INCREMENT_PROJECT,
  DECREMENT_PROJECT,
  DELETE_ITEM_CART,
  NUMBER_INPUT,
  DELETE_LIST_ITEM_CART,
  PAY_CART,
  ADD_CART_BY_PROFILE,
  PAY_CART_NO_USER,
  ADD_CART_NO_USER,
  ADD_ORDER,
  ADD_CART_BY_PROFILE_NO_USER,
  ADD_ORDER_NO_USER,
} from '../actionType';

export const getUser = (payload) => {
  return {
    type: GET_USERS,
    payload
  }
}

export const addCart = (payload) => {
  return {
    type: ADD_CART,
    payload
  }
}

export const incrementProject = (payload) => {
  return {
    type: INCREMENT_PROJECT,
    payload
  }
}

export const decrementProject = (payload) => {
 return {
    type: DECREMENT_PROJECT,
    payload
  }
}

export const numberInputProject = (payload) => {
  return {
     type: NUMBER_INPUT,
     payload
   }
 }

export const deleteItemCart = (payload) => {
  return {
     type: DELETE_ITEM_CART,
     payload
   }
 }

export const deleteListItemCart = (payload) => {
  return {
    type: DELETE_LIST_ITEM_CART,
    payload
  }
}

export const payCart = (payload) => {
  return {
    type: PAY_CART,
    payload
  }
}

export const addCartByProfile = (payload) => {
  return {
    type: ADD_CART_BY_PROFILE,
    payload
  }
}

export const payCartNoUser = (payload) => {
  return {
    type: PAY_CART_NO_USER,
    payload
  }
}

export const addCartNoUser = (payload) => {
  return {
    type : ADD_CART_NO_USER,
    payload
  }
}

export const addCartByProfileNoUser = (payload) => {
  return {
    type : ADD_CART_BY_PROFILE_NO_USER,
    payload
  }
}

export const addOrder = (payload) => {
  return {
    type : ADD_ORDER,
    payload
  }
}

export const addOrderNoUser = (payload) => {
  return {
    type : ADD_ORDER_NO_USER,
    payload
  }
}
