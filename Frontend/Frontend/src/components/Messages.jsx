// components/Messages.jsx
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useGetRealtime from "../hooks/useGetRealtime"; // ✅ renamed to camelCase
import SingleMessage from "./SingleMessage";

const Messages = () => {
  const scrollRef = useRef();
  const { selectedUser } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);

  useGetRealtime(); // ✅ proper hook usage at the top

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="p-4 space-y-3 h-[80%] overflow-y-scroll scroll">
      {messages?.map((msg, idx) => (
        <div key={idx} ref={scrollRef}>
          <SingleMessage message={msg} />
        </div>
      ))}
    </div>
  );
};

export default Messages;
