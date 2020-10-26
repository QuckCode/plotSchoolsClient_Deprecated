import {
  GET_ALL_DEPARTMENTS_BEGIN,
  GET_ALL_DEPARTMENTS_ERROR,
  GET_ALL_DEPARTMENTS_SUCCESS,
} from '../varables'

const initialState = {
  departments: [],
  loading:true,
  error:null,
};

export const departmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DEPARTMENTS_BEGIN:
      return {
        ...state,
        departments:[], 
        loading:true
      };
      case GET_ALL_DEPARTMENTS_SUCCESS:
        return {
          ...state,
          departments:action.payload.departments, 
          loading:false,
          error:null
      };
      case GET_ALL_DEPARTMENTS_ERROR:
        return {
          ...state,
          departments:[], 
          loading:false,
          error:action.payload.error
      };
    default:
      return {...state};
  }
};
