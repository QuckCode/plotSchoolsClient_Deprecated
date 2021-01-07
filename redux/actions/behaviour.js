import {
  CREATE_BEHAVIOUR_BEGIN,
  CREATE_BEHAVIOUR_ERROR,
  CREATE_BEHAVIOUR_SUCCESS,
  FETCH_ALL_BEHAVIOUR_BEGIN,
  FETCH_ALL_BEHAVIOUR_ERROR,
  FETCH_ALL_BEHAVIOUR_SUCCESS,
  FETCH_ALL_BEHAVIOUR_IN_CURRENT_SECTION_BEGIN,
  FETCH_ALL_BEHAVIOUR_IN_CURRENT_SECTION_ERROR,
  FETCH_ALL_BEHAVIOUR_IN_CURRENT_SECTION_SUCCESS,
  ADD_SECTION_BEHAVIOUR_BEGIN,
  ADD_SECTION_BEHAVIOUR_SUCCESS,
  ADD_SECTION_BEHAVIOUR_ERROR,
  REMOVE_SECTION_BEHAVIOUR_BEGIN,
  REMOVE_SECTION_BEHAVIOUR_SUCCESS,
  REMOVE_SECTION_BEHAVIOUR_ERROR,
  url, school
} from '../varables';
import axios from 'axios'

export const createBehaviour = (data) => {
 return dispatch => {
   dispatch(createBehaviourBegin())
   return axios.post(`${url}/behaviour`,data)
   .then(({data})=>{
         dispatch(createBehaviourSuccess())
         return Promise.resolve((data))
   })
   .catch(({response})=>{
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
    return axios.get(`${url}/behaviour/${school}`)
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

export const getCurrentSectionBehaviour = (sectionId) => {
  return dispatch => {
    dispatch(getCurrentSectionBehaviourBegin())
    return axios.get(`${url}/section/behaviour/${sectionId}`)
    .then(({data})=>{
          dispatch(getCurrentSectionBehaviourSuccess(data))
          return Promise.resolve()
    })
    .catch(({response})=>{
       dispatch(getCurrentSectionBehaviourError(response.data))
       return Promise.reject(response.data)
    })
  };
};

const getCurrentSectionBehaviourBegin= ()=>({
  type:FETCH_ALL_BEHAVIOUR_IN_CURRENT_SECTION_BEGIN
})

const getCurrentSectionBehaviourSuccess= (currentSectionBehaviors)=>({
  type:FETCH_ALL_BEHAVIOUR_IN_CURRENT_SECTION_SUCCESS,
  payload:{
    currentSectionBehaviors
  }
})

const getCurrentSectionBehaviourError= error=>({
  type:FETCH_ALL_BEHAVIOUR_IN_CURRENT_SECTION_ERROR,
  payload:{
     error
  }
})


export const addSectionBehaviour = (data) => {
  return dispatch => {
    dispatch(addSectionBehaviourBegin())
     return axios.post(`${url}/section/behaviour/add`,data)
      .then(({data})=>{
          dispatch(addSectionBehaviourSuccess())
          return Promise.resolve()
    })
    .catch(({response})=>{
       dispatch(addSectionBehaviourError(response.data))
       return Promise.reject(response.data)
    })
  };
 
 };
 
 
 const addSectionBehaviourBegin= ()=>({
   type:ADD_SECTION_BEHAVIOUR_BEGIN,
  })
  
  const addSectionBehaviourSuccess= ()=>({
   type:ADD_SECTION_BEHAVIOUR_SUCCESS,
  })
  
  const addSectionBehaviourError= error=>({
   type: ADD_SECTION_BEHAVIOUR_ERROR,
   payload:{
      error
   }
  })
 


  export const removeSectionBehaviour = (data) => {
    return dispatch => {
      dispatch(removeSectionBehaviourBegin())
      return axios.post(` ${url}/section/behaviour/remove`,data)
      .then(()=>{
            dispatch(removeSectionBehaviourSuccess())
            return Promise.resolve()
      })
      .catch(err=>{
        dispatch(removeSectionBehaviourError(err.response.data))
        return Promise.reject(err.response.data)
     })
    };
   
   };
   
   
   const removeSectionBehaviourBegin= ()=>({
     type:REMOVE_SECTION_BEHAVIOUR_BEGIN,
    })
    
    const removeSectionBehaviourSuccess= ()=>({
     type:REMOVE_SECTION_BEHAVIOUR_SUCCESS,
    })
    
    const removeSectionBehaviourError= error=>({
     type: REMOVE_SECTION_BEHAVIOUR_ERROR,
     payload:{
        error
     }
    }) 

    const test=()=>{
      
    }
