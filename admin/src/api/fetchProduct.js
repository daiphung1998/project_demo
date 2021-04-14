import axiosClient from './axiosCline';;

const fetchProduct = {
  getAllProduct: (params) => {
    const url = '/products'
    return axiosClient.get(url)
  }
}

export default fetchProduct;
