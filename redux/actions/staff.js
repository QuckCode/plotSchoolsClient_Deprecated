import {
  CREATE_STAFF_BEGIN,
  CREATE_STAFF_ERROR,
  CREATE_STAFF_SUCCESS,
  FETCH_ALL_STAFF_BEGIN,
  FETCH_ALL_STAFF_SUCCESS,
  FETCH_ALL_STAFF_ERROR,
  url
} from '../varables';
import axios from 'axios'
import {message} from 'antd'

export const createStaff = (data) => {
 return dispatch => {
   dispatch(createStaffBegin())
   return axios.post(`${url}/staff`,data)
   .then(({data})=>{
       setTimeout( ()=>{
         message.success("Created  Staffs", 10)
         dispatch(createStaffSuccess(data))
       },1000)
   })
   .catch((error)=>{
        message.error("Please an error occurred")
      dispatch(createStaffError(error))
   })
 };
};

const createStaffBegin= ()=>({
 type:CREATE_STAFF_BEGIN
})

const createStaffSuccess= ()=>({
 type:CREATE_STAFF_SUCCESS,
})

const createStaffError= error=>({
 type: CREATE_STAFF_ERROR,
 payload:{
    error
 }
})


export const getAllStaffs = (schoolID) => {
  return dispatch => {
    dispatch( getAllStaffsBegin())
    return axios.get(`${url}/staff/5f8c7ee1b9776e05f105a6db`)
    .then(({data})=>{
       console.log(data)
          dispatch(getAllStaffsSuccess(data))
    })
    .catch((error)=>{
       dispatch(getAllStaffsError(error))
    })
  };
};

const getAllStaffsBegin= ()=>({
  type:FETCH_ALL_STAFF_BEGIN
})

const getAllStaffsSuccess= (staffs)=>({
  type:FETCH_ALL_STAFF_SUCCESS,
  payload:{
    staffs
  }
})

const getAllStaffsError= error=>({
  type:FETCH_ALL_STAFF_ERROR,
  payload:{
     error
  }
})