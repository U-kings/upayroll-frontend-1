import React, { useEffect, useState } from "react";
import { DeductionTable, Header, SideNav } from "../../components";
import {
  DashboardContainer,
  DashboardContent,
  Mainbody,
} from "../../styles/library";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  adminGetAllAllowance,
  adminCreateAllowance,
  adminUpdateAllowanceById,
} from "../../actions/allowance";
import {
  adminGetAllDeduction,
  adminCreateDeduction,
  adminUpdateDeductionById,
} from "../../actions/deduction";
import {
  ADMIN_CREATE_ALLOWANCE_RESET,
  ADMIN_GET_ALL_ALLOWANCES_RESET,
  ADMIN_UPDATE_ALLOWANCE_BY_ID_RESET,
} from "../../types/allowance";
import {
  ADMIN_CREATE_DEDUCTION_RESET,
  ADMIN_GET_ALL_DEDUCTIONS_RESET,
  ADMIN_UPDATE_DEDUCTION_BY_ID_RESET,
} from "../../types/deduction";
import { LoadingSpinner, Comfirm, Successful } from "../../modals";
import { logoutAdmin } from "../../actions/auth";
import AdditionTable from "../../components/AdditionTable";

const Payheads = ({ toggle, toggleMenu, mobileToggle, toggleMobileMenu }) => {
  // history init
  const history = useHistory();
  // dispatch init
  const dispatch = useDispatch();
  // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  const {
    allowances,
    isLoading: loadingAllowances,
    error: getAllowanceError,
  } = useSelector((state) => state.adminGetAllAllowance);
  const {
    deductions,
    isLoading: loadingDeductions,
    error: getDeductionsError,
  } = useSelector((state) => state.adminGetAllDeduction);

  const { success: createAllowanceSuccess } = useSelector(
    (state) => state.adminCreateAllowance
  );

  const { success: createDeductionSuccess } = useSelector(
    (state) => state.adminCreateDeduction
  );

  const {
    success: updateAllowanceSuccess,
    error: updateAllowanceError,
    isLoading: updateAllowanceLoading,
  } = useSelector((state) => state.adminUpdateAllowance);

  const {
    success: updateDeductionSuccess,
    isLoading: updateDeductionLoading,
    error: updateDeductionError,
  } = useSelector((state) => state.adminUpdateDeduction);

  //   func state
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const [allowance, setAllowance] = useState({
    name: "",
    description: "",
  });
  const [deduction, setDeduction] = useState({
    name: "",
    description: "",
  });
  const [deductionId, setDeductionId] = useState(null);
  const [allowanceId, setAllowanceId] = useState(null);
  const [userRole] = useState(adminInfo?.user?.role || "");
  const [userRoleName] = useState(adminInfo?.user?.name || "");
  const [profileImg] = useState(adminInfo?.user?.photo || "");

  // onChange
  const onChange = (e, type) => {
    if (type === "allowance") {
      setAllowance({ ...allowance, [e.target.name]: e.target.value });
    } else {
      setDeduction({ ...deduction, [e.target.name]: e.target.value });
    }
  };

  const onSelect = (id, type) => {
    let findPay;
    if (type === "allowance") {
      findPay = allowances?.find((el) => String(el?.id) === String(id));
      if (findPay) {
        setAllowance({
          id: findPay?.id,
          name: findPay?.name,
          description: findPay?.description,
          edit: true,
        });
      }
    } else {
      findPay = deductions?.find((el) => String(el?.id) === String(id));
      if (findPay) {
        setDeduction({
          id: findPay?.id,
          name: findPay?.name,
          description: findPay?.description,
          edit: true,
        });
      }
    }
  };

  const popup4 = (id, type) => {
    if (id) {
      if (type === "allowance") {
        setAllowanceId(id);
      } else {
        setDeductionId(id);
      }
    }
    setIsOpen4(!isOpen4);
  };

  const popup7 = () => {
    if (updateAllowanceSuccess && !updateAllowanceError) {
      dispatch({ type: ADMIN_UPDATE_ALLOWANCE_BY_ID_RESET });
      setAllowance({
        name: "",
        description: "",
      });
      setAllowanceId(null);
    } else if (updateDeductionSuccess && !updateDeductionLoading) {
      dispatch({ type: ADMIN_UPDATE_DEDUCTION_BY_ID_RESET });
      setDeduction({
        name: "",
        description: "",
      });
    }

    setIsOpen7(false);
  };

  const onSave = (e, type) => {
    e.preventDefault();
    if (type === "allowance") {
      if (allowance?.id || allowance?.edit) {
        dispatch(
          adminUpdateAllowanceById(allowance?.id, {
            name: allowance?.name,
            description: allowance?.description,
          })
        );
      } else {
        dispatch(
          adminCreateAllowance({
            name: allowance.name,
            description: allowance.description,
          })
        );
      }
    } else {
      if (deduction?.id || deduction?.edit) {
        dispatch(
          adminUpdateDeductionById(deduction?.id, {
            name: deduction.name,
            description: deduction.description,
          })
        );
      }
      dispatch(
        adminCreateDeduction({
          name: deduction.name,
          description: deduction.description,
        })
      );
    }
  };

  const onClear = (e, type) => {
    if (type === "allowance") {
      setAllowance({
        name: "",
        description: "",
      });
    } else {
      setDeduction({
        name: "",
        description: "",
      });
    }
  };

  useEffect(() => {
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      history.push("/");
    } else {
      dispatch(adminGetAllAllowance());
      dispatch(adminGetAllDeduction());
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

    if (createAllowanceSuccess || createDeductionSuccess) {
      dispatch({
        type: ADMIN_CREATE_ALLOWANCE_RESET,
      });
      dispatch({
        type: ADMIN_CREATE_DEDUCTION_RESET,
      });
      setAllowance({
        name: "",
        description: "",
      });
      setDeduction({
        name: "",
        description: "",
      });
    }
  }, [
    adminInfo,
    userRole,
    history,
    dispatch,
    createAllowanceSuccess,
    createDeductionSuccess,
  ]);

  useEffect(() => {
    if (
      getAllowanceError === "no token was passed" ||
      getDeductionsError === "no token was passed"
    ) {
      dispatch(logoutAdmin("no token was passed"));
      dispatch({ type: ADMIN_GET_ALL_ALLOWANCES_RESET });
      dispatch({ type: ADMIN_GET_ALL_DEDUCTIONS_RESET });
    }
  }, [dispatch, getAllowanceError, getDeductionsError]);

  const phd = "active";
  return (
    <>
      {loadingAllowances && loadingDeductions && <LoadingSpinner toggle={toggle} />}
      {updateAllowanceLoading && <LoadingSpinner toggle={toggle} />}
      {updateDeductionLoading && <LoadingSpinner toggle={toggle} />}
      <Successful
        isOpen7={isOpen7 || (updateAllowanceSuccess && !updateAllowanceError)}
        setIsOpen7={setIsOpen7}
        popup7={popup7}
        message="Addition updated successfully!"
      />
      <Successful
        isOpen7={isOpen7 || (updateDeductionSuccess && !updateDeductionError)}
        setIsOpen7={setIsOpen7}
        popup7={popup7}
        message="Deduction updated successfully!"
      />
      {allowanceId && (
        <Comfirm toggle={toggle}
          isOpen4={isOpen4}
          popup4={popup4}
          setIsOpen4={setIsOpen4}
          allId={allowanceId}
          setAllowanceId={setAllowanceId}
        />
      )}
      {deductionId && (
        <Comfirm toggle={toggle}
          isOpen4={isOpen4}
          popup4={popup4}
          setIsOpen4={setIsOpen4}
          deductId={deductionId}
          setDeductionId={setDeductionId}
        />
      )}
      <DashboardContainer>
        <DashboardContent>
          <SideNav
            userRole={userRole}
            userRoleName={userRoleName}
            phd={phd}
            toggle={toggle}
            toggleMenu={toggleMenu}
            mobileToggle={mobileToggle}
            toggleMobileMenu={toggleMobileMenu}
          />
          <Mainbody toggle={toggle}>
            <Header
              text="PayHeads"
              userRole={userRole}
              profileimg={profileImg}
              toggle={toggle}
              toggleMenu={toggleMenu}
              mobileToggle={mobileToggle}
              toggleMobileMenu={toggleMobileMenu}
            />
            <AdditionTable
              allowance={allowance}
              allowances={allowances}
              onSubmit1={onSave}
              onChange={onChange}
              onClick1={onClear}
              onClick2={onSelect}
              onClick3={popup4}
            />
            <DeductionTable
              deduction={deduction}
              deductions={deductions}
              onSubmit1={onSave}
              onChange={onChange}
              onClick1={onClear}
              onClick2={onSelect}
              onClick3={popup4}
            />
          </Mainbody>
        </DashboardContent>
      </DashboardContainer>
    </>
  );
};

export default Payheads;
