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
  FETCH_All_STUDENT_TEST_BEGIN,
  FETCH_All_STUDENT_TEST_SUCCESS,
  FETCH_All_STUDENT_TEST_ERROR,
  FETCH_ALL_TESTS_IN_CURRENT_CLASS_BEGIN,
  FETCH_ALL_TESTS_IN_CURRENT_CLASS_ERROR,
  FETCH_ALL_TESTS_IN_CURRENT_CLASS_SUCCESS,
  ADD_ClASS_TESTS_BEGIN,
  ADD_CLASS_TESTS_ERROR,
  ADD_CLASS_TESTS_SUCCESS,
  REMOVE_CLASS_TESTS_BEGIN,
  REMOVE_CLASS_TESTS_ERROR,
  REMOVE_CLASS_TESTS_SUCCESS
} from '../varables'

const initialState = {
  tests: [],
  loading:false,
  error:null,
  currentClassTests: [],
  testBySubject:{
    subject:{},
    students:[],
    loading:true
  },
  testByStudent:{
    students:[],
    loading:true
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
              test:{}
            }
        };
        case FETCH_STUDENT_TEST_SCORE_BY_SUBJECT_SUCCESS:
          return {
            ...state,
            error:{},
            testBySubject:{
              subject:action.payload.subject,
              students:action.payload.students,
              test:action.payload.test
            }
        };
        case FETCH_STUDENT_TEST_SCORE_BY_SUBJECT_ERROR:
          return {
            ...state,
            loading:false,
            error:action.payload.error,
            testBySubject:{
              subject:{},
              students:[],
              test:{}
            }
        };
        case FETCH_All_STUDENT_TEST_BEGIN:
          return {
            ...state,
            loading:false,
            testByStudent:{
              students:[],
              loading:true
            }
        };
        case FETCH_All_STUDENT_TEST_SUCCESS:
          return {
            ...state,
            loading:false,
            testByStudent:{
              students:action.payload.students,
              loading:false
            }
        };
        case FETCH_All_STUDENT_TEST_ERROR:
          return {
            ...state,
            loading:false,
            error:action.payload.error,
            testByStudent:{
              students:[],
              loading:false
            }
        };
        case FETCH_ALL_TESTS_IN_CURRENT_CLASS_BEGIN:
          return {
            ...state,
            loading:true,
            currentClassTests: [],
            error:null,
        };
        case FETCH_ALL_TESTS_IN_CURRENT_CLASS_SUCCESS:
          return {
            ...state,
            loading:false,
            currentClassTests:action.payload.currentClassTests,
            error:null,
        };
        case FETCH_ALL_TESTS_IN_CURRENT_CLASS_ERROR:
          return {
            ...state,
            loading:false,
            error:action.payload.error,
        };
        case   ADD_ClASS_TESTS_BEGIN:
          return {
            ...state,
            loading:true
          };
          case ADD_CLASS_TESTS_SUCCESS:
            return {
              ...state,
              loading:false,
          };
          case ADD_CLASS_TESTS_ERROR:
            return {
              ...state,
              loading:false,
              error:action.payload.error
          };
          case REMOVE_CLASS_TESTS_BEGIN:
            return {
              ...state,
              loading:true
            };
            case REMOVE_CLASS_TESTS_SUCCESS:
              return {
                ...state,
                loading:false,
            };
            case REMOVE_CLASS_TESTS_ERROR:
              return {
                ...state,
                loading:false,
                error:action.payload.error
            };
    default:
      return {...state};
  }
};

