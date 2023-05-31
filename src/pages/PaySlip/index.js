import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Header, SideNav, SearchBar } from "../../components";
import {
  Container,
  DashboardContainer,
  DashboardContent,
  Mainbody,
  EmpContainer,
} from "../../styles/library";

const PaySlip = ({ toggle, toggleMenu, mobileToggle, toggleMobileMenu }) => {
  // history init
  const history = useHistory();

  // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);

  // const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userRole] = useState(adminInfo?.user?.role || "");
  const [profileImg] = useState(adminInfo?.user?.photo || "");

  useEffect(() => {
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      history.push("employee-signin");
    } else {
      if (userRole === "Employee") {
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

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    // filteredData(searchTerm);
  };

  // filter function
  // const filteredData = (value) => {
  //   if (value !== "") {
  //     const filteredList = salarySlip.filter((data) => {
  //       return Object.values(
  //         data.employee.user?.name +
  //           " " +
  //           data.employee.user?.email +
  //           " " +
  //           data.month +
  //           " "
  //       )
  //         .join("")
  //         .toLowerCase()
  //         .includes(value.toLowerCase());
  //     });
  //     setSearchResult(filteredList);
  //   } else {
  //     setSearchResult(salarySlip);
  //   }
  // };

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
                        //   salarySlip.length
                        //     ? "general__btn green__btn"
                        //     : "general__btn disabled__btn"
                        // }
                        // onClick={downloadSalaryslipAct}
                        // disabled={!salarySlip.length}
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
                                    name={employee.EMPID}
                                    checked={employee?.isChecked || false}
                                    onChange={handleChange}
                                  />
                                </td>
                              )}
                              <td>{employee?.EMPID}</td>
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
          </Mainbody>
        </DashboardContent>
      </DashboardContainer>
    </>
  );
};

export default PaySlip;
