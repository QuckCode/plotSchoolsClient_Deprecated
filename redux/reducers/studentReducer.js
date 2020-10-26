import {
  CREATE_STUDENT_BEGIN,
  CREATE_STUDENT_ERROR,
  CREATE_STUDENT_SUCCESS,
  FETCH_ALL_STUDENT_BEGIN,
  FETCH_ALL_STUDENT_SUCCESS,
  FETCH_ALL_STUDENT_ERROR
} from '../Varables'

const initialState = {
  students: [],
  loading:false,
  error:null,
};

export const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_STUDENT_BEGIN:
      return {
        ...state,
        loading:true
      };
      case CREATE_STUDENT_SUCCESS:
        return {
          ...state,
          loading:false,
      };
      case CREATE_STUDENT_ERROR:
        return {
          ...state,
          loading:false,
          error:action.payload.error
      };
      case FETCH_ALL_STUDENT_BEGIN:
        return {
          ...state,
          loading:true,
          students: [],

        };
        case FETCH_ALL_STUDENT_SUCCESS:
          return {
            ...state,
            loading:false,
            students: action.payload.students,
        };
        case FETCH_ALL_STUDENT_ERROR:
          return {
            ...state,
            loading:false,
            error:action.payload.error,
            students: []
        };
    default:
      return {...state};
  }
};
