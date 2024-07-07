import axiosHelper from '@/lib/axiosHelper'

const axiosInstance = axiosHelper.getInstance();

const login = (username, password) =>
  axiosInstance.post('/users/authenticate', {}, { auth: {username, password }})
    .then((response) => response.data)

const logout = () =>
  axiosInstance.post('/users/logout')
    .then((response) => response.data)

const getUser = () =>
  axiosInstance.get('/users/me')
    .then((response) => response.data)

export default { login, logout, getUser };
