import axios from 'axios';
import { getLocalItem } from '../localStrorage';
 
const axiosClient = axios.create();
 
axiosClient.defaults.baseURL = 'http://localhost:8080';
 
axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};
 
//All request will wait 2 seconds before timeout
// axiosClient.defaults.timeout = 2000;
 
axiosClient.defaults.withCredentials = true;
//axios.defaults.headers.common['Authorization'] =`Bearer ${token}`;
 
export function getRequest(URL) {
    return axiosClient.get(`/${URL}`).then(response => response);
  }
 
  export function postRequest(URL, payload) {
    return axiosClient.post(`/${URL}`, payload).then(response => response);
  }
 
  export function patchRequest(URL, payload) {
    return axiosClient.patch(`/${URL}`, payload).then(response => response);
  }
 
  export function deleteRequest(URL) {
    return axiosClient.delete(`/${URL}`).then(response => response);
  }
 
  axiosClient.interceptors.request.use(
    (config)=>{
      const token = getLocalItem("token");
      console.log(token);
      if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  )
 
  export default axiosClient;