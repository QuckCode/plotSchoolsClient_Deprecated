import {
  CREATE_TEST_BEGIN,
  CREATE_TEST_ERROR,
  CREATE_TEST_SUCCESS,
  FETCH_ALL_TEST_BEGIN,
  FETCH_ALL_TEST_ERROR,
  FETCH_ALL_TEST_SUCCESS,
  url, school
} from '../varables';
import axios from 'axios'

export const createTest = (data) => {
 return dispatch => {
   dispatch(createTestBegin())
   return axios.post(`${url}/test`,data)
   .then(({data})=>{
         setTimeout( ()=>dispatch(createTestSuccess()),1000)
         return Promise.resolve()
   })
   .catch(({response})=>{
      console.log(response.data)
      dispatch(createTestError(response.data))
      return Promise.reject(response.data)
   })
 };

};


const createTestBegin= ()=>({
  type:CREATE_TEST_BEGIN
 })
 
 const createTestSuccess= ()=>({
  type:CREATE_TEST_SUCCESS,
 })
 
 const createTestError= error=>({
  type: CREATE_TEST_ERROR,
  payload:{
     error
  }
 })


 export const getAllTest = (schoolID) => {
  return dispatch => {
    dispatch( getAllTestBegin())
    return axios.get(`${url}/test/${school}`)
    .then(({data})=>{
          dispatch(getAllTestsSuccess(data))
    })
    .catch((error)=>{
       dispatch(getAllTestError(error.response.data))
    })
  };
};

const getAllTestBegin= ()=>({
  type:FETCH_ALL_TEST_BEGIN
})

const getAllTestsSuccess= (tests)=>({
  type:FETCH_ALL_TEST_SUCCESS,
  payload:{
    tests
  }
})

const getAllTestError= error=>({
  type:FETCH_ALL_TEST_ERROR,
  payload:{
     error
  }
})