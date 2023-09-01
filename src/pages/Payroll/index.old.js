import React, { useState, useEffect, useMemo } from "react";
import {
  DropdownList,
  ErrorBox,
  Header,
  SearchBar,
  SideNav,
} from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DashboardContainer,
  DashboardContent,
  Mainbody,
  EmpContainer,
  Container,
} from "../../styles/library";
import { commafy } from "../../hooks/calculations/paySlip";

import {
  Comfirm,
  ViewSalaryslip,
  LoadingSpinner,
  Comment,
  UploadSlips,
} from "../../modals";
import { useDispatch, useSelector } from "react-redux";
import {
  adminGetAllGeneratedPayslips,
  adminDeleteBulkPayslips,
  adminDeleteGeneratedPayslip,
  hrSetToNotApprovedSalaryslips,
  auditorGetNotApprovedSalaryslipsFunc,
  auditorSetPreApprovedPayslipsFunc,
  ceoGetPreApprovedSalaryslipsFunc,
  ceoSetApprovedSalaryslipsFunc,
  accountantGetApprovedSalaryslispFunc,
  auditorRejectNotApprovedPayslipsFunc,
  ceoRejectPreApprovedPayslipsFunc,
  auditorAndCeoRejectExcelPayslipsFunc,
  hrSetToNotApprovedSalaryslipsAll,
  auditorSetPreApprovedPayslipsAllFunc,
  ceoSetApprovedSalaryslipsAllFunc,
} from "../../actions/payslip";
import {
  accountantCreateNotApprovedVouchersAllFunc,
  accountantCreateNotApprovedVouchersFunc,
} from "../../actions/voucher";
import { adminGetAllMonthlyPayheads } from "../../actions/monthlypayheads";

import {
  AUDITOR_GET_NOT_APPROVED_SALARYSLIPS_RESET,
  GET_ALL_GENERATED_PAYSLIP_RESET,
  HR_GET_REJECTED_PAYSLIPS_RESET,
} from "../../types/payslip.js";

import { useHistory } from "react-router";
import { COLORS } from "../../values/colors";
import { PaginationContainer } from "../../styles/pagination";
import ReactPaginate from "react-paginate";
import { logoutAdmin } from "../../actions/auth";
import { currentmonthMethod } from "../../hooks/months/listMonths";
import {
  downloadPayePdfFileFunc,
  downloadPayeScheduleExcelFileFunc,
  downloadPensionPdfFileFunc,
  downloadPensionScheduleExcelFileFunc,
  downloadSalaryAndVoucherExcelFileFunc,
} from "../../actions/download";

const Payroll = ({ toggle, toggleMenu, mobileToggle, toggleMobileMenu }) => {
  // dispatch init
  const dispatch = useDispatch();

  // history init
  const history = useHistory();

  // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  const {
    paySlips,
    isLoading,
    error: getSalaryslipsError,
  } = useSelector((state) => state.adminGetAllGeneratedPayslip);

  const {
    notapproved: notApprovedSalaryslips,
    isLoading: getNotApprovedSalaryslipsLoading,
    error: getNotApprovedSalaryslipsError,
  } = useSelector((state) => state.auditorGetNotApproved);

  const {
    payslips: ceoPayslips,
    isLoading: ceoGetPreAndApprovedSalaryslipsLoading,
  } = useSelector((state) => state.ceoGetPreApprovedAndApprovedPayslips);

  const {
    payslips: accountantPayslips,
    isLoading: accountantGetApprovedSalaryslipsLoading,
  } = useSelector((state) => state.accountantGetApprovedSalaryslips);

  const {
    success: accountantCreateNotApprovedSuccess,
    error: accountantCreateNotApprovedError,
  } = useSelector((state) => state.accountantCreateNotApprovedVouchers);

  const {
    success: accountantCreateNotApprovedAllSuccess,
    error: accountantCreateNotApprovedAllError,
  } = useSelector((state) => state.accountantCreateNotApprovedVouchersAll);

  const {
    success: hrSetNotApprovedSalaryslipsSuccess,
    error: hrSetNotApprovedSalaryslipsError,
  } = useSelector((state) => state.hrSetNotApprovedPayslips);

  const {
    success: hrSetNotApprovedSalaryslipsAllSuccess,
    error: hrSetNotApprovedSalaryslipsAllError,
  } = useSelector((state) => state.hrSetNotApprovedPayslipsAll);

  const {
    success: auditorSetPreApprovedSalaryslipsSuccess,
    error: auditorSetPreApprovedSalaryslipsError,
  } = useSelector((state) => state.auditorSetPreApprovedPayslips);

  const {
    success: auditorSetPreApprovedSalaryslipsAllSuccess,
    error: auditorSetPreApprovedSalaryslipsAllError,
  } = useSelector((state) => state.auditorSetPreApprovedPayslipsAll);

  const {
    success: ceoSetApprovedSalaryslipsSuccess,
    error: ceoSetApprovedSalaryslipsError,
  } = useSelector((state) => state.ceoSetApprovedPayslips);

  const {
    success: ceoSetApprovedSalaryslipsAllSuccess,
    error: ceoSetApprovedSalaryslipsAllError,
  } = useSelector((state) => state.ceoSetApprovedPayslipsAll);

  const { success: deleteSalarySlipSuccess, error: deleteSalarySlipError } =
    useSelector((state) => state.adminDeleteGeneratedPayslip);

  const {
    success: adminDeleteBulkPayslipSuccess,
    error: adminDeleteBulkPayslipError,
  } = useSelector((state) => state.adminDeleteBulkPayslips);

  const { isLoading: downloadStatusLoading, error: downloadStatusError } =
    useSelector((state) => state.downloadStatus);

  // func state
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  const [isOpen6, setIsOpen6] = useState(false);
  const [isOpen8, setIsOpen8] = useState(false);
  const [isopen9, setisopen9] = useState(false);
  const [isOpen10, setIsOpen10] = useState(false);
  const [currentSlip, setCurrentSlip] = useState(null);
  const [salarySlip, setSalarySlip] = useState([]);
  const [arrayIds, setArrayIds] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [delBulkPayslip, setDelBulkPayslip] = useState(false);
  const [notApprovedBulk, setNotApprovedBulk] = useState(false);
  const [preApprovedBulk, setPreApprovedBulk] = useState(false);
  const [rejectSalaryslipBulk, setRejectSalaryslipBulk] = useState(false);
  const [viewReject, setViewReject] = useState(false);
  const [rejectComment, setRejectComment] = useState("");
  const [uploadBulk, setUploadBulk] = useState(false);
  const [uploadBulkData, setUploadBulkData] = useState(null);
  const [approvedBulk, setApprovedBulk] = useState(false);
  const [voucherBulk, setVoucherBulk] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [usersPerpageCount, setUsersPerpageCount] = useState(0);
  const [dropdownData, setDropdownData] = useState([]);
  const [selectedOption10, setSelectedOption10] = useState(
    currentmonthMethod("long") || ""
  );
  // const [currentYear] = useState(currentyearMethod() || "");
  const [startCheck, setStartCheck] = useState(0);
  const [endCheck, setEndCheck] = useState(0);
  const [pageData, setPageData] = useState([]);
  // const [selectedOption9, setSelectedOption9] = useState(
  //   currentmonthMethod("long") || ""
  // );
  // const [selectedOption6, setSelectedOption6] = useState(null);
  const [userRole] = useState(adminInfo?.user?.role || "");
  const [userRoleName] = useState(adminInfo?.user?.name || "");
  const [profileImg] = useState(adminInfo?.user?.photo || "");
  const [selectedOption, setSelectedOption] = useState("");
  const [grossSalary, setGrossSalary] = useState("");

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

  // months drop down
  const onOptionClicked10 = (month) => () => {
    setSelectedOption10(month);
    setisopen9(false);
  };

  // useEffect
  useEffect(() => {
    if (userRole === "Employee") {
      history.push("dashboard");
    }
  }, [history, userRole]);

  const { monthlyPayheads } = useSelector(
    (state) => state.adminGetAllMonthlyPayheads
  );

  useEffect(() => {
    if (!monthlyPayheads) {
      dispatch(adminGetAllMonthlyPayheads());
    }
  }, [dispatch, monthlyPayheads]);

  useEffect(() => {
    if (paySlips && userRole === "HR") {
      setSalarySlip(paySlips?.paySlips);
    } else if (notApprovedSalaryslips && userRole === "Internal Auditor") {
      setSalarySlip(notApprovedSalaryslips);
    } else if (ceoPayslips && userRole === "CEO") {
      if (selectedOption === "Pre-approved") {
        setSalarySlip(ceoPayslips?.preapproved);
      } else if (selectedOption === "Approved") {
        setSalarySlip(ceoPayslips?.approvedSalaryslips);
      }
    } else if (accountantPayslips && userRole === "Accountant") {
      setSalarySlip(accountantPayslips?.accountantPayslips);
    } else {
      <LoadingSpinner toggle={toggle} />;
    }

    if (searchTerm.length < 1) {
      setSearchResult(salarySlip);
    }
  }, [
    paySlips,
    selectedOption,
    toggle,
    userRole,
    history,
    salarySlip,
    searchTerm,
    notApprovedSalaryslips,
    ceoPayslips,
    accountantPayslips,
  ]);

  const dropdown1 = useMemo(() => {
    return ["Generated", "Rejected", "Approved"];
  }, []);

  const dropdown2 = useMemo(() => {
    return ["Pre-approved", "Approved"];
  }, []);

  useEffect(() => {
    if (userRole === "HR") {
      setSelectedOption(dropdown1[0]);
      setDropdownData(dropdown1);
    } else if (userRole === "CEO") {
      setSelectedOption(dropdown2[0]);
      setDropdownData(dropdown2);
    }
    // eslint-disable-next-line
  }, [userRole]);

  useEffect(() => {
    if (
      auditorSetPreApprovedSalaryslipsSuccess &&
      !auditorSetPreApprovedSalaryslipsError
    ) {
      setSearchTerm("");
    }

    if (ceoSetApprovedSalaryslipsSuccess && !ceoSetApprovedSalaryslipsError) {
      setSearchTerm("");
    }

    if (
      accountantCreateNotApprovedSuccess &&
      !accountantCreateNotApprovedError
    ) {
      setSearchTerm("");
    }

    if (
      hrSetNotApprovedSalaryslipsSuccess &&
      !hrSetNotApprovedSalaryslipsError
    ) {
      setSearchTerm("");
    }

    if (deleteSalarySlipSuccess && !deleteSalarySlipError) {
      setSearchTerm("");
    }

    if (adminDeleteBulkPayslipSuccess && !adminDeleteBulkPayslipError) {
      setSearchTerm("");
    }
  }, [
    dispatch,
    auditorSetPreApprovedSalaryslipsError,
    auditorSetPreApprovedSalaryslipsSuccess,
    ceoSetApprovedSalaryslipsError,
    ceoSetApprovedSalaryslipsSuccess,
    accountantCreateNotApprovedError,
    accountantCreateNotApprovedSuccess,
    hrSetNotApprovedSalaryslipsSuccess,
    hrSetNotApprovedSalaryslipsError,
    deleteSalarySlipError,
    deleteSalarySlipSuccess,
    adminDeleteBulkPayslipError,
    adminDeleteBulkPayslipSuccess,
  ]);

  const onSelect = (slipId) => {
    const findSlip = salarySlip.find((el) => String(el.id) === String(slipId));
    if (findSlip || !currentSlip) {
      setCurrentSlip(findSlip);
    }
  };

  //rejected comment popup
  const popup3 = (id = "") => {
    setIsOpen3(!isOpen3);
    if (id) {
      onSelect(id);
      setViewReject(!viewReject);
    }
    setRejectComment("");
    // if (delBulkPayslip) {
    //   setDelBulkPayslip(false);
    // }
  };

  //upload button popup
  const popup5 = () => {
    setIsOpen5(!isOpen5);
    if (uploadBulk) {
      setUploadBulk(false);
    }
  };

  const popup4 = (id) => {
    setIsOpen4(!isOpen4);
    onSelect(id);
    if (delBulkPayslip) {
      setDelBulkPayslip(false);
    }
  };
  const popup8 = (id) => {
    setIsOpen8(!isOpen8);
    onSelect(id);
  };
  const toggling = () => setIsOpen(!isOpen);
  const toggling9 = () => setisopen9(!isopen9);
  const toggling10 = () => setIsOpen10(!isOpen10);
  // const toggling6 = () => setIsOpen6(!isOpen6);

  //check if any checkbox is checked
  const disableButton = () => {
    let isTrue = false;
    // pageData?.forEach((data) => {
    searchResult?.forEach((data) => {
      if (data.isChecked === true) {
        isTrue = data.isChecked;
      }
    });
    return isTrue;
  };

  //check if payslip is approved
  const isApproved = () => {
    let isTrue = false;
    // pageData?.forEach((data) => {
    searchResult?.forEach((data) => {
      if (data.status === 3) {
        isTrue = true;
      }
    });
    return isTrue;
  };

  useEffect(() => {
    if (pageNumber?.length > 0) {
      const startNum = pageNumber * 40;
      setStartCheck(startNum);

      const endNum = usersPerpageCount;
      setEndCheck(endNum);
    } else {
      setStartCheck(0);
      setEndCheck(usersPerpageCount);
    }
  }, [usersPerpageCount, pageNumber]);

  useEffect(() => {
    let tempData2 = searchResult?.slice(startCheck, endCheck)?.map((user) => {
      return user;
    });

    setPageData(tempData2);
  }, [startCheck, endCheck, searchResult]);

  // for checkbox onchange handler
  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "checkAll") {
      // let tempData = searchResult
      //   ?.slice(startCheck, endCheck)
      let tempData = searchResult?.map((payslip) => {
        return { ...payslip, isChecked: checked };
      });
      let notChecked = searchResult?.filter((el) => {
        return !tempData?.find((tmp) => tmp?.employee.id === el?.employee.id);
      });
      let dataJoined = [...tempData, ...notChecked].sort((a, b) => {
        var dateA = new Date(a.createdAt),
          dateB = new Date(b.createdAt);
        return dateA - dateB;
      });

      setSearchResult(dataJoined);
    } else {
      let tempUsers = searchResult.map((payslip) =>
        payslip.employee.id === name
          ? { ...payslip, isChecked: checked }
          : payslip
      );
      setSearchResult(tempUsers);
    }
  };

  useEffect(() => {
    setArrayIds([]);
    searchResult?.forEach((data) => {
      if (data?.isChecked) {
        setArrayIds((arrayIds) => [...arrayIds, data]);
      }
    });
  }, [searchResult]);

  // let arrayIds = [];
  const deleteSalaryslipByIds = () => {
    onDeletePayslips();
  };

  const setNotApprovedSalaryslips = () => {
    const salaryIds = arrayIds.map((el) => el.id);
    if (paySlips?.resultLength > 100) {
      dispatch(hrSetToNotApprovedSalaryslipsAll(selectedOption10));
    } else {
      dispatch(hrSetToNotApprovedSalaryslips(salaryIds, selectedOption10));
    }
  };

  const setPreApprovedSalaryslips = () => {
    const salaryIds = arrayIds.map((el) => el.id);
    if (paySlips?.resultLength > 100) {
      dispatch(auditorSetPreApprovedPayslipsAllFunc(selectedOption10));
    } else {
      dispatch(auditorSetPreApprovedPayslipsFunc(salaryIds, selectedOption10));
    }
  };

  const setApprovedSalaryslips = () => {
    const salaryIds = arrayIds.map((el) => el?.id);

    if (paySlips?.resultLength > 100) {
      dispatch(ceoSetApprovedSalaryslipsAllFunc(selectedOption10));
    } else {
      dispatch(ceoSetApprovedSalaryslipsFunc(salaryIds, selectedOption10));
    }
  };

  const onDeletePayslips = () => {
    if (arrayIds.length && arrayIds.length === 1) {
      const paySlipId = arrayIds[0].id;
      dispatch(
        adminDeleteGeneratedPayslip(paySlipId, selectedOption10, selectedOption)
      );
    } else if (arrayIds.length > 1) {
      // detele all selected salary slip
      const newArray = arrayIds.map((user) => user.id);

      dispatch(
        adminDeleteBulkPayslips(newArray, selectedOption10, selectedOption)
      );
    }
  };

  //download option
  const downloadPensionPDF = () => {
    if (salarySlip.length) {
      const newData = salarySlip.map((el, index) => {
        return {
          sn: ++index,
          staffName: el?.employee?.user?.name,
          employeeStaffId: el?.employee?.staffId,
          employeeContribution: el?.pension,
          employersContribution: "",
          totalContribution: "",
          custodian: "",
          rsaNo: "",
        };
      });
      const monthYear = salarySlip?.map((el) => {
        return el;
      });
      dispatch(
        downloadPensionPdfFileFunc(
          monthYear[0]?.month,
          newData,
          monthYear[0]?.year
        )
      );
    }
  };
  const downloadPayePDF = () => {
    if (salarySlip.length) {
      const newData = salarySlip?.map((el, index) => {
        return {
          sn: ++index,
          staffName: el?.employee?.user?.name,
          employeeStaffId: el?.employee?.staffId,
          designation: el?.employee?.position?.name,
          earnings: el?.totalEarnings,
          amount: el?.paye,
        };
      });

      const monthYear = salarySlip?.map((el) => {
        return el;
      });

      dispatch(
        downloadPayePdfFileFunc(
          monthYear[0]?.month,
          newData,
          monthYear[0]?.year
        )
      );
    }
  };
  const downloadPensionExcel = () => {
    if (salarySlip.length) {
      const newData = salarySlip.map((el, index) => {
        return {
          sn: ++index,
          staffName: el?.employee?.user?.name,
          employeeStaffId: el?.employee?.staffId,
          employeeContribution: el?.pension,
          employersContribution: "",
          totalContribution: "",
          custodian: "",
          rsaNo: "",
        };
      });

      const monthYear = salarySlip?.map((el) => {
        return el;
      });

      dispatch(
        downloadPensionScheduleExcelFileFunc(
          monthYear[0]?.year,
          monthYear[0]?.month,
          newData
        )
      );
    }
  };
  const downloadPayeExcel = () => {
    if (salarySlip.length) {
      const newData = salarySlip.map((el, index) => {
        return {
          sn: ++index,
          staffName: el?.employee?.user?.name,
          employeeStaffId: el?.employee?.staffId,
          designation: el?.employee?.position?.name,
          earnings: el?.totalEarnings,
          amount: el?.paye,
        };
      });

      const monthYear = salarySlip?.map((el) => {
        return el;
      });

      dispatch(
        downloadPayeScheduleExcelFileFunc(
          monthYear[0]?.month,
          monthYear[0]?.year,
          newData
        )
      );
    }
  };

  const downloadSalaryslipAct = () => {
    if (salarySlip.length) {
      const newSalaryslip = salarySlip.map((el) => {
        return {
          id: el?.id,
          employeeName: el?.employee?.user?.name,
          employeeBankName: el?.employee?.employeeBank,
          grossPay: el?.grossPay,
          pension: el?.pension,
          paye: el?.paye,
          // uWallet: el?.uWallet,
          netPay: el?.netPay,
          allowanceTotal: el?.allowanceTotal,
          deductionTotal: el?.deductionTotal,
          month: el?.month,
          year: el?.year,
          totalEarnings: el?.totalEarnings,
          commentBy: el?.commentBy || "",
          comment: el?.comment || "",
          // id: el?.id,
        };
      });
      if (userRole === "Internal Auditor") {
        dispatch(
          downloadSalaryAndVoucherExcelFileFunc(
            "salaryslip",
            "not-approved",
            selectedOption10,
            newSalaryslip
          )
        );
      } else if (userRole === "CEO") {
        if (selectedOption === "Pre-approved") {
          dispatch(
            downloadSalaryAndVoucherExcelFileFunc(
              "salaryslip",
              "pre-approved",
              selectedOption10,
              newSalaryslip
            )
          );
        } else {
          dispatch(
            downloadSalaryAndVoucherExcelFileFunc(
              "salaryslip",
              "approved",
              selectedOption10,
              newSalaryslip
            )
          );
        }
      } else {
        if (selectedOption === "Generated") {
          dispatch(
            downloadSalaryAndVoucherExcelFileFunc(
              "salaryslip",
              "generated",
              selectedOption10,
              newSalaryslip
            )
          );
        } else {
          dispatch(
            downloadSalaryAndVoucherExcelFileFunc(
              "salaryslip",
              "rejected",
              selectedOption10,
              newSalaryslip
            )
          );
        }
      }
    }
  };

  const onCreateVouchersByAccountant = () => {
    const salaryIds = arrayIds.map((el) => el.id);
    if (paySlips?.resultLength > 100) {
      dispatch(
        accountantCreateNotApprovedVouchersAllFunc(currentmonthLong("long"))
      );
    } else {
      dispatch(accountantCreateNotApprovedVouchersFunc(salaryIds));
    }
  };

  const onRejectShowConfirm = () => {
    setIsOpen3(false);
    setIsOpen4(true);
    setRejectSalaryslipBulk(true);
    setCurrentSlip(null);
  };

  const onUploadRejectShowConfirm = (exceldata) => {
    setIsOpen5(false);
    setIsOpen4(true);
    setUploadBulk(true);
    setUploadBulkData(exceldata);
    setCurrentSlip(null);
  };

  const auditorAndCeoRejectBulkPayslip = () => {
    const salaryIds = arrayIds.map((el) => el?.id);
    const salaryIdsWithComment = salaryIds.map((el) => {
      return {
        id: el,
        comment: rejectComment,
      };
    });

    setRejectComment("");

    if (userRole === "CEO") {
      dispatch(
        ceoRejectPreApprovedPayslipsFunc(salaryIdsWithComment, selectedOption10)
      );
    }

    if (userRole === "Internal Auditor") {
      dispatch(
        auditorRejectNotApprovedPayslipsFunc(
          salaryIdsWithComment,
          selectedOption10
        )
      );
    }
  };

  const auditorAndCeoRejectUploadBulkData = () => {
    let filterDataWithoutComment = uploadBulkData?.filter(
      (el) => !el.Comment || el.Comment === undefined
    );
    filterDataWithoutComment = filterDataWithoutComment?.map(
      (el) => el?.id || el?.id
    );
    let filterDataWithComment = uploadBulkData?.filter((el) => el.Comment);
    filterDataWithComment = filterDataWithComment?.map((el) => {
      return {
        id: el?.id || el?.id,
        comment: el?.Comment,
      };
    });
    if (userRole === "Internal Auditor") {
      dispatch(
        auditorAndCeoRejectExcelPayslipsFunc(
          filterDataWithComment,
          filterDataWithoutComment,
          "not approved",
          selectedOption10
        )
      );
    } else {
      dispatch(
        auditorAndCeoRejectExcelPayslipsFunc(
          filterDataWithComment,
          filterDataWithoutComment,
          "pre approved",
          selectedOption10
        )
      );
    }
  };

  // Invoke when user click to request another page.
  const usersPerpage = 40;
  const pagesVisited = pageNumber * usersPerpage;
  const pageCount = Math.ceil(paySlips?.resultLength / usersPerpage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    if (pageNumber?.length > 0) {
      let usersPerpageNum;
      if (paySlips?.resultLength / (pageNumber + 1) > 40) {
        usersPerpageNum = (pageNumber + 1) * 100;
      } else {
        usersPerpageNum = paySlips?.resultLength;
      }
      setUsersPerpageCount(usersPerpageNum);
    } else {
      if (paySlips?.resultLength < 100) {
        setUsersPerpageCount(paySlips?.resultLength);
      } else {
        setUsersPerpageCount(100);
      }
    }
  }, [paySlips, pageNumber]);

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    filteredData(searchTerm);
  };

  // filter function
  const filteredData = (value) => {
    if (value !== "") {
      const filteredList = salarySlip.filter((data) => {
        return Object.values(
          data.employee.user?.name +
            " " +
            data.employee.user?.email +
            " " +
            data.month +
            " "
        )
          .join("")
          .toLowerCase()
          .includes(value.toLowerCase());
      });
      setSearchResult(filteredList);
    } else {
      setSearchResult(salarySlip);
    }
  };

  //   close all modals
  const closeOption = () => {
    if (
      isOpen === true ||
      isOpen6 === true ||
      isopen9 === true ||
      isOpen10 === true
    ) {
      setIsOpen(false);
      setIsOpen6(false);
      setisopen9(false);
      setIsOpen10(false);
    }
  };

  // status filter drop down
  const onOptionClicked = (filter) => () => {
    setSelectedOption(filter);
    setIsOpen(false);
  };

  // bank filter drop down
  // const onOptionClicked6 = (bank) => () => {
  //   setSelectedOption6(bank);
  //   setIsOpen6(false);
  // };

  const noSalaryslip = (salarySlip?.length === 0 ||
    searchResult?.length === 0) && (
    <p className="no__data">
      {userRole === "HR" &&
        (selectedOption === "Generated"
          ? "No Generated SalarySlip To Display"
          : "No Rejected Salaryslips to Display")}
      {userRole === "Internal Auditor" &&
        "no not approved Salaryslips to Display"}
      {userRole === "CEO" &&
        (selectedOption === "Pre-approved"
          ? "No Pre Approved Salaryslips to Display"
          : "No Approved Salaryslips to Display")}
      {userRole === "Accountant" && "No Approved Salaryslips to Display"}
    </p>
  );

  let statusDisplay = "";

  const checkStatus = (status, statusLevel = "") => {
    if (!status && !statusLevel) {
      statusDisplay = "generated";
    } else if (status === 0) {
      statusDisplay = "not__approved";
    } else if (status === 1) {
      statusDisplay = "pre__approved";
    } else if (status === 2) {
      statusDisplay = "rejected";
    } else if (status === 3) {
      statusDisplay = "approved";
    }

    return statusDisplay;
  };

  const slp = "active";

  useEffect(() => {
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      history.push("/signin");
    } else {
      if (userRole === "HR") {
        dispatch(
          adminGetAllGeneratedPayslips(selectedOption10, selectedOption)
        );
      } else if (userRole === "Internal Auditor") {
        dispatch(auditorGetNotApprovedSalaryslipsFunc(selectedOption10));
      } else if (userRole === "CEO") {
        dispatch(
          ceoGetPreApprovedSalaryslipsFunc(selectedOption10, selectedOption)
        );
      } else if (userRole === "Accountant") {
        dispatch(
          accountantGetApprovedSalaryslispFunc(
            selectedOption10
            // selectedOption6?.name
          )
        );
        // dispatch(adminGetAllBanksFunc());
      }
    }
  }, [
    dispatch,
    history,
    selectedOption,
    adminInfo,
    selectedOption10,
    userRole,
    accountantCreateNotApprovedSuccess,
    accountantCreateNotApprovedError,
    // selectedOption6,
  ]);

  useEffect(() => {
    if (
      getSalaryslipsError === "no token was passed" ||
      getNotApprovedSalaryslipsError === "no token was passed"
    ) {
      dispatch(logoutAdmin("no token was passed"));
      if (userRole === "HR") {
        dispatch({
          type: GET_ALL_GENERATED_PAYSLIP_RESET,
        });
        dispatch({
          type: HR_GET_REJECTED_PAYSLIPS_RESET,
        });
      } else if (userRole === "Internal Auditor") {
        dispatch({
          type: AUDITOR_GET_NOT_APPROVED_SALARYSLIPS_RESET,
        });
      }
    }
  }, [dispatch, getSalaryslipsError, getNotApprovedSalaryslipsError, userRole]);

  useEffect(() => {
    if (currentSlip?.employee?.employeeType !== "Contract-With-No-Grade") {
      if (!currentSlip?.employee?.notch) {
        setGrossSalary(
          currentSlip?.employee?.salaryStep?.amount
            ? currentSlip?.employee?.salaryStep?.amount
            : 0
        );
      } else if (
        currentSlip?.employee?.salaryStep?.notches?.length &&
        currentSlip?.employee?.notch
      ) {
        const notchId = currentSlip?.employee?.notch?.notchId;
        const stepId = currentSlip?.employee?.notch?.stepId;
        const findNotchId = currentSlip?.employee?.salaryStep?.notches?.find(
          (notch) => String(notch?.id) === String(notchId)
        );
        let findStepId;
        if (String(currentSlip?.employee?.salaryStep?.id) === String(stepId)) {
          findStepId = true;
        } else {
          findStepId = false;
        }
        if (findNotchId && findStepId) {
          setGrossSalary(findNotchId?.amount ? findNotchId?.amount : 0);
        }
      }
    } else {
      setGrossSalary(currentSlip?.employee?.contractSalary);
    }
  }, [currentSlip, grossSalary]);

  const checkForUWallet = () => {
    const check = searchResult?.map((el) => {
      if (el?.uWallet) return true;
    });
    return check ? true : false;
  };

  return (
    <>
      {isLoading && !delBulkPayslip && !notApprovedBulk && (
        <LoadingSpinner toggle={toggle} />
      )}
      {(getNotApprovedSalaryslipsLoading ||
        ceoGetPreAndApprovedSalaryslipsLoading ||
        accountantGetApprovedSalaryslipsLoading) && (
        <LoadingSpinner toggle={toggle} />
      )}
      {downloadStatusLoading && !downloadStatusError && (
        <LoadingSpinner toggle={toggle} />
      )}

      <UploadSlips
        isOpen5={isOpen5}
        popup5={popup5}
        userRole={userRole}
        onRejectShowConfirm={onUploadRejectShowConfirm}
      />

      {currentSlip && (
        <ViewSalaryslip
          isOpen8={isOpen8}
          popup8={popup8}
          setIsOpen8={setIsOpen8}
          paySlip={currentSlip}
          monthlypayheads={monthlyPayheads}
          grossSalary={grossSalary}
        />
      )}

      {disableButton() && (
        <Comment
          isOpen3={isOpen3}
          userRole={userRole}
          popup3={popup3}
          onRejectShowConfirm={onRejectShowConfirm}
          setRejectComment={setRejectComment}
          rejectComment={rejectComment}
        />
      )}

      {currentSlip && viewReject && userRole === "HR" && (
        <Comment
          isOpen3={isOpen3}
          userRole={userRole}
          popup3={popup3}
          currentSlip={currentSlip}
        />
      )}

      {currentSlip && !delBulkPayslip && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          setIsOpen4={setIsOpen4}
          slipId={currentSlip?.id}
          setCurrentSlip={setCurrentSlip}
          setDelBulkPayslip={setDelBulkPayslip}
          month={selectedOption10}
          type={selectedOption}
        />
      )}

      {uploadBulk &&
        (userRole === "Internal Auditor" || userRole === "CEO") && (
          <Comfirm
            toggle={toggle}
            isOpen4={isOpen4}
            setIsOpen4={setIsOpen4}
            setUploadBulk={setUploadBulk}
            uploadBulk={uploadBulk}
            setCurrentSlip={setCurrentSlip}
            uploadRejectBulkAct={auditorAndCeoRejectUploadBulkData}
          />
        )}

      {delBulkPayslip && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          setIsOpen4={setIsOpen4}
          setDelBulkPayslip={setDelBulkPayslip}
          delBulkPayslip={delBulkPayslip}
          delBulkPayslipAct={deleteSalaryslipByIds}
          setCurrentSlip={setCurrentSlip}
        />
      )}

      {notApprovedBulk && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          setIsOpen4={setIsOpen4}
          setNotApprovedBulk={setNotApprovedBulk}
          notApprovedBulk={notApprovedBulk}
          setNotApprovedAct={setNotApprovedSalaryslips}
          setCurrentSlip={setCurrentSlip}
        />
      )}

      {preApprovedBulk && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          setIsOpen4={setIsOpen4}
          setPreApprovedBulk={setPreApprovedBulk}
          preApprovedBulk={preApprovedBulk}
          setPreApprovedAct={setPreApprovedSalaryslips}
          setCurrentSlip={setCurrentSlip}
        />
      )}

      {approvedBulk && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          setIsOpen4={setIsOpen4}
          setApprovedBulk={setApprovedBulk}
          approvedBulk={approvedBulk}
          setApprovedAct={setApprovedSalaryslips}
          setCurrentSlip={setCurrentSlip}
        />
      )}

      {voucherBulk && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          setIsOpen4={setIsOpen4}
          setVoucherBulk={setVoucherBulk}
          voucherBulk={voucherBulk}
          setNotApprovedVouchersAct={onCreateVouchersByAccountant}
          setCurrentSlip={setCurrentSlip}
        />
      )}

      {rejectSalaryslipBulk && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          setIsOpen4={setIsOpen4}
          setIsOpen3={setIsOpen3}
          setRejectSalaryslipBulk={setRejectSalaryslipBulk}
          rejectSalaryslipBulk={rejectSalaryslipBulk}
          rejectNotApprovedBulkAct={auditorAndCeoRejectBulkPayslip}
          setRejectComment={setRejectComment}
        />
      )}

      <DashboardContainer onClick={closeOption}>
        <DashboardContent>
          <SideNav
            slp={slp}
            userRole={userRole}
            toggle={toggle}
            toggleMenu={toggleMenu}
            mobileToggle={mobileToggle}
            toggleMobileMenu={toggleMobileMenu}
          />
          <Mainbody toggle={toggle}>
            <Header
              text="Payroll"
              userRole={userRole}
              userRoleName={userRoleName}
              profileimg={profileImg}
              toggle={toggle}
              toggleMenu={toggleMenu}
              mobileToggle={mobileToggle}
              toggleMobileMenu={toggleMobileMenu}
            />
            <Container>
              {!getNotApprovedSalaryslipsLoading &&
                !isLoading &&
                !ceoGetPreAndApprovedSalaryslipsLoading &&
                (getNotApprovedSalaryslipsError ||
                  accountantCreateNotApprovedError) && (
                  <ErrorBox
                    errorMessage={
                      getNotApprovedSalaryslipsError ||
                      accountantCreateNotApprovedError
                    }
                  />
                )}
              {!downloadStatusLoading && downloadStatusError && (
                <ErrorBox errorMessage={downloadStatusError} />
              )}
              <EmpContainer>
                <div className="row top__btn">
                  {(userRole === "Internal Auditor" ||
                    userRole === "CEO" ||
                    userRole === "Accountant") && (
                    <DropdownList
                      // list={true}
                      isOpen={isopen9}
                      toggling={toggling9}
                      selectedOption={selectedOption10}
                      // cssClass={check}
                      // cssClass2={"dropdown__header"}
                      cssClass2={"month__header"}
                      cssClass3={"margin__right"}
                      text={currentmonthLong}
                      // text={"Month"}
                      dataSet={monthArr}
                      onOptionClicked={onOptionClicked10}
                    />
                  )}

                  {userRole === "Accountant" ? (
                    <>
                      <input
                        type="button"
                        className={
                          disableButton()
                            ? "general__btn save__btn"
                            : "general__btn disabled__btn"
                        }
                        value="Create Voucher"
                        onClick={() => {
                          setVoucherBulk(true);
                          setIsOpen4(true);
                          setCurrentSlip(null);
                        }}
                        disabled={!disableButton()}
                      />
                    </>
                  ) : (
                    <>
                      {userRole === "HR" ? (
                        <>
                          <input
                            type="button"
                            className={
                              disableButton() && selectedOption === "Generated"
                                ? "general__btn save__btn"
                                : "general__btn disabled__btn"
                            }
                            value="Submit To Auditor"
                            onClick={() => {
                              setIsOpen4(true);
                              setNotApprovedBulk(true);
                              setCurrentSlip(null);
                            }}
                            disabled={
                              !disableButton() || selectedOption === "Rejected"
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
                              setIsOpen4(true);
                              setDelBulkPayslip(true);
                            }}
                            disabled={!disableButton()}
                          />
                        </>
                      ) : (
                        <>
                          {/* <input
                          type="button"
                          className={
                            disableButton()
                            ? "general__btn save__btn"
                            : "general__btn disabled__btn"
                          }
                          value="Send Salary Slip"
                          disabled={!disableButton()}
                        /> */}

                          <input
                            style={{
                              backgroundColor: disableButton
                                ? "disabled__btn"
                                : `${COLORS.green}`,
                            }}
                            type="button"
                            className={
                              disableButton() && selectedOption !== "Approved"
                                ? `general__btn ${
                                    userRole === "CEO" ? "" : "margin__left2"
                                  } mobile__margin__top save__btn`
                                : `general__btn ${
                                    userRole === "CEO" ? "" : "margin__left2"
                                  } mobile__margin__top  disabled__btn`
                            }
                            onClick={() => {
                              if (userRole === "Internal Auditor") {
                                setIsOpen4(true);
                                setPreApprovedBulk(true);
                              } else if (userRole === "CEO") {
                                setIsOpen4(true);
                                setApprovedBulk(true);
                              }
                              setCurrentSlip(null);
                            }}
                            disabled={
                              !disableButton() || selectedOption === "Approved"
                            }
                            value={
                              userRole === "CEO" ? "Approve" : "Pre-Approve"
                            }
                          />
                          <input
                            type="button"
                            className={
                              disableButton() && selectedOption !== "Approved"
                                ? "general__btn margin__left2 delete__btn"
                                : "general__btn margin__left2 disabled__btn"
                            }
                            onClick={() => setIsOpen3(!isOpen3)}
                            disabled={
                              !disableButton() || selectedOption === "Approved"
                            }
                            value="Reject"
                          />
                        </>
                      )}
                    </>
                  )}
                  {(userRole === "HR" || userRole === "CEO") && (
                    <div className="emp__control">
                      <DropdownList
                        // list={true}
                        isOpen={isOpen}
                        toggling={toggling}
                        selectedOption={selectedOption}
                        cssClass2={"dropdown__header"}
                        cssClass3={"margin__left2 mobile__margin__top"}
                        text={dropdownData[0]}
                        dataSet={dropdownData}
                        onOptionClicked={onOptionClicked}
                      />
                    </div>
                  )}
                  {/* {(userRole === "Internal Auditor" || userRole === "CEO") && (
                    <input
                      type="button"
                      className={
                        salarySlip
                          ? "general__btn margin__left save__btn"
                          : "general__btn margin__left disabled__btn margin__left"
                      }
                      onClick={() => popup5()}
                      disabled={!salarySlip}
                      value="Upload File"
                    />
                  )} */}
                </div>

                <div className="row">
                  {(userRole === "Internal Auditor" ||
                    userRole === "HR" ||
                    userRole === "CEO") && (
                    <input
                      type="button"
                      className={
                        salarySlip?.length
                          ? "general__btn green__btn"
                          : "general__btn disabled__btn"
                      }
                      onClick={downloadSalaryslipAct}
                      disabled={!salarySlip?.length}
                      value="Download Payroll  As Excel"
                    />
                  )}

                  <div className="search__container mobile__margin__top">
                    <SearchBar
                      term={searchTerm}
                      searchKeyWord={searchHandler}
                    />
                    <span className="icons search__icon">
                      <FontAwesomeIcon icon={["fas", "search"]} />
                    </span>
                  </div>
                </div>
              </EmpContainer>
              <EmpContainer>
                <div></div>
                <div style={{ cursor: "pointer" }} onClick={toggling10}>
                  <p
                    style={{
                      backgroundColor: `${COLORS.white3}`,
                      padding: ".4rem 1rem",
                    }}
                  >
                    Download Option
                  </p>
                </div>
              </EmpContainer>
              {isOpen10 && (
                <>
                  {!isApproved() && (
                    // <EmpContainer>
                    // <div></div>
                    <>
                      <div style={{ position: "relative" }}>
                        <div
                          style={{
                            width: "25rem",
                            padding: "1rem",
                            position: "absolute",
                            zIndex: "20",
                            right: "1rem",
                            backgroundColor: `${COLORS.white2}`,
                            boxShadow: "0 .2rem .7rem rgba(0,0,0,.2)",
                          }}
                          className=""
                        >
                          {/* <div className="row"> */}
                          <input
                            type="button"
                            className={
                              salarySlip?.length
                                ? "general__btn green__btn margin__bottom full__width"
                                : "general__btn disabled__btn margin__bottom full__width"
                            }
                            onClick={downloadPensionPDF}
                            disabled={!salarySlip?.length}
                            value="Download Pension As PDF"
                          />
                          <input
                            type="button"
                            className={
                              salarySlip?.length
                                ? "general__btn green__btn margin__bottom full__width"
                                : "general__btn disabled__btn margin__bottom full__width"
                            }
                            onClick={downloadPayePDF}
                            disabled={!salarySlip?.length}
                            value="Download Paye As PDF"
                          />
                          <input
                            type="button"
                            className={
                              salarySlip?.length
                                ? "general__btn green__btn margin__bottom full__width"
                                : "general__btn disabled__btn margin__bottom full__width"
                            }
                            onClick={downloadPensionExcel}
                            disabled={!salarySlip?.length}
                            value="Download Pension As Excel"
                          />
                          <input
                            type="button"
                            className={
                              salarySlip?.length
                                ? "general__btn green__btn full__width"
                                : "general__btn disabled__btn full__width"
                            }
                            onClick={downloadPayeExcel}
                            disabled={!salarySlip?.length}
                            value="Download Paye As Excel"
                          />
                        </div>
                      </div>
                    </>
                    // </EmpContainer>
                  )}
                </>
              )}
              <div className="table__body">
                <div className="table__overflow full__height">
                  <table>
                    <thead>
                      <tr>
                        {(userRole === "Accountant" ||
                          userRole === "CEO" ||
                          userRole === "Internal Auditor" ||
                          userRole === "HR") && (
                          <th>
                            <input
                              type="checkbox"
                              name="checkAll"
                              // checked={searchResult.filter((user) => user?.isChecked !== true).length < 1}
                              checked={
                                searchResult?.length === 0
                                  ? false
                                  : // : !pageData?.some(
                                    !searchResult?.some(
                                      (payslip) => payslip?.isChecked !== true
                                    )
                              }
                              onChange={handleChange}
                            />
                          </th>
                        )}
                        <th>Staff ID No</th>
                        <th>Full Name</th>
                        <th>Salary Month</th>
                        <th>Total Additions</th>
                        <th>Total Deductions</th>
                        {!checkForUWallet ? <th>U-wallet</th> : ""}
                        <th>Net Pay</th>
                        <th>Status</th>
                        {/* {userRole === "HR" ||
                        userRole === "Internal Auditor" ||
                        userRole === "CEO" ? ( */}
                        <th>Action</th>
                        {/* ) : (
                          ""
                        )} */}
                      </tr>
                    </thead>
                    <tbody>
                      {searchResult
                        // .slice(pagesVisited, pagesVisited + usersPerpage)
                        ?.map((slip) => (
                          <tr key={slip?.id}>
                            {(userRole === "Accountant" ||
                              userRole === "HR" ||
                              userRole === "Internal Auditor" ||
                              userRole === "CEO") && (
                              <td>
                                <input
                                  type="checkbox"
                                  // value={item.name}
                                  name={slip?.employee?.id}
                                  checked={slip?.isChecked || false}
                                  onChange={handleChange}
                                />
                              </td>
                            )}
                            <td>{slip?.employee?.staffId}</td>
                            <td>{`${slip?.employee?.user.name}`}</td>
                            <td>
                              {slip?.month} {slip?.year}
                            </td>
                            <td>
                              {slip?.totalEarnings
                                ? commafy(slip?.totalEarnings)
                                : "0"}
                            </td>
                            <td>{commafy(slip?.deductionTotal)}</td>
                            {/* <td>{slip?.uWallet && commafy(slip?.uWallet)}</td> */}
                            <td>{commafy(slip?.netPay)}</td>
                            <td>
                              <span
                                className={checkStatus(
                                  slip?.status,
                                  slip?.statusLevel
                                )}
                              >
                                {checkStatus(
                                  slip?.status,
                                  slip?.statusLevel
                                ) === "generated"
                                  ? "is generated"
                                  : `${slip?.statusLevel}`}
                              </span>
                            </td>
                            {userRole === "HR" && (
                              <td>
                                <div className="action__icons">
                                  {userRole === "HR" &&
                                    selectedOption === "Rejected" && (
                                      <div
                                        title="View Comment"
                                        className="icons"
                                        onClick={(e) => popup3(slip?.id)}
                                      >
                                        <FontAwesomeIcon
                                          icon={["fas", "comment"]}
                                        />
                                      </div>
                                    )}
                                  <div
                                    title="View SalarySlip"
                                    className="icons"
                                    onClick={(e) => popup8(slip?.id)}
                                  >
                                    <FontAwesomeIcon icon={["fas", "eye"]} />
                                  </div>
                                  <div
                                    title="Delete SalarySlip"
                                    className="icons"
                                    onClick={(e) => popup4(slip?.id)}
                                  >
                                    <FontAwesomeIcon
                                      icon={["fas", "trash-alt"]}
                                    />
                                  </div>
                                </div>
                              </td>
                            )}
                            {(userRole === "CEO" ||
                              userRole === "Internal Auditor" ||
                              userRole === "Accountant") && (
                              <td>
                                <div className="action__icons">
                                  <div
                                    className="icons"
                                    onClick={(e) => popup8(slip?.id)}
                                  >
                                    <FontAwesomeIcon icon={["fas", "eye"]} />
                                  </div>
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {noSalaryslip}
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
                      searchResult?.length < 1
                        ? 0
                        : `${
                            pageNumber?.length > 0 ? pageNumber * 100 + 1 : 1
                          } - ${usersPerpageCount}`
                    }
                    of ${paySlips?.resultLength}`}
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

export default Payroll;
