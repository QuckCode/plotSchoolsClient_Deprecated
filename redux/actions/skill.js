import {
  CREATE_SKILL_BEGIN,
  CREATE_SKILL_ERROR,
  CREATE_SKILL_SUCCESS,
  FETCH_ALL_SKILL_BEGIN,
  FETCH_ALL_SKILL_ERROR,
  FETCH_ALL_SKILL_SUCCESS,
  url, school
} from '../varables';
import axios from 'axios'

export const createSkill = (data) => {
 return dispatch => {
   dispatch(createSkillBegin())
   return axios.post(`${url}/skill`,data)
   .then(({data})=>{
         setTimeout( ()=>dispatch(createSkillSuccess()),1000)
         return Promise.resolve()
   })
   .catch(({response})=>{
      console.log(response.data)
      dispatch(createSkillError(response.data))
      return Promise.reject(response.data)
   })
 };

};


const createSkillBegin= ()=>({
  type:CREATE_SKILL_BEGIN
 })
 
 const createSkillSuccess= ()=>({
  type:CREATE_SKILL_SUCCESS,
 })
 
 const createSkillError= error=>({
  type: CREATE_SKILL_ERROR,
  payload:{
     error
  }
 })


 export const getAllSkill = (schoolID) => {
  return dispatch => {
    dispatch( getAllSkillBegin())
    return axios.get(`${url}/skill/${school}`)
    .then(({data})=>{
          dispatch(getAllSkillSuccess(data))
          return Promise.resolve()
    })
    .catch((error)=>{
       dispatch(getAllSkillError(error.response.data))
       return Promise.reject(error.response.data)
    })
  };
};

const getAllSkillBegin= ()=>({
  type:FETCH_ALL_SKILL_BEGIN
})

const getAllSkillSuccess= (skills)=>({
  type:FETCH_ALL_SKILL_SUCCESS,
  payload:{
    skills
  }
})

const getAllSkillError= error=>({
  type:FETCH_ALL_SKILL_ERROR,
  payload:{
     error
  }
})