import axiosClient from './axiosClient'

const productApi = {
  getAll: () => {
    const url = '/products'
    return axiosClient.get(url)
  },

  getById: (id) => {
    const url = `/products/?id=${id}`
    return axiosClient.get(url)
  },

  getSlide: () => {
    const url = '/slide'
    return axiosClient.get(url)
  }
}

export default productApi
