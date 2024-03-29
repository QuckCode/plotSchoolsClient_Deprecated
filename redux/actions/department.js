
import {
  CREATE_DEPARTMENT_BEGIN,
  CREATE_DEPARTMENT_ERROR,
  CREATE_DEPARTMENT_SUCCESS,
  FETCH_ALL_DEPARTMENT_BEGIN,
  FETCH_ALL_DEPARTMENT_SUCCESS,
  FETCH_ALL_DEPARTMENT_ERROR,
  EDIT_DEPARTMENT_BEGIN,
  EDIT_DEPARTMENT_ERROR,
  EDIT_DEPARTMENT_SUCCESS,
  url, school
} from '../varables';
import axios from 'axios'
import {message} from 'antd'

export const createDepartment = (data) => {
 return dispatch => {
   dispatch(createDepartmentBegin())
   return axios.post(`${url}/department`,data)
   .then(({data})=>{
         dispatch(createDepartmentSuccess(data))
          return Promise.resolve((data))
   })
   .catch(({response})=>{
      dispatch(createDepartmentError(response.data))
      return Promise.reject(response.data)
   })
 };
};

const createDepartmentBegin= ()=>({
 type:CREATE_DEPARTMENT_BEGIN
})

const createDepartmentSuccess= ()=>({
 type:CREATE_DEPARTMENT_SUCCESS,
})

const createDepartmentError= error=>({
 type: CREATE_DEPARTMENT_ERROR,
 payload:{
    error
 }
})


export const getAllDepartments = (schoolID) => {
  return dispatch => {
    dispatch( getAllDepartmentsBegin())
    return axios.get(`${url}/department/${school}`)
    .then(({data})=>{
          dispatch(getAllDepartmentsSuccess(data))
          return Promise.resolve()
    })
    .catch(({response})=>{
       dispatch(getAllDepartmentsError(response.data))
       return Promise.reject(response.data)
    })
  };
};

const getAllDepartmentsBegin= ()=>({
  type:FETCH_ALL_DEPARTMENT_BEGIN
})

const getAllDepartmentsSuccess= (departments)=>({
  type:FETCH_ALL_DEPARTMENT_SUCCESS,
  payload:{
    departments
  }
})

const getAllDepartmentsError= error=>({
  type:FETCH_ALL_DEPARTMENT_ERROR,
  payload:{
     error
  }
})


export const editDepartment = (data) => {
  return dispatch => {
    dispatch(editDepartmentBegin())
    return axios.post(`${url}/department/edit`,data)
    .then(({data})=>{
          dispatch(editDepartmentSuccess(data))
           return Promise.resolve((data))
    })
    .catch(({response})=>{
       dispatch(editDepartmentError(response.data))
       return Promise.reject(response.data)
    })
  };
 };
 
 const editDepartmentBegin= ()=>({
  type:EDIT_DEPARTMENT_BEGIN
 })
 
 const editDepartmentSuccess= ()=>({
  type:EDIT_DEPARTMENT_SUCCESS,
 })
 
 const editDepartmentError= error=>({
  type: EDIT_DEPARTMENT_ERROR,
  payload:{
     error
  }
 })