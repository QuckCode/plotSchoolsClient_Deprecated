import {
  CREATE_TEST_BEGIN,
  CREATE_TEST_SUCCESS,
  CREATE_TEST_ERROR,
  FETCH_ALL_TEST_BEGIN, 
  FETCH_ALL_TEST_ERROR,
  FETCH_ALL_TEST_SUCCESS,
  FETCH_STUDENT_TEST_SCORE_BY_SUBJECT_BEGIN,
  FETCH_STUDENT_TEST_SCORE_BY_SUBJECT_SUCCESS,
  FETCH_STUDENT_TEST_SCORE_BY_SUBJECT_ERROR,
} from '../varables'

const initialState = {
  tests: [],
  loading:false,
  error:null,
  currentClassTests: [],
  testBySubject:{
    subject:{},
    students:[]
  }
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
        case FETCH_STUDENT_TEST_SCORE_BY_SUBJECT_BEGIN:
          return {
            ...state,
            loading:false,
            error:{},
            testBySubject:{
              subject:{},
              students:[],
            }
        };
        case FETCH_STUDENT_TEST_SCORE_BY_SUBJECT_SUCCESS:
          return {
            ...state,
            error:{},
            testBySubject:{
              subject:action.payload.subject,
              students:action.payload.students
            }
        };
        case FETCH_STUDENT_TEST_SCORE_BY_SUBJECT_ERROR:
          return {
            ...state,
            loading:false,
            error:action.payload.error,
            testBySubject:{
              subject:{},
              students:[]
            }
        };
    default:
      return {...state};
  }
};

