import {
  CREATE_DESIGNATION_BEGIN,
  CREATE_DESIGNATION_ERROR,
  CREATE_DESIGNATION_SUCCESS,
  FETCH_ALL_DESIGNATION_BEGIN,
  FETCH_ALL_DESIGNATION_SUCCESS,
  FETCH_ALL_DESIGNATION_ERROR,
  EDIT_DESIGNATION_BEGIN,
  EDIT_DESIGNATION_SUCCESS,
  EDIT_DESIGNATION_ERROR,
  url, school
} from '../varables';
import axios from 'axios'
import {message} from 'antd'

export const createDesignation = (data) => {
 return dispatch => {
   dispatch(createDesignationBegin())
   return axios.post(`${url}/designation`,data)
   .then(({data})=>{
       setTimeout( ()=>{
         dispatch(createDesignationSuccess(data))
         return Promise.resolve()
       },1000)
   })
   .catch(({response})=>{
      dispatch(createDesignationError(response.data))
      return Promise.reject(response.data)
   })
 };
};

const createDesignationBegin= ()=>({
 type:CREATE_DESIGNATION_BEGIN
})

const createDesignationSuccess= ()=>({
 type:CREATE_DESIGNATION_SUCCESS,
})

const createDesignationError= error=>({
 type: CREATE_DESIGNATION_ERROR,
 payload:{
    error
 }
})


export const editDesignation = (data) => {
  return dispatch => {
    dispatch(editDesignationBegin())
    return axios.post(`${url}/designation/edit`,data)
    .then(({data})=>{
          dispatch(editDesignationSuccess(data))
          return Promise.resolve()
    })
    .catch(({response})=>{
       dispatch(editDesignationError(response.data))
       return Promise.reject(response.data)
    })
  };
 };
 
 const editDesignationBegin= ()=>({
  type:EDIT_DESIGNATION_BEGIN
 })
 
 const editDesignationSuccess= ()=>({
  type:EDIT_DESIGNATION_SUCCESS,
 })
 
 const editDesignationError= error=>({
  type: EDIT_DESIGNATION_ERROR,
  payload:{
     error
  }
 })


export const getAllDesignations = (schoolID) => {
  return dispatch => {
    dispatch( getAllDesignationsBegin())
    return axios.get(`${url}/designation/${school}`)
    .then(({data})=>{
          dispatch(getAllDesignationsSuccess(data))
          return Promise.resolve((data))
    })
    .catch(({response})=>{
       dispatch(getAllDesignationsError(response.data))
       return Promise.reject(response.data)
    })
  };
};

const getAllDesignationsBegin= ()=>({
  type:FETCH_ALL_DESIGNATION_BEGIN
})

const getAllDesignationsSuccess= (designations)=>({
  type:FETCH_ALL_DESIGNATION_SUCCESS,
  payload:{
    designations
  }
})

const getAllDesignationsError= error=>({
  type:FETCH_ALL_DESIGNATION_ERROR,
  payload:{
     error
  }
})