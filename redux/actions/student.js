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
  FETCH_CURRENT_STUDENT_BEGIN,
  FETCH_CURRENT_STUDENT_ERROR,
  FETCH_CURRENT_STUDENT_SUCCESS,
  EDIT_STUDENT_BEGIN,
  EDIT_STUDENT_SUCCESS,
  EDIT_STUDENT_ERROR,
  VALIDATE_STUDENTS_SCORE_BY_SUBJECTS,
  FETCH_STUDENT_CURRENT_CLASS_AND_ARM,
  url, school,
} from '../varables';
import axios from 'axios'
import {message} from 'antd'
import { success, error } from '../../components/modal';

export const createStudent = (data) => {
 return dispatch => {
   dispatch(createStudentBegin())
   return axios.post(`${url}/student`,data)
   .then(({data})=>{
       setTimeout( ()=>{
       success("Created  Students", 10)
         dispatch(createStudentSuccess(data))
       },1000)
   })
   .catch(({response})=>{
        error("Please an error occurred", "")
      dispatch(createStudentError(response))
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


export const editStudent = (data) => {
  return dispatch => {
    dispatch(editStudentBegin())
    return axios.post(`${url}/student/edit`,data)
    .then(({data})=>{
        setTimeout( ()=>{
           success("Edited  Students","Your edit successfully")
          dispatch(editStudentSuccess(data))
        },2000)
    })
    .catch(({response})=>{
         error("Please an error occurred", "")
       dispatch(editStudentError(response))
    })
  };
 };
 
 const editStudentBegin= ()=>({
  type:EDIT_STUDENT_BEGIN
 })
 
 const editStudentSuccess= ()=>({
  type:EDIT_STUDENT_SUCCESS,
 })
 
 const editStudentError= error=>({
  type: EDIT_STUDENT_ERROR,
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
    .catch(({response})=>{
       dispatch(getAllStudentsError(response))
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
    .catch(({response})=>{
      console.log(error)
       dispatch(getGraphStudentClassTotalError(response))
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


export const getCurrentStudent = (admissionNumber) => {
  return dispatch => {
    dispatch(getCurrentStudentBegin())
    try {
     return   axios.get(`${url}/student/admissionNumber/${admissionNumber}`)
       .then(({data})=>{
            dispatch(getCurrentStudentSuccess(data))
       })
    } catch ({response}) {
      return  dispatch( getCurrentStudentError(response))
    }
  };
};



const getCurrentStudentBegin= ()=>({
  type:FETCH_CURRENT_STUDENT_BEGIN,
})

const getCurrentStudentSuccess= (student)=>({
  type:FETCH_CURRENT_STUDENT_SUCCESS,
  payload:{
    student
  }
})

const  getCurrentStudentError= error=>({
  type:FETCH_CURRENT_STUDENT_ERROR,
  payload:{
     error
  }
})


export const getStudentValidatedScoreRequest = (value) => {
  console.log(value)
  return dispatch => {
      dispatch(getStudentValidatedScore([]))
    try {
     return  axios.get(`${url}/student/validate/${value.class}/${value.arm}/${value.subject}`)
       .then(({data})=>{
            dispatch(getStudentValidatedScore(data))
       })
    } catch (error) {
      return  dispatch(getStudentValidatedScore([]))
    }
  };
};

 const getStudentValidatedScore = (validateStudentScore) => ({
   type:VALIDATE_STUDENTS_SCORE_BY_SUBJECTS,
   payload:{
    validateStudentScore  
   }
});


export const getStudentClassAndArmRequest = (admissionNumber) => {
  return dispatch => {
      dispatch(getStudentClassAndArm({ "class": "No Class", "arm": "No Arm"}))
    try {
     return  axios.post(`${url}/student/classAndArm`, {admissionNumber})
       .then(({data})=>{
            dispatch(getStudentClassAndArm(data))
       })
    } catch (error) {
      return  dispatch(getStudentClassAndArm({ "class": "No Class", "arm": "No Arm"}))
    }
  };
};

 const getStudentClassAndArm = (data) => ({
   type:FETCH_STUDENT_CURRENT_CLASS_AND_ARM,
   payload:{
    data
   }
});