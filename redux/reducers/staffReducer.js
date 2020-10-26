import {
  CREATE_STAFF_BEGIN,
  CREATE_STAFF_ERROR,
  CREATE_STAFF_SUCCESS,
  FETCH_ALL_STAFF_BEGIN,
  FETCH_ALL_STAFF_SUCCESS,
  FETCH_ALL_STAFF_ERROR
} from '../Varables'

const initialState = {
  staffs: [],
  loading:false,
  error:null,
};

export const staffReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_STAFF_BEGIN:
      return {
        ...state,
        loading:true
      };
      case CREATE_STAFF_SUCCESS:
        return {
          ...state,
          loading:false,
      };
      case CREATE_STAFF_ERROR:
        return {
          ...state,
          loading:false,
          error:action.payload.error
      };
      case FETCH_ALL_STAFF_BEGIN:
        return {
          ...state,
          loading:true,
          staffs: [],

        };
      case FETCH_ALL_STAFF_SUCCESS:
          return {
            ...state,
            loading:false,
            staffs: action.payload.staffs,
        };
        case FETCH_ALL_STAFF_ERROR:
          return {
            ...state,
            loading:false,
            error:action.payload.error,
            staffs: []
        };
    default:
      return {...state};
  }
};
