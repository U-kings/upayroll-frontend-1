import React, { useState } from "react";
import {
  hrCreateSalaryLevelFunc,
  hrUpdateSalaryLevelFunc,
} from "../../actions/salarylevel";
import {
  HR_CREATE_SALARYLEVEL_RESET,
  HR_UPDATE_SALARYLEVEL_BY_ID_RESET,
} from "../../types/salarylevel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "../../styles/library";
import DropdownList from "../DropdownList";
import { useDispatch, useSelector } from "react-redux";
import { Comfirm, LoadingSpinner, Successful } from "../../modals";

const SalaryLevel = ({ salaryLevels, staffGrade , toggle}) => {
  // dispatch init
  const dispatch = useDispatch();

  // redux state
  const {
    isLoading: createSalaryLevelLoading,
    success: createSalaryLevelSuccess,
    error: createSalaryLevelError,
  } = useSelector((state) => state.hrCreateSalaryLevel);
  const {
    isLoading: updateSalaryLevelLoading,
    success: updateSalaryLevelSuccess,
    error: updateSalaryLevelError,
  } = useSelector((state) => state.hrUpdateSalaryLevel);

  const [formData, setFormData] = useState({
    name: "",
  });

  const { name } = formData;

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [salaryLevelId, setSalaryLevelId] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (salarygrades) => () => {
    setSelectedOption(salarygrades);
    setIsOpen(false);
  };
  const onSave = (e) => {
    e.preventDefault();
    if (formData?.id) {
      dispatch(
        hrUpdateSalaryLevelFunc(formData?.id, selectedOption?.id, {
          name: name.trim(),
        })
      );
    } else {
      dispatch(
        hrCreateSalaryLevelFunc(selectedOption?.id, { name: name.trim() })
      );
    }
  };

  const onSelect = (id) => {
    let findPos;
    if (salaryLevels?.length > 0) {
      findPos = salaryLevels.find((el) => String(el?.id) === String(id));
      if (findPos) {
        setFormData({
          name: findPos?.name,
          id: findPos?.id,
        });
        setSelectedOption(findPos?.salaryGrade);
      }
    }
  };

  // delete comfrim popup
  const popup = (id) => {
    if (id) {
      setSalaryLevelId(id);
    }
    setIsOpen2(!isOpen2);
  };

  const popup7 = () => {
    if (updateSalaryLevelSuccess && !updateSalaryLevelError) {
      dispatch({
        type: HR_UPDATE_SALARYLEVEL_BY_ID_RESET,
      });
      setFormData({ name: "" });
    }
    if (createSalaryLevelSuccess && !createSalaryLevelError) {
      dispatch({
        type: HR_CREATE_SALARYLEVEL_RESET,
      });
      setFormData({ name: "" });
      setSelectedOption(null);
    }
  };

  const onCancel = () => {
    setFormData({ name: "" });
    setSelectedOption(null);
  };

  return (
    <>
      {" "}
      {createSalaryLevelLoading && <LoadingSpinner toggle={toggle} />}
      {updateSalaryLevelLoading && <LoadingSpinner toggle={toggle} />}
      <Successful
        isOpen7={updateSalaryLevelSuccess && !updateSalaryLevelError}
        popup7={popup7}
        message="Salary Level Updated Successfully!"
      />
      <Successful
        isOpen7={
          createSalaryLevelSuccess &&
          !createSalaryLevelError &&
          !createSalaryLevelError
        }
        popup7={popup7}
        message="Salary Level Created Successfully!"
      />
      {salaryLevelId && (
        <Comfirm toggle={toggle}
          isOpen4={isOpen2}
          popup4={popup}
          setIsOpen4={setIsOpen2}
          salaryLevelId={salaryLevelId}
          setSalaryLevelId={setSalaryLevelId}
        />
      )}
      <Container>
        <h1>Salary Level</h1>
        <div className="container__content">
          <div className="form__content">
            <form className="global__form" onSubmit={onSave}>
              <div className="label__group">
                <label>Staff Grade</label>
                <DropdownList
                  list={true}
                  isOpen={isOpen}
                  toggling={toggling}
                  selectedOption={selectedOption}
                  text="-- Select a Staff Grade"
                  dataSet={staffGrade}
                  onOptionClicked={onOptionClicked}
                />
              </div>
              <div className="label__group">
                <label>Salary Level</label>
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
                  placeholder="Enter Salary Level"
                />
              </div>
              <div className="form__button">
                <input
                  className={
                    !selectedOption ||
                    !formData.name ||
                    updateSalaryLevelLoading ||
                    createSalaryLevelLoading
                      ? "disabled__btn"
                      : "save__btn"
                  }
                  type="submit"
                  disabled={
                    !selectedOption ||
                    !formData.name ||
                    updateSalaryLevelLoading ||
                    createSalaryLevelLoading
                  }
                  value={formData?.id ? "Edit" : "Save"}
                />
                <input
                  className="cancel__btn margin__left"
                  type="button"
                  value="Cancel"
                  disabled={
                    updateSalaryLevelLoading || createSalaryLevelLoading
                  }
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
                    <th>Salary Level</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryLevels?.map((el, indexes) => (
                    <tr key={el?.id}>
                      <td>{++indexes}</td>
                      <td>{el?.salaryGrade?.name}</td>
                      <td>{el?.name}</td>
                      <td>
                        <div className="action__icons">
                          <div
                            className="icons"
                            onClick={(e) => onSelect(el?.id)}
                          >
                            {" "}
                            <FontAwesomeIcon icon={["fas", "edit"]} />{" "}
                          </div>
                          <div className="icons" onClick={(e) => popup(el?.id)}>
                            {" "}
                            <FontAwesomeIcon icon={["fas", "trash-alt"]} />{" "}
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

export default SalaryLevel;
