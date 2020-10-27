import {
  CREATE_SUBJECT_BEGIN,
  CREATE_SUBJECT_ERROR,
  CREATE_SUBJECT_SUCCESS,
  FETCH_ALL_SUBJECTS_BEGIN,
  FETCH_ALL_SUBJECTS_SUCCESS,
  FETCH_ALL_SUBJECTS_ERROR
} from '../varables'

const initialState = {
  subjects: [],
  loading:false,
  error:null,
};

export const subjectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SUBJECT_BEGIN:
      return {
        ...state,
        loading:true
      };
      case CREATE_SUBJECT_SUCCESS:
        return {
          ...state,
          loading:false,
      };
      case CREATE_SUBJECT_ERROR:
        return {
          ...state,
          loading:false,
          error:action.payload.error
      };
      case FETCH_ALL_SUBJECTS_BEGIN:
        return {
          ...state,
          loading:true,
          subjects: [],

        };
        case FETCH_ALL_SUBJECTS_SUCCESS:
          return {
            ...state,
            loading:false,
            subjects: action.payload.subjects,
        };
        case FETCH_ALL_SUBJECTS_ERROR:
          return {
            ...state,
            loading:false,
            error:action.payload.error,
            subjects: []
        };
    default:
      return {...state};
  }
};
