import {
  CREATE_CLASSES_BEGIN,
  CREATE_CLASSES_ERROR,
  CREATE_CLASSES_SUCCESS,
  FETCH_ALL_CLASSES_BEGIN,
  FETCH_ALL_CLASSES_SUCCESS,
  FETCH_ALL_CLASSES_ERROR,
  FETCH_ALL_TESTS_IN_CURRENT_CLASS_BEGIN,
  FETCH_ALL_TESTS_IN_CURRENT_CLASS_ERROR,
  FETCH_ALL_TESTS_IN_CURRENT_CLASS_SUCCESS,
  url, school
} from '../varables';
import axios from 'axios'
import {message} from 'antd'

export const createClasses = (data) => {
 return dispatch => {
   new Promise((resolve, reject)=>{
    dispatch(createClassesBegin())
    return axios.post(`${url}/class`,data)
    .then(({data})=>{
           message.success("Created Class", 10)
           dispatch(createClassesSuccess(data))
           resolve(data)
    })
    .catch((error)=>{
         message.error("Please an error occurred")
       dispatch(createClassesError(error.response.data))
         reject(err.response.data)
    })
   })
 };
};

const createClassesBegin= ()=>({
 type:CREATE_CLASSES_BEGIN
})

const createClassesSuccess= ()=>({
 type:CREATE_CLASSES_SUCCESS,
})

const createClassesError= error=>({
 type: CREATE_CLASSES_ERROR,
 payload:{
    error
 }
})


export const getAllClasses = (schoolID) => {
  return dispatch => {
    dispatch( getAllClassesBegin())
    return axios.get(`${url}/class/${school}`)
    .then(({data})=>{
          dispatch(getAllClassesSuccess(data))
    })
    .catch((error)=>{
       dispatch(getAllClassesError(error))
       return Promise.resolve(error)

    })
  }}

const getAllClassesBegin= ()=>({
  type:FETCH_ALL_CLASSES_BEGIN
})

const getAllClassesSuccess= (classes)=>({
  type:FETCH_ALL_CLASSES_SUCCESS,
  payload:{
    classes
  }
})

const getAllClassesError= error=>({
  type:FETCH_ALL_CLASSES_ERROR,
  payload:{
     error
  }
})

export const getCurrentClassTests = (classId) => {
  return dispatch => {
    dispatch( getCurrentClassTestsBegin())
    try {
      return axios.get(`${url}/class/test/${classId}`)
      .then(({data})=>{
            dispatch(getCurrentClassTestsSuccess(data))
            return Promise.resolve()
      })
      
    } catch (error) {
      dispatch(getCurrentClassTestsError(error.data))
      return Promise.reject(error.data)
    }
  };
};

const getCurrentClassTestsBegin= ()=>({
  type:FETCH_ALL_TESTS_IN_CURRENT_CLASS_BEGIN
})

const getCurrentClassTestsSuccess= (currentClassTests)=>({
  type:FETCH_ALL_TESTS_IN_CURRENT_CLASS_SUCCESS,
  payload:{
    currentClassTests
  }
})

const getCurrentClassTestsError= error=>({
  type:FETCH_ALL_TESTS_IN_CURRENT_CLASS_ERROR,
  payload:{
     error
  }
})


