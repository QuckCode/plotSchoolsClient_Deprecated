import {
  CREATE_DEPARTMENT_BEGIN,
  CREATE_DEPARTMENT_SUCCESS,
  CREATE_DEPARTMENT_ERROR,
  FETCH_ALL_DEPARTMENT_BEGIN,
  FETCH_ALL_DEPARTMENT_SUCCESS,
  FETCH_ALL_DEPARTMENT_ERROR
  } from '../varables'
  
  const initialState = {
    departments: [],
    loading:false,
    error:null,
  };
  
  export const departmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_DEPARTMENT_BEGIN:
        return {
          ...state,
          loading:true
        };
        case CREATE_DEPARTMENT_SUCCESS:
          return {
            ...state,
            loading:false,
        };
        case CREATE_DEPARTMENT_ERROR:
          return {
            ...state,
            loading:false,
            error:action.payload.error
        };
        case FETCH_ALL_DEPARTMENT_BEGIN:
          return {
            ...state,
            loading:true,
            departments: [],
  
          };
          case FETCH_ALL_DEPARTMENT_SUCCESS:
            return {
              ...state,
              loading:false,
              departments: action.payload.departments,
          };
          case FETCH_ALL_DEPARTMENT_ERROR:
            return {
              ...state,
              loading:false,
              error:action.payload.error,
              departments: []
          };
      default:
        return {...state};
    }
  };