import React, { useState } from "react";
import {
  hrCreateStaffGradeFunc,
  hrUpdateStaffGradeFunc,
} from "../../actions/staffgrade";
import {
  HR_CREATE_STAFFGRADE_RESET,
  HR_UPDATE_STAFFGRADE_BY_ID_RESET,
} from "../../types/staffgrade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "../../styles/library";
import { useDispatch, useSelector } from "react-redux";
import { Comfirm, LoadingSpinner, Successful } from "../../modals";

const StaffGrade = ({ staffGrade, toggle }) => {
  // dispatch init
  const dispatch = useDispatch();

  // redux state
  const {
    isLoading: createStaffGradeLoading,
    success: createStaffGradeSuccess,
    error: createStaffGradeError,
  } = useSelector((state) => state.hrCreateStaffGrade);
  const {
    isLoading: updateStaffGradeLoading,
    success: updateStaffGradeSuccess,
    error: updateStaffGradeError,
  } = useSelector((state) => state.hrUpdateStaffGrade);

  const [formData, setFormData] = useState({
    name: "",
  });
  const { name } = formData;

  //state func
  const [isOpen, setIsOpen] = useState(false);
  const [staffGradeId, setStaffGradeId] = useState(false);

  const onSave = (e) => {
    e.preventDefault();
    if (formData?.id) {
      dispatch(hrUpdateStaffGradeFunc(formData?.id, { name: name.trim() }));
    } else {
      dispatch(hrCreateStaffGradeFunc({ name: name.trim() }));
    }
  };

  const onSelect = (id) => {
    let findPos;
    if (staffGrade?.length > 0) {
      findPos = staffGrade.find((el) => String(el?.id) === String(id));
      if (findPos) {
        setFormData({
          name: findPos?.name,
          id: findPos?.id,
        });
      }
    }
  };

  // delete comfrim popup
  const popup = (id) => {
    if (id) {
      setStaffGradeId(id);
    }
    setIsOpen(!isOpen);
  };

  const popup7 = () => {
    if (updateStaffGradeSuccess && !updateStaffGradeError) {
      dispatch({
        type: HR_UPDATE_STAFFGRADE_BY_ID_RESET,
      });
      setFormData({ name: "" });
    }
    if (createStaffGradeSuccess && !createStaffGradeError) {
      dispatch({
        type: HR_CREATE_STAFFGRADE_RESET,
      });
      setFormData({ name: "" });
    }
  };

  const onCancel = () => {
    setFormData({ name: "" });
  };

  return (
    <>
      
      {createStaffGradeLoading && <LoadingSpinner toggle={toggle} />}
      {updateStaffGradeLoading && <LoadingSpinner toggle={toggle} />}
      <Successful
        isOpen7={updateStaffGradeSuccess && !updateStaffGradeError}
        popup7={popup7}
        message="Staff Grade Updated Successfully!"
      />
      <Successful
        isOpen7={
          createStaffGradeSuccess &&
          !createStaffGradeError &&
          !createStaffGradeError
        }
        popup7={popup7}
        message="Staff Grade Created Successfully!"
      />
      {staffGradeId && (
        <Comfirm toggle={toggle}
          isOpen4={isOpen}
          popup4={popup}
          setIsOpen4={setIsOpen}
          staffGradeId={staffGradeId}
          setStaffGradeId={setStaffGradeId}
        />
      )}
      <Container>
        <h1>Staff Grade</h1>
        <div className="container__content">
          <div className="form__content">
            <form className="global__form" onSubmit={onSave}>
              <div className="label__group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  placeholder="Enter Staff Grade"
                />
              </div>
              <div className="form__button">
                <input
                  className={
                    !formData.name ||
                    updateStaffGradeLoading ||
                    createStaffGradeLoading
                      ? "disabled__btn"
                      : "save__btn"
                  }
                  type="submit"
                  disabled={
                    !formData.name ||
                    updateStaffGradeLoading ||
                    createStaffGradeLoading
                  }
                  value={formData?.id ? "Edit" : "Save"}
                />
                <input
                  className="cancel__btn margin__left"
                  type="button"
                  value="Cancel"
                  disabled={updateStaffGradeLoading || createStaffGradeLoading}
                  onClick={onCancel}
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
                    <th>Staff Grade</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {staffGrade?.map((el, indexes) => (
                    <tr key={el?.id}>
                      <td>{++indexes}</td>
                      <td>{el?.name}</td>
                      <td>
                        <div className="action__icons">
                          <div
                            className="icons"
                            onClick={(e) => onSelect(el?.id)}
                          >
                            
                            <FontAwesomeIcon icon={["fas", "edit"]} />
                          </div>
                          <div className="icons" onClick={(e) => popup(el?.id)}>
                            
                            <FontAwesomeIcon icon={["fas", "trash-alt"]} />
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
    </>
  );
};

export default StaffGrade;
