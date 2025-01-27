import api from "../services/api";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
} from "../redux/types";

export const loginUser = (emailOrMobile, password) => async (dispatch) => {
  try {
    const response = await api.post("/user/login", { emailOrMobile, password });
    const { user, accessToken } = response.data;

    localStorage.setItem("accessToken", accessToken);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user, accessToken },
    });

    return { type: "LOGIN_SUCCESS" };
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data?.message || "Login failed",
    });
    return { type: "LOGIN_FAIL" };
  }
};

export const signupUser =
  (firstName, lastName, email, mobileNumber, password ,role) => async (dispatch) => {
    try {
      const response = await api.post("/user/signup", {
        firstName,
        lastName,
        email,
        mobileNumber,
        password,
        role,
      });
      const { user, accessToken } = response.data;

      localStorage.setItem("accessToken", accessToken);

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: { user, accessToken },
      });
    } catch (error) {
      dispatch({
        type: SIGNUP_FAIL,
        payload: error.response?.data?.message || "Signup failed",
      });
    }
  };

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("accessToken");

  dispatch({
    type: LOGIN_FAIL,
  });
};



