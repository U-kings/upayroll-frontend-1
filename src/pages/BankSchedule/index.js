import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { adminGetAllBanksFunc } from "../../actions/banklist";
import {
  accountantDeleteBankscheduleByIdFunc,
  accountantGetApprovedScheduleVouchersFunc,
  ceoGetNotApprovedBankSchedulesFunc,
  accountantGetMonthlyBankschedulesFunc,
  ceoApproveBankSchedulesFunc,
} from "../../actions/bankschedules";
import { commafy, decimalFormat } from "../../hooks/calculations/paySlip";
import {
  downloadBankScheduleExcelFileFunc,
  downloadBankSchedulePdfFileFunc,
} from "../../actions/download";
import {
  DropdownList,
  ErrorBox,
  Header,
  SearchBar,
  SideNav,
} from "../../components";

import {
  Comfirm,
  DownloadOption,
  LoadingSpinner,
  ViewBankSchedule,
} from "../../modals";
import {
  Container,
  DashboardContainer,
  DashboardContent,
  EmpContainer,
  Mainbody,
  // VoucherContainer,
} from "../../styles/library";
import { COLORS } from "../../values/colors";
import { PaginationContainer } from "../../styles/pagination";
import ReactPaginate from "react-paginate";
import { currentmonthMethod } from "../../hooks/months/listMonths";

function BankSchedule() {
  // history init
  const dispatch = useDispatch();
  const history = useHistory();
  // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  // const { bankSchedules, isLoading } = useSelector(
  //   (state) => state.accountantGetBankschedules
  // );
  const { banks } = useSelector((state) => state.adminGetAllBanks);
  const {
    approvedScheduleVouchers,
    isLoading: getApprovedBankVouchersLoading,
  } = useSelector((state) => state.accountantGetApprovedBankScheduleVouchers);

  const { bankSchedules, isLoading: bankScheduleLoading } = useSelector(
    (state) => state.accountantGetBankSchedules
  );

  const {
    notApprovedBankSchedules,
    isLoading: ceoGetApprovedBankVouchersLoading,
  } = useSelector((state) => state.ceoGetNotApprovedBankSchedules);

  const {
    success: ceoApprovedBankScheduleSuccess,
    error: ceoApprovedBankScheduleError,
  } = useSelector((state) => state.ceoApproveBankSchedules);

  const { isLoading: downloadStatusLoading, error: downloadStatusError } =
    useSelector((state) => state.downloadStatus);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  const [bankSchedule, setBankSchedule] = useState(null);
  const [selectedOption6, setSelectedOption6] = useState(null);
  const [selectedOption10] = useState(currentmonthMethod("long") || "");
  const [bankScheduleData, setBankScheduleData] = useState([]);
  const [arrayIds, setArrayIds] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [usersPerpageCount, setUsersPerpageCount] = useState(0);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [approvedBankScheduleBulk, setApprovedBankScheduleBulk] =
    useState(false);
  const [currentBankScheduleId, setCurrentBankScheduleId] = useState(null);
  const [viewBankScheduleData, setViewBankScheduleData] = useState([]);
  const [startCheck, setStartCheck] = useState(0);
  const [endCheck, setEndCheck] = useState(0);
  const [pageData, setPageData] = useState([]);
  const [userRole] = useState(adminInfo?.user?.role || "");
  const [userRoleName] = useState(adminInfo?.user?.name || "");
  const [profileImg] = useState(adminInfo?.user?.photo || "");

  useEffect(() => {
    if (userRole === "Employee") {
      history.push("dashboard");
    }
    // if (userRole === "HR" || userRole === "Internal Auditor") {
    //   history.push("employee");
    // } else if (userRole === "Employee") {
    //   history.push("pay-slip");
    // }

    if (bankSchedules || notApprovedBankSchedules) {
      if (
        userRole === "Accountant" ||
        userRole === "CEO" ||
        userRole === "HR" ||
        userRole === "Internal Auditor"
      ) {
        setBankScheduleData(bankSchedules);
      } else if (userRole === "CEO") {
        setBankScheduleData(notApprovedBankSchedules);
      }
    }

    if (searchTerm.length < 1) {
      setSearchResult(bankScheduleData);
    }
  }, [
    history,
    userRole,
    approvedScheduleVouchers,
    notApprovedBankSchedules,
    bankSchedules,
    searchTerm,
    bankScheduleData,
  ]);

  useEffect(() => {
    if (ceoApprovedBankScheduleSuccess && !ceoApprovedBankScheduleError) {
      setSearchTerm("");
    }
  }, [ceoApprovedBankScheduleSuccess, ceoApprovedBankScheduleError]);

  const toggling = () => setIsOpen2(!isOpen2);

  // bank filter drop down
  const onOptionClicked = (filter) => () => {
    setSelectedOption6(filter);
    setIsOpen2(false);
  };

  //view bank schedule
  const popup5 = () => {
    setIsOpen5(!isOpen5);
    // onSelect(id);
  };

  // download option popup
  const popup3 = () => {
    setIsOpen3(!isOpen3);
    // setCurrentBankSchedule(null);
    // onSelect(id);
  };

  const close = () => {
    if (isOpen === true || isOpen2 === true) {
      setIsOpen(false);
      setIsOpen2(false);
    }
  };

  const onDelete = (id) => {
    const bankSchedule = bankScheduleData?.find(
      (el) => String(el._id) === String(id)
    );
    if (bankSchedule) {
      setCurrentBankScheduleId(bankSchedule?._id);
      setIsOpen4(true);
    }
  };

  const onClickDownload = (bankSchedule) => {
    setBankSchedule(bankSchedule);
    setIsOpen3(!isOpen3);
  };
  const onClickViewBankSchedule = (bankSchedule) => {
    setBankSchedule(bankSchedule);
    setIsOpen5(!isOpen5);
    let newData;
    newData = approvedScheduleVouchers?.filter(
      (el) => String(el?.bankScheduleId) === String(bankSchedule?._id)
    );
    viewBankSchedule(newData);
  };

  const viewBankSchedule = (newData) => {
    setViewBankScheduleData(newData);
  };

  const onDownloadFileFunc = (fileType) => {
    let newData;
    newData = approvedScheduleVouchers?.filter(
      (el) => String(el.bankScheduleId) === String(bankSchedule?._id)
    );
    if (fileType === "excel") {
      newData = newData?.map((el, indexes) => {
        return {
          sn: ++indexes,
          staffName: el?.salarySlip?.employee?.user?.name,
          remark: el?.remark,
          employeeBank: el?.salarySlip?.employee?.employeeBank,
          amount: el?.amount,
          employeeBankNumber: el?.salarySlip?.employee?.employeeBankAcctNumber,
        };
      });

      dispatch(
        downloadBankScheduleExcelFileFunc(
          selectedOption6?.name.split(" ").join(""),
          `bankSchedule-${bankSchedule?.paymentType}`,
          bankSchedule?.month,
          newData
        )
      );
    } else {
      newData = newData?.map((el) => {
        return {
          staffName: el?.salarySlip?.employee?.user?.name,
          remark: el?.remark,
          employeeBank: el?.salarySlip?.employee?.employeeBank,
          amount: commafy(el?.amount),
          employeeBankNumber: String(
            el?.salarySlip?.employee?.employeeBankAcctNumber
              ? el?.salarySlip?.employee?.employeeBankAcctNumber
              : ""
          ),
        };
      });
      dispatch(
        downloadBankSchedulePdfFileFunc(
          selectedOption6,
          selectedOption6?.accountNumber,
          bankSchedule?.approvedBy,
          `bankschedule-${bankSchedule?.paymentType?.split(" ").join("")}`,
          bankSchedule?.month,
          bankSchedule.ceoSignature,
          newData,
          commafy(decimalFormat(bankSchedule?.subTotal))
        )
      );
    }
    setIsOpen3(false);
  };

  const onDeleteBankScheduleById = () => {
    // dispatch action
    if (currentBankScheduleId) {
      dispatch(
        accountantDeleteBankscheduleByIdFunc(
          currentBankScheduleId,
          selectedOption6?.name
        )
      );
    }
  };

  useEffect(() => {
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      history.push("/");
    } else {
      if (
        userRole === "Accountant" ||
        userRole === "CEO" ||
        userRole === "HR" ||
        userRole === "Internal Auditor"
      ) {
        dispatch(adminGetAllBanksFunc());
        dispatch(accountantGetApprovedScheduleVouchersFunc());
        // dispatch(accountantGetMonthlyBankschedulesFunc());
        dispatch(accountantGetMonthlyBankschedulesFunc(selectedOption6?.name));
      } else if (userRole === "CEO") {
        dispatch(ceoGetNotApprovedBankSchedulesFunc(selectedOption10));
      }
    }
  }, [
    history,
    adminInfo,
    dispatch,
    userRole,
    selectedOption6,
    selectedOption10,
  ]);

  // useEffect(() => {
  // }, [dispatch, selectedOption6]);

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

  useEffect(() => {
    setArrayIds([]);
    searchResult?.forEach((data) => {
      if (data.isChecked) {
        setArrayIds((arrayIds) => [...arrayIds, data]);
      }
    });
  }, [searchResult]);

  const filteredData = (value) => {
    if (value !== "") {
      const filteredList = bankScheduleData?.filter((data) => {
        return Object.values(
          data.month + " " + data.paymentType
          // " " +
          // data?.salarySlip?.employee?.employeeBank?.name +
          // " "
        )
          .join("")
          .toLowerCase()
          .includes(value.toLowerCase());
      });
      setSearchResult(filteredList);
    } else {
      setSearchResult(bankScheduleData);
    }
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
    let tempUsers2 = searchResult?.slice(startCheck, endCheck)?.map((user) => {
      return user;
    });

    setPageData(tempUsers2);
  }, [startCheck, endCheck, searchResult]);

  // for checkbox onchange handler
  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "checkAll") {
      let tempBankSchedule = searchResult
        ?.slice(startCheck, endCheck)
        ?.map((bankSchedule) => {
          return { ...bankSchedule, isChecked: checked };
        });
      let notChecked = searchResult?.filter((el) => {
        return !tempBankSchedule?.find((tmp) => tmp?._id === el?._id);
      });
      let dataJoined = [...tempBankSchedule, ...notChecked].sort((a, b) => {
        var dateA = new Date(a.createdAt),
          dateB = new Date(b.createdAt);
        return dateA - dateB;
      });

      setSearchResult(dataJoined);
    } else {
      let tempBankSchedule = searchResult.map((bankSchedule) =>
        bankSchedule?._id === name
          ? { ...bankSchedule, isChecked: checked }
          : bankSchedule
      );
      setSearchResult(tempBankSchedule);
    }
  };

  const disableButton = () => {
    let isTrue = false;
    pageData?.forEach((data) => {
      if (data.isChecked === true) {
        isTrue = data.isChecked;
      }
    });
    return isTrue;
  };

  const setApprovedBankSchedule = () => {
    const bankScheduleIds = arrayIds.map((el) => el._id);
    dispatch(ceoApproveBankSchedulesFunc(bankScheduleIds, selectedOption10));
  };

  const bnkschd = "active";
  return (
    <>
      {currentBankScheduleId && (
        <Comfirm
          isOpen4={isOpen4}
          setIsOpen4={setIsOpen4}
          currentBankScheduleId={currentBankScheduleId}
          setCurrentBankScheduleId={setCurrentBankScheduleId}
          deleteBankScheduleAct={onDeleteBankScheduleById}
        />
      )}

      {approvedBankScheduleBulk && (
        <Comfirm
          isOpen4={isOpen4}
          setIsOpen4={setIsOpen4}
          setApprovedBankScheduleBulk={setApprovedBankScheduleBulk}
          approvedBankScheduleBulk={approvedBankScheduleBulk}
          setApprovedBankScheduleAct={setApprovedBankSchedule}
          setCurrentBankScheduleId={setCurrentBankScheduleId}
        />
      )}

      {viewBankScheduleData && (
        <ViewBankSchedule
          isOpen={isOpen5}
          popup={popup5}
          bankSchedule={viewBankScheduleData}
        />
      )}

      <DownloadOption
        isOpen3={isOpen3}
        popup3={popup3}
        userRole={userRole}
        onDownloadFileFunc={onDownloadFileFunc}
      />
      <DashboardContainer onClick={close}>
        <DashboardContent>
          <SideNav userRole={userRole} bnkschd={bnkschd} />
          <Mainbody>
            <Header
              text="Bank Schedule"
              userRole={userRole}
              userRoleName={userRoleName}
              profileimg={profileImg}
            />
            <Container>
              {(getApprovedBankVouchersLoading ||
                ceoGetApprovedBankVouchersLoading ||
                (downloadStatusLoading && !downloadStatusError) ||
                getApprovedBankVouchersLoading ||
                bankScheduleLoading ||
                ceoGetApprovedBankVouchersLoading) && <LoadingSpinner />}
              {downloadStatusError && !downloadStatusLoading && (
                <ErrorBox errorMessage={downloadStatusError} />
              )}
              <EmpContainer>
                <div className="row">
                  {userRole === "CEO" && (
                    <>
                      <input
                        type="button"
                        className={
                          !disableButton()
                            ? "general__btn disabled__btn margin__right"
                            : `general__btn save__btn margin__right`
                        }
                        value="Approve"
                        onClick={() => {
                          if (userRole === "CEO") {
                            setIsOpen4(true);
                            setApprovedBankScheduleBulk(true);
                          }
                        }}
                        disabled={!disableButton()}
                      />
                    </>
                  )}
                  <div className="row">
                    {(userRole === "Accountant" ||
                      userRole === "CEO" ||
                      userRole === "HR" ||
                      userRole === "Internal Auditor") && (
                      <>
                        <DropdownList
                          list={true}
                          isOpen={isOpen2}
                          toggling={toggling}
                          selectedOption={selectedOption6}
                          cssClass2={"dropdown__header"}
                          // cssClass3={"margin__left"}
                          text="--Select Bank"
                          dataSet={banks}
                          onOptionClicked={onOptionClicked}
                        />
                      </>
                    )}
                  </div>
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
                        {userRole === "CEO" && (
                          <th>
                            <input
                              type="checkbox"
                              name="checkAll"
                              // checked={searchResult.filter((user) => user?.isChecked !== true).length < 1}
                              checked={
                                searchResult?.length === 0
                                  ? false
                                  : !pageData?.some(
                                      (bankSchedule) =>
                                        bankSchedule?.isChecked !== true
                                    )
                              }
                              onChange={handleChange}
                            />
                          </th>
                        )}
                        <th>S/N</th>
                        <th>Date</th>
                        <th>Sub Total</th>
                        <th>Bank Name</th>
                        <th>Payment Type</th>
                        <th>Approval Status</th>
                        <th>Paid By</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResult
                        ?.slice(pagesVisited, pagesVisited + usersPerpage)
                        ?.map((el, indexes) => (
                          <tr key={el?._id}>
                            {userRole === "CEO" && (
                              <td>
                                <input
                                  type="checkbox"
                                  name={el?._id}
                                  checked={el?.isChecked || false}
                                  onChange={handleChange}
                                />
                              </td>
                            )}
                            <td>{++indexes}</td>
                            <td>
                              {el?.month}/{el?.year}
                            </td>

                            <td>NGN {commafy(decimalFormat(el?.subTotal))}</td>
                            <td>{el?.bankName}</td>
                            <td>{el?.paymentType}</td>
                            <td>
                              {el?.isApproved ? (
                                <span className="approved">approved</span>
                              ) : (
                                <span className="pre__approved">pending</span>
                              )}
                            </td>
                            <td>{el?.paidBy}</td>
                            <td>
                              <div className="action__icons">
                                {el?.isApproved && selectedOption6 && (
                                  <div
                                    title="Download"
                                    className="icons"
                                    onClick={() => onClickDownload(el)}
                                  >
                                    <FontAwesomeIcon
                                      icon={["fas", "file-download"]}
                                    />
                                  </div>
                                )}
                                <div
                                  title="View"
                                  className="icons"
                                  onClick={() => onClickViewBankSchedule(el)}
                                  // onClick={() => onSelectView(el?._id)}
                                >
                                  <FontAwesomeIcon icon={["fas", "eye"]} />
                                </div>
                                {(userRole === "Accountant" ||
                                  userRole === "CEO") && (
                                  <div
                                    title="Delete"
                                    className="icons"
                                    onClick={() => {
                                      onDelete(el?._id);
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={["fas", "trash-alt"]}
                                    />
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {searchResult?.length === 0 && (
                    <p className="no__data">
                      {(userRole === "CEO" || userRole === "HR") &&
                        "No bank schedule created yet to be display"}
                      {userRole === "Accountant" &&
                        "No approved bank schedule to be display"}
                    </p>
                  )}
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
}

export default BankSchedule;
