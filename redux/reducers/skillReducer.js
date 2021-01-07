import {
  CREATE_SKILL_BEGIN,
  CREATE_SKILL_SUCCESS,
  CREATE_SKILL_ERROR,
  FETCH_ALL_SKILL_BEGIN, 
  FETCH_ALL_SKILL_ERROR,
  FETCH_ALL_SKILL_SUCCESS,
  FETCH_ALL_SKILL_IN_CURRENT_SECTION_BEGIN,
  FETCH_ALL_SKILL_IN_CURRENT_SECTION_ERROR,
  FETCH_ALL_SKILL_IN_CURRENT_SECTION_SUCCESS,
  ADD_SECTION_SKILL_BEGIN,
  ADD_SECTION_SKILL_ERROR,
  ADD_SECTION_SKILL_SUCCESS,
  REMOVE_SECTION_SKILL_BEGIN,
  REMOVE_SECTION_SKILL_SUCCESS,
  REMOVE_SECTION_SKILL_ERROR,
  FETCH_All_SKILL_SCORE_BEGIN,
  FETCH_All_SKILL_SCORE_ERROR,
  FETCH_All_SKILL_SCORE_SUCCESS
} from '../varables'

const initialState = {
  skills: [],
  loading:false,
  error:null,
  currentSectionSkills: [],
  skillScoreByStudent:{
    loading:false,
    skillScores:[]
  }
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
        case FETCH_ALL_SKILL_IN_CURRENT_SECTION_BEGIN:
          return {
            ...state,
            loading:true,
            currentSectionSkills: [],
          };
          case FETCH_ALL_SKILL_IN_CURRENT_SECTION_SUCCESS:
            return {
              ...state,
              loading:false,
              currentSectionSkills: action.payload.currentSectionSkills,
          };
          case FETCH_ALL_SKILL_IN_CURRENT_SECTION_ERROR:
            return {
              ...state,
              loading:false,
              error:action.payload.error,
              currentSectionSkills: []
          };
          case ADD_SECTION_SKILL_BEGIN:
        return {
          ...state,
          loading:true,

        };
        case ADD_SECTION_SKILL_SUCCESS:
          return {
            ...state,
            loading:false,
        };
        case ADD_SECTION_SKILL_ERROR:
          return {
            ...state,
            loading:false,
            error:action.payload.error,
        }
        case REMOVE_SECTION_SKILL_BEGIN:
          return {
            ...state,
            loading:true,
          };
          case REMOVE_SECTION_SKILL_SUCCESS:
            return {
              ...state,
              loading:false,
          };
          case REMOVE_SECTION_SKILL_ERROR:
            return {
              ...state,
              loading:false,
              error:action.payload.error,
          };
          case FETCH_All_SKILL_SCORE_BEGIN:
            return {
              ...state,
              skillScoreByStudent:{
                loading:true,
                skillScores:[]
              }
          };
          case FETCH_All_SKILL_SCORE_SUCCESS:
            return {
              ...state,
              skillScoreByStudent:{
                loading:false,
                skillScores:action.payload.skillScores
              }
          };
          case FETCH_All_SKILL_SCORE_ERROR:
            return {
              ...state,
              error:action.payload.error,
              skillScoreByStudent:{
                loading:false,
                skillScores:[]
              }
          }; 
    default:
      return {...state};
  }
};

