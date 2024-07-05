import React, { useState, useEffect, useCallback, useMemo } from "react";
import { DropdownList, ErrorBox, Header, SideNav } from "../../components";
import {
  DashboardContainer,
  DashboardContent,
  Mainbody,
  Container,
} from "../../styles/library";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Comfirm, LoadingSpinner, Successful } from "../../modals";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutAdmin } from "../../actions/auth";
import { PaginationContainer } from "../../styles/pagination";
import ReactPaginate from "react-paginate";
import { COLORS } from "../../values/colors";
import axios from "axios";
import cookie from "js-cookie";
import { urlConfig } from "../../util/config/config";

const CreateApprovalLevel = ({
  toggle,
  toggleMenu,
  mobileToggle,
  toggleMobileMenu,
}) => {
  // dispatch init
  const dispatch = useDispatch();

  // history init
  const history = useHistory();

  // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);

  // func state
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);const [userRole] = useState(adminInfo?.user?.role || "");
  const [userRoleName] = useState(adminInfo?.user?.name || "");
  const [profileImg] = useState(adminInfo?.user?.photo || "");
  const [usersPerpageCount, setUsersPerpageCount] = useState(0);
  const [formData, setForm] = useState({ name: "" });
  const [roleId, setRoleId] = useState(null);
  
  const [showSuccess, setShowSuccess] = useState("");
  const [showError, setShowError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [approvalLevelsData, setApprovalLevelsData] = useState([]);

  const approvalTypes = [{ name: "Payslip" }, { name: "Voucher" }];
  const approvalRoles = [
    { name: "Internal Auditor" },
    { name: "CEO" },
    { name: "Accountant" },
  ];

  const approvalLevels = ["Level-1", "Level-2", "Level-3"];
  const approvalLevels2 = ["Level-1", "Level-2"];

  const onOptionClicked = (value) => {
    setSelectedOption(value);
    if (value.name === "Voucher" && selectedOption3 === "Level-3") {
      setSelectedOption3("");
    }
    setIsOpen(false);
  };

  const onOptionClicked2 = (value) => {
    setSelectedOption2(value);
    setIsOpen2(false);
  };
  const onOptionClicked3 = (value) => {
    setSelectedOption3(value);
    setIsOpen3(false);
  };

  const token = cookie.get("token");
  const config = useMemo(() => {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  }, [token]);

  const onSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formData?.id) {
      try {
      } catch (error) {}
    } else {
      const body = {
        approvalType: selectedOption?.name,
        approvalTypeLevel: selectedOption3,
        role: selectedOption2.name,
      };
      try {
        const { data } = await axios.post(
          `${urlConfig.url.PROXYURL}api/approval-levels`,
          body,
          config
        );

        if (data) {
          getApprovalLevels();
          setShowSuccess(true);
          setIsLoading(false);
          onClear();
        }
      } catch (error) {
        // setShowError(error);
        setIsLoading(false);
        setShowError(
          error?.response &&
            (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
                error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message
        );
      }
    }

    // if (formData?.id) {
    //   dispatch(
    //     adminUpdateDepartmentById(formData?.id, {
    //       name: formData.name,
    //     })
    //   );
    // } else {
    //   dispatch(adminCreateDepartment({ name: formData.name }));
    // }
  };

  const deleteRole = async () => {
    try {
      const { data } = await axios.delete(
        `${urlConfig.url.PROXYURL}api/approval-levels/${roleId}`,
        config
      );

      if (data) {
        setRoleId(null);
        setShowSuccess("Successfully deleted");
        getApprovalLevels();
      }
    } catch (error) {
      // setShowError(error);
      setShowError(
        error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message
      );
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

  const onSelect = (id) => {
    let findDp;
    if (approvalLevelsData.length > 0) {
      findDp = approvalLevelsData.find((el) => String(el?.id) === String(id));
      if (findDp) {
        setSelectedOption(findDp?.approvalType);
        setSelectedOption2(findDp?.approvalTypeLevelRole);
        setSelectedOption3(findDp?.approvalTypeLevel);
        // setForm({ name: findDp?.name, id: findDp?.id });
      }
    }
  };

  const onClear = () => {
    // setForm({
    //   name: "",
    // });
    setSelectedOption("");
    setSelectedOption2("");
    setSelectedOption3("");
  };
  const popup4 = (id) => {
    if (id) {
      setRoleId(id);
    }
    setIsOpen4(!isOpen4);
  };

  const closeSucessMessage = () => {
    setShowSuccess("");
  };

  const getApprovalLevels = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${urlConfig.url.PROXYURL}api/approval-levels`,
        config
      );
      if (data) {
        setApprovalLevelsData(data?.approvalLevelRoles);
        setIsLoading(false);
        console.log(data);
      }
    } catch (error) {
      setIsLoading(false);
      setShowError(
        error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message
      );
    }
  }, [config]);

  useEffect(() => {
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      history.push("/signin");
    } else {
      if (pageNumber >= 0) {
        getApprovalLevels();
        // dispatch(getAllDepartment(pageNumber ? pageNumber + 1 : 1, 100));
      }
    }
    if (
      userRole === "Internal Auditor" ||
      // userRole === "CEO" ||
      userRole === "Accountant"
    ) {
      history.push("dashboard");
    } else if (userRole === "Employee") {
      history.push("dashboard");
    }
  }, [adminInfo, dispatch, userRole, history, pageNumber, getApprovalLevels]);

  // Invoke when user click to request another page.
  const usersPerpage = 100;
  const pagesVisited = pageNumber * usersPerpage;
  const pageCount = Math.ceil(
    Number(approvalLevelsData?.length) / usersPerpage
  );

  useEffect(() => {
    if (pageNumber > 0) {
      let usersPerpageNum;
      if (approvalLevelsData?.length / (pageNumber + 1) > 100) {
        usersPerpageNum = (pageNumber + 1) * 100;
      } else {
        usersPerpageNum = approvalLevelsData?.length;
      }
      setUsersPerpageCount(usersPerpageNum);
    } else {
      if (approvalLevelsData?.length < 100) {
        setUsersPerpageCount(approvalLevelsData?.length);
      } else {
        setUsersPerpageCount(100);
      }
    }
  }, [approvalLevelsData, pageNumber]);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  //   toggle func for modals
  const toggling = () => setIsOpen(!isOpen);
  const toggling2 = () => setIsOpen2(!isOpen2);
  const toggling3 = () => setIsOpen3(!isOpen3);

  const dpt = "active";

  return (
    <>
      {isLoading && <LoadingSpinner toggle={toggle} />}
      {/* {roleId && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          popup4={popup4}
          setIsOpen4={setIsOpen4}
          departId={roleId}
          setRoleId={setRoleId}
          setForm={setForm}
        />
      )} */}
      {roleId && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          popup4={popup4}
          setIsOpen4={setIsOpen4}
          deleteRole={deleteRole}
        />
      )}
      <Successful
        isOpen7={showSuccess ? true : false}
        popup7={closeSucessMessage}
        message="successful"
        // message={showSuccess}
        // message="Department updated successfully!"
      />

      {/* {updateDepartmentError && (
        <ErrorBox errorMessage={updateDepartmentError} />
      )} */}
      {showError && <ErrorBox fixed errorMessage={showError} />}
      <DashboardContainer>
        <DashboardContent>
          <SideNav
            userRole={userRole}
            // dpt={dpt}
            toggle={toggle}
            toggleMenu={toggleMenu}
            mobileToggle={mobileToggle}
            toggleMobileMenu={toggleMobileMenu}
          />
          <Mainbody toggle={toggle}>
            <Header
              text="Create Approval Levels"
              // text="Departments"
              userRole={userRole}
              userRoleName={userRoleName}
              profileimg={profileImg}
              toggle={toggle}
              toggleMenu={toggleMenu}
              mobileToggle={mobileToggle}
              toggleMobileMenu={toggleMobileMenu}
            />

            <Container>
              <div className="container__content">
                <div className="form__content">
                  <form onSubmit={onSave}>
                    <div className="label__group">
                      <label>Approval Type (Payslip or Voucher)</label>
                      <DropdownList
                        list={true}
                        isOpen={isOpen}
                        toggling={toggling}
                        selectedOption={selectedOption}
                        text={selectedOption || "-- Select Type"}
                        dataSet={approvalTypes}
                        // dataSet={departments}
                        onOptionClicked={onOptionClicked}
                      />
                    </div>
                    <div className="label__group">
                      <label>Role</label>
                      <DropdownList
                        list={true}
                        isOpen={isOpen2}
                        toggling={toggling2}
                        selectedOption={selectedOption2}
                        text={selectedOption2 || "-- Select Role"}
                        dataSet={approvalRoles}
                        // dataSet={departments}
                        onOptionClicked={onOptionClicked2}
                      />
                    </div>
                    <div className="label__group">
                      <label>Approval Level</label>
                      <DropdownList
                        // list={true}
                        isOpen={isOpen3}
                        toggling={toggling3}
                        selectedOption={selectedOption3}
                        text="-- Select Approval Level"
                        dataSet={
                          selectedOption?.name === "Voucher"
                            ? approvalLevels2
                            : approvalLevels
                        }
                        // dataSet={departments}
                        onOptionClicked={onOptionClicked3}
                      />
                    </div>
                    {/* <div className="label__group">
                      <label>Name</label>
                      <textarea
                        name="name"
                        rows="4"
                        cols="50"
                        value={formData.name}
                        onChange={(e) =>
                          setForm({ ...formData, name: e.target.value })
                        }
                        placeholder="Department name"
                      ></textarea>
                    </div> */}
                    <div className="form__button">
                      <input
                        className={
                          // !formData.name ||
                          isLoading
                            ? // || updateDepartmentLoading
                              "disabled__btn"
                            : "save__btn"
                        }
                        type="submit"
                        disabled={
                          // !formData.name ||
                          isLoading
                          // || updateDepartmentLoading
                        }
                        value={formData?.id ? "Edit" : "Save"}
                      />
                      <input
                        className="cancel__btn margin__left"
                        type="button"
                        onClick={onClear}
                        value="Cancel"
                      />
                    </div>
                  </form>
                </div>
                <div className="table__body">
                  <div className="table__overflow">
                    <table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Type</th>
                          <th>Role</th>
                          <th>Approval Level</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {departments?.map((el, indexes) => ( */}
                        {approvalLevelsData?.map((el, indexes) => (
                          <tr key={el?.id}>
                            <td>{++indexes}</td>
                            <td>{el?.approvalType}</td>
                            <td>{el?.approvalTypeLevelRole}</td>
                            <td>{el?.approvalTypeLevel}</td>
                            <td>
                              <div className="action__icons">
                                <div
                                  style={{ display: "none" }}
                                  title="Edit"
                                  className="icons"
                                  onClick={(e) => onSelect(el?.id)}
                                >
                                  <FontAwesomeIcon icon={["fas", "edit"]} />
                                </div>
                                <div
                                  title="Delete"
                                  className="icons"
                                  onClick={(e) => popup4(el?.id)}
                                >
                                  <FontAwesomeIcon
                                    icon={["fas", "trash-alt"]}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <PaginationContainer style={{ display: "none" }}>
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
                        nextLabel={
                          <FontAwesomeIcon icon={["fas", "angle-right"]} />
                        }
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
                            // searchResult?.length < 1
                            approvalLevelsData?.length < 1
                              ? 0
                              : `${
                                  pageNumber > 0 ? pageNumber * 100 + 1 : 1
                                } - ${usersPerpageCount}`
                          }
                    of ${approvalLevelsData?.length}`}
                          {/* of ${vouchers?.resultLength}`} */}
                        </p>
                      </div>
                    </div>
                  </PaginationContainer>
                </div>
              </div>
            </Container>
          </Mainbody>
        </DashboardContent>
      </DashboardContainer>
    </>
  );
};

export default CreateApprovalLevel;
