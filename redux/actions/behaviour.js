import {
  CREATE_BEHAVIOUR_BEGIN,
  CREATE_BEHAVIOUR_ERROR,
  CREATE_BEHAVIOUR_SUCCESS,
  FETCH_ALL_BEHAVIOUR_BEGIN,
  FETCH_ALL_BEHAVIOUR_ERROR,
  FETCH_ALL_BEHAVIOUR_SUCCESS,
  url, school
} from '../varables';
import axios from 'axios'

export const createBehaviour = (data) => {
 return dispatch => {
   dispatch(createBehaviourBegin())
   return axios.post(`${url}/test`,data)
   .then(({data})=>{
         setTimeout( ()=>dispatch(createBehaviourSuccess()),1000)
         return Promise.resolve()
   })
   .catch(({response})=>{
      console.log(response.data)
      dispatch(createBehaviourError(response.data))
      return Promise.reject(response.data)
   })
 };

};


const createBehaviourBegin= ()=>({
  type:CREATE_BEHAVIOUR_BEGIN
 })
 
 const createBehaviourSuccess= ()=>({
  type:CREATE_BEHAVIOUR_SUCCESS,
 })
 
 const createBehaviourError= error=>({
  type: CREATE_BEHAVIOUR_ERROR,
  payload:{
     error
  }
 })


 export const getAllBehaviour = (schoolID) => {
  return dispatch => {
    dispatch( getAllBehaviourBegin())
    return axios.get(`${url}/test/${school}`)
    .then(({data})=>{
          dispatch(getAllBehaviourSuccess(data))
    })
    .catch((error)=>{
       dispatch(getAllBehaviourError(error.response.data))
    })
  };
};

const getAllBehaviourBegin= ()=>({
  type:FETCH_ALL_BEHAVIOUR_BEGIN
})

const getAllBehaviourSuccess= (behaviors)=>({
  type:FETCH_ALL_BEHAVIOUR_SUCCESS,
  payload:{
    behaviors
  }
})

const getAllBehaviourError= error=>({
  type:FETCH_ALL_BEHAVIOUR_ERROR,
  payload:{
     error
  }
})