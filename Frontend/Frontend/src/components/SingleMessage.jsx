import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Authuserprofile from '../assets/Authuserprofile.jpg'
const SingleMessage = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser, otherUsers } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const senderProfilePhoto =
    message.senderId === authUser._id
      ?Authuserprofile
      : otherUsers.find((user) => user._id === message.senderId)?.profilePhoto || selectedUser?.profilePhoto;

  return (
    <div>
      <div
        ref={scroll}
        className={`chat ${authUser?._id === message?.senderId ? "chat-end" : "chat-start"}`}
      >
        <div className="chat-image avatar">
          {/* <div className="w-10 rounded-full"> */}
            {/* <img
              alt="User avatar"
              src={senderProfilePhoto}
            /> */}
          {/* </div> */}
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50 text-white">12:45</time>
        </div>
        <div className="chat-bubble bg-red-500">{message?.message}</div>
      </div>
    </div>
  );
};

export default SingleMessage;
