import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
// import { CHECK_COOKIE_TOKEN_VALID_RESET } from "../../types/auth";

const Main = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);

  useEffect(() => {
    if (adminInfo?.isAuthenticated && adminInfo?.user?.name) {
      history.push("dashboard");
    }
  }, [history, adminInfo, dispatch]);

  // useEffect(() => {
  //   if (cookieValid?.status) {
  //     history.push("employee");
  //     dispatch({ type: CHECK_COOKIE_TOKEN_VALID_RESET });
  //   }
  // }, [dispatch, history, cookieValid]);

  return (
    <>
      <Redirect exact from="/" to="home" />
      {/* <Redirect exact from="/" to="signin" /> */}
    </>
  );
};

export default Main;
