import api from "../../services/api";
import {
  TASKS_LOADING,
  TASKS_SUCCESS,
  TASKS_FAIL,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  USER_LOADING,
  LOAD_USER,
  USER_ERROR,
  USER_DELETE
} from "../types";

export const fetchTasks = () => async (dispatch) => {
  dispatch({ type: TASKS_LOADING });
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.get("/tasks/get", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (Array.isArray(response.data.data)) {
      dispatch({ type: TASKS_SUCCESS, payload: response.data.data });
    } else {
      dispatch({ type: TASKS_FAIL, payload: "Invalid data format" });
    }
  } catch (error) {
    dispatch({
      type: TASKS_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Something went wrong",
    });
  }
};

export const addTask = (taskData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.post("/tasks/create", taskData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: ADD_TASK, payload: response.data.data });
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

export const updateTask = (taskId, updatedData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.put(`/tasks/update/${taskId}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: UPDATE_TASK, payload: response.data.data });
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("accessToken");
    await api.delete(`/tasks/delete/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: DELETE_TASK, payload: taskId });
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};



export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOADING });
    const response = await api.get("/tasks/users");
    dispatch({ type: LOAD_USER, payload: response.data.data }); 
  } catch (error) {
    dispatch({ type: USER_ERROR, payload: error.message });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("accessToken");
    await api.delete(`/tasks/delete-user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: USER_DELETE, payload: userId });
    dispatch(getAllUsers());

  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
