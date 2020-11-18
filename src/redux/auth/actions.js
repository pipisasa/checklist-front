import { getLoggedInUser } from "../../helpers/authUtils"
import axios from "../../helpers/axios"
import { API_URL } from "../../helpers/constants"
import { LOGIN_USER, LOGIN_USER_FAILED, LOGIN_USER_SUCCESS, REGISTER_USER, REGISTER_USER_FAILED, REGISTER_USER_SUCCESS } from "./constants"

export const loginUser = ({email, password}, cb=()=>{})=>(dispatch)=>{
  // dispatch({
  //   type: LOGIN_USER,
  // })
  axios.post(API_URL+"/auth/login/",{email, password})
    .then(({data})=>{
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: data
      });
      cb();
    })
    .catch(e=>{
      console.warn("LOGIN_USER_FAILED", e.response);
      dispatch({
        type: LOGIN_USER_FAILED,
        payload: e?.response?.data?.message || e?.message
      })
    })
};

export const registerUser = ({email, password, username}, cb=()=>{})=>(dispatch)=>{
  dispatch({
    type: REGISTER_USER,
  })
  axios.post(API_URL+"/auth/register/",{
    email,
    username,
    password,
    password_confirmation: password,
  })
    .then(({data})=>{
      console.log(data);
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: data
      })
      cb();
    })
    .catch(e=>{
      console.log(e.response)
      dispatch({
        type: REGISTER_USER_FAILED,
        payload: e?.response?.data || e.message
      })
    })
};

export const refreshToken = (cb=()=>{})=>(dispatch)=>{
  dispatch({
    type: LOGIN_USER,
  })
  axios.post(API_URL+"/auth/refresh",{refresh: getLoggedInUser().token.refresh})
    .then(({data})=>{
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: data
      })
      cb();
    })
    .catch(e=>{
      localStorage.removeItem('user');
      window.location.replace('/');
      // dispatch({
      //   type: LOGIN_USER_FAILED,
      //   payload: e?.response?.data?.message || e.message
      // })
    })
};