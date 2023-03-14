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

const Department = () => {
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
  const [formData, setForm] = useState({ name: "" });
  const [departmentId, setDepartmentId] = useState(null);
  const [userRole] = useState(adminInfo?.user?.role || "");
  const [userRoleName] = useState(adminInfo?.user?.name || "");
  const [profileImg] = useState(adminInfo?.user?.photo || "");

  const dpt = "active";

  const onSave = (e) => {
    e.preventDefault();
    if (formData?._id) {
      dispatch(
        adminUpdateDepartmentById(formData?._id, {
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
      findDp = departments.find((el) => String(el?._id) === String(id));
      if (findDp) {
        setForm({ name: findDp?.name, _id: findDp?._id });
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
      history.push("/");
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
      {loadingDepartments && <LoadingSpinner />}
      {departmentId && (
        <Comfirm
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
          <SideNav userRole={userRole} dpt={dpt} />
          <Mainbody>
            <Header
              text="Departments"
              userRole={userRole}
              userRoleName={userRoleName}
              profileimg={profileImg}
            />
            <Container>
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
                        value={formData?._id ? "Edit" : "Save"}
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
                          <tr key={el?._id}>
                            <td>{++indexes}</td>
                            <td>{el?.name?.toUpperCase()}</td>
                            <td>
                              <div className="action__icons">
                                <div
                                  title="Edit"
                                  className="icons"
                                  onClick={(e) => onSelect(el?._id)}
                                >
                                  {" "}
                                  <FontAwesomeIcon
                                    icon={["fas", "edit"]}
                                  />{" "}
                                </div>
                                <div
                                  title="Delete"
                                  className="icons"
                                  onClick={(e) => popup4(el?._id)}
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
