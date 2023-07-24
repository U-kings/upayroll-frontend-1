import React, { useState, useEffect } from "react";
import { ErrorBox, Header, SideNav } from "../../components";
import {
  DashboardContainer,
  DashboardContent,
  Mainbody,
  Container,
} from "../../styles/library";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Comfirm, LoadingSpinner, Successful } from "../../modals";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDepartment,
  adminCreateDepartment,
  adminUpdateDepartmentById,
} from "../../actions/department";
import {
  ADMIN_CREATE_DEPARTMENT_RESET,
  ADMIN_UPDATE_DEPARTMENT_BY_ID_RESET,
} from "../../types/department";
import { useHistory } from "react-router-dom";
import { logoutAdmin } from "../../actions/auth";
import { ADMIN_GET_ALL_DEDUCTIONS_RESET } from "../../types/deduction";
import { PaginationContainer } from "../../styles/pagination";
import ReactPaginate from "react-paginate";
import { COLORS } from "../../values/colors";

const Department = ({ toggle, toggleMenu, mobileToggle, toggleMobileMenu }) => {
  // dispatch init
  const dispatch = useDispatch();

  // history init
  const history = useHistory();

  // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  const {
    isLoading: loadingDepartments,
    departments,
    error: departmentsError,
  } = useSelector((state) => state.departmentsReducer);
  const {
    success: createDepartmentSuccess,
    isLoading: createDepartmentLoading,
    error: CreateDepartmentError,
  } = useSelector((state) => state.adminCreateDepartment);

  const {
    success: updateDepartmentSuccess,
    error: updateDepartmentError,
    isLoading: updateDepartmentLoading,
  } = useSelector((state) => state.adminUpdateDepartment);

  // func state
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [usersPerpageCount, setUsersPerpageCount] = useState(0);
  const [formData, setForm] = useState({ name: "" });
  const [departmentId, setDepartmentId] = useState(null);
  const [userRole] = useState(adminInfo?.user?.role || "");
  const [userRoleName] = useState(adminInfo?.user?.name || "");
  const [profileImg] = useState(adminInfo?.user?.photo || "");

  const onSave = (e) => {
    e.preventDefault();
    if (formData?.id) {
      dispatch(
        adminUpdateDepartmentById(formData?.id, {
          name: formData.name,
        })
      );
    } else {
      dispatch(adminCreateDepartment({ name: formData.name }));
    }
  };

  const onSelect = (id) => {
    let findDp;
    if (departments.length > 0) {
      findDp = departments.find((el) => String(el?.id) === String(id));
      if (findDp) {
        setForm({ name: findDp?.name, id: findDp?.id });
      }
    }
  };

  const onClear = () => {
    setForm({
      name: "",
    });
  };
  const popup4 = (id) => {
    if (id) {
      setDepartmentId(id);
    }
    setIsOpen4(!isOpen4);
  };

  const popup7 = () => {
    if (updateDepartmentSuccess && !updateDepartmentError) {
      dispatch({ type: ADMIN_UPDATE_DEPARTMENT_BY_ID_RESET });
      setForm({ name: "" });
      setDepartmentId(null);
    }
  };

  useEffect(() => {
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      history.push("/signin");
    } else {
      if (pageNumber >= 0) {
        dispatch(getAllDepartment(pageNumber ? pageNumber + 1 : 1, 100));
      }
    }
    if (
      userRole === "Internal Auditor" ||
      userRole === "CEO" ||
      userRole === "Accountant"
    ) {
      history.push("dashboard");
    } else if (userRole === "Employee") {
      history.push("dashboard");
    }
    if (createDepartmentSuccess) {
      dispatch({ type: ADMIN_CREATE_DEPARTMENT_RESET });
      setForm({
        name: "",
      });
    }
    if (CreateDepartmentError) {
      dispatch({ type: ADMIN_UPDATE_DEPARTMENT_BY_ID_RESET });
    }
    if (updateDepartmentError) {
      dispatch({ type: ADMIN_CREATE_DEPARTMENT_RESET });
    }
  }, [
    adminInfo,
    dispatch,
    userRole,
    history,
    pageNumber,
    createDepartmentSuccess,
    CreateDepartmentError,
    updateDepartmentError,
  ]);

  useEffect(() => {
    if (departmentsError === "no token was passed") {
      dispatch(logoutAdmin("no token was passed"));
      dispatch({ type: ADMIN_GET_ALL_DEDUCTIONS_RESET });
    }
  }, [dispatch, departmentsError]);

  // Invoke when user click to request another page.
  const usersPerpage = 100;
  const pagesVisited = pageNumber * usersPerpage;
  const pageCount = Math.ceil(Number(departments?.length) / usersPerpage);

  useEffect(() => {
    if (pageNumber > 0) {
      let usersPerpageNum;
      if (departments?.length / (pageNumber + 1) > 100) {
        usersPerpageNum = (pageNumber + 1) * 100;
      } else {
        usersPerpageNum = departments?.length;
      }
      setUsersPerpageCount(usersPerpageNum);
    } else {
      if (departments?.length < 100) {
        setUsersPerpageCount(departments?.length);
      } else {
        setUsersPerpageCount(100);
      }
    }
  }, [departments, pageNumber]);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const dpt = "active";

  return (
    <>
      {loadingDepartments && <LoadingSpinner toggle={toggle} />}
      {departmentId && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          popup4={popup4}
          setIsOpen4={setIsOpen4}
          departId={departmentId}
          setDepartmentId={setDepartmentId}
          setForm={setForm}
        />
      )}
      <Successful
        isOpen7={isOpen7 || (updateDepartmentSuccess && !updateDepartmentError)}
        popup7={popup7}
        setIsOpen7={setIsOpen7}
        message="Department updated successfully!"
      />

      {updateDepartmentError && (
        <ErrorBox errorMessage={updateDepartmentError} />
      )}
      <DashboardContainer>
        <DashboardContent>
          <SideNav
            userRole={userRole}
            dpt={dpt}
            toggle={toggle}
            toggleMenu={toggleMenu}
            mobileToggle={mobileToggle}
            toggleMobileMenu={toggleMobileMenu}
          />
          <Mainbody toggle={toggle}>
            <Header
              text="Departments"
              userRole={userRole}
              userRoleName={userRoleName}
              profileimg={profileImg}
              toggle={toggle}
              toggleMenu={toggleMenu}
              mobileToggle={mobileToggle}
              toggleMobileMenu={toggleMobileMenu}
            />

            <Container>
              {CreateDepartmentError && (
                <ErrorBox errorMessage={CreateDepartmentError} />
              )}
              <div className="container__content">
                <div className="form__content">
                  <form onSubmit={onSave}>
                    <div className="label__group">
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
                    </div>
                    <div className="form__button">
                      <input
                        className={
                          !formData.name ||
                          createDepartmentLoading ||
                          updateDepartmentLoading
                            ? "disabled__btn"
                            : "save__btn"
                        }
                        type="submit"
                        disabled={
                          !formData.name ||
                          createDepartmentLoading ||
                          updateDepartmentLoading
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
                          <th>Department</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {departments?.map((el, indexes) => (
                          <tr key={el?.id}>
                            <td>{++indexes}</td>
                            <td>{el?.name?.toUpperCase()}</td>
                            <td>
                              <div className="action__icons">
                                <div
                                  title="Edit"
                                  className="icons"
                                  onClick={(e) => onSelect(el?.id)}
                                >
                                  {" "}
                                  <FontAwesomeIcon
                                    icon={["fas", "edit"]}
                                  />{" "}
                                </div>
                                <div
                                  title="Delete"
                                  className="icons"
                                  onClick={(e) => popup4(el?.id)}
                                >
                                  {" "}
                                  <FontAwesomeIcon
                                    icon={["fas", "trash-alt"]}
                                  />{" "}
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
                            departments?.length < 1
                              ? 0
                              : `${
                                  pageNumber > 0 ? pageNumber * 100 + 1 : 1
                                } - ${usersPerpageCount}`
                          }
                    of ${departments?.length}`}
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

export default Department;
