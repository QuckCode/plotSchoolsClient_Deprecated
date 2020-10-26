import {
CREATE_ARM_BEGIN,
CREATE_ARM_SUCCESS,
CREATE_ARM_ERROR,
FETCH_ALL_ARM_BEGIN,
FETCH_ALL_ARM_SUCCESS,
FETCH_ALL_ARM_ERROR
} from '../Varables'

const initialState = {
  arms: [],
  loading:false,
  error:null,
};

export const armReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ARM_BEGIN:
      return {
        ...state,
        loading:true
      };
      case CREATE_ARM_SUCCESS:
        return {
          ...state,
          loading:false,
      };
      case CREATE_ARM_ERROR:
        return {
          ...state,
          loading:false,
          error:action.payload.error
      };
      case FETCH_ALL_ARM_BEGIN:
        return {
          ...state,
          loading:true,
          arms: [],

        };
        case FETCH_ALL_ARM_SUCCESS:
          return {
            ...state,
            loading:false,
            arms: action.payload.arms,
        };
        case FETCH_ALL_ARM_ERROR:
          return {
            ...state,
            loading:false,
            error:action.payload.error,
            arms: []
        };
    default:
      return {...state};
  }
};
