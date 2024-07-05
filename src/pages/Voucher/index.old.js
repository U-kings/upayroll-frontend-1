import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { accountantCreateBankscheduleFunc } from "../../actions/bankschedules";
import {
  accountantDeleteBulkVoucherFunc,
  accountantDeleteVoucherByIdFunc,
  accountGetApprovedVouchersFunc,
  auditorGetnotApprovedVouchersFunc,
  auditorPreApprovedVouchersAllFunc,
  auditorPreApprovedVouchersFunc,
  auditorRejectNotApprovedVouchersFunc,
  ceoApprovedVouchersAllFunc,
  ceoApprovedVouchersFunc,
  ceoGetPreApprovedVouchersFunc,
  ceoRejectPreApprovedVouchersFunc,
} from "../../actions/voucher";
import { adminGetAllBanksFunc } from "../../actions/banklist";
import {
  DropdownList,
  ErrorBox,
  // ErrorBox,
  Header,
  SearchBar,
  SideNav,
} from "../../components";
import { currentmonthMethod } from "../../hooks/months/listMonths";
import {
  BankScheduleOption,
  Comfirm,
  Comment,
  LoadingSpinner,
  Successful,
  ViewVoucher,
} from "../../modals";
import {
  DashboardContainer,
  DashboardContent,
  Mainbody,
  Container,
  EmpContainer,
} from "../../styles/library";
import { PaginationContainer } from "../../styles/pagination";
import { COLORS } from "../../values/colors";
import { commafy } from "../../hooks/calculations/paySlip";
import {
  ACCOUNTANT_GET_APPROVED_VOUCHERS_RESET,
  AUDITOR_PRE_APPROVE_VOUCHERS_ALL_RESET,
  AUDITOR_PRE_APPROVE_VOUCHERS_RESET,
  CEO_APPROVE_PRE_APPROVED_VOUCHERS_ALL_RESET,
  CEO_APPROVE_PRE_APPROVED_VOUCHERS_RESET,
  CEO_GET_PRE_APPROVED_VOUCHERS_RESET,
} from "../../types/voucher";
import { ACCOUNTANT_CREATE_BANKSCHEDULE_RESET } from "../../types/bankschedules";
import cookie from "js-cookie";

const Voucher = ({ toggle, toggleMenu, mobileToggle, toggleMobileMenu }) => {
  // history init
  const dispatch = useDispatch();
  const history = useHistory();
  // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  const { vouchers, isLoading: accountantGetApprovedSalaryslipsLoading } =
    useSelector((state) => state.accountantGetApprovedVouchers);
  const {
    vouchers: auditorPreApprovedVouchers,
    isLoading: auditorPreApproveVouchersLoading,
  } = useSelector((state) => state.auditorGetNotApprovedVouchers);

  const {
    vouchers: ceoPreApprovedVouchers,
    isLoading: ceoPreApprovedVouchersLoading,
  } = useSelector((state) => state.ceoGetPreApprovedVouchers);

  const {
    success: auditorPreApprovedVoucherSuccess,
    error: auditorPreApprovedVoucherError,
  } = useSelector((state) => state.auditorPreApproveVouchers);

  const {
    success: auditorPreApprovedVoucherAllSuccess,
    message: auditorPreApprovedVoucherAllMessage,
    error: auditorPreApprovedVoucherAllError,
  } = useSelector((state) => state.auditorPreApproveVouchersAll);

  const { success: ceoApproveVoucherSuccess, error: ceoApproveVoucherError } =
    useSelector((state) => state.ceoApprovedPreApprovedVouchers);

  const {
    success: ceoApproveVoucherAllSuccess,
    message: ceoApproveVoucherAllMessage,
    error: ceoApproveVoucherErrorAll,
  } = useSelector((state) => state.ceoApprovedPreApprovedVouchersAll);

  const {
    success: accountantDeleteVoucherByIdSuccess,
    error: accountantDeleteVoucherByIdError,
  } = useSelector((state) => state.accountantDeleteVoucherById);

  const {
    success: accountantDeleteBulkVouchersSuccess,
    error: accountantDeleteBulkVouchersError,
  } = useSelector((state) => state.accountantDeleteBulkVouchers);

  const {
    success: accountantCreateBankScheduleSuccess,
    isLoading: accountantCreateBankScheduleLoading,
    error: accountantCreateBankScheduleError,
  } = useSelector((state) => state.accountantCreateBankSchedules);

  const { banks } = useSelector((state) => state.adminGetAllBanks);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  const [isOpen6, setIsOpen6] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const [isOpen8, setIsOpen8] = useState(false);
  // const [isopen9, setisopen9] = useState(false);
  const [arrayIds, setArrayIds] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [usersPerpageCount, setUsersPerpageCount] = useState(0);
  const [preAprrovedVoucherBulk, setPreApprovedVoucherBulk] = useState(false);
  const [approveVoucherBulk, setApproveVoucherBulk] = useState(false);
  const [bankScheduleBulk, setBankScheduleBulk] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownData, setDropdownData] = useState([]);
  const [voucherType, setVoucherType] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Approved");
  const [selectedOption10, setSelectedOption10] = useState(
    currentmonthMethod("long") || ""
  );
  const [selectedOption6, setSelectedOption6] = useState(null);
  const [selectedOption7, setSelectedOption7] = useState("Netpay Only");
  // const [selectedOption7, setSelectedOption7] = useState(null);
  // const [selectedOption8, setSelectedOption8] = useState(
  //   currentmonthMethod("long") || ""
  // );
  // const [selectedOption9, setSelectedOption9] = useState("");

  const [userRole] = useState(adminInfo?.user?.role || "");
  const [companyId] = useState(adminInfo?.user?.companyId || "");
  const [userRoleName] = useState(adminInfo?.user?.name || "");
  const [profileImg] = useState(adminInfo?.user?.photo || "");
  const [approvalLevel] = useState(cookie.get("approvalLevel"));
  const [paymentMethod, setPaymentMethod] = useState("");
  const [rejectComment, setRejectComment] = useState("");
  const [viewReject, setViewReject] = useState(false);
  const [currentVoucher, setCurrentVoucher] = useState(null);
  const [rejectVoucherBulk, setRejectVoucherBulk] = useState(false);
  const [deleteVoucherBulk, setDeleteVoucherBulk] = useState(false);
  const [startCheck, setStartCheck] = useState(0);
  const [endCheck, setEndCheck] = useState(0);
  const [pageData, setPageData] = useState([]);
  const [bankVoucher, setBankVoucher] = useState([]);

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

  const dropdown1 = useMemo(() => {
    return ["Approved", "Rejected"];
  }, []);

  const dropdown2 = useMemo(() => {
    return ["Approved", "Pre-Approved"];
  }, []);

  // const voucherTypedropdown = useMemo(() => {
  //   return ["NetPay Only", "U-Wallet Only"];
  // }, []);

  useEffect(() => {
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      history.push("/signin");
    } else {
      if (
        pageNumber >= 0 ||
        ceoApproveVoucherSuccess ||
        ceoApproveVoucherAllSuccess ||
        auditorPreApprovedVoucherSuccess ||
        auditorPreApprovedVoucherAllSuccess ||
        accountantCreateBankScheduleSuccess
      ) {
        if (userRole === "Accountant") {
          dispatch(
            accountGetApprovedVouchersFunc(
              selectedOption10,
              selectedOption,
              pageNumber ? pageNumber + 1 : 1,
              100
            )
          );
          dispatch(adminGetAllBanksFunc());
        } else if (userRole === "Internal Auditor") {
          dispatch(
            auditorGetnotApprovedVouchersFunc(
              selectedOption10,
              pageNumber ? pageNumber + 1 : 1,
              100
            )
          );
        } else if (userRole === "CEO") {
          if (selectedOption === "Approved") {
            dispatch(
              accountGetApprovedVouchersFunc(
                selectedOption10,
                selectedOption,
                pageNumber ? pageNumber + 1 : 1,
                100
              )
            );
          }
          if (selectedOption === "Pre-Approved") {
            dispatch(
              ceoGetPreApprovedVouchersFunc(
                selectedOption10,
                pageNumber ? pageNumber + 1 : 1,
                100
              )
            );
          }
        }
      }
    }
    // }, [dispatch, history, adminLogin]);
  }, [
    history,
    adminInfo,
    userRole,
    pageNumber,
    dispatch,
    selectedOption10,
    selectedOption,
    ceoApproveVoucherSuccess,
    ceoApproveVoucherAllSuccess,
    auditorPreApprovedVoucherSuccess,
    auditorPreApprovedVoucherAllSuccess,
    accountantCreateBankScheduleSuccess,
  ]);

  useEffect(() => {
    if (userRole === "Accountant") {
      setDropdownData(dropdown1);
      // setVoucherType(voucherTypedropdown);
    } else if (userRole === "CEO") {
      setDropdownData(dropdown2);
    }

    if (userRole === "HR") {
      history.push("dashboard");
    }
    if (userRole === "Employee") {
      history.push("dashboard");
    }
    if (
      vouchers &&
      userRole === "Accountant" &&
      selectedOption === "Approved"
    ) {
      setBankVoucher(vouchers?.approved);
    }
    if (
      vouchers &&
      userRole === "Accountant" &&
      selectedOption === "Rejected"
    ) {
      setBankVoucher(vouchers?.rejectedBankVouchers);
    }
    if (auditorPreApprovedVouchers && userRole === "Internal Auditor") {
      setBankVoucher(auditorPreApprovedVouchers?.notapproved);
    }
    if (vouchers && userRole === "CEO" && selectedOption === "Approved") {
      setBankVoucher(vouchers?.approved);
      dispatch({ type: CEO_GET_PRE_APPROVED_VOUCHERS_RESET });
    }

    if (
      ceoPreApprovedVouchers &&
      userRole === "CEO" &&
      selectedOption === "Pre-Approved"
    ) {
      setBankVoucher(ceoPreApprovedVouchers?.preapproved);
      dispatch({ type: ACCOUNTANT_GET_APPROVED_VOUCHERS_RESET });
    }

    if (searchTerm?.length < 1) {
      setSearchResult(bankVoucher);
    }
  }, [
    userRole,
    vouchers,
    dispatch,
    auditorPreApprovedVouchers,
    ceoPreApprovedVouchers,
    searchTerm,
    bankVoucher,
    dropdown1,
    dropdown2,
    history,
    // voucherTypedropdown,
    selectedOption,
  ]);

  useEffect(() => {
    if (auditorPreApprovedVoucherSuccess && !auditorPreApprovedVoucherError) {
      setSearchTerm("");
    }

    if (
      accountantDeleteBulkVouchersSuccess &&
      !accountantDeleteBulkVouchersError
    ) {
      setSearchTerm("");
    }

    if (
      accountantDeleteBulkVouchersSuccess &&
      !accountantDeleteVoucherByIdError
    ) {
      setSearchTerm("");
    }
  }, [
    ceoApproveVoucherErrorAll,
    ceoApproveVoucherAllSuccess,
    dispatch,
    auditorPreApprovedVoucherSuccess,
    auditorPreApprovedVoucherError,
    ceoApproveVoucherError,
    ceoApproveVoucherSuccess,
    accountantDeleteBulkVouchersError,
    accountantDeleteBulkVouchersSuccess,
    accountantDeleteVoucherByIdError,
    accountantDeleteVoucherByIdSuccess,
  ]);

  // months drop down
  const onOptionClicked10 = (month) => {
    setSelectedOption10(month);
    setIsOpen8(false);
  };

  // for checkbox onchange handler
  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "checkAll") {
      // let tempData = searchResult
      //   ?.slice(startCheck, endCheck)
      let tempData = searchResult?.map((voucher) => {
        return { ...voucher, isChecked: checked };
      });
      let notChecked = searchResult?.filter((el) => {
        return !tempData?.find(
          (tmp) => tmp?.paySlip?.employee?.id === el?.paySlip?.employee?.id
        );
      });

      if (tempData) {
        let dataJoined = [...tempData, ...notChecked].sort((a, b) => {
          var dateA = new Date(a.createdAt),
            dateB = new Date(b.createdAt);
          return dateA - dateB;
        });

        setSearchResult(dataJoined);
      }
    } else {
      let tempData = searchResult?.map((voucher) =>
        voucher?.paySlip?.employee?.id?.toString() === name?.toString()
          ? { ...voucher, isChecked: checked }
          : voucher
      );
      setSearchResult(tempData);
    }
  };

  useEffect(() => {
    if (
      accountantCreateBankScheduleSuccess &&
      !accountantCreateBankScheduleLoading &&
      !accountantCreateBankScheduleError
    ) {
      setSelectedOption7(null);
      setSelectedOption6(null);
    }
  }, [
    accountantCreateBankScheduleSuccess,
    accountantCreateBankScheduleLoading,
    accountantCreateBankScheduleError,
  ]);

  useEffect(() => {
    setArrayIds([]);
    searchResult?.forEach((data) => {
      if (data?.isChecked) {
        setArrayIds((arrayIds) => [...arrayIds, data]);
      }
    });
  }, [searchResult]);

  // toggle func
  const toggling = () => setIsOpen2(!isOpen2);
  const toggling3 = () => setIsOpen3(!isOpen3);
  const toggling6 = () => setIsOpen6(!isOpen6);
  const toggling8 = () => setIsOpen8(!isOpen8);
  // const toggling9 = () => setisopen9(!isopen9);

  // Invoke when user click to request another page.
  const usersPerpage = 100;
  const pagesVisited = pageNumber * usersPerpage;

  const pageCount = Math.ceil(
    Number(
      (vouchers || auditorPreApprovedVouchers || ceoPreApprovedVouchers)
        ?.resultLength
    ) / usersPerpage
  );
  // const pageCount = Math.ceil(paySlip.length / usersPerpage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    if (pageNumber > 0) {
      let usersPerpageNum;
      if (
        (vouchers || auditorPreApprovedVouchers || ceoPreApprovedVouchers)
          ?.resultLength /
          (pageNumber + 1) >
        100
      ) {
        usersPerpageNum = (pageNumber + 1) * 100;
      } else {
        usersPerpageNum = (
          vouchers ||
          auditorPreApprovedVouchers ||
          ceoPreApprovedVouchers
        )?.resultLength;
      }
      setUsersPerpageCount(usersPerpageNum);
    } else {
      if (
        (vouchers || auditorPreApprovedVouchers || ceoPreApprovedVouchers)
          ?.resultLength < 100
      ) {
        setUsersPerpageCount(
          (vouchers || auditorPreApprovedVouchers || ceoPreApprovedVouchers)
            ?.resultLength
        );
      } else {
        setUsersPerpageCount(100);
      }
    }
  }, [
    vouchers,
    pageNumber,
    auditorPreApprovedVouchers,
    ceoPreApprovedVouchers,
  ]);

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    filteredData(searchTerm);
  };

  const filteredData = (value) => {
    if (value !== "") {
      const filteredList = bankVoucher?.filter((data) => {
        return Object.values(
          data?.paySlip?.employee.user?.name +
            " " +
            data?.paySlip?.employee.user?.email +
            " " +
            data.month +
            " " +
            data?.paySlip?.employee?.employeeBank?.name +
            " "
        )
          .join("")
          .toLowerCase()
          .includes(value.toLowerCase());
      });
      setSearchResult(filteredList);
    } else {
      setSearchResult(bankVoucher);
    }
  };

  //auditor preapprove voucher by ids
  const auditorPreApproveVoucherByIds = () => {
    const voucherIds = arrayIds.map((voucher) => voucher?.id);
    if (
      (vouchers || auditorPreApprovedVouchers || ceoPreApprovedVouchers)
        ?.resultLength > 100
    ) {
      dispatch(auditorPreApprovedVouchersAllFunc(selectedOption10));
    } else {
      dispatch(auditorPreApprovedVouchersFunc(voucherIds, selectedOption10));
    }
  };

  //ceo approve voucher by ids
  const ceoApprovedVoucherByIds = () => {
    const voucherIds = arrayIds.map((voucher) => voucher.id);
    if (
      (vouchers || auditorPreApprovedVouchers || ceoPreApprovedVouchers)
        ?.resultLength > 100
    ) {
      dispatch(ceoApprovedVouchersAllFunc(selectedOption10));
    } else {
      dispatch(ceoApprovedVouchersFunc(voucherIds, selectedOption10));
    }
  };

  const onCreateBankScheduleFromApprovedVouchers = () => {
    const vouchers = searchResult?.map((voucher) => {
      return {
        month: voucher?.month,
        id: voucher?.id,
      };
    });
    const amountArray = searchResult?.map((voucher) => voucher?.amount);
    const subTotal = amountArray?.reduce((prev, next) => prev + next, 0);
    dispatch(
      accountantCreateBankscheduleFunc(
        vouchers,
        selectedOption6?.name,
        "Netpay Only",
        // selectedOption7,
        selectedOption10,
        {
          subTotal,
          paidBy: adminInfo?.user?.name,
          paymentMethod,
        }
      )
    );
  };

  const auditorOrCeoRejectVoucherBulk = () => {
    const voucherIds = arrayIds.map((el) => el?.id);
    const voucherWithComments = voucherIds?.map((el) => {
      return {
        // voucher: el,
        id: el,
        comment: rejectComment,
      };
    });

    if (userRole === "Internal Auditor") {
      dispatch(
        auditorRejectNotApprovedVouchersFunc(
          voucherWithComments,
          selectedOption10,
          companyId,
          userRole
        )
      );
    }

    if (userRole === "CEO") {
      // dispatch ceo action
      dispatch(
        ceoRejectPreApprovedVouchersFunc(
          voucherWithComments,
          selectedOption10,
          companyId,
          userRole
        )
      );
    }
  };

  const deleteVoucherById = () => {
    if (currentVoucher) {
      dispatch(
        accountantDeleteVoucherByIdFunc(
          currentVoucher?.id,
          selectedOption10,
          selectedOption
        )
      );
    }
  };

  const deleteBulkVouchers = () => {
    const vouchersArr = arrayIds.map((el) => el?.id);
    dispatch(
      accountantDeleteBulkVoucherFunc(
        vouchersArr,
        selectedOption10,
        selectedOption
      )
    );
  };

  // confirm Modal popup
  const onOpenConfirm = () => {
    if (isOpen4 === false || bankScheduleBulk === false) {
      setIsOpen4(true);
      setBankScheduleBulk(true);
    }
    if (isOpen5 === true) {
      setIsOpen5(false);
    }
  };

  const onRejectShowConfirm = () => {
    // setIsOpen3(false);
    if (isOpen === true) {
      setIsOpen(false);
    }
    setCurrentVoucher(null);
    if (
      isOpen4 === false ||
      rejectVoucherBulk === false ||
      viewReject === false
    ) {
      setIsOpen4(true);
      setRejectVoucherBulk(true);
      setViewReject(true);
    }
  };

  //   close all modals
  const closeOption = () => {
    if (
      isOpen2 === true ||
      isOpen3 === true ||
      isOpen6 === true ||
      isOpen8 === true
    ) {
      setIsOpen2(false);
      setIsOpen3(false);
      setIsOpen6(false);
      setIsOpen8(false);
    }
  };

  const onSelect = (slipId) => {
    const findVoucher = bankVoucher?.find(
      (el) => String(el.id) === String(slipId)
    );
    if (findVoucher) {
      setCurrentVoucher(findVoucher);
    }
  };

  //comment popup
  const popup = (id = "") => {
    setIsOpen(!isOpen);

    if (id) {
      onSelect(id);
      setViewReject(!viewReject);
    } else {
      if (viewReject === true) {
        setViewReject(false);
      }
    }

    setRejectComment("");
    // onSelect(id);
  };

  //comfirm popup
  const popup2 = (id = "") => {
    setIsOpen4(!isOpen4);
    if (id) {
      onSelect(id);
    }

    // if (delBulkPayslip) {
    //   setDelBulkPayslip(false);
    // }
  };

  //bankschedule option popup
  const popup3 = () => {
    setIsOpen5(!isOpen5);
    // onSelect(id);
  };

  //view voucher popup
  const popup7 = (id) => {
    setIsOpen7(!isOpen7);
    setCurrentVoucher(null);
    // onSelect(id);
  };

  const onSelectView = (id) => {
    const voucher = vouchers?.find((el) => String(el?.id) === String(id));
    if (voucher) {
      setCurrentVoucher(voucher);
      if (isOpen7 === false) {
        setIsOpen7(true);
      }
    }
  };

  // filter reject/ pre-approved drop down
  const onOptionClicked2 = (filter) => {
    setSelectedOption(filter);
    setIsOpen2(false);
  };

  // filter bank drop down
  const onOptionClicked6 = (bank) => {
    setSelectedOption6(bank);
    setIsOpen3(false);
  };

  // filter voucher type drop down
  const onOptionClicked7 = (type) => {
    setSelectedOption7(type);
    const filteredSearchResult = bankVoucher?.filter(
      (el) => el.paymentType === type
    );
    setSearchResult([...filteredSearchResult]);
    setIsOpen6(false);
  };

  const noBankVoucherDisplay = bankVoucher?.length === 0 && (
    <p className="no__data">
      {userRole === "Internal Auditor" &&
        "No generated bank vouchers to Display "}
      {userRole === "CEO" &&
        (selectedOption === "Approved"
          ? "No approved bank vouchers to Display"
          : "No pre approved bank vouchers to Display")}
      {userRole === "Accountant" &&
        (selectedOption === "Approved"
          ? "No approved bank vouchers to Display"
          : "No rejected bank vouchers to Display")}
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

  const popup8 = () => {
    if (
      (ceoApproveVoucherSuccess && !ceoApproveVoucherError) ||
      (ceoApproveVoucherAllSuccess && !ceoApproveVoucherErrorAll) ||
      auditorPreApprovedVoucherSuccess ||
      auditorPreApprovedVoucherAllSuccess ||
      accountantCreateBankScheduleSuccess
    ) {
      setSearchTerm("");
      dispatch({ type: CEO_APPROVE_PRE_APPROVED_VOUCHERS_RESET });
      dispatch({ type: CEO_APPROVE_PRE_APPROVED_VOUCHERS_ALL_RESET });
      dispatch({ type: AUDITOR_PRE_APPROVE_VOUCHERS_RESET });
      dispatch({ type: AUDITOR_PRE_APPROVE_VOUCHERS_ALL_RESET });
      dispatch({ type: ACCOUNTANT_CREATE_BANKSCHEDULE_RESET });
    }

    if (isOpen8 === true) {
      setIsOpen8(false);
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

  const vch = "active";

  return (
    <>
      {(accountantGetApprovedSalaryslipsLoading ||
        auditorPreApproveVouchersLoading ||
        ceoPreApprovedVouchersLoading) && <LoadingSpinner toggle={toggle} />}

      {ceoApproveVoucherAllSuccess && (
        <Successful
          isOpen7={ceoApproveVoucherAllSuccess}
          popup7={popup8}
          message={
            ceoApproveVoucherAllMessage || "Your request is being processed"
          }
          toggle={toggle}
        />
      )}
      {auditorPreApprovedVoucherAllSuccess && (
        <Successful
          isOpen7={auditorPreApprovedVoucherAllSuccess}
          popup7={popup8}
          message={
            auditorPreApprovedVoucherAllMessage ||
            "Your request is being processed"
          }
          toggle={toggle}
        />
      )}
      <BankScheduleOption
        isopen={isOpen5}
        userName={adminInfo?.user?.name}
        popup={popup3}
        onOpenAct={onOpenConfirm}
        setPaymentMethod={setPaymentMethod}
      />

      {preAprrovedVoucherBulk && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          setIsOpen4={setIsOpen4}
          preApprovedVoucherBulk={preAprrovedVoucherBulk}
          setPreApprovedVoucherBulk={setPreApprovedVoucherBulk}
          preApproveVoucherAct={auditorPreApproveVoucherByIds}
        />
      )}

      {approveVoucherBulk && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          setIsOpen4={setIsOpen4}
          approveVoucherBulk={approveVoucherBulk}
          setApproveVoucherBulk={setApproveVoucherBulk}
          approveVoucherAct={ceoApprovedVoucherByIds}
        />
      )}

      {bankScheduleBulk && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          setIsOpen4={setIsOpen4}
          bankScheduleBulk={bankScheduleBulk}
          setBankScheduleBulk={setBankScheduleBulk}
          createBankScheduleAct={onCreateBankScheduleFromApprovedVouchers}
        />
      )}

      {rejectVoucherBulk && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          setIsOpen4={setIsOpen4}
          rejectVoucherBulk={rejectVoucherBulk}
          setRejectVoucherBulk={setRejectVoucherBulk}
          rejectVoucherBulkAct={auditorOrCeoRejectVoucherBulk}
          setRejectComment={setRejectComment}
        />
      )}

      {currentVoucher && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          setIsOpen4={setIsOpen4}
          currentVoucher={currentVoucher}
          setCurrentVoucher={setCurrentVoucher}
          deleteVoucherByIdAct={deleteVoucherById}
        />
      )}

      {!viewReject && (
        <Comment
          isOpen3={isOpen}
          popup3={popup}
          userRole={userRole}
          setRejectComment={setRejectComment}
          rejectComment={rejectComment}
          onRejectShowConfirm={onRejectShowConfirm}
        />
      )}

      {currentVoucher && viewReject && (
        <Comment
          isOpen3={isOpen}
          popup3={popup}
          userRole={userRole}
          currentVoucher={currentVoucher}
        />
      )}

      {deleteVoucherBulk && !currentVoucher && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          setIsOpen4={setIsOpen4}
          deleteVoucherBulk={deleteVoucherBulk}
          setDeleteVoucherBulk={setDeleteVoucherBulk}
          deleteBulkVoucherAct={deleteBulkVouchers}
        />
      )}

      {currentVoucher && (
        <ViewVoucher isOpen={isOpen7} popup={popup7} voucher={currentVoucher} />
      )}

      <DashboardContainer onClick={closeOption}>
        <DashboardContent>
          <SideNav
            userRole={userRole}
            vch={vch}
            toggle={toggle}
            toggleMenu={toggleMenu}
            mobileToggle={mobileToggle}
            toggleMobileMenu={toggleMobileMenu}
          />
          <Mainbody toggle={toggle}>
            <Header
              text="Voucher"
              userRole={userRole}
              userRoleName={userRoleName}
              profileimg={profileImg}
              toggle={toggle}
              toggleMenu={toggleMenu}
              mobileToggle={mobileToggle}
              toggleMobileMenu={toggleMobileMenu}
            />
            <Container>
              {(ceoApproveVoucherError ||
                auditorPreApprovedVoucherError ||
                accountantDeleteBulkVouchersError ||
                accountantDeleteVoucherByIdError ||
                auditorPreApprovedVoucherAllError) && (
                <ErrorBox
                  errorMessage={
                    ceoApproveVoucherError ||
                    auditorPreApprovedVoucherError ||
                    accountantDeleteBulkVouchersError ||
                    accountantDeleteVoucherByIdError ||
                    auditorPreApprovedVoucherAllError
                  }
                />
              )}
              <EmpContainer>
                <div className="row">
                  {userRole === "CEO" && (
                    <DropdownList
                      // list={true}
                      isOpen={isOpen2}
                      toggling={toggling}
                      selectedOption={selectedOption}
                      // cssClass={check}
                      cssClass2={"dropdown__header"}
                      cssClass3={"margin__right2"}
                      text={dropdownData[0]}
                      dataSet={dropdownData}
                      onOptionClicked={onOptionClicked2}
                    />
                  )}
                  {(userRole === "Accountant" ||
                    userRole === "CEO" ||
                    userRole === "Internal Auditor") && (
                    <DropdownList
                      // list={true}
                      isOpen={isOpen8}
                      toggling={toggling8}
                      selectedOption={selectedOption10}
                      // cssClass={check}
                      cssClass2={"month__header"}
                      cssClass3={"margin__left2"}
                      text={currentmonthLong}
                      dataSet={monthArr}
                      onOptionClicked={onOptionClicked10}
                    />
                  )}
                  {userRole === "Accountant" && (
                    <>
                      <input
                        type="button"
                        className={
                          bankVoucher?.length > 0 &&
                          bankVoucher?.every(
                            (voucher) =>
                              voucher?.statusLevel === "approved" &&
                              voucher?.status === 3 &&
                              !voucher?.processDoneAsSchedule
                          ) &&
                          selectedOption6 &&
                          // selectedOption7 &&

                          disableButton()
                            ? "general__btn margin__left2 mobile__margin__top save__btn"
                            : "general__btn margin__left2 mobile__margin__top disabled__btn"
                        }
                        value="Create Bank Schedule"
                        disabled={
                          (bankVoucher?.length === 0 ||
                            !selectedOption6 ||
                            // !selectedOption7 ||
                            !bankVoucher?.every(
                              (voucher) =>
                                voucher?.statusLevel === "approved" &&
                                voucher?.status === 3 &&
                                !voucher?.processDoneAsSchedule
                            )) &&
                          !disableButton()
                        }
                        onClick={() => {
                          setIsOpen5(true);
                          popup3(true);
                          // setDelBulkPayslip(true);
                        }}
                      />
                    </>
                  )}
                  {userRole === "Accountant" &&
                    selectedOption === "Rejected" && (
                      <>
                        <input
                          type="button"
                          className={
                            disableButton()
                              ? "general__btn margin__left2 mobile__margin__top delete__btn"
                              : "general__btn margin__left2 mobile__margin__top disabled__btn"
                          }
                          value="Delete"
                          onClick={() => {
                            // setIsOpen4(true);
                            // setDelBulkPayslip(true);
                            setIsOpen4(true);
                            setDeleteVoucherBulk(true);
                          }}
                          disabled={!disableButton()}
                        />
                      </>
                    )}
                  {(userRole === "Internal Auditor" || userRole === "CEO") && (
                    <>
                      <input
                        // style={{
                        //   backgroundColor: !disableButton()
                        //     ? "disabled__btn"
                        //     : `${COLORS.green}`,
                        // }}
                        type="button"
                        className={
                          disableButton()
                            ? "general__btn green__btn margin__left2"
                            : "general__btn disabled__btn margin__left2"
                        }
                        value={userRole === "CEO" ? "Approve" : "Pre-Approve"}
                        onClick={() => {
                          if (userRole === "Internal Auditor") {
                            setIsOpen4(true);
                            setPreApprovedVoucherBulk(true);
                          } else if (userRole === "CEO") {
                            setIsOpen4(true);
                            setApproveVoucherBulk(true);
                          }
                        }}
                        disabled={!disableButton()}
                      />
                      <input
                        type="button"
                        className={
                          disableButton()
                            ? "general__btn margin__left2 mobile__margin__top delete__btn"
                            : "general__btn margin__left2 mobile__margin__top disabled__btn"
                        }
                        onClick={() => {
                          if (viewReject) {
                            setViewReject(false);
                          }

                          setIsOpen(true);
                        }}
                        disabled={!disableButton()}
                        value="Reject"
                      />
                    </>
                  )}
                  {userRole === "Accountant" && (
                    <>
                      <DropdownList
                        // list={true}
                        isOpen={isOpen2}
                        toggling={toggling}
                        selectedOption={selectedOption}
                        // cssClass={check}
                        cssClass2={"dropdown__header"}
                        cssClass3={"margin__left2 mobile__margin__top"}
                        text={dropdownData[0]}
                        dataSet={dropdownData}
                        onOptionClicked={onOptionClicked2}
                      />

                      {/* <DropdownList
                        // list={true}
                        isOpen={isOpen6}
                        toggling={toggling6}
                        selectedOption={selectedOption7}
                        // cssClass={check}
                        cssClass2={"dropdown__header"}
                        cssClass3={"margin__left2 mobile__margin__top"}
                        text="--Select Voucher Type"
                        // text={dropdownData[0]}
                        dataSet={voucherType}
                        onOptionClicked={onOptionClicked7}
                      /> */}

                      {selectedOption !== "Rejected" && (
                        <DropdownList
                          list={true}
                          isOpen={isOpen3}
                          toggling={toggling3}
                          selectedOption={selectedOption6}
                          // cssClass={check}
                          cssClass2={"dropdown__header"}
                          cssClass3={"margin__left2 mobile__margin__top"}
                          text="--Select a Bank"
                          // text={dropdownData[0]}
                          dataSet={banks}
                          onOptionClicked={onOptionClicked6}
                        />
                      )}
                    </>
                  )}
                </div>
                <div className="search__container mobile__margin__top">
                  <SearchBar term={searchTerm} searchKeyWord={searchHandler} />
                  <span className="icons search__icon">
                    <FontAwesomeIcon icon={["fas", "search"]} />
                  </span>
                </div>
              </EmpContainer>
              <div className="table__body">
                <div className="table__overflow full__height">
                  <table>
                    <thead>
                      <tr>
                        {(userRole === "Accountant" ||
                          userRole === "CEO" ||
                          userRole === "Internal Auditor") && (
                          <th>
                            <input
                              type="checkbox"
                              name="checkAll"
                              // checked={searchResult.filter((user) => user?.isChecked !== true).length < 1}
                              checked={
                                // searchResult?.length === 0
                                // false
                                searchResult?.length === 0 ||
                                searchResult === undefined
                                  ? false
                                  : // : !pageData?.some(
                                    !searchResult?.some(
                                      (voucher) => voucher?.isChecked !== true
                                    )
                              }
                              onChange={handleChange}
                            />
                          </th>
                        )}
                        <th>S/N</th>
                        <th>Staff Name</th>
                        <th>Bank</th>
                        <th>Account No</th>
                        <th>Total Amount</th>
                        {selectedOption === "Approved" ? (
                          <th>Remarks</th>
                        ) : (
                          <th>CommentBy</th>
                        )}
                        <th>Voucher Type</th>
                        <th>Status</th>
                        {(userRole === "Accountant" ||
                          userRole === "CEO" ||
                          userRole === "Internal Auditor") && <th>Action</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {searchResult
                        // ?.slice(pagesVisited, pagesVisited + usersPerpage)
                        ?.map((voucher, indexes) => (
                          <tr key={voucher?.id}>
                            {(userRole === "Accountant" ||
                              userRole === "CEO" ||
                              userRole === "Internal Auditor") && (
                              <td>
                                <input
                                  type="checkbox"
                                  // value={item.name}
                                  name={voucher?.paySlip?.employee?.id}
                                  checked={voucher?.isChecked || false}
                                  onChange={handleChange}
                                />
                              </td>
                            )}
                            <td>{++indexes}</td>
                            <td>{voucher?.paySlip?.employee?.user?.name}</td>
                            <td>{voucher?.paySlip?.employee?.employeeBank}</td>
                            <td>
                              {
                                voucher?.paySlip?.employee
                                  ?.employeeBankAcctNumber
                              }
                            </td>
                            <td>
                              NGN
                              {voucher?.amount ? commafy(voucher?.amount) : 0}
                            </td>
                            {selectedOption === "Approved" ? (
                              <td>Staff Salary</td>
                            ) : (
                              <td>{voucher?.commentBy}</td>
                            )}
                            <td>{voucher?.paymentType}</td>
                            <td>
                              <span
                                className={checkStatus(
                                  voucher?.status,
                                  voucher?.statusLevel
                                )}
                              >
                                {checkStatus(
                                  voucher?.status,
                                  voucher?.statusLevel
                                )}
                              </span>
                            </td>
                            {(userRole === "Accountant" ||
                              userRole === "CEO" ||
                              userRole === "Internal Auditor") && (
                              <td>
                                {voucher?.acn}

                                <div className="action__icons">
                                  {/* {voucher?.status ? (
                                    <div
                                      title="View"
                                      className="icons"
                                      onClick={() => onSelectView(voucher?.id)}
                                    >
                                      <FontAwesomeIcon icon={["fas", "eye"]} />
                                    </div>
                                  ) : (
                                    ""
                                  )} */}
                                  {userRole === "Accountant" &&
                                    selectedOption === "Rejected" && (
                                      <>
                                        <div
                                          title="Comment"
                                          className="icons"
                                          onClick={(e) => popup(voucher?.id)}
                                        >
                                          <FontAwesomeIcon
                                            icon={["fas", "comment"]}
                                          />
                                        </div>
                                        <div
                                          title="Delete"
                                          className="icons"
                                          onClick={(e) => popup2(voucher?.id)}
                                        >
                                          <FontAwesomeIcon
                                            icon={["fas", "trash-alt"]}
                                          />
                                        </div>
                                      </>
                                    )}
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {noBankVoucherDisplay}
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
                      (
                        vouchers ||
                        auditorPreApprovedVouchers ||
                        ceoPreApprovedVouchers
                      )?.resultLength < 1
                        ? 0
                        : `${
                            pageNumber > 0 ? pageNumber * 100 + 1 : 1
                          } - ${usersPerpageCount}`
                    }
                    of ${
                      (
                        vouchers ||
                        auditorPreApprovedVouchers ||
                        ceoPreApprovedVouchers
                      )?.resultLength
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

export default Voucher;
