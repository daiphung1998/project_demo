import axiosClient from './axiosCline';

const fetchUser = {
  getAllUser: (params) => {
    const url = '/users'
    return axiosClient.get(url)
  }
}

export default fetchUser;
