import {
  FETCH_ALL_SCHOOLS_BEGIN,
  FETCH_ALL_SCHOOLS_SUCCESS,
  FETCH_ALL_SCHOOLS_ERROR
} from '../Varables'

const initialState = {
  schools: [],
  loading:true,
  error:null,
};

export const schoolReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_SCHOOLS_BEGIN:
      return {
        ...state,
        schools:[], 
        loading:true
      };
      case FETCH_ALL_SCHOOLS_SUCCESS:
        return {
          ...state,
          schools:action.payload.schools, 
          loading:false,
          error:null
      };
      case FETCH_ALL_SCHOOLS_ERROR:
        return {
          ...state,
          schools:action.payload.schools, 
          loading:false,
          error:action.payload.error
      };
    default:
      return {...state};
  }
};
