import axiosClient from './axiosClient'

const userApi = {
  getUser: () => {
    const url = '/users'
    return axiosClient.get(url)
  }
}
export default userApi
