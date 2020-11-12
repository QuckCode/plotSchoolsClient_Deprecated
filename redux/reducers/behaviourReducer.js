import {
  CREATE_BEHAVIOUR_BEGIN,
  CREATE_BEHAVIOUR_SUCCESS,
  CREATE_BEHAVIOUR_ERROR,
  FETCH_ALL_BEHAVIOUR_BEGIN, 
  FETCH_ALL_BEHAVIOUR_ERROR,
  FETCH_ALL_BEHAVIOUR_SUCCESS,
  FETCH_ALL_BEHAVIOUR_IN_CURRENT_SECTION_BEGIN,
  FETCH_ALL_BEHAVIOUR_IN_CURRENT_SECTION_ERROR,
  FETCH_ALL_BEHAVIOUR_IN_CURRENT_SECTION_SUCCESS,
  ADD_SECTION_BEHAVIOUR_BEGIN,
  ADD_SECTION_BEHAVIOUR_ERROR,
  ADD_SECTION_BEHAVIOUR_SUCCESS,
  REMOVE_SECTION_BEHAVIOUR_BEGIN,
  REMOVE_SECTION_BEHAVIOUR_SUCCESS,
  REMOVE_SECTION_BEHAVIOUR_ERROR,
  FETCH_All_BEHAVIOUR_SCORE_BEGIN,
  FETCH_All_BEHAVIOUR_SCORE_ERROR,
  FETCH_All_BEHAVIOUR_SCORE_SUCCESS
} from '../varables'

const initialState = {
  behaviors: [],
  loading:false,
  error:null,
  currentSectionBehaviour: [],
  behaviourScoreByStudent:{
    loading:false,
    behaviourScores:[]
  }
};

export const behaviourReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BEHAVIOUR_BEGIN:
      return {
        ...state,
        loading:true
      };
    case CREATE_BEHAVIOUR_SUCCESS:
        return {
          ...state,
          loading:false,
      };
    case CREATE_BEHAVIOUR_ERROR:
        return {
          ...state,
          loading:false,
          error:action.payload.error
      };
      case FETCH_ALL_BEHAVIOUR_BEGIN:
        return {
          ...state,
          loading:true,
          behaviors : [],

        };
        case FETCH_ALL_BEHAVIOUR_SUCCESS:
          return {
            ...state,
            loading:false,
            behaviors: action.payload.behaviors,
        };
        case FETCH_ALL_BEHAVIOUR_ERROR:
          return {
            ...state,
            loading:false,
            error:action.payload.error,
            behaviors: []
        };
        case FETCH_ALL_BEHAVIOUR_IN_CURRENT_SECTION_BEGIN:
          return {
            ...state,
            loading:true,
            currentSectionBehaviour : [],
  
          };
          case FETCH_ALL_BEHAVIOUR_IN_CURRENT_SECTION_SUCCESS:
            return {
              ...state,
              loading:false,
              currentSectionBehaviour: action.payload.currentSectionBehaviors,
          };
          case FETCH_ALL_BEHAVIOUR_IN_CURRENT_SECTION_ERROR:
            return {
              ...state,
              loading:false,
              error:action.payload.error,
              currentSectionBehaviour: []
          };
          case ADD_SECTION_BEHAVIOUR_BEGIN:
        return {
          ...state,
          loading:true,

        };
        case ADD_SECTION_BEHAVIOUR_SUCCESS:
          return {
            ...state,
            loading:false,
        };
        case ADD_SECTION_BEHAVIOUR_ERROR:
          return {
            ...state,
            loading:false,
            error:action.payload.error,
        }
        case REMOVE_SECTION_BEHAVIOUR_BEGIN:
          return {
            ...state,
            loading:true,
          };
          case REMOVE_SECTION_BEHAVIOUR_SUCCESS:
            return {
              ...state,
              loading:false,
          };
          case REMOVE_SECTION_BEHAVIOUR_ERROR:
            return {
              ...state,
              loading:false,
              error:action.payload.error,
          };
          case  FETCH_All_BEHAVIOUR_SCORE_BEGIN:
            return {
              ...state,
              loading:true,
              behaviourScoreByStudent:{
                loading:true,
                behaviourScores:[]
              }
          };
          case  FETCH_All_BEHAVIOUR_SCORE_SUCCESS:
            return {
              ...state,
              behaviourScoreByStudent:{
                loading:false,
                behaviourScores:action.payload.behaviourScores
              }
          };
          case  FETCH_All_BEHAVIOUR_SCORE_ERROR:
            return {
              ...state,
              error:action.payload.error,
              behaviourScoreByStudent:{
                loading:false,
                behaviourScores:[]
              }
          };
    default:
      return {...state};
  }
};

