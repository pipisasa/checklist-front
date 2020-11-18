import axios from 'axios';
import { getLoggedInUser, isUserAuthenticated } from './authUtils';

//? Add a request interceptor
axios.interceptors.request.use(function (config) {
  //? Do something before request is sent
  if(isUserAuthenticated()){
    config.headers["Authorization"] = `JWT ${getLoggedInUser().token.access}`;
  }
  return config;
}, function (error) {
  //? Do something with request error
  return Promise.reject(error);
});

//? Add a response interceptor
axios.interceptors.response.use(function (response) {
  //? Do something with response data
  return response;
}, function (e) {
  //? Do something with response error
  if(e.response.status===401){
    // window.location.replace('/')
  }
  return Promise.reject(e);
});

export default axios;