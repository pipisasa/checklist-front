import axios from "../../helpers/axios";
import { API_URL } from "../../helpers/constants";
import { refreshToken } from "../auth/actions";
import { 
  END_LOADING,
  FETCH_DATA, 
  FETCH_DATA_FAILED, 
  FETCH_DATA_SUCCESS,
  START_LOADING,
  TOGGLE_ITEM,
  CATCH_ERROR,
} from "./constants";
 
export const fetchData = ()=> (dispatch, getState)=> {
  dispatch({
    type: FETCH_DATA
  })
  const {date} = getState().checklist;
  axios.get(API_URL+"/checklists",{params:{
    start_date: date.start_date,
    end_date: date.end_date
  }})
    .then(({ data }) => {
      console.log(data)
      dispatch(fetchDataSuccess(data));
    })
    .catch(e => {
      dispatch(fetchDataFailed(e))
    });
};

export const fetchDataSuccess = (data)=>({
  type: FETCH_DATA_SUCCESS,
  payload: data
});

export const fetchDataFailed = (e)=>(dispatch)=>{
  let error = e?.response?.data || e;
  if(e?.response && e.response.headers["content-type"].split("; ")[0]==="text/html"){
    document.write(e.response.data)
  }
  console.log(e?.response?.data)
  if(e.status === 401){
    return dispatch(refreshToken);
  }
  dispatch({
    type: FETCH_DATA_FAILED,
    payload: error
  })
}

export const catchError = (e)=>{
  let error = e?.response?.data?.message || e;
  if(e.response.headers["content-type"].split("; ")[0]==="text/html"){
    document.write(e.response.data)
  }
  return ({
    type: CATCH_ERROR,
    payload: error
  })
}

export const toggleItem = (item)=>(dispatch, getState)=>{
  const checklists = getState().checklist.data.map(a=>{
    return a.id === item.id ? {...item, status: !item.status} : a
  });
  
  axios.patch(API_URL+'/checklists/', {...item,status: !item.status});

  dispatch({
    type: TOGGLE_ITEM,
    payload: checklists
  });
}

export const addNewItem = ({ title, start_date, end_date })=>(dispatch)=>{
  dispatch({ type: START_LOADING });
  axios.post(API_URL+"/checklists/", {title, start_date, end_date,})
    .then(()=>{
      dispatch(fetchData())
    })
    .catch(e=>{
      console.log("ADD_NEW_ITEM_FAILED", e.response)
      dispatch(catchError(e))
    })
    .finally(()=>dispatch({type: END_LOADING}));
}

export const changeItem = (item)=>(dispatch)=>{
  dispatch({ type: START_LOADING });
  axios.patch(API_URL+'/checklists', item)
    .then(()=>{
      dispatch(fetchData());
    })
    .catch(e=>{
      dispatch(fetchDataFailed(e))
    })
    .finally(()=>dispatch({type: END_LOADING}));
}