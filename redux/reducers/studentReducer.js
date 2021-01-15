import {
  CREATE_STUDENT_BEGIN,
  CREATE_STUDENT_ERROR,
  CREATE_STUDENT_SUCCESS,
  FETCH_ALL_STUDENT_BEGIN,
  FETCH_ALL_STUDENT_SUCCESS,
  FETCH_ALL_STUDENT_ERROR,
  FETCH_GRAPH_STUDENT_TOTAL_BY_CLASS_BEGIN,
  FETCH_GRAPH_STUDENT_TOTAL_BY_CLASS_ERROR,
  FETCH_GRAPH_STUDENT_TOTAL_BY_CLASS_SUCCESS
} from '../varables'

const initialState = {
  students: [],
  loading:false,
  error:null,
  graphOfTotalParClass:[],
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
    default:
      return {...state};
  }
};
