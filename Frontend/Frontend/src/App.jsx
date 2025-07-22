import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { setSocket } from "./redux/socketSlice";

const App = () => {
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  console.log(authUser)
  

  useEffect(() => {
    if (authUser) {
      const socket = io("localhost:8080", {
        withCredentials: true,
      });
      dispatch(setSocket(socket));

      return () => {
        socket.disconnect();
        dispatch(setSocket(null));
      };
    }
  }, [authUser, dispatch]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        {/* Protected Route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
    </div>
  );
};

export default App;



