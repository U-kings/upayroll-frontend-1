import React, { useState } from "react";
import { hrCreateSalaryStepFunc } from "../../actions/salarysteps";
import {
  HR_CREATE_STEPS_RESET,
  HR_UPDATE_STEPS_BY_ID_RESET,
} from "../../types/salarysteps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "../../styles/library";
import DropdownList from "../DropdownList";
import { Comfirm, LoadingSpinner, Successful } from "../../modals";

const Step = ({ salarySteps, staffGrade, salaryLevels, toggle }) => {
  // dispatch init
  const dispatch = useDispatch();

  // redux state
  const {
    isLoading: createStepsLoading,
    success: createStepsSuccess,
    error: createStepsError,
  } = useSelector((state) => state.hrCreateSteps);
  const {
    isLoading: updateStepsLoading,
    success: updateStepsSuccess,
    error: updateStepsError,
  } = useSelector((state) => state.hrUpdateSteps);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [stepsId, setStepsId] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [salaryLevels2, setSalaryLevels2] = useState(salaryLevels || []);

  const [formData, setFormData] = useState({
    name: "",
    notchesNumber: 0,
  });

  const { name, notchesNumber } = formData;

  const toggling = () => setIsOpen(!isOpen);
  const toggling2 = () => setIsOpen2(!isOpen2);

  const onOptionClicked = (staffgrade) => {
    setSelectedOption(staffgrade);
    const filteredSalaryLevels = salaryLevels.filter(
      (el) => String(el.salaryGrade.id) === String(staffgrade.id)
    );
    setSalaryLevels2([...filteredSalaryLevels]);
    setIsOpen(false);
    setIsOpen2(false);
    setSelectedOption2(null);
  };
  const onOptionClicked2 = (salarylevel) => {
    setSelectedOption2(salarylevel);
    setIsOpen2(false);
    setIsOpen(false);
  };
  const onSave = (e) => {
    e.preventDefault();
    if (formData?.id) {
      // dispatch(hrUpdateSalaryStepsFunc({ step, notch }, formData?.id));
    } else {
      dispatch(
        hrCreateSalaryStepFunc(selectedOption2?.id, selectedOption?.id, {
          name: name.trim(),
          notchesNumber,
        })
      );
    }
  };
  // delete comfrim popup
  const popup = (id) => {
    if (id) {
      setStepsId(id);
    }
    setIsOpen3(!isOpen3);
  };

  const popup7 = () => {
    if (updateStepsSuccess && !updateStepsError) {
      dispatch({
        type: HR_UPDATE_STEPS_BY_ID_RESET,
      });
      setFormData({ name: "", notchesNumber: 0 });
      setSelectedOption(null);
      setSelectedOption2(null);
    }
    if (createStepsSuccess && !createStepsError) {
      dispatch({
        type: HR_CREATE_STEPS_RESET,
      });
      setFormData({ name: "", notchesNumber: 0 });
      setSelectedOption(null);
      setSelectedOption2(null);
    }
  };

  const onSelect = (id) => {
    let findPos;
    if (salarySteps?.length > 0) {
      findPos = salarySteps.find((el) => String(el?.id) === String(id));
      if (findPos) {
        setFormData({
          name: findPos?.name,
          notchesNumber: findPos?.notches?.length,
          id: findPos?.id,
        });
        setSelectedOption(findPos?.salaryLevel?.salaryGrade);
        setSelectedOption2(findPos?.salaryLevel);
      }
    }
  };

  const onCancel = () => {
    setFormData({ step: "", notchesNumber: 0 });
    setSelectedOption(null);
    setSelectedOption2(null);
  };

  return (
    <>
      
      {createStepsLoading && <LoadingSpinner toggle={toggle} />}
      {updateStepsLoading && <LoadingSpinner toggle={toggle} />}
      <Successful
        isOpen7={updateStepsSuccess && !updateStepsError}
        popup7={popup7}
        message="Step Updated Successfully!"
      />
      <Successful
        isOpen7={createStepsSuccess && !createStepsError && !createStepsError}
        popup7={popup7}
        message="Step Created Successfully!"
      />
      {stepsId && (
        <Comfirm toggle={toggle}
          isOpen4={isOpen3}
          popup4={popup}
          setIsOpen4={setIsOpen3}
          stepsId={stepsId}
          setStepsId={setStepsId}
        />
      )}
      <Container>
        <h1>Step</h1>
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
                <DropdownList
                  list={true}
                  isOpen={isOpen2}
                  toggling={toggling2}
                  selectedOption={selectedOption2}
                  text="-- Select a Salary Level"
                  dataSet={salaryLevels2}
                  onOptionClicked={onOptionClicked2}
                />
              </div>
              <div className="label__group">
                <label>Step</label>
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
                  placeholder="Enter Step"
                />
              </div>
              <div className="label__group">
                <label>Number of Notch</label>
                <input
                  type="number"
                  name="notchesNumber"
                  value={notchesNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.valueAsNumber,
                    })
                  }
                  placeholder="Enter Number of Notch"
                />
              </div>
              <div className="form__button">
                <input
                  className={
                    formData.notchesNumber < 0 ||
                    !formData.name ||
                    !selectedOption ||
                    !selectedOption2 ||
                    updateStepsLoading ||
                    createStepsLoading
                      ? "disabled__btn"
                      : "save__btn"
                  }
                  type="submit"
                  disabled={
                    formData.notchesNumber < 0 ||
                    !formData.name ||
                    !selectedOption ||
                    !selectedOption2 ||
                    updateStepsLoading ||
                    createStepsLoading
                  }
                  value={formData?.id ? "Edit" : "Save"}
                />
                <input
                  className="cancel__btn margin__left"
                  type="button"
                  value="Cancel"
                  disabled={updateStepsLoading || createStepsLoading}
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
                    <th>Staff Grade</th>
                    <th>Salary Level</th>
                    <th>Step</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {salarySteps?.map((el, indexes) => (
                    <tr key={el?.id}>
                      <td>{++indexes}</td>
                      <td>{el?.salaryLevel?.salaryGrade?.name}</td>
                      <td>{el?.salaryLevel?.name}</td>
                      <td>{el?.name}</td>
                      <td>
                        <div className="action__icons">
                          <div
                            className="icons"
                            onClick={(e) => onSelect(el?.id)}
                          >
                            
                            <FontAwesomeIcon icon={["fas", "edit"]} />
                          </div>
                          {/* <div
                            className="icons"
                            onClick={(e) => popup(el?.id)}
                          >
                            
                            <FontAwesomeIcon icon={["fas", "trash-alt"]} />
                          </div> */}
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
      <Container className="margin__bottom">
        <div className="table__body">
          <div className="table__overflow full__height2">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Staff Grade</th>
                  <th>Salary Level</th>
                  <th>Step</th>
                  <th>Gross Pay</th>
                  <th>Notch 1</th>
                  <th>Notch 2</th>
                  <th>Notch 3</th>
                  <th>Notch 4</th>
                  <th>Notch 5</th>
                </tr>
              </thead>
              <tbody>
                {salarySteps?.map((el, indexes) => (
                  <tr key={el?.id}>
                    <td>{++indexes}</td>
                    <td>{el?.salaryLevel?.salaryGrade?.name}</td>
                    <td>{el?.salaryLevel?.name}</td>
                    <td>{el?.name}</td>
                    <td>
                      {Number(Math.round(el?.amount + "e" + 2) + "e-" + 2)}
                    </td>
                    <td>
                      {el?.notches[0]?.amount &&
                        Number(
                          Math.round(el?.notches[0]?.amount + "e" + 2) +
                            "e-" +
                            2
                        )}
                    </td>
                    <td>
                      {el?.notches[1]?.amount &&
                        Number(
                          Math.round(el?.notches[1]?.amount + "e" + 2) +
                            "e-" +
                            2
                        )}
                    </td>
                    <td>
                      {el?.notches[2]?.amount &&
                        Number(
                          Math.round(el?.notches[2]?.amount + "e" + 2) +
                            "e-" +
                            2
                        )}
                    </td>
                    <td>
                      {el?.notches[3]?.amount &&
                        Number(
                          Math.round(el?.notches[3]?.amount + "e" + 2) +
                            "e-" +
                            2
                        )}
                    </td>
                    <td>
                      {el?.notches[4]?.amount &&
                        Number(
                          Math.round(el?.notches[4]?.amount + "e" + 2) +
                            "e-" +
                            2
                        )}
                    </td>
                    {/* <td>
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
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Step;
