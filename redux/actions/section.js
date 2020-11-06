import {
  CREATE_SECTION_BEGIN,
  CREATE_SECTION_ERROR,
  CREATE_SECTION_SUCCESS,
  FETCH_ALL_SECTION_BEGIN,
  FETCH_ALL_SECTION_SUCCESS,
  FETCH_ALL_SECTION_ERROR,
  url, school
} from '../varables';
import axios from 'axios'
import {message} from 'antd'

export const createSection = (data) => {
 return dispatch => {
   dispatch(createSectionBegin())
   return axios.post(`${url}/section`,data)
   .then(({data})=>{
        message.success("Created section", 10)
       setTimeout( ()=>dispatch(createSectionSuccess(data)),1000)
   })
   .catch((error)=>{
        message.error("PLease an error occurred")
      dispatch(createSectionError(error.response))
   })
 };
};

const createSectionBegin= ()=>({
 type:CREATE_SECTION_BEGIN
})

const createSectionSuccess= ()=>({
 type:CREATE_SECTION_SUCCESS,
})

const createSectionError= error=>({
 type: CREATE_SECTION_ERROR,
 payload:{
    error
 }
})


export const getAllSection = (schoolID) => {
  return dispatch => {
    dispatch( getAllSectionBegin())
    return axios.get(`${url}/section/${school}`)
    .then(({data})=>{
          dispatch(getAllSectionSuccess(data))
    })
    .catch((error)=>{
       dispatch(getAllSectionError(error))
    })
  };
};

const getAllSectionBegin= ()=>({
  type:FETCH_ALL_SECTION_BEGIN
})

const getAllSectionSuccess= (sections)=>({
  type:FETCH_ALL_SECTION_SUCCESS,
  payload:{
    sections
  }
})

const getAllSectionError= error=>({
  type:FETCH_ALL_SECTION_ERROR,
  payload:{
     error
  }
})