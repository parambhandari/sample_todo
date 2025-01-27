import {
  TASKS_FAIL,
  TASKS_LOADING,
  TASKS_SUCCESS,
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  USER_LOADING,
  LOAD_USER,
  USER_ERROR,
  USER_DELETE,
} from "../types";

const initialState = {
  tasks: [],
  users: [],
  loading: false,
  error: null,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASKS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: null,
      };
    case TASKS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOAD_USER:
      return {
        ...state,
        loading: false,
        users: action.payload.data,
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case USER_DELETE:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    default:
      return state;
  }
};

export default taskReducer;
