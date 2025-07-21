import axios from "axios";
import React, { useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
const SendInput = () => {
  const [message, setMessage] = useState("");
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { messages } = useSelector((store) => store.message);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `https://chat-app-t7q5.onrender.com/api/v1/message/send/${selectedUser?._id}`,
        { message }, // ✅ wrap it in an object
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch(setMessages([...messages, res?.data?.newMessage]));
    } catch (error) {
      console.log(error);
    }
    setMessage("");
  };
  return (
    <form action="" className="px-4 my-3" onSubmit={handleMessageSubmit}>
      <div className="w-full relative">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Send a  message"
          className="border txt-sm rounded-lg block w-full bg-gray-600 p-3 border-zinc-500"
        />
        <button
          type="submit"
          className="absolute flex items-center inset-y-0 end-0 pr-2"
        >
          <IoSend/>
        </button>
      </div>
    </form>
  );
};

export default SendInput;
