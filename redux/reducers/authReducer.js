import {
LOGIN_SUCCESS,
LOGIN_FAIL,
LOGOUT
} from '../varables'

const initialState = {
  user: {},
  isAuth:false,
  error:{ message:""},
  userType:"",
  currentUser:{},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:{
      return {
        user:action.payload.user,
        isAuth:true,
        userType:action.payload.userType
      }
    }
    case LOGIN_FAIL:{
      return {
        user:{},
        isAuth:false,
        error:action.payload.error,
        userType:""
      }
    }
    case LOGOUT:{
      return {
        ...initialState
      }
    }
    default:
      return {...state};
  }
};
