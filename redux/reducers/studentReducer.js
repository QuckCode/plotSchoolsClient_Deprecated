import {
  CREATE_STUDENT_BEGIN,
  CREATE_STUDENT_ERROR,
  CREATE_STUDENT_SUCCESS,
  EDIT_STUDENT_BEGIN,
  EDIT_STUDENT_ERROR,
  EDIT_STUDENT_SUCCESS,
  FETCH_ALL_STUDENT_BEGIN,
  FETCH_ALL_STUDENT_SUCCESS,
  FETCH_ALL_STUDENT_ERROR,
  FETCH_GRAPH_STUDENT_TOTAL_BY_CLASS_BEGIN,
  FETCH_GRAPH_STUDENT_TOTAL_BY_CLASS_ERROR,
  FETCH_GRAPH_STUDENT_TOTAL_BY_CLASS_SUCCESS,
  FETCH_CURRENT_STUDENT_BEGIN,
  FETCH_CURRENT_STUDENT_ERROR,
  FETCH_CURRENT_STUDENT_SUCCESS,
  VALIDATE_STUDENTS_SCORE_BY_SUBJECTS,
} from '../varables'

const initialState = {
  students: [],
  loading:false,
  error:null,
  graphOfTotalParClass:[],
  currentStudent:{},
  validateStudentScore:[]
};

export const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_STUDENT_BEGIN:
      return {
        ...state,
        loading:true
      };
      case CREATE_STUDENT_SUCCESS:
        return {
          ...state,
          loading:false,
      };
      case CREATE_STUDENT_ERROR:
        return {
          ...state,
          loading:false,
          error:action.payload.error
      };
      case EDIT_STUDENT_BEGIN:
        return {
          ...state,
          loading:true
        };
        case EDIT_STUDENT_SUCCESS:
          return {
            ...state,
            loading:false,
        };
        case EDIT_STUDENT_ERROR:
          return {
            ...state,
            loading:false,
            error:action.payload.error
        };
      case FETCH_ALL_STUDENT_BEGIN:
        return {
          ...state,
          loading:true,
          students: [],

        };
        case FETCH_ALL_STUDENT_SUCCESS:
          return {
            ...state,
            loading:false,
            students: action.payload.students,
        };
        case FETCH_ALL_STUDENT_ERROR:
          return {
            ...state,
            loading:false,
            error:action.payload.error,
            students: []
        };
        case FETCH_GRAPH_STUDENT_TOTAL_BY_CLASS_BEGIN:
          return {
            ...state,
            loading:true,
            graphOfTotalParClass:[]
        };
        case FETCH_GRAPH_STUDENT_TOTAL_BY_CLASS_SUCCESS:
          return {
            ...state,
            loading:false,
            graphOfTotalParClass:action.payload.graphData
        };
        case FETCH_GRAPH_STUDENT_TOTAL_BY_CLASS_ERROR:
          return {
            ...state,
            loading:false,
            error:action.payload.error,
            graphOfTotalParClass:[]
        };
        case FETCH_CURRENT_STUDENT_BEGIN:
          return {
            ...state,
            loading:true,
            currentStudent:{}
        };
        case  FETCH_CURRENT_STUDENT_SUCCESS:
          return {
            ...state,
            loading:false,
            currentStudent:action.payload.student
        };
        case  FETCH_CURRENT_STUDENT_ERROR:
          return {
            ...state,
            loading:false,
            currentStudent:{}
        };
        case  VALIDATE_STUDENTS_SCORE_BY_SUBJECTS:
          return {
            ...state,
            loading:false,
            validateStudentScore:action.payload.validateStudentScore
        };
    default:
      return {...state};
  }
};
