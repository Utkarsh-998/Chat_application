import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { socket } = useSelector((store) => store.socket);
  const { authUser } = useSelector((store) => store.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://chat-app-t7q5.onrender.com/api/v1/user/login",
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        console.log(res.data,"from login res data")
        const user = res.data;
        console.log(user,"from login")
        // Save only user data in localStorage (not whole response)
        localStorage.setItem("authUser", JSON.stringify(user));
        dispatch(setAuthUser(user));
        toast.success(res.data.message);

        // ✅ Register the user with socket after login
        if (socket) {
          socket.emit("addUser", user._id);
        }

        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }

    setData({ username: "", password: "" });
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400">
        <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              className="w-full input input-bordered h-10 mb-2"
              type="text"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <p className="text-center my-2 text-sm">
            Don’t have an account?
            <Link to="/register" className="text-blue-500 hover:underline ml-1">
              Sign up
            </Link>
          </p>

          <button
            type="submit"
            className="btn btn-primary btn-block mt-3"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
