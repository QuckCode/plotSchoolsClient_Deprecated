import {
  CREATE_STUDENT_BEGIN,
  CREATE_STUDENT_ERROR,
  CREATE_STUDENT_SUCCESS,
  FETCH_ALL_STUDENT_BEGIN,
  FETCH_ALL_STUDENT_SUCCESS,
  FETCH_ALL_STUDENT_ERROR,
  FETCH_GRAPH_STUDENT_TOTAL_BY_CLASS_BEGIN,
  FETCH_GRAPH_STUDENT_TOTAL_BY_CLASS_SUCCESS,
  FETCH_GRAPH_STUDENT_TOTAL_BY_CLASS_ERROR,
  url, school
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
      dispatch(createStudentError(error.response))
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
    return axios.get(`${url}/student/${school}`)
    .then(({data})=>{
          dispatch(getAllStudentsSuccess(data))
    })
    .catch((error)=>{
       dispatch(getAllStudentsError(error.response))
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


export const getGraphStudentClassTotal = (schoolID) => {
  return dispatch => {
    dispatch(getGraphStudentClassTotalBegin())
    return axios.get(`${url}/graph/class/total/${school}`)
    .then(({data})=>{
          dispatch(getGraphStudentClassTotalSuccess(data))
    })
    .catch((error)=>{
      console.log(error)
       dispatch(getGraphStudentClassTotalError(error.response))
    })
  };
};

const getGraphStudentClassTotalBegin= ()=>({
  type:FETCH_GRAPH_STUDENT_TOTAL_BY_CLASS_BEGIN,
})

const getGraphStudentClassTotalSuccess= (graphData)=>({
  type:FETCH_GRAPH_STUDENT_TOTAL_BY_CLASS_SUCCESS,
  payload:{
    graphData
  }
})

const getGraphStudentClassTotalError= error=>({
  type:FETCH_GRAPH_STUDENT_TOTAL_BY_CLASS_ERROR,
  payload:{
     error
  }
})

