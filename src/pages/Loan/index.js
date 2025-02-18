import React, { useState, useEffect } from "react";
import { Header, SideNav } from "../../components";
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

const Loan = ({ toggle, toggleMenu, mobileToggle, toggleMobileMenu }) => {
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
  } = useSelector((state) => state.adminCreateDepartment);

  const {
    success: updateDepartmentSuccess,
    error: updateDepartmentError,
    isLoading: updateDepartmentLoading,
  } = useSelector((state) => state.adminUpdateDepartment);

  // func state
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const [formData, setForm] = useState({ name: "", rate: 0 });
  const [departmentId, setDepartmentId] = useState(null);
  const [userRole] = useState(adminInfo?.user?.role || "");
  const [userRoleName] = useState(adminInfo?.user?.name || "");
  const [profileImg] = useState(adminInfo?.user?.photo || "");

  const loan = "active";

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
      rate: 0,
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
      setForm({ name: "", rate: 0 });
      setDepartmentId(null);
    }
  };

  const onChangeHandler = (e) => {
    setForm({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      history.push("/signin");
    } else {
      dispatch(getAllDepartment());
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
        rate: 0,
      });
    }
  }, [adminInfo, dispatch, userRole, history, createDepartmentSuccess]);

  useEffect(() => {
    if (departmentsError === "no token was passed") {
      dispatch(logoutAdmin("no token was passed"));
      dispatch({ type: ADMIN_GET_ALL_DEDUCTIONS_RESET });
    }
  }, [dispatch, departmentsError]);

  return (
    <>
      {loadingDepartments && <LoadingSpinner toggle={toggle} />}
      {departmentId && (
        <Comfirm toggle={toggle}
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
      <DashboardContainer>
        <DashboardContent>
          <SideNav
            userRole={userRole}
            loan={loan}
            toggle={toggle}
            toggleMenu={toggleMenu}
            mobileToggle={mobileToggle}
            toggleMobileMenu={toggleMobileMenu}
          />
          <Mainbody toggle={toggle}>
            <Header
              text="Loan"
              userRole={userRole}
              userRoleName={userRoleName}
              profileimg={profileImg}
              toggle={toggle}
              toggleMenu={toggleMenu}
              mobileToggle={mobileToggle}
              toggleMobileMenu={toggleMobileMenu}
            />
            <Container style={{ display: "none" }}>
              <div className="container__content">
                <div className="form__content">
                  <form onSubmit={onSave}>
                    <div className="label__group">
                      <label>Name</label>
                      <textarea
                        name="name"
                        rows="2"
                        cols="50"
                        value={formData.name}
                        onChange={onChangeHandler}
                        placeholder="Enter loan Name"
                      ></textarea>
                    </div>
                    <div className="label__group">
                      <label>Rate</label>
                      <input
                        name="rate"
                        type="number"
                        value={formData.rate}
                        onChange={onChangeHandler}
                        placeholder="Enter Rate"
                      />
                    </div>
                    <div className="form__button">
                      <input
                        className={
                          !formData.name ||
                          !formData.rate ||
                          formData.rate <= 0 ||
                          createDepartmentLoading ||
                          updateDepartmentLoading
                            ? "disabled__btn"
                            : "save__btn"
                        }
                        type="submit"
                        disabled={
                          !formData.name ||
                          !formData.rate ||
                          formData.rate <= 0 ||
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
                          <th>Loan</th>
                          <th>Rate</th>
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
                                  
                                  <FontAwesomeIcon
                                    icon={["fas", "edit"]}
                                  />
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
                </div>
              </div>
            </Container>
          </Mainbody>
        </DashboardContent>
      </DashboardContainer>
    </>
  );
};

export default Loan;
