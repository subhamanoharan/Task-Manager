import axiosHelper from '@/lib/axiosHelper'

const axiosInstance = axiosHelper.getInstance();

const list = () =>
  axiosInstance.get('/status')
    .then((response) => response.data)

export default { list };
