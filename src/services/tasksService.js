import axios from 'axios';

const list = () =>
  axios.get('/api/tasks')
    .then((response) => response.data)

const get = (id) =>
  axios.get(`/api/tasks/${id}`)
    .then((response) => response.data)

const create = (task) =>
  axios.post('/api/tasks', task)
    .then((response) => response.data)

const edit = (id, task) =>
  axios.put(`/api/tasks/${id}`, task)
    .then((response) => response.data)

const remove = (id) =>
  axios.delete(`/api/tasks/${id}`)
    .then((response) => response.data)

export default { list, get, create, edit, remove };
