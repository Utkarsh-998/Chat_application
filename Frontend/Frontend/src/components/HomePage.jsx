import React, { useEffect } from "react";
import SideBar from "./SideBar";
import MessageContainer from "./MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser, setAuthUser } from "../redux/userSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { setSelectedUser } from "../redux/userSlice";
const HomePage = () => {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socket);
  const { authUser } = useSelector((state) => state.user);

  // Set authUser from localStorage once on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    if (user) {
      dispatch(setAuthUser(user));
    }
  }, [dispatch]);

  // Emit user to socket once ready
  useEffect(() => {
    if (socket && authUser?._id) {
      socket.emit("addUser", authUser._id);
    }
  }, [socket, authUser]);

  return (
    <>
      <div className="p-3 "></div>
      <div className="flex sm:h-[460px] md:h-[550px] rounded-lg ovetflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity">
        <SideBar />
        <MessageContainer />
      </div>
    </>
  );
};

export default HomePage;
