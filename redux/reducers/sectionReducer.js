import {
  CREATE_SECTION_BEGIN,
  CREATE_SECTION_ERROR,
  CREATE_SECTION_SUCCESS,
  FETCH_ALL_SECTION_BEGIN,
  FETCH_ALL_SECTION_SUCCESS,
  FETCH_ALL_SECTION_ERROR
} from '../varables'

const initialState = {
  section: [],
  loading:false,
  error:null,
};

export const sectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SECTION_BEGIN:
      return {
        ...state,
        loading:true
      };
      case CREATE_SECTION_SUCCESS:
        return {
          ...state,
          loading:false,
      };
      case CREATE_SECTION_ERROR:
        return {
          ...state,
          loading:false,
          error:action.payload.error
      };
      case FETCH_ALL_SECTION_BEGIN:
        return {
          ...state,
          loading:true,
          section: [],

        };
        case FETCH_ALL_SECTION_SUCCESS:
          return {
            ...state,
            loading:false,
            section: action.payload.sections,
        };
        case FETCH_ALL_SECTION_ERROR:
          return {
            ...state,
            loading:false,
            error:action.payload.error,
            section: []
        };
    default:
      return {...state};
  }
};
