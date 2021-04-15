import axiosClient from './axiosCline';

const ApiUser = {
  getAllUser: (params) => {
    const url = '/users'
    return axiosClient.get(url)
  },
  deleteUser: (id) => {
    const url = `/users/${id}`
    return axiosClient.delete(url)
  },
  addUser: (data) => {
    const url = `/users`
    return axiosClient.delete(url,data)
  },
  editUser: (id,data) => {
    const url = `/users/${id}`
    return axiosClient.delete(url,data)
  }

}

export default ApiUser;
