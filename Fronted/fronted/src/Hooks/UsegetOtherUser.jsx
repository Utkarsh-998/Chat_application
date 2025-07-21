import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const UsegetOtherUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUser = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get("http://localhost:8080/api/v1/user/");

        // Add avatar field dynamically based on gender
        const usersWithAvatars = res.data.map((user) => ({
          ...user,
          profilePhoto: `https://api.dicebear.com/7.x/adventurer/svg?seed=${
            user.username || user._id
          }&gender=${user.gender}`,
        }));

        dispatch(setOtherUsers(usersWithAvatars));
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchOtherUser();
  }, []);
};

export default UsegetOtherUser;
