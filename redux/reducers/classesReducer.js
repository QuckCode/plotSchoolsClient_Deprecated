import {
CREATE_CLASSES_BEGIN,
CREATE_CLASSES_SUCCESS,
CREATE_CLASSES_ERROR,
FETCH_ALL_CLASSES_BEGIN,
FETCH_ALL_CLASSES_SUCCESS,
FETCH_ALL_CLASSES_ERROR
} from '../varables'

const initialState = {
  classes: [],
  loading:false,
  error:null,
};

export const classesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CLASSES_BEGIN:
      return {
        ...state,
        loading:true
      };
      case CREATE_CLASSES_SUCCESS:
        return {
          ...state,
          loading:false,
      };
      case CREATE_CLASSES_ERROR:
        return {
          ...state,
          loading:false,
          error:action.payload.error
      };
      case FETCH_ALL_CLASSES_BEGIN:
        return {
          ...state,
          loading:true,
          classes: [],

        };
        case FETCH_ALL_CLASSES_SUCCESS:
          return {
            ...state,
            loading:false,
            classes: action.payload.classes,
        };
        case FETCH_ALL_CLASSES_ERROR:
          return {
            ...state,
            loading:false,
            error:action.payload.error,
            classes: []
        };
        
    default:
      return {...state};
  }
};
