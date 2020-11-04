import {
  CREATE_SKILL_BEGIN,
  CREATE_SKILL_ERROR,
  CREATE_SKILL_SUCCESS,
  FETCH_ALL_SKILL_BEGIN,
  FETCH_ALL_SKILL_ERROR,
  FETCH_ALL_SKILL_SUCCESS,
  FETCH_ALL_SKILL_IN_CURRENT_SECTION_BEGIN,
  FETCH_ALL_SKILL_IN_CURRENT_SECTION_ERROR,
  FETCH_ALL_SKILL_IN_CURRENT_SECTION_SUCCESS,
  ADD_SECTION_SKILL_BEGIN,
  ADD_SECTION_SKILL_SUCCESS,
  ADD_SECTION_SKILL_ERROR,
  REMOVE_SECTION_SKILL_BEGIN,
  REMOVE_SECTION_SKILL_SUCCESS,
  REMOVE_SECTION_SKILL_ERROR,

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



export const getCurrentSectionSkill = (sectionId) => {
  return dispatch => {
    dispatch(getCurrentSectionSkillBegin())
    return axios.get(`${url}/section/skill/${sectionId}`)
    .then(({data})=>{
          dispatch(getCurrentSectionSkillSuccess(data))
          return Promise.resolve()
    })
    .catch(({response})=>{
      console.log(response)
       dispatch(getCurrentSectionSkillError(response.data))
       return Promise.reject(response.data)
    })
  };
};

const getCurrentSectionSkillBegin= ()=>({
  type:FETCH_ALL_SKILL_IN_CURRENT_SECTION_BEGIN
})

const getCurrentSectionSkillSuccess= (currentSectionSkills)=>({
  type:FETCH_ALL_SKILL_IN_CURRENT_SECTION_SUCCESS,
  payload:{
    currentSectionSkills
  }
})

const getCurrentSectionSkillError= error=>({
  type:FETCH_ALL_SKILL_IN_CURRENT_SECTION_ERROR,
  payload:{
     error
  }
})


export const addSectionSkill = (data) => {
  return dispatch => {
    dispatch(addSectionSkillBegin())
     return axios.post(`${url}/section/skill/add`,data)
      .then(({data})=>{
          dispatch(addSectionSkillSuccess())
          return Promise.resolve()
    })
    .catch(({response})=>{
       dispatch(addSectionSkillError(response.data))
       return Promise.reject(response.data)
    })
  };
 
 };
 
 
 const addSectionSkillBegin= ()=>({
   type:ADD_SECTION_SKILL_BEGIN,
  })
  
  const addSectionSkillSuccess= ()=>({
   type:ADD_SECTION_SKILL_SUCCESS,
  })
  
  const addSectionSkillError= error=>({
   type: ADD_SECTION_SKILL_ERROR,
   payload:{
      error
   }
  })
 


  export const removeSectionSkill = (data) => {
    return dispatch => {
      dispatch(removeSectionSkillBegin())
      return axios.post(` ${url}/section/skill/remove`,data)
      .then(()=>{
            dispatch(removeSectionSkillSuccess())
            return Promise.resolve()
      })
      .catch(err=>{
        dispatch(removeSectionSkillError(err.response.data))
        return Promise.reject(err.response.data)
     })
    };
   
   };
   
   
   const removeSectionSkillBegin= ()=>({
     type:REMOVE_SECTION_SKILL_BEGIN,
    })
    
    const removeSectionSkillSuccess= ()=>({
     type:REMOVE_SECTION_SKILL_SUCCESS,
    })
    
    const removeSectionSkillError= error=>({
     type: REMOVE_SECTION_SKILL_ERROR,
     payload:{
        error
     }
    })