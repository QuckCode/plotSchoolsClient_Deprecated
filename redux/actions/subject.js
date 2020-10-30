import {
  CREATE_SUBJECT_BEGIN,
  CREATE_SUBJECT_ERROR,
  CREATE_SUBJECT_SUCCESS,
  FETCH_ALL_SUBJECTS_BEGIN,
  FETCH_ALL_SUBJECTS_SUCCESS,
  FETCH_ALL_SUBJECTS_ERROR,
  url, school
} from '../varables';
import axios from 'axios'
import {message} from 'antd'

export const createSubject = (data) => {
 return dispatch => {
   dispatch(createSubjectBegin())
   return axios.post(`${url}/subject`,data)
   .then(({data})=>{
        message.success("Created subject", 10)
         setTimeout( ()=>dispatch(createSubjectSuccess()),1000)
   })
   .catch((error)=>{
      console.log(error.response)
      message.error("PLease an error occurred")
      dispatch(createSubjectError(error.response))
   })
 };

};


const createSubjectBegin= ()=>({
  type:CREATE_SUBJECT_BEGIN
 })
 
 const createSubjectSuccess= ()=>({
  type:CREATE_SUBJECT_SUCCESS,
 })
 
 const createSubjectError= error=>({
  type: CREATE_SUBJECT_ERROR,
  payload:{
     error
  }
 })


export const getAllSubjects = (schoolID) => {
  return dispatch => {
    dispatch( getAllSubjectBegin())
    return axios.get(`${url}/subject/${school}`)
    .then(({data})=>{
       console.log(data)
          dispatch(getAllSubjectSuccess(data))
    })
    .catch((error)=>{
       dispatch(getAllSubjectError(error.response))
    })
  };
};

const getAllSubjectBegin= ()=>({
  type:FETCH_ALL_SUBJECTS_BEGIN
})

const getAllSubjectSuccess= (subjects)=>({
  type:FETCH_ALL_SUBJECTS_SUCCESS,
  payload:{
    subjects
  }
})

const getAllSubjectError= error=>({
  type:FETCH_ALL_SUBJECTS_ERROR,
  payload:{
     error
  }
})