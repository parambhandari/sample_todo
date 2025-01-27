import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/action/authActions";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import { ToastContainer } from "react-toastify";
import CreateTask from "./components/CreateTask";
import "react-toastify/dist/ReactToastify.css";
import AllUsers from "./pages/AllUsers";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Header />
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <DashboardPage /> : <LoginPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/tasks"
            element={isAuthenticated ? <TaskList /> : <LoginPage />}
          />
          <Route
            path="/create-task"
            element={isAuthenticated ? <CreateTask /> : <LoginPage />}
          />

          <Route
            path="/users"
            element={isAuthenticated ? <AllUsers /> : <LoginPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
