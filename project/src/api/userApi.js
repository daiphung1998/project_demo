import axiosClient from './axiosClient'

const userApi = {
  getUser: () => {
    const url = '/users/1'
    return axiosClient.get(url)
  },

  addCart: (id, data) => {
    const url = `/users/${id}`
    return axiosClient.put(url, data)
  }
}
export default userApi
