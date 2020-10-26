import {
  CREATE_STUDENT_BEGIN,
  CREATE_STUDENT_ERROR,
  CREATE_STUDENT_SUCCESS,
  FETCH_ALL_STUDENT_BEGIN,
  FETCH_ALL_STUDENT_SUCCESS,
  FETCH_ALL_STUDENT_ERROR,
  url
} from '../varables';
import axios from 'axios'
import {message} from 'antd'

export const createStudent = (data) => {
 return dispatch => {
   dispatch(createStudentBegin())
   return axios.post(`${url}/student`,data)
   .then(({data})=>{
       setTimeout( ()=>{
        message.success("Created  Students", 10)
         dispatch(createStudentSuccess(data))
       },1000)
   })
   .catch((error)=>{
        message.error("Please an error occurred")
      dispatch(createStudentError(error))
   })
 };
};

const createStudentBegin= ()=>({
 type:CREATE_STUDENT_BEGIN
})

const createStudentSuccess= ()=>({
 type:CREATE_STUDENT_SUCCESS,
})

const createStudentError= error=>({
 type: CREATE_STUDENT_ERROR,
 payload:{
    error
 }
})


export const getAllStudents = (schoolID) => {
  return dispatch => {
    dispatch( getAllStudentsBegin())
    return axios.get(`${url}/student/5f8c7ee1b9776e05f105a6db`)
    .then(({data})=>{
       console.log(data)
          dispatch(getAllStudentsSuccess(data))
    })
    .catch((error)=>{
       dispatch(getAllStudentsError(error))
    })
  };
};

const getAllStudentsBegin= ()=>({
  type:FETCH_ALL_STUDENT_BEGIN
})

const getAllStudentsSuccess= (students)=>({
  type:FETCH_ALL_STUDENT_SUCCESS,
  payload:{
    students
  }
})

const getAllStudentsError= error=>({
  type:FETCH_ALL_STUDENT_ERROR,
  payload:{
     error
  }
})