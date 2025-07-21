import React from "react";
import OtherUsers from "./OtherUsers";
import UsegetOtherUser from "../Hooks/UsegetOtherUser";
import { useSelector } from "react-redux";

const OtherUser = () => {
  UsegetOtherUser();
  const { otherUsers } = useSelector((store) => store.user);
  if (!otherUsers) {
    return;
  }

  return (
    <div className="overflow-auto">
      {otherUsers?.map((user) => {
        return <OtherUsers key={user._id} user={user}></OtherUsers>;
      })}
    </div>
  );
};

export default OtherUser;
