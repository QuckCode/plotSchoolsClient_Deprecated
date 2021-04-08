import {
  FETCH_ALL_SCHOOLS_BEGIN,
  FETCH_ALL_SCHOOLS_SUCCESS,
  FETCH_ALL_SCHOOLS_ERROR,
  FETCH_SCHOOL_SETTING_BEGIN,
  FETCH_SCHOOL_SETTING_SUCCESS,
  FETCH_SCHOOL_SETTING_ERROR
} from '../varables'

const initialState = {
  schools: [],
  loading:true,
  error:null,
  settings:{}
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
          loading:false,
          error:action.payload.error
      };
      case FETCH_SCHOOL_SETTING_BEGIN:
        return {
          ...state,
          settings:{}, 
          loading:true
        };
        case FETCH_SCHOOL_SETTING_SUCCESS:
          return {
            ...state,
            settings:action.payload.school, 
            loading:false,
            error:null
        };
        case FETCH_SCHOOL_SETTING_ERROR:
          return {
            ...state,
            settings:{},
            loading:false,
            error:action.payload.error
        };
    default:
      return {...state};
  }
};
