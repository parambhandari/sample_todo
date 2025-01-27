import api from "../../services/api";
import {
  USER_LOADING,
  LOAD_USER,
  USER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  EMPLOYEE_LOADING,
  EMPLOYEE_ERROR,
  LOAD_EMPLOYEE
} from "../types";

export const loadUser = () => async (dispatch) => {
  dispatch({ type: USER_LOADING });

  try {
    const response = await api.get("/tasks/users");
    dispatch({
      type: LOAD_USER,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error.response
        ? error.response.data.message
        : "Unable to load user",
    });
  }
};

export const login = (emailOrMobile, password) => async (dispatch) => {
  try {
    const response = await api.post("/user/login", {
      emailORMobile: emailOrMobile,
      password,
    });
    localStorage.setItem("accessToken", response.data.accessToken);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Something went wrong",
    });
  }
};

export const signup =
  (firstName, lastName, email, mobileNumber, password , role) => async (dispatch) => {
    try { 
      const response = await api.post("/user/signup", {
        firstName,
        lastName,
        email,
        mobileNumber,
        password,
        role
      });
      dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: SIGNUP_FAIL,
        payload: error.response
          ? error.response.data.message
          : "Something went wrong",
      });
    }
  };

export const logout = () => (dispatch) => {
  localStorage.removeItem("accessToken");
  dispatch({ type: LOGOUT });
  dispatch({ type: USER_ERROR, payload: null });
};



export const fetchEmployee = () => async (dispatch) => {
  dispatch({ type: EMPLOYEE_LOADING });
  try {
    const response = await api.get('/user/get/employee');
    const employees = response.data.data;

    if (Array.isArray(employees)) {
      dispatch({ type: LOAD_EMPLOYEE, payload: employees });
    } else {
      throw new Error('Invalid data format');
    }
  } catch (error) {
    dispatch({
      type: EMPLOYEE_ERROR,
      payload:
        error.response?.data?.message || 'Something went wrong. Please try again.',
    });
  }
};
