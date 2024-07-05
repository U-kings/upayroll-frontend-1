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
  EditEmployee,
  ViewEmployee,
  SelectMonth,
  LoadingSpinner,
  Comfirm,
  Successful,
} from "../../modals";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import {
  adminGetAllEmployee,
  adminDeleteEmployeesByIds,
  adminDeleteEmployeeById,
  adminDeleteAllEmployees,
  adminCreateBulkEmployeeWithNoGradeFileFunc,
} from "../../actions/employee";
import {
  adminGenerateBulkPayslips,
  adminGenerateBulkPayslipsAll,
  adminGeneratePayslip,
} from "../../actions/payslip";
import {
  ADMIN_DELETE_ALL_EMPLOYEES_RESET,
  ADMIN_DELETE_BULK_EMPLOYEES_BY_IDS_RESET,
  ADMIN_DELETE_EMPLOYEE_ALLOWANCE_BY_ID_RESET,
  ADMIN_DELETE_EMPLOYEE_BY_ID_RESET,
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
import { ADMIN_GENERATE_BULK_PAYSLIPS_ALL_RESET } from "../../types/payslip";

const Employee = ({ toggle, toggleMenu, mobileToggle, toggleMobileMenu }) => {
  // history init
  const history = useHistory();

  // dispatch init
  const dispatch = useDispatch();

  // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  const {
    isLoading: getEmployeeLoading,
    employees,
    error: getEmployeeError,
  } = useSelector((state) => state.adminGetAllEmployeeReducer);
  const { success: updateSuccess, error: updateError } = useSelector(
    (state) => state.adminUpdateEmployee
  );

  const { success: topSuccess, isLoading: loadingTopUp } = useSelector(
    (state) => state.adminEmployeeTopUp
  );

  const {
    success: deleteDeductionSuccess,
    isLoading: deleteAllowanceLoading,
    error: deleteAllowanceError,
  } = useSelector((state) => state.adminDeleteEmployeeDeduction);

  const {
    success: deleteAllowanceSuccess,
    isLoading: deleteDeductionLoading,
    error: deleteDeductionError,
  } = useSelector((state) => state.adminDeleteEmployeeAllowance);

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
    success: deleteEmployeeSuccess,
    error: deleteEmployeeError,
    isLoading: deleteEmployeeLoading,
  } = useSelector((state) => state.adminDeleteEmployee);

  const {
    success: deleteBulkEmployeeSuccess,
    error: deleteBulkEmployeeError,
    isLoading: deleteBulkEmployeeLoading,
  } = useSelector((state) => state.adminDeleteBulkEmployeesByIds);

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

  // func state
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const [isOpen10, setIsOpen10] = useState(false);
  const [isGen, setIsGen] = useState(false);
  const [allIsGen, setAllIsGen] = useState(false);
  const [delBulk, setDelBulk] = useState(false);
  const [selectedOption10, setSelectedOption10] = useState(
    currentmonthMethod("long") || ""
  );
  const [currentEmployee, setCurrentEmployee] = useState(null);
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
  const onOptionClicked10 = (month) => {
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
      getEmployeeError === "no token was passed" ||
      getMonthlyPayheadError === "no token was passed" ||
      getEmployeeError === "Authorization is Invalid!"
    ) {
      dispatch(logoutAdmin("no token was passed"));
      dispatch({ type: ADMIN_GET_ALL_EMPLOYEE_RESET });
      dispatch({ type: ADMIN_GET_MONTHLYPAYHEADS_RESET });
    }
  }, [getEmployeeError, dispatch, getMonthlyPayheadError]);

  useEffect(() => {
    if (!deleteEmployeeError && deleteEmployeeSuccess) {
      setCurrentEmployee(null);
      setIsOpen4(false);
    }

    if (!deleteBulkEmployeeError && deleteBulkEmployeeSuccess) {
      setIsOpen4(false);
      setDelBulk(false);
    }

    if (
      (generateBulkPayslipSuccess && !generateBulkPayslipError) ||
      (generatePayslipSuccess && !generatePayslipError) ||
      generateAllBulkPayslipSuccess
    ) {
      // setIsGen(false);
      // setAllIsGen(false);
      // setIsOpen4(false);
    }
  }, [
    deleteEmployeeError,
    deleteEmployeeSuccess,
    deleteBulkEmployeeError,
    deleteBulkEmployeeSuccess,
    generateBulkPayslipError,
    generateBulkPayslipSuccess,
    generateAllBulkPayslipSuccess,
    generatePayslipError,
    generatePayslipSuccess,
  ]);

  // console.log(
  //   generateBulkPayslipSuccess,
  //   generatePayslipSuccess,
  //   generateAllBulkPayslipSuccess
  // );

  // useEffect
  useEffect(() => {
    if (employees) {
      setUsers(employees?.employees);
    }
    if (searchTerm.length < 1) {
      setSearchResult(users);
    }
  }, [employees, users, searchTerm]);

  useEffect(() => {
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      history.push("/signin");
    } else {
      // dispatch(adminGetAllEmployee(selectedOption10, startCheck, endCheck));
      // dispatch(adminGetAllEmployee(selectedOption10));
      if (
        pageNumber >= 0 ||
        deleteDeductionSuccess ||
        deleteAllowanceSuccess ||
        topSuccess
      ) {
        if (userRole === "HR") {
          dispatch(
            adminGetAllEmployee(
              selectedOption10,
              pageNumber ? pageNumber + 1 : 1,
              100
            )
          );
        }
      }
    }

    if (
      userRole === "Internal Auditor" ||
      userRole === "CEO" ||
      userRole === "Accountant"
    ) {
      history.push("/dashboard");
    }
    if (userRole === "Employee") {
      history.push("/dashboard");
    }
  }, [
    history,
    adminInfo,
    dispatch,
    userRole,
    pageNumber,
    selectedOption10,
    deleteDeductionSuccess,
    deleteAllowanceSuccess,
    topSuccess,
  ]);

  useEffect(() => {
    let timeoutId;
    if (getEmployeeError) {
      timeoutId = setTimeout(() => {
        dispatch({ type: ADMIN_GET_ALL_EMPLOYEE_RESET });
      }, 4000);

      return () => {
        // Clear the timeout when the component unmounts or when showError changes
        clearTimeout(timeoutId);
      };
    }
  }, [getEmployeeError, dispatch]);

  useEffect(() => {
    if (topSuccess && !loadingTopUp) {
      setCurrentEmployee(null);
    }

    if (!resetError && resetSucces) {
      dispatch({
        type: ADMIN_RESET_PASSWORD_RESET,
      });
    }
  }, [dispatch, topSuccess, loadingTopUp, resetError, resetSucces]);

  //   close all modals
  const closeOption = () => {
    if (isOpen10 === true) {
      setIsOpen10(false);
    }
  };

  const reloadEmployees = () => {
    dispatch(
      adminGetAllEmployee(
        selectedOption10,
        pageNumber ? pageNumber + 1 : 1,
        100
      )
    );
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
        staffEmail: el?.user?.email,
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

    dispatch(adminCreateBulkEmployeeWithNoGradeFileFunc(employeeData));
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
          return dateA - dateB;
        });
        setSearchResult(dataJoined);
      }
    } else {
      let tempData = searchResult?.map((user) =>
        // console.log(user)
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

  useEffect(() => {
    let timeoutId;

    if (showError !== "") {
      timeoutId = setTimeout(() => {
        setShowError("");
      }, 6000);
    }

    return () => {
      // Clear the timeout when the component unmounts or when showError changes
      clearTimeout(timeoutId);
    };
  }, [showError]);

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

  // delete bulk employees
  const deleteEmployeeByIds = () => {
    deleteIds();
  };

  const deleteIds = () => {
    if (arrayIds.length && arrayIds.length === 1) {
      // delete a particular selected employee
      dispatch(adminDeleteEmployeeById(arrayIds[0].id, selectedOption10));
    } else if (arrayIds.length > 1) {
      if (employees?.resultLength > 100) {
        // delete all employees
        dispatch(adminDeleteAllEmployees(selectedOption10));
      } else {
        // delete all selected employees
        const newArray = arrayIds.map((user) => user.id);
        dispatch(adminDeleteEmployeesByIds(newArray, selectedOption10));
      }
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
    const employee = employees?.employees?.find(
      (el) => String(el?.id) === String(id)
    );
    // const employee = searchResult?.find((el) => String(el?.id) === String(id));
    setCurrentEmployee(employee);
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
  };

  // generate payslip popup
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
  };

  const popup7 = () => {
    if (updateSuccess && !updateError) {
      dispatch({ type: ADMIN_UPDATE_EMPLOYEE_BY_ID_RESET });
    }

    if (generateAllBulkPayslipSuccess) {
      dispatch({ type: ADMIN_GENERATE_BULK_PAYSLIPS_ALL_RESET });
    }

    if (
      (deleteEmployeeSuccess && !deleteEmployeeError) ||
      (deleteBulkEmployeeSuccess && !deleteBulkEmployeeError)
    ) {
      dispatch({ type: ADMIN_DELETE_EMPLOYEE_BY_ID_RESET });
      dispatch({ type: ADMIN_DELETE_BULK_EMPLOYEES_BY_IDS_RESET });
    }

    if (deleteAllEmployeeSuccess && !deleteAllEmployeeError) {
      dispatch({ type: ADMIN_DELETE_ALL_EMPLOYEES_RESET });
      dispatch(
        adminGetAllEmployee(
          selectedOption10,
          pageNumber ? pageNumber + 1 : 1,
          100
        )
      );
    }

    if (isOpen7 === true) {
      setIsOpen7(false);
    }
  };

  // Invoke when user click to request another page.
  const usersPerpage = 100;
  const pagesVisited = pageNumber * usersPerpage;
  const pageCount = Math.ceil(Number(employees?.resultLength) / usersPerpage);

  // const pageCount = Math.ceil(searchResult.length / usersPerpage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    if (pageNumber > 0) {
      let usersPerpageNum;
      if (employees?.resultLength / (pageNumber + 1) > 100) {
        usersPerpageNum = (pageNumber + 1) * 100;
      } else {
        usersPerpageNum = employees?.resultLength;
      }
      setUsersPerpageCount(usersPerpageNum);
    } else {
      if (employees?.resultLength < 100) {
        setUsersPerpageCount(employees?.resultLength);
      } else {
        setUsersPerpageCount(100);
      }
    }
  }, [employees, pageNumber]);

  const filteredData = useCallback(
    (value) => {
      if (value !== "") {
        const filteredList = users?.filter((data) => {
          return Object.values(
            data?.user?.name +
              " " +
              data?.user?.email +
              " " +
              data?.department?.name +
              " " +
              data?.position?.name +
              " " +
              data?.staffId +
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

  const successPopup = () => {
    if (userRole === "HR") {
      if (topSuccess && !loadingTopUp) {
        dispatch({
          type: ADMIN_EMPLOYEE_TOPUP_RESET,
        });
      }
    }
  };

  const noEmployees =
    users?.length === 0 || searchResult?.length === 0 ? (
      <p className="no__data">No employee found</p>
    ) : (
      " "
    );
  const emp = "active";

  return (
    <>
      {(getEmployeeLoading || deleteEmployeeLoading) && (
        <LoadingSpinner toggle={toggle} />
      )}
      {downloadStatusLoading && !downloadStatusError && (
        <LoadingSpinner toggle={toggle} />
      )}

      {currentEmployee && (
        <SelectMonth isOpen={isOpen} popup={popup} employee={currentEmployee} />
      )}

      {(deleteBulkEmployeeLoading || deleteAllEmployeeLoading) && (
        <LoadingSpinner toggle={toggle} />
      )}

      {topSuccess && (
        <Successful
          isOpen7={topSuccess}
          popup7={successPopup}
          message="Saved Successfully"
          toggle={toggle}
        />
      )}

      {currentEmployee && (
        <ViewEmployee
          toggle={toggle}
          isOpen2={isOpen2}
          popup2={popup2}
          setIsOpen2={setIsOpen2}
          employee={currentEmployee}
        />
      )}
      {currentEmployee && (
        <EditEmployee
          toggle={toggle}
          isOpen3={isOpen3}
          popup3={popup3}
          employee={currentEmployee}
          setCurrentEmployee={setCurrentEmployee}
          month={selectedOption10}
        />
      )}
      {currentEmployee && !isGen && !delBulk && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          popup4={popup4}
          setIsOpen4={setIsOpen4}
          empId={currentEmployee?.id}
          month={selectedOption10}
        />
      )}
      {delBulk && !isGen && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          popup4={popup4}
          setIsOpen4={setIsOpen4}
          delBulk={delBulk}
          setDelBulk={setDelBulk}
          delEmployeesFunc={deleteEmployeeByIds}
          setCurrentEmployee={setCurrentEmployee}
          month={selectedOption10}
        />
      )}
      {isGen && !allIsGen && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          popup4={popup4}
          setIsOpen4={setIsOpen4}
          isGen={isGen}
          setIsGen={setIsGen}
          genPayslipAct={calculatePayslipByIds}
        />
      )}
      {allIsGen && !isGen && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          popup4={popup4}
          setIsOpen4={setIsOpen4}
          allIsGen={allIsGen}
          setAllIsGen={setAllIsGen}
          genAllPayslipAct={calculateAllPayslipByIds}
        />
      )}

      <Successful
        isOpen7={
          isOpen7 || (updateSuccess && !updateError && !getEmployeeLoading)
        }
        setIsOpen7={setIsOpen7}
        popup7={popup7}
        message="Employee updated successfully!"
      />

      <Successful
        isOpen7={
          isOpen7 ||
          (deleteEmployeeSuccess && !deleteEmployeeError && !getEmployeeLoading)
        }
        setIsOpen7={setIsOpen7}
        popup7={popup7}
        message="Employee deleted successfully!"
      />

      <Successful
        isOpen7={
          isOpen7 ||
          (deleteAllowanceSuccess &&
            !deleteAllowanceError &&
            !deleteAllowanceLoading)
        }
        popup7={popup7}
        message="Deleted addition successfully!"
      />
      <Successful
        isOpen7={
          deleteDeductionSuccess &&
          !deleteDeductionError &&
          !deleteDeductionLoading
        }
        popup7={popup7}
        message="Deleted deduction successfully!"
      />
      <Successful
        isOpen7={
          deleteBulkEmployeeSuccess &&
          !deleteBulkEmployeeError &&
          !deleteBulkEmployeeLoading
        }
        popup7={popup7}
        message="Employees deleted successfully!"
      />
      <Successful
        isOpen7={
          isOpen7 ||
          (deleteAllEmployeeSuccess &&
            !deleteAllEmployeeError &&
            !getEmployeeLoading)
        }
        setIsOpen7={setIsOpen7}
        popup7={popup7}
        message="Your request is being processed"
        // message="All Employee's deleted successfully!"
      />
      {/* <Successful
        isOpen7={
          isOpen7 ||
          (!generateAllBulkPayslipLoading && generateAllBulkPayslipSuccess)
        }
        setIsOpen7={setIsOpen7}
        popup7={popup7}
        message={generateAllBulkPayslipMessage}
      /> */}
      {/* <Successful
        isOpen7={
          isOpen7 ||
          (generateBulkPayslipSuccess &&
            !generateBulkPayslipError &&
            !getEmployeeLoading)
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
            emp={emp}
            userRole={userRole}
          />
          <Mainbody toggle={toggle}>
            <Header
              text="Employee"
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
                (getEmployeeError && (
                  <ErrorBox errorMessage={showError || getEmployeeError} />
                ))}
              <EmpContainer>
                <div className="row top__btn">
                  {userRole === "HR" && (
                    <>
                      <LinkButton to="/new-employee">
                        <input
                          type="button"
                          className="green__btn"
                          // className="green__btn margin__left2"
                          value="Add Employee"
                        />
                      </LinkButton>
                      <input
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
                          disableButton() &&
                          selectedOption10 === currentmonthLong
                            ? "general__btn margin__left2 mobile__margin__top save__btn"
                            : "general__btn margin__left2 mobile__margin__top disabled__btn"
                        }
                        value="Run All Payroll"
                        onClick={() => {
                          setAllIsGen(true);
                          // setIsGen(true);
                          setIsOpen4(true);
                        }}
                        disabled={
                          !disableButton() ||
                          selectedOption10 !== currentmonthLong
                        }
                      />
                      <input
                        type="button"
                        className={
                          disableButton()
                            ? "general__btn margin__left2 mobile__margin__top delete__btn"
                            : "general__btn margin__left2 mobile__margin__top disabled__btn"
                        }
                        value="Delete"
                        onClick={() => {
                          setDelBulk(true);
                          setIsOpen4(true);
                        }}
                        disabled={!disableButton()}
                      />
                      <DropdownList
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
                      />
                      {searchResult?.length > 0 && (
                        <input
                          type="button"
                          // className="general__btn margin__left save__btn"
                          className={
                            disableButton()
                              ? "general__btn margin__left2 mobile__margin__top save__btn"
                              : "general__btn margin__left2 mobile__margin__top disabled__btn"
                          }
                          value="Download Excel"
                          onClick={downloadExcel}
                          disabled={!disableButton()}
                        />
                      )}
                    </>
                  )}
                </div>
                {/* <div className="row"> */}
                <div className="row top__btn">
                  <input
                    style={{ outline: "none", border: "none" }}
                    type="button"
                    onClick={reloadEmployees}
                    className="general__btn save__btn"
                    value="Reload"
                  />
                  <div style={{ margin: "auto 1rem" }}>
                    <div style={{ display: "flex", margin: ".5rem 0" }}>
                      <input
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
                        View All Employee
                      </p>
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
                        {userRole === "HR" && (
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
                        <th style={{ paddingLeft: "3.5rem" }}> Staff ID</th>
                        <th>Full Name</th>
                        <th>Email Address</th>
                        <th>Account No.</th>
                        <th>Contact</th>
                        <th>Department</th>
                        <th>Position</th>
                        {userRole === "HR" ? <th>Action</th> : ""}
                      </tr>
                    </thead>
                    <tbody>
                      {searchResult
                        // .slice(pagesVisited, pagesVisited + usersPerpage)
                        ?.sort((a, b) => b.createdAt - a.createdAt)
                        ?.map((employee) => {
                          return (
                            <tr key={employee?.id}>
                              {userRole === "HR" && (
                                <td>
                                  <input
                                    type="checkbox"
                                    // value={item.name}
                                    name={employee?.id}
                                    // name={employee?.id}
                                    checked={employee?.isChecked || false}
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
                                    src={employee?.user?.photo}
                                    width="20"
                                    style={{ borderRadius: "50%" }}
                                    // src={profileimg}
                                  />
                                  <p style={{ fontSize: "1.2rem" }}>
                                    {employee?.staffId}
                                  </p>
                                </div>
                              </td>
                              <td>{`${trancateWord(
                                employee?.user?.name?.toString()
                              )} `}</td>
                              <td>
                                {trancateWord(
                                  employee?.user?.email?.toString()
                                )}
                              </td>
                              <td>{employee?.employeeBankAcctNumber}</td>
                              {/* <td>{employee?.dob?.substring(0, 10)}</td> */}
                              <td>{`+234 ${
                                employee?.mobile ? employee?.mobile : ""
                              }`}</td>
                              <td>
                                {trancateWord(
                                  employee?.position?.department?.name?.toString()
                                )}
                              </td>
                              <td>
                                {trancateWord(
                                  employee?.position?.name.toString()
                                )}
                              </td>
                              {userRole === "HR" && (
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
                                    <div
                                      title="View/Add/Delete Payhead"
                                      className="icons"
                                      onClick={(e) => popup2(employee?.id)}
                                    >
                                      <FontAwesomeIcon icon={["fas", "eye"]} />
                                    </div>
                                    <div
                                      title="Edit Employee"
                                      className="icons"
                                      onClick={(e) => popup3(employee?.id)}
                                    >
                                      <FontAwesomeIcon icon={["fas", "edit"]} />
                                    </div>
                                    <div
                                      title="Delete Employee"
                                      className="icons"
                                      onClick={(e) => popup4(employee?.id)}
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
                      employees?.resultLength < 1
                        ? 0
                        : `${
                            pageNumber > 0 ? pageNumber * 100 + 1 : 1
                          } - ${usersPerpageCount}`
                    }
                    of ${
                      employees?.resultLength ? employees?.resultLength : 0
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

export default Employee;
