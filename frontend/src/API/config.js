import axios from 'axios';
import { getLocalItem } from '../localStrorage';
import { setLoading } from '../redux/loadingSlice';
import { store } from '../redux/store';
 
const axiosClient = axios.create();
 
axiosClient.defaults.baseURL = 'http://localhost:8080';
 
axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};
 
//All request will wait 2 seconds before timeout
// axiosClient.defaults.timeout = 2000;
 
//setting interceptors for requests
axiosClient.interceptors.request.use(
  (config) => {
   
    let url = config.url;
    console.log(store.getState());
    let profdetails=store.getState().staffStates.professionalDetails;
    let empdetails = store.getState().staffStates.employerDetails;
    console.log(profdetails,empdetails,url);
    if((url=="/getProfessional"&&profdetails.length>0) || (url=="/getEmployers"&&empdetails.length>0)){
      store.dispatch(setLoading(false));
    }
    else{
      store.dispatch(setLoading(true));
    }
    console.log(config.url); // Start loading
    const token = getLocalItem("token");
    console.log(token);  // Optionally, remove console logs for production
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    store.dispatch(setLoading(false)); // Stop loading on error
    return Promise.reject(error);
  }
);

// Set up interceptors for response to manage loading state
axiosClient.interceptors.response.use(
  (response) => {
    store.dispatch(setLoading(false)); // Stop loading on success
    return response;
  },
  (error) => {
    store.dispatch(setLoading(false)); // Stop loading on error
    return Promise.reject(error);
  }
);

export function getRequest(URL) {
  return axiosClient.get(`/${URL}`).then(response => response);
}

export function postRequest(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then(response => response);
}

export function patchRequest(URL, payload) {
  return axiosClient.patch(`/${URL}`, payload).then(response => response);
}
export function putRequest(URL, payload) {
  return axiosClient.put(`/${URL}`, payload).then(response => response);
}
export function deleteRequest(URL,payload) {
  return axiosClient.delete(`/${URL}`,{},payload).then(response => response);
}

export default axiosClient;