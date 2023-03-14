import React from "react";
import { SignoutContainer } from "../../styles/library";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../../actions/auth";

const Signoutbutton = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logoutAdmin("no token was passed"));
  };
  return (
    <SignoutContainer type="button" className="delete__btn" value="Logout" onClick={onLogout} />
  );
};

export default Signoutbutton;
