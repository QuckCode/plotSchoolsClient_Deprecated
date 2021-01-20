import {
   FETCH_SCHOOL_BALANCE,
   FETCH_SCHOOL_MESSAGES,
  } from '../varables'
  
  const initialState = {
    balance:0.00,
    messages:[],
  };
  
  export const smsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SCHOOL_BALANCE:{
        return {
        ...state,
        balance:action.payload.balance
        }
      }
      case FETCH_SCHOOL_MESSAGES:{
        return {
        ...state,
        messages:action.payload.messages
        }
      }
      default:
        return {...state};
    }
  };
  