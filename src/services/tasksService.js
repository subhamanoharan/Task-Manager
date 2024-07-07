import axiosHelper from '@/lib/axiosHelper'

const axiosInstance = axiosHelper.getInstance();

const list = () =>
  axiosInstance.get('/tasks')
    .then((response) => response.data)

const get = (id) =>
  axiosInstance.get(`/tasks/${id}`)
    .then((response) => response.data)

const create = (task) =>
  axiosInstance.post('/tasks', task)
    .then((response) => response.data)

const edit = (id, task) =>
  axiosInstance.put(`/tasks/${id}`, task)
    .then((response) => response.data)

const remove = (id) =>
  axiosInstance.delete(`/tasks/${id}`)
    .then((response) => response.data)

export default { list, get, create, edit, remove };
