import {
  CREATE_SKILL_BEGIN,
  CREATE_SKILL_SUCCESS,
  CREATE_SKILL_ERROR,
  FETCH_ALL_SKILL_BEGIN, 
  FETCH_ALL_SKILL_ERROR,
  FETCH_ALL_SKILL_SUCCESS
} from '../varables'

const initialState = {
  skills: [],
  loading:false,
  error:null,
  currentSectionSkills: []
};

export const skillReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SKILL_BEGIN:
      return {
        ...state,
        loading:true
      };
    case CREATE_SKILL_SUCCESS:
        return {
          ...state,
          loading:false,
      };
    case CREATE_SKILL_ERROR:
        return {
          ...state,
          loading:false,
          error:action.payload.error
      };
      case FETCH_ALL_SKILL_BEGIN:
        return {
          ...state,
          loading:true,
          skills: [],

        };
        case FETCH_ALL_SKILL_SUCCESS:
          return {
            ...state,
            loading:false,
            skills: action.payload.skills,
        };
        case FETCH_ALL_SKILL_ERROR:
          return {
            ...state,
            loading:false,
            error:action.payload.error,
            skills: []
        };
    default:
      return {...state};
  }
};

