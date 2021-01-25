
import {
   FETCH_ALL_SCHOOLS_BEGIN,
   FETCH_ALL_SCHOOLS_ERROR,
   FETCH_ALL_SCHOOLS_SUCCESS,
   FETCH_SCHOOL_SETTING_BEGIN,
   FETCH_SCHOOL_SETTING_ERROR,
   FETCH_SCHOOL_SETTING_SUCCESS,
   url, school
 } from '../varables';
 import axios from 'axios'

export const getAllSchools = (data) => {
  return dispatch => {
    dispatch( getAllSchoolBegin())
    return axios.get(`${url}/schools`)
    .then(({data})=>{
          dispatch(getAllSchoolSuccess((data)))
    })
    .catch((error)=>{
       dispatch(getAllSchoolError(error.response))
    })
  };
};

const getAllSchoolBegin= ()=>({
  type:FETCH_ALL_SCHOOLS_BEGIN
})

const getAllSchoolSuccess= (schools)=>({
  type:FETCH_ALL_SCHOOLS_SUCCESS,
  payload:{
    schools,
  }
})

const getAllSchoolError= error=>({
  type:FETCH_ALL_SCHOOLS_ERROR,
  payload:{
     error
  }
})

export const getSchoolsSetting = (school) => {
  return dispatch => {
    dispatch( getSchoolsSettingBegin())
    return axios.get(`${url}/school/setting/${school}`)
    .then(({data})=>{
          dispatch(getSchoolsSettingSuccess((data)))
    })
    .catch((error)=>{
       dispatch(getSchoolsSettingError(error.response))
    })
  };
};

const getSchoolsSettingBegin= ()=>({
  type:FETCH_SCHOOL_SETTING_BEGIN
})

const getSchoolsSettingSuccess= (school)=>({
  type:FETCH_SCHOOL_SETTING_SUCCESS,
  payload:{
    school,
  }
})

const getSchoolsSettingError= error=>({
  type:FETCH_SCHOOL_SETTING_ERROR,
  payload:{
     error
  }
})