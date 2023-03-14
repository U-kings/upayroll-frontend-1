import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Header,
  MonthlyPayheadTable,
  SideNav,
  TaxTable,
} from "../../components";
import {
  DashboardContainer,
  DashboardContent,
  Mainbody,
} from "../../styles/library";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../../actions/auth";
import { ADMIN_GET_MONTHLYPAYHEADS_RESET } from "../../types/monthlypayheads";

const MonthlyPayhead = () => {
  // history init
  const history = useHistory();

  const dispatch = useDispatch();

  // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  const { error: monthlyPayheadsError } = useSelector(
    (state) => state.adminGetAllMonthlyPayheads
  );
  const [userRole] = useState(adminInfo?.user?.role || "");
  const [userRoleName] = useState(adminInfo?.user?.name || "");
  const [profileImg] = useState(adminInfo?.user?.photo || "");

  useEffect(() => {
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      history.push("/");
    }
    if (
      userRole === "Internal Auditor" ||
      userRole === "CEO" ||
      userRole === "Accountant"
    ) {
      history.push("dashboard");
    }
  }, [adminInfo, userRole, history]);

  useEffect(() => {
    if (monthlyPayheadsError === "no token was passed") {
      dispatch(logoutAdmin("no token was passed"));
      dispatch({ type: ADMIN_GET_MONTHLYPAYHEADS_RESET });
    }
  }, [dispatch, monthlyPayheadsError]);

  const mph = "active";
  return (
    <>
      <DashboardContainer>
        <DashboardContent>
          <SideNav userRole={userRole} userRoleName={userRoleName} mph={mph} />
          <Mainbody>
            <Header
              text="Monthly PayHeads"
              userRole={userRole}
              profileimg={profileImg}
            />
            <MonthlyPayheadTable />
            <TaxTable />
          </Mainbody>
        </DashboardContent>
      </DashboardContainer>
    </>
  );
};

export default MonthlyPayhead;
