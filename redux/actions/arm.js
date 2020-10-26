import {
  CREATE_ARM_BEGIN,
  CREATE_ARM_ERROR,
  CREATE_ARM_SUCCESS,
  FETCH_ALL_ARM_BEGIN,
  FETCH_ALL_ARM_SUCCESS,
  FETCH_ALL_ARM_ERROR,
  url
} from '../varables';
import axios from 'axios'
import {message} from 'antd'

export const createArm = (data) => {
 return dispatch => {
   dispatch(createArmBegin())
   return axios.post(`${url}/arm`,data)
   .then(({data})=>{
       setTimeout( ()=>{
        message.success("Created  Arms", 10)
         dispatch(createArmSuccess(data))
       },1000)
   })
   .catch((error)=>{
        message.error("Please an error occurred")
      dispatch(createArmError(error))
   })
 };
};

const createArmBegin= ()=>({
 type:CREATE_ARM_BEGIN
})

const createArmSuccess= ()=>({
 type:CREATE_ARM_SUCCESS,
})

const createArmError= error=>({
 type: CREATE_ARM_ERROR,
 payload:{
    error
 }
})


export const getAllArms = (schoolID) => {
  return dispatch => {
    dispatch( getAllArmsBegin())
    return axios.get(`${url}/arm/5f8c7ee1b9776e05f105a6db`)
    .then(({data})=>{
       console.log(data)
          dispatch(getAllArmsSuccess(data))
    })
    .catch((error)=>{
       dispatch(getAllArmsError(error))
    })
  };
};

const getAllArmsBegin= ()=>({
  type:FETCH_ALL_ARM_BEGIN
})

const getAllArmsSuccess= (arms)=>({
  type:FETCH_ALL_ARM_SUCCESS,
  payload:{
    arms
  }
})

const getAllArmsError= error=>({
  type:FETCH_ALL_ARM_ERROR,
  payload:{
     error
  }
})