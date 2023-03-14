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
  auditorPreApprovedVouchersFunc,
  auditorRejectNotApprovedVouchersFunc,
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

const Voucher = () => {
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

  const { success: ceoApproveVoucherSuccess, error: ceoApproveVoucherError } =
    useSelector((state) => state.ceoApprovedPreApprovedVouchers);

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
  // const [isOpen9, setIsOpen9] = useState(false);
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
  const [selectedOption7, setSelectedOption7] = useState(null);
  // const [selectedOption8, setSelectedOption8] = useState(
  //   currentmonthMethod("long") || ""
  // );
  // const [selectedOption9, setSelectedOption9] = useState("");

  const [userRole] = useState(adminInfo?.user?.role || "");
  const [userRoleName] = useState(adminInfo?.user?.name || "");
  const [profileImg] = useState(adminInfo?.user?.photo || "");
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

  const voucherTypedropdown = useMemo(() => {
    return ["NetPay Only", "U-Wallet Only"];
  }, []);

  useEffect(() => {
    if (userRole === "Accountant") {
      setDropdownData(dropdown1);
      setVoucherType(voucherTypedropdown);
    } else if (userRole === "CEO") {
      setDropdownData(dropdown2);
    }

    if (userRole === "HR") {
      history.push("dashboard");
    } else if (userRole === "Employee") {
      history.push("dashboard");
    }

    if (vouchers && userRole === "Accountant") {
      setBankVoucher(vouchers);
    } else if (auditorPreApprovedVouchers && userRole === "Internal Auditor") {
      setBankVoucher(auditorPreApprovedVouchers);
    } else if (ceoPreApprovedVouchers) {
      if (selectedOption === "Approved") {
        setBankVoucher(vouchers);
      } else {
        setBankVoucher(ceoPreApprovedVouchers);
      }
    } else {
      <LoadingSpinner />;
    }

    if (searchTerm.length < 1) {
      setSearchResult(bankVoucher);
    }
  }, [
    userRole,
    vouchers,
    auditorPreApprovedVouchers,
    ceoPreApprovedVouchers,
    searchTerm,
    bankVoucher,
    dropdown1,
    dropdown2,
    history,
    voucherTypedropdown,
    selectedOption,
  ]);

  useEffect(() => {
    if (auditorPreApprovedVoucherSuccess && !auditorPreApprovedVoucherError) {
      setSearchTerm("");
    }

    if (ceoApproveVoucherSuccess && !ceoApproveVoucherError) {
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
  const onOptionClicked10 = (month) => () => {
    setSelectedOption10(month);
    setIsOpen8(false);
  };

  useEffect(() => {
    if (pageNumber > 0) {
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
      let tempData = searchResult
        ?.slice(startCheck, endCheck)
        ?.map((voucher) => {
          return { ...voucher, isChecked: checked };
        });
      let notChecked = searchResult?.filter((el) => {
        return !tempData?.find(
          (tmp) =>
            tmp?.salarySlip?.employee?.EMPID === el?.salarySlip?.employee?.EMPID
        );
      });
      let dataJoined = [...tempData, ...notChecked].sort((a, b) => {
        var dateA = new Date(a.createdAt),
          dateB = new Date(b.createdAt);
        return dateA - dateB;
      });

      setSearchResult(dataJoined);
    } else {
      let tempData = searchResult?.map((voucher) =>
        voucher?.salarySlip?.employee?.EMPID === name
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
    searchResult.forEach((data) => {
      if (data.isChecked) {
        setArrayIds((arrayIds) => [...arrayIds, data]);
      }
    });
  }, [searchResult]);

  // toggle func
  const toggling = () => setIsOpen2(!isOpen2);
  const toggling3 = () => setIsOpen3(!isOpen3);
  const toggling6 = () => setIsOpen6(!isOpen6);
  const toggling8 = () => setIsOpen8(!isOpen8);
  // const toggling9 = () => setIsOpen9(!isOpen9);

  // Invoke when user click to request another page.
  const usersPerpage = 40;
  const pagesVisited = pageNumber * usersPerpage;

  const pageCount = Math.ceil(searchResult?.length / usersPerpage);
  // const pageCount = Math.ceil(salarySlip.length / usersPerpage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    if (pageNumber > 0) {
      let usersPerpageNum;
      if (searchResult?.length / (pageNumber + 1) > 40) {
        usersPerpageNum = (pageNumber + 1) * 40;
      } else {
        usersPerpageNum = searchResult?.length;
      }
      setUsersPerpageCount(usersPerpageNum);
    } else {
      if (searchResult?.length < 40) {
        setUsersPerpageCount(searchResult?.length);
      } else {
        setUsersPerpageCount(40);
      }
    }
  }, [searchResult, pageNumber]);

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    filteredData(searchTerm);
  };

  const filteredData = (value) => {
    if (value !== "") {
      const filteredList = bankVoucher?.filter((data) => {
        return Object.values(
          data?.salarySlip?.employee.user?.name +
            " " +
            data?.salarySlip?.employee.user?.email +
            " " +
            data.month +
            " " +
            data?.salarySlip?.employee?.employeeBank?.name +
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

  const auditorPreApproveVoucherByIds = () => {
    const voucherIds = arrayIds.map((voucher) => voucher?._id);
    dispatch(auditorPreApprovedVouchersFunc(voucherIds, selectedOption10));
  };

  const ceoApprovedVoucherByIds = () => {
    const voucherIds = arrayIds.map((voucher) => voucher._id);
    dispatch(ceoApprovedVouchersFunc(voucherIds, selectedOption10));
  };

  const onCreateBankScheduleFromApprovedVouchers = () => {
    const vouchers = searchResult?.map((voucher) => {
      return {
        month: voucher?.month,
        id: voucher?._id,
      };
    });
    const amountArray = searchResult?.map((voucher) => voucher?.amount);
    const subTotal = amountArray?.reduce((prev, next) => prev + next, 0);
    dispatch(
      accountantCreateBankscheduleFunc(
        vouchers,
        selectedOption6?.name,
        selectedOption7,
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
    const voucherIds = arrayIds.map((el) => el?._id);
    const voucherWithComments = voucherIds?.map((el) => {
      return {
        voucher: el,
        comment: rejectComment,
      };
    });

    if (userRole === "Internal Auditor") {
      dispatch(
        auditorRejectNotApprovedVouchersFunc(
          voucherWithComments,
          selectedOption10
        )
      );
    }

    if (userRole === "CEO") {
      // dispatch ceo action
      dispatch(
        ceoRejectPreApprovedVouchersFunc(voucherWithComments, selectedOption10)
      );
    }
  };

  const deleteVoucherById = () => {
    if (currentVoucher) {
      dispatch(
        accountantDeleteVoucherByIdFunc(
          currentVoucher?._id,
          selectedOption10,
          selectedOption
        )
      );
    }
  };

  const deleteBulkVouchers = () => {
    const vouchersArr = arrayIds.map((el) => el?._id);
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
    setIsOpen4(true);
    setBankScheduleBulk(true);
    setIsOpen5(false);
  };

  const onRejectShowConfirm = () => {
    // setIsOpen3(false);
    setIsOpen(false);
    setIsOpen4(true);
    setRejectVoucherBulk(true);
    setCurrentVoucher(null);
    setViewReject(true);
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
      (el) => String(el._id) === String(slipId)
    );
    if (findVoucher) {
      // setCurrentSlip(findSlip);
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
      setViewReject(false);
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
    const voucher = vouchers?.find((el) => String(el._id) === String(id));
    if (voucher) {
      setCurrentVoucher(voucher);
      setIsOpen7(true);
    }
  };

  // filter reject/ pre-approved drop down
  const onOptionClicked2 = (filter) => () => {
    setSelectedOption(filter);
    setIsOpen2(false);
  };

  // filter bank drop down
  const onOptionClicked6 = (bank) => () => {
    setSelectedOption6(bank);
    setIsOpen3(false);
  };

  // filter voucher type drop down
  const onOptionClicked7 = (type) => () => {
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

  useEffect(() => {
    if (userRole === "Accountant") {
      dispatch(
        accountGetApprovedVouchersFunc(selectedOption10, selectedOption)
      );
      dispatch(adminGetAllBanksFunc());
    } else if (userRole === "Internal Auditor") {
      dispatch(auditorGetnotApprovedVouchersFunc(selectedOption10));
    } else if (userRole === "CEO") {
      if (selectedOption === "Approved") {
        dispatch(
          accountGetApprovedVouchersFunc(selectedOption10, selectedOption)
        );
      } else {
        dispatch(ceoGetPreApprovedVouchersFunc(selectedOption10));
      }
    }
  }, [userRole, dispatch, selectedOption10, selectedOption]);

  const disableButton = () => {
    let isTrue = false;
    pageData?.forEach((data) => {
      if (data.isChecked === true) {
        isTrue = data.isChecked;
      }
    });
    return isTrue;
  };

  useEffect(() => {
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      history.push("/");
    }
    // }, [dispatch, history, adminLogin]);
  }, [history, adminInfo]);

  const vch = "active";

  return (
    <>
      {(accountantGetApprovedSalaryslipsLoading ||
        auditorPreApproveVouchersLoading ||
        ceoPreApprovedVouchersLoading) && <LoadingSpinner />}
      <BankScheduleOption
        isopen={isOpen5}
        userName={adminInfo?.user?.name}
        popup={popup3}
        onOpenAct={onOpenConfirm}
        setPaymentMethod={setPaymentMethod}
      />

      {preAprrovedVoucherBulk && (
        <Comfirm
          isOpen4={isOpen4}
          setIsOpen4={setIsOpen4}
          preApprovedVoucherBulk={preAprrovedVoucherBulk}
          setPreApprovedVoucherBulk={setPreApprovedVoucherBulk}
          preApproveVoucherAct={auditorPreApproveVoucherByIds}
        />
      )}

      {approveVoucherBulk && (
        <Comfirm
          isOpen4={isOpen4}
          setIsOpen4={setIsOpen4}
          approveVoucherBulk={approveVoucherBulk}
          setApproveVoucherBulk={setApproveVoucherBulk}
          approveVoucherAct={ceoApprovedVoucherByIds}
        />
      )}

      {bankScheduleBulk && (
        <Comfirm
          isOpen4={isOpen4}
          setIsOpen4={setIsOpen4}
          bankScheduleBulk={bankScheduleBulk}
          setBankScheduleBulk={setBankScheduleBulk}
          createBankScheduleAct={onCreateBankScheduleFromApprovedVouchers}
        />
      )}

      {rejectVoucherBulk && (
        <Comfirm
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
          <SideNav userRole={userRole} vch={vch} />
          <Mainbody>
            <Header
              text="Voucher"
              userRole={userRole}
              userRoleName={userRoleName}
              profileimg={profileImg}
            />
            <Container>
              {(ceoApproveVoucherError ||
                auditorPreApprovedVoucherError ||
                accountantDeleteBulkVouchersError ||
                accountantDeleteVoucherByIdError) && (
                <ErrorBox
                  errorMessage={
                    ceoApproveVoucherError ||
                    auditorPreApprovedVoucherError ||
                    accountantDeleteBulkVouchersError ||
                    accountantDeleteVoucherByIdError
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
                      cssClass3={"margin__right"}
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
                      cssClass3={"margin__right"}
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
                          bankVoucher.length > 0 &&
                          bankVoucher?.every(
                            (voucher) =>
                              voucher?.statusLevel === "approved" &&
                              voucher?.status === 3 &&
                              !voucher?.processDoneAsSchedule
                          ) &&
                          selectedOption6 &&
                          selectedOption7 &&
                          disableButton()
                            ? "general__btn save__btn"
                            : "general__btn disabled__btn"
                        }
                        value="Create Bank Schedule"
                        disabled={
                          (bankVoucher.length === 0 ||
                            !selectedOption6 ||
                            !selectedOption7 ||
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
                  {userRole === "Accountant" && selectedOption === "Rejected" && (
                    <>
                      <input
                        type="button"
                        className={
                          disableButton()
                            ? "general__btn margin__left delete__btn"
                            : "general__btn margin__left disabled__btn"
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
                            ? "general__btn green__btn"
                            : "general__btn disabled__btn"
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
                        disabled={
                          !disableButton()
                        }
                      />
                      <input
                        type="button"
                        className={
                          disableButton()
                            ? "general__btn margin__left delete__btn"
                            : "general__btn margin__left disabled__btn"
                        }
                        onClick={() => {
                          if (viewReject) {
                            setViewReject(false);
                          }

                          setIsOpen(true);
                        }}
                        disabled={
                          !disableButton()
                        }
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
                        cssClass3={"margin__left"}
                        text={dropdownData[0]}
                        dataSet={dropdownData}
                        onOptionClicked={onOptionClicked2}
                      />

                      <DropdownList
                        // list={true}
                        isOpen={isOpen6}
                        toggling={toggling6}
                        selectedOption={selectedOption7}
                        // cssClass={check}
                        cssClass2={"dropdown__header"}
                        cssClass3={"margin__left"}
                        text="--Select Voucher Type"
                        // text={dropdownData[0]}
                        dataSet={voucherType}
                        onOptionClicked={onOptionClicked7}
                      />

                      {selectedOption !== "Rejected" && (
                        <DropdownList
                          list={true}
                          isOpen={isOpen3}
                          toggling={toggling3}
                          selectedOption={selectedOption6}
                          // cssClass={check}
                          cssClass2={"dropdown__header"}
                          cssClass3={"margin__left"}
                          text="--Select a Bank"
                          // text={dropdownData[0]}
                          dataSet={banks}
                          onOptionClicked={onOptionClicked6}
                        />
                      )}
                    </>
                  )}
                </div>
                <div className="search__container">
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
                                searchResult.length === 0
                                  ? false
                                  : !pageData?.some(
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
                        ?.slice(pagesVisited, pagesVisited + usersPerpage)
                        ?.map((voucher, indexes) => (
                          <tr key={voucher?._id}>
                            {(userRole === "Accountant" ||
                              userRole === "CEO" ||
                              userRole === "Internal Auditor") && (
                              <td>
                                <input
                                  type="checkbox"
                                  // value={item.name}
                                  name={voucher?.salarySlip?.employee?.EMPID}
                                  checked={voucher?.isChecked || false}
                                  onChange={handleChange}
                                />
                              </td>
                            )}
                            <td>{++indexes}</td>
                            <td>{voucher?.salarySlip?.employee?.user?.name}</td>
                            <td>
                              {voucher?.salarySlip?.employee?.employeeBank}
                            </td>
                            <td>
                              {
                                voucher?.salarySlip?.employee
                                  ?.employeeBankAcctNumber
                              }
                            </td>
                            <td>
                              NGN{" "}
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
                                  <div
                                    title="View"
                                    className="icons"
                                    onClick={() => onSelectView(voucher?._id)}
                                  >
                                    <FontAwesomeIcon icon={["fas", "eye"]} />
                                  </div>
                                  {userRole === "Accountant" &&
                                    selectedOption === "Rejected" && (
                                      <>
                                        <div
                                          title="Comment"
                                          className="icons"
                                          onClick={(e) => popup(voucher?._id)}
                                        >
                                          <FontAwesomeIcon
                                            icon={["fas", "comment"]}
                                          />
                                        </div>
                                        <div
                                          title="Delete"
                                          className="icons"
                                          onClick={(e) => popup2(voucher?._id)}
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
                    Rows per page : 40
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
                            pageNumber > 0 ? pageNumber * 40 + 1 : 1
                          } - ${usersPerpageCount}`
                    }
                    of ${searchResult?.length}`}
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
