import {
  CREATE_TEST_BEGIN,
  CREATE_TEST_SUCCESS,
  CREATE_TEST_ERROR,
  FETCH_ALL_TEST_BEGIN, 
  FETCH_ALL_TEST_ERROR,
  FETCH_ALL_TEST_SUCCESS
} from '../varables'

const initialState = {
  tests: [],
  loading:false,
  error:null,
  currentClassTests: []
};

export const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TEST_BEGIN:
      return {
        ...state,
        loading:true
      };
    case CREATE_TEST_SUCCESS:
        return {
          ...state,
          loading:false,
      };
    case CREATE_TEST_ERROR:
        return {
          ...state,
          loading:false,
          error:action.payload.error
      };
      case FETCH_ALL_TEST_BEGIN:
        return {
          ...state,
          loading:true,
          tests: [],

        };
        case FETCH_ALL_TEST_SUCCESS:
          return {
            ...state,
            loading:false,
            tests: action.payload.tests,
        };
        case FETCH_ALL_TEST_ERROR:
          return {
            ...state,
            loading:false,
            error:action.payload.error,
            tests: []
        };
    default:
      return {...state};
  }
};

