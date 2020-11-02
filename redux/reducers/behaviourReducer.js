import {
  CREATE_BEHAVIOUR_BEGIN,
  CREATE_BEHAVIOUR_SUCCESS,
  CREATE_BEHAVIOUR_ERROR,
  FETCH_ALL_BEHAVIOUR_BEGIN, 
  FETCH_ALL_BEHAVIOUR_ERROR,
  FETCH_ALL_BEHAVIOUR_SUCCESS
} from '../varables'

const initialState = {
  behaviors: [],
  loading:false,
  error:null,
  currentSectionBehaviour: []
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
          tests: [],

        };
        case FETCH_ALL_BEHAVIOUR_SUCCESS:
          return {
            ...state,
            loading:false,
            tests: action.payload.behaviors,
        };
        case FETCH_ALL_BEHAVIOUR_ERROR:
          return {
            ...state,
            loading:false,
            error:action.payload.error,
            behaviors: []
        };
    default:
      return {...state};
  }
};

