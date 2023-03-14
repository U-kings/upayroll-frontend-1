import React, { useState, useEffect } from "react";
import { DropdownList, Header, SideNav } from "../../components";
import {
  DashboardContainer,
  DashboardContent,
  Mainbody,
  Container,
} from "../../styles/library";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllDepartment } from "../../actions/department";
import {
  adminGetAllPosition,
  adminCreatePosition,
  adminUpdatePositionById,
} from "../../actions/position";
import { Comfirm, LoadingSpinner, Successful } from "../../modals";
import {
  ADMIN_CREATE_POSITION_RESET,
  ADMIN_GET_ALL_POSITION_RESET,
  ADMIN_UPDATE_POSITION_BY_ID_RESET,
} from "../../types/position";
import { logoutAdmin } from "../../actions/auth";

const Position = () => {
  // hsitory init
  const history = useHistory();
  // dispatch init
  const dispatch = useDispatch();
  // redux state
  const { departments, isLoading: loadingDepartments } = useSelector(
    (state) => state.departmentsReducer
  );
  const {
    positions,
    isLoading: loadingPositions,
    error: getPositionsError,
  } = useSelector((state) => state.adminGetAllPosition);
  const { success: createPositionSuccess, isLoading: createPositionLoading } =
    useSelector((state) => state.adminCreatePosition);
  const {
    success: updatePositionSuccess,
    isLoading: updatePositionLoading,
    error: updatePositionError,
  } = useSelector((state) => state.adminUpdatePosition);
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);

  const psn = "active";

  // func state
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
  });
  const [positionId, setPositionId] = useState(null);
  const [userRole] = useState(adminInfo?.user?.role || "");
  const [userRoleName] = useState(adminInfo?.user?.name || "");
  const [profileImg] = useState(adminInfo?.user?.photo || "");

  const onOptionClicked = (department) => () => {
    setSelectedOption(department);
    setIsOpen(false);
  };

  const onSelect = (id) => {
    let findPos;
    if (positions?.length > 0) {
      findPos = positions.find((el) => String(el?._id) === String(id));
      if (findPos) {
        setSelectedOption(findPos?.department);
        setFormData({ name: findPos?.name, _id: findPos?._id });
      }
    }
  };

  const onCancel = () => {
    setFormData({ name: "" });
    setSelectedOption(null);
  };

  const popup4 = (id) => {
    if (id) {
      setPositionId(id);
    }
    setIsOpen4(!isOpen4);
  };

  const popup7 = () => {
    if (updatePositionSuccess && !updatePositionError) {
      dispatch({ type: ADMIN_UPDATE_POSITION_BY_ID_RESET });
      setPositionId(null);
      setIsOpen(null);
      setSelectedOption(null);
      setFormData({ name: "" });
    }

    setIsOpen7(false);
  };

  const onSave = (e) => {
    e.preventDefault();
    if (formData?._id) {
      dispatch(
        adminUpdatePositionById(formData?._id, selectedOption?._id, {
          name: formData.name,
        })
      );
    } else {
      dispatch(
        adminCreatePosition(selectedOption?._id, { name: formData.name })
      );
    }
  };

  // useEffects
  useEffect(() => {
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      history.push("/");
    } else {
      dispatch(getAllDepartment());
      dispatch(adminGetAllPosition());
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
    if (createPositionSuccess) {
      dispatch({ type: ADMIN_CREATE_POSITION_RESET });
      setFormData({ name: "" });
      setIsOpen(false);
      setSelectedOption(null);
    }
  }, [dispatch, adminInfo, userRole, history, createPositionSuccess]);

  useEffect(() => {
    if (getPositionsError === "no token was passed") {
      dispatch(logoutAdmin("no token was passed"));
      dispatch({ type: ADMIN_GET_ALL_POSITION_RESET });
    }
  }, [dispatch, getPositionsError]);

  //   toggle func for modals
  const toggling = () => setIsOpen(!isOpen);
  return (
    <>
      {(loadingDepartments || loadingPositions || updatePositionLoading) && (
        <LoadingSpinner />
      )}

      <Successful
        isOpen7={isOpen7 || (updatePositionSuccess && !updatePositionError)}
        setIsOpen7={setIsOpen7}
        popup7={popup7}
        message="Position updated successfully!"
      />

      {positionId && (
        <Comfirm
          isOpen4={isOpen4}
          popup4={popup4}
          setIsOpen4={setIsOpen4}
          postId={positionId}
          setPositionId={setPositionId}
        />
      )}
      <DashboardContainer>
        <DashboardContent>
          <SideNav userRole={userRole} psn={psn} />
          <Mainbody>
            <Header
              text="Positions"
              userRole={userRole}
              userRoleName={userRoleName}
              profileimg={profileImg}
            />
            <Container>
              <div className="container__content">
                <div
                  className="form__content"
                  onClick={(e) => {
                    if (isOpen) {
                      setIsOpen(false);
                    }
                  }}
                >
                  <form className="global__form" onSubmit={onSave}>
                    <div className="label__group">
                      <label>Departments</label>
                      <DropdownList
                        list={true}
                        isOpen={isOpen}
                        toggling={toggling}
                        selectedOption={selectedOption}
                        text="-- Select a Department"
                        dataSet={departments}
                        onOptionClicked={onOptionClicked}
                      />
                    </div>
                    <div className="label__group">
                      <label>Name</label>
                      <textarea
                        name="name"
                        value={formData.name}
                        rows="4"
                        cols="50"
                        placeholder="Position name"
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      ></textarea>
                    </div>
                    <div className="form__button">
                      <input
                        className={
                          !formData.name ||
                          !selectedOption ||
                          createPositionLoading ||
                          updatePositionLoading
                            ? "disabled__btn"
                            : "save__btn"
                        }
                        type="submit"
                        disabled={
                          !formData.name ||
                          !selectedOption ||
                          createPositionLoading ||
                          updatePositionLoading
                        }
                        value={formData?._id ? "Edit" : "Save"}
                      />
                      <input
                        className="cancel__btn margin__left"
                        type="button"
                        value="Cancel"
                        onClick={onCancel}
                      />
                    </div>
                  </form>
                </div>
                <div className="table__body">
                  <div className="table__overflow full__height2">
                    <table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Department</th>
                          <th>Position</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {positions?.map((position, indexes) => (
                          <tr key={position?._id}>
                            <td>{++indexes}</td>
                            <td>{position?.department?.name}</td>
                            <td>{position?.name}</td>
                            <td>
                              <div className="action__icons">
                                <div
                                  title="Edit"
                                  className="icons"
                                  onClick={(e) => onSelect(position?._id)}
                                >
                                  {" "}
                                  <FontAwesomeIcon
                                    icon={["fas", "edit"]}
                                  />{" "}
                                </div>
                                <div
                                  title="Delete"
                                  className="icons"
                                  onClick={(e) => popup4(position?._id)}
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

export default Position;
