import axios from 'axios';

class AxiosHelper {
  setUpAuthorizationInterceptors(onUnauthorised, onAuthorised){
    this.onUnauthorised = onUnauthorised;
    this.onAuthorised = onAuthorised;
  }

  getInstance(){
    const axiosInstance = axios.create({
      baseURL: '/api',
      withCredentials: true,
      credentials: 'include'
    });
    axiosInstance.interceptors.response.use((response) => response,
    (error) => {
      const {response: {status = ''} = {}} = error;
      if(status === 401 && this.onUnauthorised){
        this.onUnauthorised();
      }
      return Promise.reject(error);
    });
    return axiosInstance;
  }
}
export default new AxiosHelper();
