import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalBackground, ModalContainer2 } from "../../styles/library";
import { adminGetAllDeduction } from "../../actions/deduction";
import { useDispatch, useSelector } from "react-redux";
import { DropdownList } from "../../components";

const AddDeduction = ({ isOpen6, popup6, onClose, addDeduction, employee }) => {
  // dispatch
  const dispatch = useDispatch();

  // redux state
  const { deductions } = useSelector((state) => state.adminGetAllDeduction);

  // func state
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [fee, setFee] = useState(0);
  const [remark, setRemark] = useState("");

  const feeType = ["Amount", "Percentage"];
  const [selectedOption2, setSelectedOption2] = useState(feeType[0]);

  // useEffect
  useEffect(() => {
    dispatch(adminGetAllDeduction());
  }, [dispatch]);

  const toggling = () => setIsOpen(!isOpen);
  const toggling2 = () => setIsOpen2(!isOpen2);

  const onOptionClicked = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const onOptionClicked2 = (feeType) => () => {
    setSelectedOption2(feeType);
    setIsOpen2(false);
  };

  const closeOption = () => {
    if (isOpen === true || isOpen2 === true) {
      setIsOpen(false);
      setIsOpen2(false);
      // setIsOpen2(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addDeduction({
      deduction: selectedOption,
      feeType: selectedOption2,
      fee,
      remark,
      new: true,
    });
    popup6();
    setSelectedOption(null);
    setFee(0);
  };

  return (
    <>
      <ModalBackground isOpen6={isOpen6} onClick={(e) => onClose("deduc")} />
      <ModalContainer2
        className="add__payhead"
        isOpen6={isOpen6}
        onClick={closeOption}
      >
        <div>
          <h2>
            New Deduction for: <span>{`${employee?.user.name}`}</span>
          </h2>
        </div>
        <section className="allowance__section">
          <form onSubmit={onSubmit}>
            <div className="label__group">
              <label>Deduction</label>
              <DropdownList
                list={true}
                payheadDropdown={true}
                isOpen={isOpen}
                toggling={toggling}
                selectedOption={selectedOption}
                text="-- Select an deduction"
                dataSet={deductions}
                onOptionClicked={onOptionClicked}
              />
            </div>
            <div className="label__group">
              <label>Fee Type</label>
              <DropdownList
                // list={true}
                isOpen={isOpen2}
                toggling={toggling2}
                selectedOption={selectedOption2}
                // cssClass2={"month__header"}
                // cssClass3={"margin__top"}
                text={feeType[0]}
                dataSet={feeType}
                onOptionClicked={onOptionClicked2}
              />
            </div>
            <div className="label__group">
              <label>Fee</label>
              <input
                type="number"
                name="fee"
                value={fee}
                onChange={(e) => setFee(e.target.valueAsNumber)}
                placeholder="Enter Percentage"
              />
            </div>
            <div className="label__group margin__bottom">
              <label>Remarks</label>
              <textarea
                name="remark"
                value={remark}
                rows="2"
                cols="50"
                placeholder="Add Remark"
                onChange={(e) => setRemark(e.target.value)}
              ></textarea>
            </div>
            <div className="button__row button__left">
              <input
                className={
                  fee === 0 || !fee || !remark || !selectedOption
                    ? "disabled__btn margin__right"
                    : "save__btn margin__right"
                }
                disabled={fee === 0 || !fee || !remark || !selectedOption}
                type="submit"
                value="Save"
              />
              <input
                className="cancel__btn btn__padding input"
                type="button"
                value="Cancel"
                onClick={popup6}
              />
            </div>
          </form>
        </section>
      </ModalContainer2>
    </>
  );
};

export default AddDeduction;
