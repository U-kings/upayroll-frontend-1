import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Header, SideNav, SearchBar, ErrorBox } from "../../components";
import {
  Container,
  DashboardContainer,
  DashboardContent,
  Mainbody,
  EmpContainer,
} from "../../styles/library";
import { employeeGetAllPayslipsFunc } from "../../actions/employee";
import { COLORS } from "../../values/colors";
import ReactPaginate from "react-paginate";
import { PaginationContainer } from "../../styles/pagination";
import { LoadingSpinner, ViewSalaryslip } from "../../modals";
import {
  EMPLOYEE_GET_ALL_PAYSLIPS_REQUEST,
  EMPLOYEE_GET_ALL_PAYSLIPS_RESET,
  EMPLOYEE_GET_PERSONAL_DETAILS_SUCCESS,
} from "../../types/employee";
import { adminGetAllMonthlyPayheads } from "../../actions/monthlypayheads";

const PaySlip = ({ toggle, toggleMenu, mobileToggle, toggleMobileMenu }) => {
  // history init
  const history = useHistory();
  // dispatch init
  const dispatch = useDispatch();

  // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  const { employeeInfo } = useSelector((state) => state.employeeLoginStatus);
  const {
    employeePayslips,
    error: employeeGetAllPayslipsError,
    isLoading: employeeGetAllPayslipsLoading,
  } = useSelector((state) => state.employeeGetAllPayslips);

  const { monthlyPayheads } = useSelector(
    (state) => state.adminGetAllMonthlyPayheads
  );

  const [searchResult, setSearchResult] = useState([]);
  const [currentSlip, setCurrentSlip] = useState(null);
  const [isOpen8, setIsOpen8] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [paySlip, setPaySlip] = useState([]);
  const [arrayIds, setArrayIds] = useState([]);
  const [usersPerpageCount, setUsersPerpageCount] = useState(0);
  const [grossSalary, setGrossSalary] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [userRole] = useState(employeeInfo?.user?.role || "");
  const [userRoleName] = useState(employeeInfo?.user?.name || "");
  // const [companyId] = useState(employeeInfo?.user?.companyId || "");
  const [profileImg] = useState(employeeInfo?.user?.photo || "");

  useEffect(() => {
    if (!employeeInfo?.user?.name) {
      history.push("employee-signin");
    } else {
      if (pageNumber >= 0) {
        if (userRole === "Employee") {
          dispatch(
            employeeGetAllPayslipsFunc(pageNumber ? pageNumber + 1 : 1, 100)
          );
        }
      }
    }

    if (
      userRole === "HR" ||
      userRole === "Internal Auditor" ||
      userRole === "CEO" ||
      userRole === "Accountant"
    ) {
      history.push("dashboard");
    }
  }, [history, dispatch, pageNumber, employeeInfo, userRole]);

  useEffect(() => {
    if (employeePayslips && userRole === "Employee") {
      setPaySlip(employeePayslips?.employeePayslips);
    }

    if (searchTerm.length < 1) {
      setSearchResult(paySlip);
    }
  }, [paySlip, searchTerm, userRole, employeePayslips]);

  useEffect(() => {
    if (employeeGetAllPayslipsError) {
      setTimeout(() => {
        dispatch({ type: EMPLOYEE_GET_ALL_PAYSLIPS_RESET });
      }, 5000);
    }
  }, [employeeGetAllPayslipsError, dispatch]);

  // Invoke when user click to request another page.
  const usersPerpage = 100;
  const pagesVisited = pageNumber * usersPerpage;
  const pageCount = Math.ceil(Number([]?.resultLength) / usersPerpage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    if (pageNumber > 0) {
      let usersPerpageNum;
      if (employeePayslips?.resultLength / (pageNumber + 1) > 100) {
        usersPerpageNum = (pageNumber + 1) * 100;
      } else {
        usersPerpageNum = employeePayslips?.resultLength;
      }
      setUsersPerpageCount(usersPerpageNum);
    } else {
      if (employeePayslips?.resultLength < 100) {
        setUsersPerpageCount(employeePayslips?.resultLength);
      } else {
        setUsersPerpageCount(100);
      }
    }
  }, [employeePayslips, pageNumber]);

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    filteredData(searchTerm);
  };

  // filter function
  const filteredData = (value) => {
    if (value !== "") {
      const filteredList = paySlip.filter((data) => {
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
      setSearchResult(paySlip);
    }
  };

  // for checkbox onchange handler
  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "checkAll") {
      let tempData = searchResult?.map((payslip) => {
        return { ...payslip, isChecked: checked };
      });
      let notChecked = searchResult?.filter((el) => {
        return !tempData?.find((tmp) => tmp?.employee.id === el?.employee.id);
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
      let tempUsers = searchResult.map((payslip) =>
        payslip.employee.id?.toString() === name?.toString()
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

  useEffect(() => {
    if (!monthlyPayheads) {
      dispatch(adminGetAllMonthlyPayheads());
    }
  }, [dispatch, monthlyPayheads]);

  const onSelect = (slipId) => {
    const findSlip = paySlip.find((el) => String(el.id) === String(slipId));
    if (findSlip || !currentSlip) {
      setCurrentSlip(findSlip);
    }
  };

  const popup8 = (id) => {
    setIsOpen8(!isOpen8);
    onSelect(id);
  };

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

  const checkStatus = (status, statusLevel = "") => {
    let statusDisplay = "";
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

  // const popup4 = (id) => {
  //   setIsOpen4(!isOpen4);
  //   onSelect(id);
  //   if (delBulkPayslip) {
  //     setDelBulkPayslip(false);
  //   }
  // };

  const psl = "active";

  return (
    <>
      {/* <DashboardContainer onClick={closeOption}> */}
      {employeeGetAllPayslipsLoading && <LoadingSpinner />}

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
      <DashboardContainer>
        <DashboardContent>
          <SideNav
            psl={psl}
            userRole={userRole}
            toggle={toggle}
            toggleMenu={toggleMenu}
            mobileToggle={mobileToggle}
            toggleMobileMenu={toggleMobileMenu}
          />
          <Mainbody toggle={toggle}>
            <Header
              text="Pay Slip"
              userRole={userRole}
              userRoleName={userRoleName}
              profileimg={profileImg}
              toggle={toggle}
              toggleMenu={toggleMenu}
              mobileToggle={mobileToggle}
              toggleMobileMenu={toggleMobileMenu}
            />
            <Container>
              {employeeGetAllPayslipsError && (
                <ErrorBox errorMessage={employeeGetAllPayslipsError} />
              )}
              <EmpContainer>
                <div className="row"></div>
                <div className="row">
                  {userRole === "Employee" && (
                    <>
                      {/* <input
                        type="button"
                        className="general__btn"
                        // className={
                        //   paySlip.length
                        //     ? "general__btn green__btn"
                        //     : "general__btn disabled__btn"
                        // }
                        // onClick={downloadSalaryslipAct}
                        // disabled={!paySlip.length}
                        value="Download As PDF File"
                      /> */}

                      <div className="search__container">
                        <SearchBar
                          term={searchTerm}
                          searchKeyWord={searchHandler}
                        />
                        <span className="icons search__icon">
                          <FontAwesomeIcon icon={["fas", "search"]} />
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </EmpContainer>
              <div className="table__body">
                <div className="table__overflow">
                  <table>
                    <thead>
                      <tr>
                        {userRole === "Employee" && (
                          <th>
                            <input
                              type="checkbox"
                              name="checkAll"
                              // checked={users.filter((user) => user?.isChecked !== true).length < 1}
                              checked={
                                searchResult.length === 0
                                  ? false
                                  : !searchResult.some(
                                      (user) => user?.isChecked !== true
                                    )
                              }
                              onChange={handleChange}
                            />
                          </th>
                        )}
                        <th>Employee No</th>
                        <th>Salary Month</th>
                        <th>Earnings</th>
                        <th>Deduction</th>
                        <th>Net Salary</th>
                        <th>Status</th>
                        {/* {userRole === "HR" ||
                        userRole === "Internal Auditor" ||
                        userRole === "CEO" ? ( */}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResult
                        ?.sort((a, b) => b - a)
                        ?.map((employee) => {
                          return (
                            <tr key={employee?.id}>
                              {userRole === "Employee" && (
                                <td>
                                  <input
                                    type="checkbox"
                                    // value={item.name}
                                    name={employee?.employee?.id}
                                    checked={employee?.isChecked || false}
                                    onChange={handleChange}
                                  />
                                </td>
                              )}
                              <td>{employee?.id}</td>
                              <td>{`${employee?.month} `}</td>
                              <td>
                                {employee?.totalEarnings
                                  ? employee?.totalEarnings
                                  : 0}
                              </td>
                              <td>{employee?.deductionTotal}</td>
                              <td>{employee?.netSalary}</td>
                              <td>
                                <span
                                  className={checkStatus(
                                    employee?.status,
                                    employee?.statusLevel
                                  )}
                                >
                                  {checkStatus(
                                    employee?.status,
                                    employee?.statusLevel
                                  ) === "generated"
                                    ? "is generated"
                                    : `${employee?.statusLevel}`}
                                </span>
                              </td>
                              {userRole === "Employee" && (
                                <td>
                                  {employee.acn}
                                  <div className="action__icons">
                                    <div
                                      title="View Pay Slip"
                                      className="icons"
                                      onClick={(e) => popup8(employee?.id)}
                                    >
                                      <FontAwesomeIcon icon={["fas", "eye"]} />
                                    </div>
                                    {/* <div
                                      title="Delete Employee"
                                      className="icons"
                                      onClick={(e) => popup4(employee?.id)}
                                    >
                                      <FontAwesomeIcon
                                        icon={["fas", "trash-alt"]}
                                      />
                                    </div> */}
                                  </div>
                                </td>
                              )}
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
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
                      employeePayslips?.resultLength < 1
                        ? 0
                        : `${
                            pageNumber > 0 ? pageNumber * 100 + 1 : 1
                          } - ${usersPerpageCount}`
                    }
                    of ${employeePayslips?.resultLength}`}
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

export default PaySlip;
