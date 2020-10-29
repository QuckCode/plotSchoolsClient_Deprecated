import {
  CREATE_CLASSES_BEGIN,
  CREATE_CLASSES_ERROR,
  CREATE_CLASSES_SUCCESS,
  FETCH_ALL_CLASSES_BEGIN,
  FETCH_ALL_CLASSES_SUCCESS,
  FETCH_ALL_CLASSES_ERROR,
  url, school
} from '../varables';
import axios from 'axios'
import {message} from 'antd'

export const createClasses = (data) => {
 return dispatch => {
   dispatch(createClassesBegin())
   return axios.post(`${url}/class`,data)
   .then(({data})=>{
        message.success("Created Class", 10)
       setTimeout( ()=>dispatch(createClassesSuccess(data)),1000)
   })
   .catch((error)=>{
        message.error("Please an error occurred")
      dispatch(createClassesError(error.response))
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
       dispatch(getAllClassesError(error.response))
    })
  };
};

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