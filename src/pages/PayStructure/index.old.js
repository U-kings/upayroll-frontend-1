import React, { useState, useEffect } from "react";
import {
  SideNav,
  Header,
  StaffGrade,
  SalaryLevel,
  Step,
  BasePay,
} from "../../components";
import {
  DashboardContainer,
  DashboardContent,
  Mainbody,
} from "../../styles/library";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LoadingSpinner } from "../../modals";
import { hrGetBasePayFunc } from "../../actions/basepay";
import { hrGetAllStaffGradesFunc } from "../../actions/staffgrade";
import { hrGetSalaryLevelsFunc } from "../../actions/salarylevel";
import { hrGetSalaryStepsFunc } from "../../actions/salarysteps";
// import {
//   HR_GET_BASEPAY_RESET,
// } from "../../types/basepay";
import { logoutAdmin } from "../../actions/auth";

const PayStructure = () => {
  // hsitory init
  const history = useHistory();
  // dispatch init
  const dispatch = useDispatch();
  // redux state
  const {
    isLoading: getBasePayLoading,
    basePays,
    error: getBasePayError,
  } = useSelector((state) => state.hrGetBasePay);
  const {
    isLoading: getStaffGradeLoading,
    salaryGrades,
    error: getStaffGradeError,
  } = useSelector((state) => state.hrGetStaffGrade);
  const {
    isLoading: getSalaryLevelLoading,
    salaryLevels,
    error: getSalaryLevelError,
  } = useSelector((state) => state.hrGetSalaryLevel);

  const {
    isLoading: getStepsLoading,
    salarySteps,
    error: getStepsError,
  } = useSelector((state) => state.hrGetSteps);

  const { adminInfo } = useSelector((state) => state.adminLoginStatus);

  //func state
  const [userRole] = useState(adminInfo?.user?.role || "");
  const [userRoleName] = useState(adminInfo?.user?.name || "");
  const [profileImg] = useState(adminInfo?.user?.photo || "");

  const sfl = "active";

  // useEffects
  useEffect(() => {
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      history.push("/");
    } else {
      if (userRole === "HR") {
        dispatch(hrGetBasePayFunc());
        dispatch(hrGetAllStaffGradesFunc());
        dispatch(hrGetSalaryLevelsFunc());
        dispatch(hrGetSalaryStepsFunc());
      }
    }
    if (
      userRole === "Internal Auditor" ||
      userRole === "CEO" ||
      userRole === "Accountant"
    ) {
      history.push("dashboard");
    } else if (userRole === "Employee") {
      history.push("dashboard");
    }
  }, [dispatch, adminInfo, userRole, history]);

  useEffect(() => {
    if (
      getBasePayError === "no token was passed" ||
      getStaffGradeError === "no token was passed" ||
      getSalaryLevelError === "no token was passed" ||
      getStepsError === "no token was passed"
    ) {
      dispatch(logoutAdmin("no token was passed"));
      // dispatch({ type: HR_GET_BASEPAY_RESET });
    }
  }, [
    dispatch,
    getBasePayError,
    getStaffGradeError,
    getSalaryLevelError,
    getStepsError,
  ]);

  return (
    <>
      {(getBasePayLoading ||
        getStaffGradeLoading ||
        getSalaryLevelLoading ||
        getStepsLoading) && <LoadingSpinner toggle={toggle} />}
      <DashboardContainer>
        <DashboardContent>
          <SideNav userRole={userRole} sfl={sfl} />
          <Mainbody>
            <Header
              text="Salary Structure"
              userRole={userRole}
              userRoleName={userRoleName}
              profileimg={profileImg}
            />
            <BasePay basePays={basePays} />
            <StaffGrade staffGrade={salaryGrades} />
            <SalaryLevel
              salaryLevels={salaryLevels}
              staffGrade={salaryGrades}
            />
            <Step
              salarySteps={salarySteps}
              staffGrade={salaryGrades}
              salaryLevels={salaryLevels}
            />
          </Mainbody>
        </DashboardContent>
      </DashboardContainer>
    </>
  );
};

export default PayStructure;
