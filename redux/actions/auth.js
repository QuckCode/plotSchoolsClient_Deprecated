import { message } from "antd"
import axios from "axios"
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT , url ,TOKEN_LOCATION, staff, student} from "../varables"
import jwt from 'jsonwebtoken'
import { AuthToken} from '../../services/authToken'
import  Router  from "next/router"


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