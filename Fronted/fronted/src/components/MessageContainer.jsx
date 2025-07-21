import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice"; // adjust path if needed

import axios from "axios";
const MessageContainer = () => {
  const dispatch = useDispatch();
  const { authUser, selectedUser } = useSelector((state) => state.user);

  useEffect(() => {
    return () => dispatch(setSelectedUser(selectedUser));
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser || !authUser) return;

      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/message/get/${selectedUser._id}`,
          {
            withCredentials: true,
          }
        );

        // console.log(res, "from message container");

        dispatch(setMessages(res.data));
      } catch (error) {
        console.log("Failed to load messages:", error);
      }
    };

    fetchMessages();
  }, [selectedUser, authUser, dispatch]);
  return (
    <>
      {selectedUser ? (
        <div className="md:min-w-[450px] flex flex-col">
          <div className="flex gap-2 items-center rounded-sm p-2 cursor-pointer bg-zinc-800 px-4 py-2">
            <div className="avatar online">
              <div className="w-10 rounded-full">
                <img src={selectedUser?.profilePhoto} alt="" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex  gap-2 ">
                <p>{selectedUser?.fullName}</p>
              </div>
            </div>
          </div>
          <Messages />

          <SendInput />
        </div>
      ) : (
        <div className="md:min-w-[550px] flex flex-col items-center  justify-center text-2xl">
          <h1>Hi,{authUser?.fullName}</h1>
          <h1>Lets start Converstation</h1>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
