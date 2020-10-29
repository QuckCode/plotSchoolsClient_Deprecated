import {
  CREATE_STAFF_BEGIN,
  CREATE_STAFF_ERROR,
  CREATE_STAFF_SUCCESS,
  FETCH_ALL_STAFF_BEGIN,
  FETCH_ALL_STAFF_SUCCESS,
  FETCH_ALL_STAFF_ERROR,
  url,school
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
      dispatch(createStaffError(error.response))
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
    return axios.get(`${url}/staff/${school}`)
    .then(({data})=>{
       
       console.log(process.env)
          dispatch(getAllStaffsSuccess(data))
    })
    .catch((error)=>{
       dispatch(getAllStaffsError(error.response))
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