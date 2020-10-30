import {
  CREATE_DESIGNATION_BEGIN,
  CREATE_DESIGNATION_SUCCESS,
  CREATE_DESIGNATION_ERROR,
  FETCH_ALL_DESIGNATION_BEGIN,
  FETCH_ALL_DESIGNATION_SUCCESS,
  FETCH_ALL_DESIGNATION_ERROR
  } from '../varables'
  
  const initialState = {
    designations: [],
    loading:false,
    error:null,
  };
  
  export const designationReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_DESIGNATION_BEGIN:
        return {
          ...state,
          loading:true
        };
        case CREATE_DESIGNATION_SUCCESS:
          return {
            ...state,
            loading:false,
        };
        case CREATE_DESIGNATION_ERROR:
          return {
            ...state,
            loading:false,
            error:action.payload.error
        };
        case FETCH_ALL_DESIGNATION_BEGIN:
          return {
            ...state,
            loading:true,
            designations: [],
  
          };
          case FETCH_ALL_DESIGNATION_SUCCESS:
            return {
              ...state,
              loading:false,
              designations: action.payload.designations,
          };
          case FETCH_ALL_DESIGNATION_ERROR:
            return {
              ...state,
              loading:false,
              error:action.payload.error,
              designations: []
          };
      default:
        return {...state};
    }
  };