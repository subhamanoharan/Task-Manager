import axios from 'axios';

const list = () =>
  axios.get('/api/status')
    .then((response) => response.data)

export default { list };
