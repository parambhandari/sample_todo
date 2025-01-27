import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  EMPLOYEE_LOADING,
  LOAD_EMPLOYEE,
  EMPLOYEE_ERROR
} from "../types";

const initialState = {
  user: null,
  token: localStorage.getItem("accessToken") || null,
  error: null,
  loading: false,
  isAuthenticated: !!localStorage.getItem("accessToken"),
  employees:[]
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.accessToken,
        loading: false,
        error: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.accessToken,
        loading: false,
        error: null,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        error: null,
      };
      case EMPLOYEE_LOADING:
        return {
          ...state,
          loading: true,
        };
      case LOAD_EMPLOYEE:
        return {
          ...state,
          loading: false,
          employees: action.payload,
        };
      case EMPLOYEE_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
    default:
      return state;
  }
};

export default authReducer;
