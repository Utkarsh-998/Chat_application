import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [data, setData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const handleCheck = (gender) => {
    setData({ ...data, gender });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    setData({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };
  return (
    <div className="min-w-96 margin-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-transparen">
        <h1 className="text-3xl font-bold text-center">SignUp</h1>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <br />
            <input
              value={data.fullName}
              onChange={(e) => setData({ ...data, fullName: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Enter Your Name"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <br />
            <input
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Enter Your Username"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <br />
            <input
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Enter Your Password"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <br />
            <input
              value={data.confirmPassword}
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Enter Your Password Again"
            />
          </div>

          <div className="gap-5">
            <span className="mx-1">
              Male
              <input
                name="gender"
                checked={data.gender === "male"}
                onChange={() => handleCheck("male")}
                type="radio"
                className="checkbox"
              />
            </span>

            <span className="my-5">
              Female
              <input
                name="gender"
                checked={data.gender === "female"}
                onChange={() => handleCheck("female")}
                type="radio"
                className="checkbox"
              />
            </span>
          </div>
          <p className="text-center my-2">
            Already have a account?
            <Link to="/login">Login</Link>
          </p>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border-state-700 cursor-pointer"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
