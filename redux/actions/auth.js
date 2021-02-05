import { message } from "antd"
import Axios from "axios"
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT , url ,TOKEN_LOCATION, staff, student, GET_USER_SETTING} from "../varables"
import jwt from 'jsonwebtoken'
import { AuthToken} from '../../services/authToken'



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
