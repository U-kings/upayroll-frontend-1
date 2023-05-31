import React, { useState, useEffect } from "react";
import cookie from "js-cookie";
import { ErrorBox, Header, SideNav } from "../../components";
import {
  DashboardContainer,
  DashboardContent,
  Mainbody,
  Container,
  Box,
} from "../../styles/library";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

import { getDashboardReportSummaryFunc } from "../../actions/dashboard";
import { LoadingSpinner } from "../../modals";
// import { logoutAdmin } from "../../actions/auth";
// // import { element } from "prop-types";
// import { useMonthlyPayhead } from "../../hooks/calculations/useMonthlyPayhead";

const Dashboard = ({
  state,
  toggle,
  toggleMenu,
  mobileToggle,
  toggleMobileMenu,
}) => {
  // history init
  const history = useHistory();

  //   // dispatch init
  const dispatch = useDispatch();

  // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  const { reports, isLoading } = useSelector(
    (state) => state.getDashboardReportsResult
  );
  //   const {
  //     isLoading: getEmployeeLoading,
  //     employees,
  //     error: getEmployeeError,
  //   } = useSelector((state) => state.adminGetAllEmployeeReducer);

  //   const { success: resetSucces, error: resetError } = useSelector(
  //     (state) => state.adminResetPassword
  //   );

  //   const { error: getMonthlyPayheadError } = useSelector(
  //     (state) => state.adminGetAllMonthlyPayheads
  //   );

  const [userRole] = useState(adminInfo?.user?.role || "");
  const [userRoleName] = useState(adminInfo?.user?.name || "");
  const [profileImg] = useState(adminInfo?.user?.photo || "");
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      history.push("/");
    } else {
      dispatch(getDashboardReportSummaryFunc());
    }

    const requiresPasswordChange = cookie.get("requiresPasswordChange");
    if (requiresPasswordChange) {
      if (JSON.parse(requiresPasswordChange)) {
        setChangePassword(true);
        setTimeout(() => {
          history.push("profile-settings");
        }, 3000);
      }
    }
  }, [history, dispatch, adminInfo, userRole]);

  const dash = "active";
  return (
    <>
      {isLoading && <LoadingSpinner toggle={toggle} />}
      <DashboardContainer>
        <DashboardContent>
          <SideNav
            dash={dash}
            userRole={userRole}
            toggle={toggle}
            mobileToggle={mobileToggle}
            toggleMobileMenu={toggleMobileMenu}
          />
          <Mainbody toggle={toggle}>
            <Header
              text="Dashboard"
              state={state}
              toggle={toggle}
              toggleMenu={toggleMenu}
              mobileToggle={mobileToggle}
              toggleMobileMenu={toggleMobileMenu}
              userRole={userRole}
              userRoleName={userRoleName}
              profileimg={profileImg}
            />
            <Container className="inner__container">
              {changePassword && (
                <ErrorBox
                  errorMessage={
                    changePassword ? "Please Change you password" : ""
                  }
                />
              )}
              {userRole !== "Employee" ? (
                <>
                  <div className="row2 margin__top">
                    <Box className="b1">
                      <p>Employees</p>
                      <div className="row2 margin__top">
                        <FontAwesomeIcon
                          className="icons2"
                          icon={["fas", "users"]}
                        />
                        <p>{reports?.employees}</p>
                      </div>
                    </Box>
                    <Box className="b2">
                      <p>Payroll</p>
                      <div className="row2 margin__top">
                        <FontAwesomeIcon
                          className="icons2"
                          icon={["fas", "money-check"]}
                        />
                        <p>{reports?.payrolls}</p>
                      </div>
                    </Box>
                    {/* <Box className="b3">
                      <p>Loan Request</p>
                      <div className="row2 margin__top">
                        <FontAwesomeIcon
                          className="icons2"
                          icon={["fas", "list"]}
                        />
                        <p>{reports?.loanRequests}</p>
                      </div>
                    </Box> */}
                  </div>
                  <div className="row2 margin__top">
                    <Box className="b4">
                      <p>Department</p>
                      <div className="row2 margin__top">
                        <FontAwesomeIcon
                          className="icons2"
                          icon={["fas", "house-user"]}
                        />
                        <p>{reports?.departments}</p>
                      </div>
                    </Box>
                    <Box style={{ flex: "1" }} className="b5">
                      <p>Position</p>
                      <div className="row2 margin__top">
                        <FontAwesomeIcon
                          className="icons2"
                          icon={["fas", "user-tag"]}
                        />
                        <p>{reports?.positions}</p>
                      </div>
                    </Box>
                    <Box style={{ flex: "1" }} className="b6">
                      <p>Bank Schedule</p>
                      <div className="row2 margin__top">
                        <FontAwesomeIcon
                          className="icons2"
                          icon={["fas", "clipboard-list"]}
                        />
                        <p>{reports?.bankSchedules}</p>
                      </div>
                    </Box>
                  </div>
                </>
              ) : (
                <>
                  <div className="row2 margin__top">
                    <Box className="b2">
                      <p>Pay Slip</p>
                      <div className="row2 margin__top">
                        <FontAwesomeIcon
                          className="icons2"
                          icon={["fas", "file-invoice-dollar"]}
                        />
                        <p>75</p>
                      </div>
                    </Box>
                    {/* <Box style={{ flex: "1" }} className="b3">
                      <p>Loan Request</p>
                      <div className="row2 margin__top">
                        <FontAwesomeIcon
                          className="icons2"
                          icon={["fas", "list"]}
                        />
                        <p>75</p>
                      </div>
                    </Box> */}
                    {/* <Box style={{ flex: "1" }} className="b6">
                      <p>Bank Schedule</p>
                      <div className="row2 margin__top">
                        <FontAwesomeIcon
                          className="icons2"
                          icon={["fas", "clipboard-list"]}
                        />
                        <p>75</p>
                      </div>
                    </Box> */}
                  </div>
                </>
              )}
            </Container>
          </Mainbody>
        </DashboardContent>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
