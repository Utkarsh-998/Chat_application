import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import store from "../redux/store";

const OtherUsers = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const handleSelectedUser = (user) => {
    dispatch(setSelectedUser(user));
  };
  return (
    <div className="  gap-3 mb-6 flex flex-row">
      <div
        onClick={() => handleSelectedUser(user)}
        className={ ` flex ${
          selectedUser?.id === user?.id ? "bg-zinc-500" : ""
        }flex flex-row gap-2 items-center hover:bg-zinc-500 rounded p-2 cursor-pointer `}
      >
        <div className="avatar online w-10 ">
          <div className="w-10 rounded-full border-4 ">
            <img
              src={user?.profilePhoto}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex  gap-2 ">
            <p>{user?.fullName}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0"></div>
    </div>
  );
};

export default OtherUsers;
