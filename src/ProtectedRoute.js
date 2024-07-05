import { createHashHistory } from "history";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "./actions/auth";

const ProtectedRoute = ({ children }) => {
  // hsitory init
  const history = createHashHistory();
  // dispatch init
  const dispatch = useDispatch();
  // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);

  const [userRole] = useState(adminInfo?.user?.role || "");

  // useEffects
  useEffect(() => {
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      //   console.log("Protected Route");
      return history.push("signin");
    }
    // if (
    //   userRole === "Internal Auditor" ||
    //   userRole === "CEO" ||
    //   userRole === "Accountant"
    // ) {
    //   history.push("dashboard");
    // } else if (userRole === "Employee") {
    //   history.push("dashboard");
    // }
  }, [dispatch, adminInfo, userRole, history]);

  useEffect(() => {
    const sessionKey = sessionStorage.getItem("item_key");

    if (sessionKey === null) {
      dispatch(logoutAdmin("no token was passed"));
      history.push("signin");
    }
  }, [dispatch, history]);

  return <section>{children}</section>;
};

export default ProtectedRoute;
