import { message } from "antd"
import axios from "axios"
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT , url ,TOKEN_LOCATION, staff, student} from "../varables"
import jwt from 'jsonwebtoken'
import { AuthToken} from '../../services/authToken'
import  Router  from "next/router"

// export const loginStudent = (data) => {
//   return dispatch => {
//     axios.post(`${url}/login/student`,data)
//     .then(({data})=>{
//        localStorage.setItem(TOKEN_LOCATION,data.token)
//        message.success('Successfully login', 10)
//        dispatch(loginSuccess(jwt.decode(data.token,'BIU_WEB_APP'), student))
//        Router.push('/dashboard')
//     })
//     .catch(({response})=>{
//       dispatch(loginFailure(response.data))
//     })
//   }
// }

// export const loginStaff = (data) => {
//   return dispatch => {
//     axios.post(`${url}/login/staff`,data)
//     .then(({data})=>{
//       localStorage.setItem(TOKEN_LOCATION,data.token)
//       message.success('Successfully login', 10)
//       dispatch(loginSuccess(jwt.decode(data.token,'BIU_WEB_APP'), staff))
//       Router.push('/dashboard')
//     })
//     .catch(({response})=>{
//        console.log(response)
//       dispatch(loginFailure(response.data))
//     })
//   }
// }

//Thunk to handle a successfull login 
export const loginSuccess = ( user, userType) => {
  return {
    type: LOGIN_SUCCESS,
    payload:{
      user,
      userType
    }
  }
}

export const loginFailure = ( error) => {

  message.error(error.message, 10)
  return {
    type: LOGIN_FAIL,
    payload:{
      error
    }
  }
}

 export const logOut = ()=>{
  AuthToken.removeToken()
  return {
   type:LOGOUT
  }
}