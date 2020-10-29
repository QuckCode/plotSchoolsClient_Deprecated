
import {
   FETCH_ALL_SCHOOLS_BEGIN,
   FETCH_ALL_SCHOOLS_ERROR,
   FETCH_ALL_SCHOOLS_SUCCESS,
   url
 } from '../varables';
 import axios from 'axios'

export const getAllSchools = (data) => {
  return dispatch => {
    dispatch( getAllSchoolBegin())
    return axios.get(`${url}/schools`)
    .then(({data})=>{
       console.log(data)
          dispatch(getAllSchoolSuccess(data))
    })
    .catch((error)=>{
       dispatch(getAllSchoolError(error.response))
    })
  };
};

const getAllSchoolBegin= ()=>({
  type:FETCH_ALL_SCHOOLS_BEGIN
})

const getAllSchoolSuccess= (schools)=>({
  type:FETCH_ALL_SCHOOLS_SUCCESS,
  payload:{
    schools,
  }
})

const getAllSchoolError= error=>({
  type:FETCH_ALL_SCHOOLS_ERROR,
  payload:{
     error
  }
})