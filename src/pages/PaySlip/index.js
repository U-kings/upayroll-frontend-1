import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Header, SideNav, SearchBar } from "../../components";
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

const PaySlip = ({ toggle, toggleMenu, mobileToggle, toggleMobileMenu }) => {
  // history init
  const history = useHistory();
  // dispatch init
  const dispatch = useDispatch();

  // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  const {
    employeePayslips,
    error: employeeGetAllPayslipsError,
    isLoading: employeeGetAllPayslipsLoading,
  } = useSelector((state) => state.employeeGetAllPayslips);

  const [searchResult, setSearchResult] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [paySlip, setPaySlip] = useState([]);
  const [arrayIds, setArrayIds] = useState([]);
  const [usersPerpageCount, setUsersPerpageCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [userRole] = useState(adminInfo?.user?.role || "");
  const [companyId] = useState(adminInfo?.user?.companyId || "");
  const [profileImg] = useState(adminInfo?.user?.photo || "");

  useEffect(() => {
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      history.push("employee-signin");
    } else {
      if (pageNumber >= 0) {
        if (userRole === "Employee") {
          dispatch(
            // adminGetAllGeneratedPayslips("August", selectedOption)
            employeeGetAllPayslipsFunc(
              companyId,
              userRole
              // pageNumber ? pageNumber + 1 : 1,
              // 100
            )
          );
        }
      }
    }

    if (
      userRole === "HR" ||
      userRole === "Internal Auditor" ||
      userRole === "CEO"
    ) {
      history.push("dashboard");
    }
  }, [history, adminInfo, userRole]);

  useEffect(() => {
    if (paySlip && userRole === "HR") {
      setPaySlip(employeePayslips?.employeePayslips);
    }
  }, [paySlip]);

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
      if (paySlip?.resultLength / (pageNumber + 1) > 100) {
        usersPerpageNum = (pageNumber + 1) * 100;
      } else {
        usersPerpageNum = paySlip?.resultLength;
      }
      setUsersPerpageCount(usersPerpageNum);
    } else {
      if (paySlip?.resultLength < 100) {
        setUsersPerpageCount(paySlip?.resultLength);
      } else {
        setUsersPerpageCount(100);
      }
    }
  }, [paySlip]);

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

  const psl = "active";
  return (
    <>
      {/* <DashboardContainer onClick={closeOption}> */}
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
              profileimg={profileImg}
              toggle={toggle}
              toggleMenu={toggleMenu}
              mobileToggle={mobileToggle}
              toggleMobileMenu={toggleMobileMenu}
            />
            <Container>
              <EmpContainer>
                <div className="row"></div>
                <div className="row">
                  {userRole === "Employee" && (
                    <>
                      <input
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
                      />

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
                        {/* {userRole === "HR" && (
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
                        )} */}
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
                      {/* {searchResult
                        .slice(pagesVisited, pagesVisited + usersPerpage)
                        ?.sort((a, b) => b - a)
                        ?.map((employee) => {
                          return (
                            <tr key={employee?.id}>
                              {userRole === "HR" && (
                                <td>
                                  <input
                                    type="checkbox"
                                    // value={item.name}
                                    name={employee.id}
                                    checked={employee?.isChecked || false}
                                    onChange={handleChange}
                                  />
                                </td>
                              )}
                              <td>{employee?.id}</td>
                              <td>{`${employee?.user.name} `}</td>
                              <td>{employee?.user.email}</td>
                              <td>{employee?.dob.substring(0, 10)}</td>
                              <td>{`+234 ${employee.mobile}`}</td>
                              <td>{employee?.position?.department?.name}</td>
                              <td>{employee?.position?.name}</td>
                              {userRole === "HR" && (
                                <td>
                                  {employee.acn}
                                  <div className="action__icons">
                                    <div
                                      title="View Pay Slip"
                                      className="icons"
                                      onClick={(e) => popup2(employee?.id)}
                                    >
                                      {" "}
                                      <FontAwesomeIcon
                                        icon={["fas", "eye"]}
                                      />{" "}
                                    </div>
                                    <div
                                      title="Delete Employee"
                                      className="icons"
                                      onClick={(e) => popup4(employee?.id)}
                                    >
                                      {" "}
                                      <FontAwesomeIcon
                                        icon={["fas", "trash-alt"]}
                                      />{" "}
                                    </div>
                                  </div>
                                </td>
                              )}
                            </tr>
                          );
                        })} */}
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
                      paySlip?.resultLength < 1
                        ? 0
                        : `${
                            pageNumber > 0 ? pageNumber * 100 + 1 : 1
                          } - ${usersPerpageCount}`
                    }
                    of ${paySlip?.resultLength}`}
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
