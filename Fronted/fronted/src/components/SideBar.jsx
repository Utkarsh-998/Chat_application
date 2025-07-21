import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import OtherUser from "./OtherUser";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const SideBar = () => {
  const [search, setSearch] = useState("");
  const { otherUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const HandleLogout = async () => {
    try {
      const res = await axios.get("https://chat-app-t7q5.onrender.com/api/v1/user/logout");
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const converstion = otherUsers?.find((user) =>
      user.username.toLowerCase().includes(search.toLowerCase())
    );
    console.log("k");
    if (converstion) {
      dispatch(setOtherUsers([converstion]));
    } else {
      toast.error("User not Found");
    }
  };

  return (
    <div className="border-r flex-col flex p-4 border-slate-500">
      <form className="flex items-center gap-2 mt-2" onSubmit={handleSearch}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered rounded-md"
          type="text"
          placeholder="Search..."
        />

        <button type="submit" className="btn  bg-slate-500 ">
          <AiOutlineSearch />
        </button>
      </form>
      <div className="divider px-3"></div>
      <OtherUser></OtherUser>
      <div className="mt-2">
        <button className="btn btn-sm " onClick={HandleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
