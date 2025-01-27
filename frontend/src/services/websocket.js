import { io } from "socket.io-client";
import { TASKS_SUCCESS } from "../redux/types";
import store from "../redux/store";

const SOCKET_URL = "http://localhost:5678";
const socket = io(SOCKET_URL);

socket.on("connect", () => {
  console.log("Connected to WebSocket server");
});

socket.on("taskUpdate", (task) => {
  const tasks = store.getState().tasks.tasks;
  const updatedTasks = tasks.map((t) => (t._id === task._id ? task : t));

  store.dispatch({
    type: TASKS_SUCCESS,
    payload: updatedTasks,
  });
});

export default socket;
