// hooks/useGetRealtime.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/messageSlice";

const useGetRealtime = () => {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socket);

  useEffect(() => {
    if (!socket) return;

    socket.on("receive_message", (newMessage) => {
      dispatch(addMessage(newMessage));
    });

    // Cleanup listener
    return () => socket.off("receive_message");
  }, [socket, dispatch]);
};

export default useGetRealtime;
