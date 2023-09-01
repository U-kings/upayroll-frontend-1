import React, { useState, useEffect, useCallback } from "react";
import {
  DropdownList,
  ErrorBox,
  Header,
  SearchBar,
  SideNav,
} from "../../components";
import {
  DashboardContainer,
  DashboardContent,
  Mainbody,
  Container,
  EmpContainer,
  LinkButton,
} from "../../styles/library";
import {
  // EditEmployee,
  // ViewEmployee,
  SelectMonth,
  LoadingSpinner,
  Comfirm,
  Successful,
  EditUser,
} from "../../modals";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { adminDeleteAllEmployees } from "../../actions/employee";
import {
  adminGenerateBulkPayslips,
  adminGenerateBulkPayslipsAll,
  adminGeneratePayslip,
} from "../../actions/payslip";
import {
  ADMIN_DELETE_ALL_EMPLOYEES_RESET,
  ADMIN_DELETE_EMPLOYEE_ALLOWANCE_BY_ID_RESET,
  // ADMIN_DELETE_EMPLOYEE_BY_ID_RESET,
  ADMIN_DELETE_EMPLOYEE_DEDUCTION_BY_ID_RESET,
  ADMIN_EMPLOYEE_TOPUP_RESET,
  ADMIN_UPDATE_EMPLOYEE_BY_ID_RESET,
} from "../../types/employee";

// import {
//   calculateContractSlip,
//   calculatePaySlip,
// } from "../../hooks/calculations/paySlip";

import { currentmonthMethod } from "../../hooks/months/listMonths";
import { PaginationContainer } from "../../styles/pagination";
import { ADMIN_RESET_PASSWORD_RESET } from "../../types/auth";
import { ADMIN_GET_ALL_EMPLOYEE_RESET } from "../../types/employee";
import { logoutAdmin } from "../../actions/auth";
// import { element } from "prop-types";
import { useMonthlyPayhead } from "../../hooks/calculations/useMonthlyPayhead";
import { ADMIN_GET_MONTHLYPAYHEADS_RESET } from "../../types/monthlypayheads";
import { COLORS } from "../../values/colors";
import { trancateWord } from "../../hooks/functions";
import { downloadEmployeeSummaryExcelFileFunc } from "../../actions/download";
import {
  superAdminBulkDeleteUser,
  superAdminDeleteUser,
  superAdminGetAllUsers,
} from "../../actions/users";
import {
  SUPER_ADMIN_BULK_DELETE_USERS_RESET,
  SUPER_ADMIN_DELETE_USER_RESET,
} from "../../types/users";

const Users = ({ toggle, toggleMenu, mobileToggle, toggleMobileMenu }) => {
  // history init
  const history = useHistory();

  // dispatch init
  const dispatch = useDispatch();

  // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  const {
    users: usersData,
    isLoading: getUsersLoading,
    error: getUsersError,
  } = useSelector((state) => state.superAdminGetAllUsers);

  const { success: updateSuccess, error: updateError } = useSelector(
    (state) => state.adminUpdateEmployee
  );

  const { success: topSuccess, isLoading: loadingTopUp } = useSelector(
    (state) => state.adminEmployeeTopUp
  );

  const { success: deleteDeductionSuccess } = useSelector(
    (state) => state.adminDeleteEmployeeDeduction
  );

  const { success: deleteAllowanceSuccess } = useSelector(
    (state) => state.adminDeleteEmployeeAllowance
  );

  const {
    isLoading: generatePayslipLoading,
    error: generatePayslipError,
    success: generatePayslipSuccess,
  } = useSelector((state) => state.adminGeneratePayslip);

  const { success: resetSucces, error: resetError } = useSelector(
    (state) => state.adminResetPassword
  );

  const { error: getMonthlyPayheadError } = useSelector(
    (state) => state.adminGetAllMonthlyPayheads
  );

  const {
    success: deleteUserSuccess,
    error: deleteUserError,
    isLoading: deleteUserLoading,
  } = useSelector((state) => state.superAdminDeleteUser);

  const {
    success: deleteBulkUsersSuccess,
    message: deleteBulkUsersMessage,
    error: deleteBulkUsersError,
    isLoading: deleteBulkUsersLoading,
  } = useSelector((state) => state.superAdminBulkDeleteUsers);

  const {
    success: deleteAllEmployeeSuccess,
    error: deleteAllEmployeeError,
    isLoading: deleteAllEmployeeLoading,
  } = useSelector((state) => state.adminDeleteAllEmployees);

  const {
    success: generateBulkPayslipSuccess,
    error: generateBulkPayslipError,
  } = useSelector((state) => state.adminGenerateBulkPayslips);

  const {
    success: generateAllBulkPayslipSuccess,
    error: generateAllBulkPayslipError,
    message: generateAllBulkPayslipMessage,
    isLoading: generateAllBulkPayslipLoading,
  } = useSelector((state) => state.adminGenerateBulkPayslipsAll);

  const { isLoading: downloadStatusLoading, error: downloadStatusError } =
    useSelector((state) => state.downloadStatus);

  //super admin user state
  const {
    success: superAdminUpdateUserSuccess,
    // message: superAdminUpdateUserMessage,
    // isLoading: superAdminUpdateUserLoading,
    // error: superAdminUpdateUserError,
  } = useSelector((state) => state.superAdminUpdateUser);

  //super admin user state
  const {
    success: superAdminUpdateUserRoleSuccess,
    // message: superAdminUpdateUserRoleMessage,
    // isLoading: superAdminUpdateUserRoleLoading,
    // error: superAdminUpdateUserRoleError,
  } = useSelector((state) => state.superAdminUpdateUserRole);

  // func state
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const [isOpen10, setIsOpen10] = useState(false);
  const [isGen, setIsGen] = useState(false);
  const [allIsGen, setAllIsGen] = useState(false);
  const [delUsersBulk, setDelUsersBulk] = useState(false);
  const [selectedOption10, setSelectedOption10] = useState(
    currentmonthMethod("long") || ""
  );
  const [currentUser, setCurrentUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [arrayIds, setArrayIds] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [usersPerpageCount, setUsersPerpageCount] = useState(0);
  const [checked, setChecked] = useState(false);
  const [showError, setShowError] = useState("");
  const [startCheck, setStartCheck] = useState(0);
  const [endCheck, setEndCheck] = useState(0);
  const [pageData, setPageData] = useState([]);
  const [userRole] = useState(adminInfo?.user?.role || "");
  const [userRoleName] = useState(adminInfo?.user?.name || "");
  const [profileImg] = useState(adminInfo?.user?.photo || "");
  // const [arrayIds2, setArrayIds2] = useState([]);

  const currentmonthLong = currentmonthMethod("long");

  const [monthArr] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);

  //check for current month
  const check = (month) => {
    if (month === selectedOption10) {
      return "current";
    }
  };

  // months drop down
  const onOptionClicked10 = (month) => () => {
    setSelectedOption10(month);
    setIsOpen10(false);
  };

  const toggling10 = () => setIsOpen10(!isOpen10);

  const showAllEmployee = () => {
    setChecked(!checked);
    const d = new Date();
    let monthIndex;
    if (d.getMonth() === 11) {
      monthIndex = -2;
    } else {
      monthIndex = +1;
    }
    let name = monthArr[d.getMonth() + monthIndex];
    if (!checked) {
      setSelectedOption10(name);
    } else {
      setSelectedOption10(currentmonthLong);
    }
  };

  useEffect(() => {
    if (
      superAdminUpdateUserSuccess ||
      superAdminUpdateUserRoleSuccess ||
      deleteBulkUsersSuccess ||
      deleteUserSuccess
    ) {
      dispatch(
        superAdminGetAllUsers(
          // selectedOption10,
          pageNumber ? pageNumber + 1 : 1,
          100
        )
      );
    }
  }, [
    pageNumber,
    dispatch,
    superAdminUpdateUserSuccess,
    superAdminUpdateUserRoleSuccess,
    deleteBulkUsersSuccess,
    deleteUserSuccess,
  ]);

  useEffect(() => {
    if (
      getUsersError === "no token was passed" ||
      getMonthlyPayheadError === "no token was passed" ||
      getUsersError === "Authorization is Invalid!"
    ) {
      dispatch(logoutAdmin("no token was passed"));
      dispatch({ type: ADMIN_GET_ALL_EMPLOYEE_RESET });
      dispatch({ type: ADMIN_GET_MONTHLYPAYHEADS_RESET });
    }
  }, [getUsersError, dispatch, getMonthlyPayheadError]);

  useEffect(() => {
    if (!deleteUserError && deleteUserSuccess) {
      setCurrentUser(null);
      setIsOpen4(false);
    }

    if (!deleteBulkUsersError && deleteBulkUsersSuccess) {
      setIsOpen4(false);
      setDelUsersBulk(false);
    }

    if (
      (generateBulkPayslipSuccess && !generateBulkPayslipError) ||
      (generatePayslipSuccess && !generatePayslipError) ||
      generateAllBulkPayslipSuccess
    ) {
      setIsGen(false);
      setAllIsGen(false);
      setIsOpen4(false);
    }
  }, [
    deleteUserError,
    deleteUserSuccess,
    deleteBulkUsersError,
    deleteBulkUsersSuccess,
    generateBulkPayslipError,
    generateBulkPayslipSuccess,
    generateAllBulkPayslipSuccess,
    generatePayslipError,
    generatePayslipSuccess,
  ]);

  // useEffect
  useEffect(() => {
    if (usersData) {
      setUsers(usersData?.users);
    }
    if (searchTerm.length < 1) {
      setSearchResult(users);
    }
  }, [usersData, searchTerm, users]);

  useEffect(() => {
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      history.push("/signin");
    }
  }, [history, adminInfo]);

  useEffect(() => {
    if (userRole === "CEO") {
      // dispatch(adminGetAllEmployee(selectedOption10, startCheck, endCheck));
      // dispatch(adminGetAllEmployee(selectedOption10));

      if (pageNumber >= 0) {
        dispatch(
          superAdminGetAllUsers(
            // selectedOption10,
            pageNumber ? pageNumber + 1 : 1,
            100
          )
        );
      }
    }

    if (
      userRole === "Internal Auditor" ||
      userRole === "HR" ||
      userRole === "Accountant"
    ) {
      history.push("/dashboard");
    }
    if (userRole === "Employee") {
      history.push("/dashboard");
    }
  }, [history, userRole, selectedOption10, dispatch, pageNumber]);

  useEffect(() => {
    if (getUsersError) {
      setTimeout(() => {
        dispatch({ type: ADMIN_GET_ALL_EMPLOYEE_RESET });
      }, 4000);
    }
  }, [getUsersError, dispatch]);

  useEffect(() => {
    if (topSuccess && !loadingTopUp) {
      setCurrentUser(null);
    }

    if (deleteDeductionSuccess || deleteAllowanceSuccess) {
      dispatch({ type: ADMIN_DELETE_EMPLOYEE_DEDUCTION_BY_ID_RESET });
      dispatch({ type: ADMIN_DELETE_EMPLOYEE_ALLOWANCE_BY_ID_RESET });
      if (userRole === "HR") {
        // dispatch(
        //   adminGetAllEmployee(
        //     selectedOption10,
        //     pageNumber ? pageNumber + 1 : 1,
        //     100
        //   )
        // );
      }
    }

    if (!resetError && resetSucces) {
      dispatch({
        type: ADMIN_RESET_PASSWORD_RESET,
      });
    }
  }, [
    dispatch,
    pageNumber,
    topSuccess,
    userRole,
    loadingTopUp,
    deleteDeductionSuccess,
    deleteAllowanceSuccess,
    resetError,
    resetSucces,
    // ,
    selectedOption10,
  ]);

  //   close all modals
  const closeOption = () => {
    if (isOpen10 === true) {
      setIsOpen10(false);
    }
  };

  const returnEmployeeGrossPay = (user) => {
    let grossSalary;
    if (!user?.notch) {
      grossSalary = user?.salaryStep?.amount
        ? Number(Math.round(user?.salaryStep?.amount + "e" + 2) + "e-" + 2)
        : 0;
    } else if (user?.salaryStep?.notches?.length && user?.notch) {
      const notchId = user?.notch?.notchId;
      const stepId = user?.notch?.stepId;
      const findNotchId = user?.salaryStep?.notches?.find(
        (el) => String(el?.id) === String(notchId)
      );
      let findStepId;
      if (String(user?.salaryStep?.id) === String(stepId)) {
        findStepId = true;
      } else {
        findStepId = false;
      }
      if (findNotchId && findStepId) {
        grossSalary = findNotchId?.amount
          ? Number(Math.round(findNotchId?.amount + "e" + 2) + "e-" + 2)
          : 0;
      }
    }

    return grossSalary;
  };

  const downloadExcel = () => {
    const employeeData = arrayIds?.map((el) => {
      return {
        staffId: el?.staffId,
        staffName: el?.user?.name,
        doe:
          el?.joinDate?.toLocaleString()?.split("T")[0]?.replaceAll("-", "/") ||
          "",
        dob:
          el?.dob.toLocaleString()?.split("T")[0]?.replaceAll("-", "/") || "",
        address: el?.address || "",
        mobile: el?.mobile || "",
        employeeBank: el?.employeeBank || "",
        employeeBankAcctNumber: el?.employeeBankAcctNumber || "",
        staffLevel:
          el?.employeeType !== "Contract-With-No-Grade"
            ? el?.salaryLevel?.name
            : "",
        staffGrade:
          el?.employeeType !== "Contract-With-No-Grade"
            ? el?.salaryLevel?.salaryGrade?.name
            : "",
        grossSalary:
          el?.employeeType !== "Contract-With-No-Grade"
            ? returnEmployeeGrossPay(el)
            : el?.contractSalary,
      };
    });

    dispatch(downloadEmployeeSummaryExcelFileFunc(employeeData));
    // dispatch(downloadAuditLogPdfFileFunc(employeeData));
  };

  // useEffect(() => {
  //   if (pageNumber > 0) {
  //     const startNum = pageNumber * 100;
  //     setStartCheck(startNum);

  //     const endNum = usersPerpageCount;
  //     setEndCheck(endNum);
  //   } else {
  //     setStartCheck(1);
  //     setEndCheck(usersPerpageCount);
  //   }
  // }, [usersPerpageCount, pageNumber]);

  // set page data on each page
  // useEffect(() => {
  //   let tempData2 = searchResult?.slice(startCheck, endCheck)?.map((user) => {
  //     return user;
  //   });

  //   setPageData(tempData2);
  // }, [startCheck, endCheck, searchResult]);

  // for checkbox
  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "checkAll") {
      // let tempData = searchResult?.slice(startCheck, endCheck)?.map((user) => {
      let tempData = searchResult?.map((user) => {
        return { ...user, isChecked: checked };
      });
      let notChecked = searchResult?.filter((el) => {
        return !tempData?.find((tmp) => tmp?.id === el?.id);
      });

      if (tempData?.length) {
        let dataJoined = [...tempData, ...notChecked].sort((a, b) => {
          var dateA = new Date(a.createdAt),
            dateB = new Date(b.createdAt);
          return dateB - dateA;
          // return dateA - dateB;
        });
        setSearchResult(dataJoined);
      }
    } else {
      let tempData = searchResult?.map((user) =>
        user?.id?.toString() === name?.toString()
          ? { ...user, isChecked: checked }
          : user
      );
      setSearchResult(tempData);
    }
  };

  const disableButton = () => {
    let isTrue = false;
    // pageData?.forEach((data) => {
    searchResult?.forEach((data) => {
      if (data?.isChecked === true) {
        isTrue = data?.isChecked;
      }
    });
    return isTrue;
  };

  useEffect(() => {
    setArrayIds([]);
    searchResult?.forEach((data) => {
      if (data?.isChecked) {
        setArrayIds((arrayIds) => [...arrayIds, data]);
      }
    });
  }, [searchResult]);

  const calculatePayslipByIds = () => {
    if (!dropdown()) {
      setShowError('Please uncheck the "View All Employee" Checkbox');
      // setShowError("Please Select Current Month");
    } else {
      // if (searchResult?.length > 100) {
      // dispatch(adminGenerateBulkPayslipsAll(currentmonthLong));
      // } else {
      calculate();
      // }
    }
  };

  const calculateAllPayslipByIds = () => {
    // if (!dropdown()) {
    //   setShowError('Please uncheck the "View All Employee" Checkbox');
    //   // setShowError("Please Select Current Month");
    // } else {
    // if (searchResult?.length > 100) {
    dispatch(adminGenerateBulkPayslipsAll(currentmonthLong));
    // dispatch(adminGenerateBulkPayslipsAll(currentmonthLong));
    // } else {
    // calculate();
    // }
    // }
  };

  const dropdown = () => {
    if (selectedOption10 !== currentmonthLong) {
      return false;
    } else {
      return true;
    }
  };

  // delete both single and bulk employees
  const deleteUsersByIds = () => {
    deleteIds();
  };

  const deleteIds = () => {
    if (userId) {
      dispatch(superAdminDeleteUser(userId));
    }
    if (arrayIds.length && arrayIds.length === 1) {
      // delete a particular selected employee
      dispatch(superAdminDeleteUser(arrayIds[0].id));
    } else if (arrayIds.length > 1) {
      // if (usersData?.resultLength > 100) {
      //   // delete all employees
      // dispatch(adminDeleteAllEmployees());
      // } else {
      //   // delete all selected employees
      // }

      const newArray = arrayIds.map((user) => user.id);
      dispatch(superAdminBulkDeleteUser(newArray));
    }
  };

  const {
    sumMonthlyPay: sumMonPay,
    sumTaxRelief: sumTaxRef,
    taxReliefLength: taxRefLength,
  } = useMonthlyPayhead(userRole);

  // generate payslip for selected employees
  const calculate = () => {
    const month = monthArr[new Date().getMonth()];

    let paySlips;

    // paySlips = arrayIds.map((data) => {
    //   if (
    //     data?.employeeType !== "Contract-With-No-Grade"
    //   ) {
    //     const [
    //       grossPay,
    //       allowanceTotal,
    //       deductionTotal,
    //       totalEarnings,
    //       pension,
    //       paye,
    //       uWallet,
    //       netPay,
    //     ] = calculatePaySlip(data, sumMonPay, sumTaxRef, taxRefLength);

    //     return {
    //       // ...calculatePaySlip(data, sumMonPay, sumTaxRef, taxRefLength),
    //       grossPay: Number(grossPay),
    //       allowanceTotal: Number(allowanceTotal),
    //       deductionTotal: Number(deductionTotal),
    //       totalEarnings: Number(totalEarnings),
    //       allowances: data.allowances,
    //       deductions: data.deductions,
    //       employee: data.id,
    //       pension: Number(pension),
    //       paye: Number(paye),
    //       uWallet: Number(uWallet),
    //       month: selectedOption10 ? selectedOption10 : month,
    //       netPay: Number(netPay),
    //       netSalary: Number(0),
    //     };
    //   } else {
    //     const [
    //       grossPay,
    //       allowanceTotal,
    //       deductionTotal,
    //       totalEarnings,
    //       netPay,
    //     ] = calculateContractSlip(data);

    //     return {
    //       // ...calculatePaySlip(data, sumMonPay, sumTaxRef, taxRefLength),
    //       grossPay: Number(grossPay),
    //       allowanceTotal: Number(allowanceTotal),
    //       deductionTotal: Number(deductionTotal),
    //       totalEarnings: Number(totalEarnings),
    //       allowances: data.allowances,
    //       deductions: data.deductions,
    //       employee: data.id,
    //       pension: Number(0),
    //       paye: Number(0),
    //       uWallet: Number(0),
    //       month: selectedOption10 ? selectedOption10 : month,
    //       netPay: Number(netPay),
    //       netSalary: Number(0),
    //     };
    //   }
    // });

    paySlips = arrayIds.map((data) => {
      if (data?.employeeType !== "Contract-With-No-Grade") {
        return {
          month: selectedOption10 ? selectedOption10 : month,
          employee: data?.id,
        };
      } else {
        return {
          month: selectedOption10 ? selectedOption10 : month,
          employee: data?.id,
        };
      }
    });

    if (paySlips?.length && paySlips?.length === 1) {
      // generate payslip for a particular selected employee
      const payslip = paySlips[0];
      dispatch(
        adminGeneratePayslip(
          { month: payslip?.month ? payslip?.month : month },
          payslip?.employee
        )
      );
      // dispatch(adminGeneratePayslip(payslip, payslip.employee));
    } else if (paySlips.length > 1) {
      // generate payslips for many selected employees
      // dispatch(adminGenerateBulkPayslips(paySlips));
      dispatch(adminGenerateBulkPayslips(paySlips));
    }
  };
  const onSelect = (id) => {
    const employee = usersData?.users?.find(
      (el) => String(el?.id) === String(id)
    );
    // const employee = searchResult?.find((el) => String(el?.id) === String(id));
    setCurrentUser(employee);
  };

  const popup = (id) => {
    setIsOpen(!isOpen);
    onSelect(id);
  };
  const popup2 = (id) => {
    setIsOpen2(!isOpen2);
    onSelect(id);
    // setIsOpen2(true);
  };
  const popup3 = (id) => {
    setIsOpen3(!isOpen3);
    onSelect(id);
    if (isOpen3 === true) {
      setCurrentUser(null);
    }
  };

  // generate payslip popup / delete user
  const popup4 = (id) => {
    onSelect(id);
    setIsOpen4(!isOpen4);

    if (isGen) {
      setIsOpen4(!isOpen4);
      setIsGen(!isGen);
    }
    if (allIsGen) {
      setIsOpen4(!isOpen4);
      setAllIsGen(!allIsGen);
    }

    setUserId(id);
  };

  const popup7 = () => {
    if (updateSuccess && !updateError) {
      dispatch({ type: ADMIN_UPDATE_EMPLOYEE_BY_ID_RESET });
    }

    if (
      (deleteUserSuccess && !deleteUserError) ||
      (deleteBulkUsersSuccess && !deleteBulkUsersError)
    ) {
      dispatch({ type: SUPER_ADMIN_DELETE_USER_RESET });
      dispatch({ type: SUPER_ADMIN_BULK_DELETE_USERS_RESET });
    }

    if (deleteAllEmployeeSuccess && !deleteAllEmployeeError) {
      dispatch({ type: ADMIN_DELETE_ALL_EMPLOYEES_RESET });
    }

    if (isOpen7 === true) {
      setIsOpen7(false);
    }
  };

  // Invoke when user click to request another page.
  const usersPerpage = 100;
  const pagesVisited = pageNumber * usersPerpage;
  const pageCount = Math.ceil(Number(usersData?.resultLength) / usersPerpage);

  // const pageCount = Math.ceil(searchResult.length / usersPerpage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    if (pageNumber > 0) {
      let usersPerpageNum;
      if (usersData?.resultLength / (pageNumber + 1) > 100) {
        usersPerpageNum = (pageNumber + 1) * 100;
      } else {
        usersPerpageNum = usersData?.resultLength;
      }
      setUsersPerpageCount(usersPerpageNum);
    } else {
      if (usersData?.resultLength < 100) {
        setUsersPerpageCount(usersData?.resultLength);
      } else {
        setUsersPerpageCount(100);
      }
    }
  }, [usersData, pageNumber]);

  const filteredData = useCallback(
    (value) => {
      // const filteredList = users?.filter((data) => {
      //   return Object.values(
      //     data?.user?.name +
      //       " " +
      //       data?.user?.email +
      //       " " +
      //       data?.department?.name +
      //       " " +
      //       data?.position?.name +
      //       " " +
      //       data?.staffId +
      //       " "
      //   )
      //     .join("")
      //     .toLowerCase()
      //     .includes(value?.toLowerCase());
      // });
      if (value !== "") {
        const filteredList = users?.filter((data) => {
          return Object.values(
            data?.name +
              " " +
              data?.email +
              " " +
              data?.role +
              " " +
              data?.id +
              " "
          )
            .join("")
            .toLowerCase()
            .includes(value?.toLowerCase());
        });
        setSearchResult(filteredList);
      } else {
        setSearchResult(users);
      }
    },
    [users]
  );

  const searchHandler = useCallback(
    (searchTerm) => {
      setSearchTerm(searchTerm);
      filteredData(searchTerm);
    },
    [filteredData]
  );

  // useEffect
  useEffect(() => {
    if (selectedOption10) {
      searchHandler(searchTerm);
    }
  }, [selectedOption10, searchHandler, searchTerm]);

  // useEffect(() => {
  //   if (!downloadStatusError && !downloadStatusLoading) {
  //     setArrayIds([]);
  //   }
  // }, [downloadStatusError, downloadStatusLoading]);

  // const successPopup = () => {
  //   if (userRole === "HR") {
  //     if (topSuccess && !loadingTopUp) {
  //       // dispatch(
  //       //   adminGetAllEmployee(
  //       //     selectedOption10,
  //       //     pageNumber ? pageNumber + 1 : 1,
  //       //     100
  //       //   )
  //       // );
  //       dispatch({
  //         type: ADMIN_EMPLOYEE_TOPUP_RESET,
  //       });
  //     }
  //   }
  // };

  const noEmployees =
    users?.length === 0 || searchResult?.length === 0 ? (
      <p className="no__data">No employee found</p>
    ) : (
      " "
    );
  const usersActive = "active";

  return (
    <>
      {(getUsersLoading || deleteUserLoading) && (
        <LoadingSpinner toggle={toggle} />
      )}
      {downloadStatusLoading && !downloadStatusError && (
        <LoadingSpinner toggle={toggle} />
      )}

      {currentUser && (
        <SelectMonth isOpen={isOpen} popup={popup} employee={currentUser} />
      )}

      {(deleteBulkUsersLoading || deleteAllEmployeeLoading) && (
        <LoadingSpinner toggle={toggle} />
      )}

      {/* {topSuccess && (
        <Successful
          isOpen7={topSuccess}
          popup7={successPopup}
          message="Saved Successfully"
          toggle={toggle}
        />
      )} */}

      {currentUser && isOpen3 && (
        <EditUser
          toggle={toggle}
          isOpen3={isOpen3}
          popup3={popup3}
          user={currentUser}
          setCurrentUser={setCurrentUser}
          month={selectedOption10}
        />
      )}
      {currentUser && !isGen && !delUsersBulk && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          popup4={popup4}
          setIsOpen4={setIsOpen4}
          userId={currentUser?.id}
          month={selectedOption10}
        />
      )}
      {delUsersBulk && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          popup4={popup4}
          setIsOpen4={setIsOpen4}
          delUsersBulk={delUsersBulk}
          setDelUsersBulk={setDelUsersBulk}
          delUsersFunc={deleteUsersByIds}
          setCurrentUser={setCurrentUser}
          month={selectedOption10}
        />
      )}
      {/* {isGen && !allIsGen && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          popup4={popup4}
          setIsOpen4={setIsOpen4}
          isGen={isGen}
          setIsGen={setIsGen}
          genPayslipAct={calculatePayslipByIds}
        />
      )} */}
      {/* {allIsGen && !isGen && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          popup4={popup4}
          setIsOpen4={setIsOpen4}
          allIsGen={allIsGen}
          setAllIsGen={setAllIsGen}
          genAllPayslipAct={calculateAllPayslipByIds}
        />
      )} */}

      <Successful
        isOpen7={isOpen7 || (updateSuccess && !updateError && !getUsersLoading)}
        setIsOpen7={setIsOpen7}
        popup7={popup7}
        message="Employee updated successfully!"
      />

      <Successful
        isOpen7={
          isOpen7 || (deleteUserSuccess && !deleteUserError && !getUsersLoading)
        }
        setIsOpen7={setIsOpen7}
        popup7={popup7}
        message="User deleted successfully!"
      />
      <Successful
        isOpen7={
          isOpen7 ||
          (deleteBulkUsersSuccess && !deleteBulkUsersError && !getUsersLoading)
        }
        setIsOpen7={setIsOpen7}
        popup7={popup7}
        message={deleteBulkUsersMessage || "Users deleted successfully!"}
      />
      {/* <Successful
        isOpen7={
          isOpen7 ||
          (deleteAllEmployeeSuccess &&
            !deleteAllEmployeeError &&
            !getUsersLoading)
        }
        setIsOpen7={setIsOpen7}
        popup7={popup7}
        message="All Employee's deleted successfully!"
      />
      <Successful
        isOpen7={
          isOpen7 ||
          (generateBulkPayslipSuccess &&
            !generateBulkPayslipError &&
            !getUsersLoading) ||
          (!generateAllBulkPayslipLoading && generateAllBulkPayslipSuccess)
        }
        setIsOpen7={setIsOpen7}
        popup7={popup7}
        message={
          generateAllBulkPayslipSuccess
            ? generateAllBulkPayslipMessage
            : "Bulk payroll generated successfully!"
        }
      />
      <Successful
        isOpen7={
          isOpen7 ||
          (generatePayslipSuccess &&
            !generatePayslipLoading &&
            !generatePayslipError &&
            !getUsersLoading)
        }
        setIsOpen7={setIsOpen7}
        popup7={popup7}
        message="Payroll generated successfully!"
      /> */}
      <DashboardContainer onClick={closeOption}>
        <DashboardContent>
          <SideNav
            toggle={toggle}
            toggleMenu={toggleMenu}
            mobileToggle={mobileToggle}
            toggleMobileMenu={toggleMobileMenu}
            usersActive={usersActive}
            userRole={userRole}
          />
          <Mainbody toggle={toggle}>
            <Header
              text="Users"
              userRole={userRole}
              userRoleName={userRoleName}
              profileimg={profileImg}
              toggle={toggle}
              toggleMenu={toggleMenu}
              mobileToggle={mobileToggle}
              toggleMobileMenu={toggleMobileMenu}
            />
            <Container>
              {((!generatePayslipLoading && generatePayslipError) ||
                generateBulkPayslipError ||
                generateAllBulkPayslipError) && (
                <ErrorBox errorMessage={generatePayslipError} />
              )}
              {showError ||
                (getUsersError && (
                  <ErrorBox errorMessage={showError || getUsersError} />
                ))}
              <EmpContainer>
                <div className="row top__btn">
                  {userRole === "CEO" && (
                    <>
                      {/* <LinkButton to="/new-employee">
                        <input
                          type="button"
                          className="green__btn"
                          // className="green__btn margin__left2"
                          value="Add Employee"
                        />
                      </LinkButton> */}
                      {/* <input
                        type="button"
                        // className="general_btn save__btn"
                        className={
                          disableButton() &&
                          selectedOption10 === currentmonthLong
                            ? "general__btn margin__left2 mobile__margin__top save__btn"
                            : "general__btn margin__left2 mobile__margin__top disabled__btn"
                        }
                        value="Run Payroll"
                        onClick={() => {
                          setIsGen(true);
                          setIsOpen4(true);
                        }}
                        disabled={
                          !disableButton() ||
                          selectedOption10 !== currentmonthLong
                        }
                      />
                      <input
                        type="button"
                        // className="general_btn save__btn"
                        className={
                          disableButton()
                            ? // &&
                              // selectedOption10 === currentmonthLong
                              "general__btn margin__left2 mobile__margin__top save__btn"
                            : "general__btn margin__left2 mobile__margin__top disabled__btn"
                        }
                        value="Run All Payroll"
                        onClick={() => {
                          setAllIsGen(true);
                          // setIsGen(true);
                          setIsOpen4(true);
                        }}
                        disabled={
                          !disableButton()
                          //  ||
                          // selectedOption10 !== currentmonthLong
                        }
                      /> */}
                      <input
                        type="button"
                        className={
                          disableButton()
                            ? "general__btn mobile__margin__top delete__btn"
                            : "general__btn mobile__margin__top disabled__btn"
                        }
                        // className={
                        //   disableButton()
                        //     ? "general__btn margin__left2 mobile__margin__top delete__btn"
                        //     : "general__btn margin__left2 mobile__margin__top disabled__btn"
                        // }
                        value="Delete"
                        onClick={() => {
                          setDelUsersBulk(true);
                          setIsOpen4(true);
                        }}
                        disabled={!disableButton()}
                      />
                      {/* <DropdownList
                        // list={true}
                        isOpen={isOpen10}
                        // toggling={toggling10}
                        // selectedOption={selectedOption10}
                        cssClass={check}
                        cssClass2={"month__header"}
                        cssClass3={"margin__left2 mobile__margin__top"}
                        text={currentmonthLong}
                        // dataSet={monthArr}
                        onOptionClicked={onOptionClicked10}
                        // onOptionClicked={onOptionClicked10}
                      /> */}
                      {/* {searchResult?.length > 0 && (
                        <input
                          type="button"
                          // className="general__btn margin__left save__btn"
                          className={
                            disableButton()
                              ? "general__btn margin__left2 mobile__margin__top save__btn"
                              : "general__btn margin__left2 mobile__margin__top disabled__btn"
                          }
                          value="Download Pdf"
                          onClick={downloadExcel}
                          disabled={!disableButton()}
                        />
                      )} */}
                    </>
                  )}
                </div>
                {/* <div className="row"> */}
                <div className="row top__btn">
                  <div style={{ margin: "auto 1rem" }}>
                    <div style={{ display: "flex", margin: ".5rem 0" }}>
                      {/* <input
                        type="checkbox"
                        id="AllEmployee"
                        onChange={showAllEmployee}
                        style={{ margin: "auto 0" }}
                      />
                      <p
                        // className="margin__left"
                        style={{
                          color: `${COLORS.grey2}`,
                          margin: "auto auto auto .8rem",
                        }}
                      >
                        View All Users
                      </p> */}
                    </div>
                  </div>
                  <div className="search__container">
                    <SearchBar
                      term={searchTerm}
                      searchKeyWord={searchHandler}
                    />
                    <span className="icons search__icon">
                      <FontAwesomeIcon icon={["fas", "search"]} />
                    </span>
                    {/* </div> */}
                  </div>
                </div>
              </EmpContainer>
              <div className="table__body">
                <div className="table__overflow full__height">
                  <table>
                    <thead>
                      <tr>
                        {userRole === "CEO" && (
                          <th>
                            <input
                              type="checkbox"
                              name="checkAll"
                              checked={
                                searchResult.length === 0
                                  ? false
                                  : // : !pageData?.some(
                                    !searchResult?.some(
                                      (user) => user?.isChecked !== true
                                    )
                              }
                              onChange={handleChange}
                            />
                          </th>
                        )}
                        <th style={{ paddingLeft: "3.5rem" }}>ID</th>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>User Role</th>
                        {userRole === "CEO" ? <th>Action</th> : ""}
                      </tr>
                    </thead>
                    <tbody>
                      {searchResult
                        // .slice(pagesVisited, pagesVisited + usersPerpage)
                        ?.sort((a, b) => b.createdAt - a.createdAt)
                        ?.map((user) => {
                          return (
                            <tr key={user?.id}>
                              {userRole === "CEO" && (
                                <td>
                                  <input
                                    type="checkbox"
                                    // value={item.name}
                                    name={user?.id}
                                    // name={employee?.id}
                                    checked={user?.isChecked || false}
                                    onChange={handleChange}
                                  />
                                </td>
                              )}
                              <td>
                                <div className="row">
                                  <img
                                    alt="profile"
                                    // className="profile__img2"
                                    className="margin__right"
                                    src={user?.photo}
                                    width="20"
                                    style={{ borderRadius: "50%" }}
                                    // src={profileimg}
                                  />
                                  <p style={{ fontSize: "1.2rem" }}>
                                    {user?.id}
                                  </p>
                                </div>
                              </td>
                              <td>{`${trancateWord(
                                user?.name?.toString()
                              )} `}</td>
                              <td>{trancateWord(user?.email?.toString())}</td>
                              <td>{user?.role}</td>
                              {/* <td>{employee?.dob?.substring(0, 10)}</td> */}
                              {userRole === "CEO" && (
                                <td>
                                  <div className="action__icons">
                                    {/* <div
                                      className="icons"
                                      onClick={(e) => popup(employee?.id)}
                                    >
                                      
                                      <FontAwesomeIcon
                                        icon={["fas", "calendar-alt"]}
                                      />
                                    </div> */}

                                    {/* <div
                                      title="View/Add/Delete Payhead"
                                      className="icons"
                                      onClick={(e) => popup2(user?.id)}
                                    >
                                      
                                      <FontAwesomeIcon
                                        icon={["fas", "eye"]}
                                      />
                                    </div> */}
                                    <div
                                      title="Edit Employee"
                                      className="icons"
                                      onClick={(e) => popup3(user?.id)}
                                    >
                                      <FontAwesomeIcon icon={["fas", "edit"]} />
                                    </div>
                                    <div
                                      title="Delete Employee"
                                      className="icons"
                                      onClick={(e) => popup4(user?.id)}
                                    >
                                      <FontAwesomeIcon
                                        icon={["fas", "trash-alt"]}
                                      />
                                    </div>
                                  </div>
                                </td>
                              )}
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  {noEmployees}
                </div>
              </div>
            </Container>
            <PaginationContainer>
              <div className="row">
                <ReactPaginate
                  previousLabel={
                    <FontAwesomeIcon icon={["fas", "angle-left"]} />
                  }
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  pageClassName={"page__item"}
                  pageLinkClassName={"page__link"}
                  previousClassName={"page__item"}
                  previousLinkClassName={"page__link"}
                  nextClassName={"page__item"}
                  nextLinkClassName={"page__link"}
                  breakClassName={"page__item"}
                  breakLinkClassName={"page__link"}
                  // activeClassName={"active"}
                  activeLinkClassName={"active"}
                  marginPagesDisplayed={3}
                  // marginPagesDisplayed={3}
                  breakLabel={"..."}
                  nextLabel={<FontAwesomeIcon icon={["fas", "angle-right"]} />}
                />
                <div
                  style={{
                    backgroundColor: `${COLORS.white4}`,
                    margin: "auto 1rem auto 2rem",
                    padding: ".5rem",
                  }}
                  className="pageCount"
                >
                  <p style={{ fontSize: "1.3rem", fontWeight: "500" }}>
                    Rows per page : 100
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: `${COLORS.white4}`,
                    margin: "auto 0 auto 0",
                    padding: ".5rem",
                  }}
                  className="pageCount"
                >
                  <p style={{ fontSize: "1.3rem", fontWeight: "500" }}>
                    {`Showing : ${
                      usersData?.resultLength < 1
                        ? 0
                        : `${
                            pageNumber > 0 ? pageNumber * 100 + 1 : 1
                          } - ${usersPerpageCount}`
                    }
                    of ${
                      usersData?.resultLength ? usersData?.resultLength : 0
                    }`}
                  </p>
                </div>
              </div>
            </PaginationContainer>
          </Mainbody>
        </DashboardContent>
      </DashboardContainer>
    </>
  );
};

export default Users;
