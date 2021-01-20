import { message } from "antd"
import axios from "axios"
import {
  FETCH_SCHOOL_BALANCE,
   FETCH_SCHOOL_MESSAGES 
   ,url,
  school} from "../varables"



export  const getSmsBalance = (schoolID, balance) => {
     return{
       type:FETCH_SCHOOL_BALANCE,
       payload:{
         balance:balance
       }
     }
}


export const getSmsBalanceRequest= (schoolId) => {
  return dispatch => {
    dispatch(getSmsBalance(schoolId, 0.000))
    return axios.get(`${url}/sms/balance`)
    .then(({data})=>{
          dispatch(getSmsBalance(schoolId, data.balance))
          return Promise.resolve()
    })
    .catch(({response})=>{
         dispatch(getSmsBalance(schoolId, 0.00))
       return Promise.reject(response.data)
    })
  };
};


export  const getSmsOutBox = (schoolID, messages) => {
  return{
    type:FETCH_SCHOOL_MESSAGES,
    payload:{
      messages
    }
  }
}


export const getSmsOutBoxRequest= (schoolId) => {
return dispatch => {
 dispatch(getSmsBalance(schoolId, 0.000))
 return axios.post(`${url}/sms/get`, {school:school})
 .then(({data})=>{
       dispatch(getSmsOutBox(schoolId, data))
       return Promise.resolve()
 })
 .catch(({response})=>{
    dispatch(getSmsOutBox(schoolId, []))
    return Promise.reject(response.data)
 })
};
};