import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalBackground, ModalContainer2 } from "../../styles/library";
import { adminGetAllAllowance } from "../../actions/allowance";
import { useDispatch, useSelector } from "react-redux";
import { DropdownList } from "../../components";

const AddAllowance = ({
  isOpen5,
  popup5,
  onClose,
  addAllowance,
  employee,
}) => {
  // dispatch
  const dispatch = useDispatch();

  // func state
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [fee, setFee] = useState(0);
  const [remark, setRemark] = useState("");
  const { allowances } = useSelector((state) => state.adminGetAllAllowance);

  const feeType = ["Amount", "Percentage"];
  const [selectedOption3, setSelectedOption3] = useState(feeType[0]);

  // useeffect
  useEffect(() => {
    dispatch(adminGetAllAllowance());
  }, [dispatch]);

  const toggling = () => setIsOpen(!isOpen);
  const toggling3 = () => setIsOpen3(!isOpen3);

  const onOptionClicked = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const onOptionClicked3 = (feeType) => () => {
    setSelectedOption3(feeType);
    setIsOpen3(false);
  };

  // onSubmit
  const onSubmit = (e) => {
    e.preventDefault();
    addAllowance({
      allowance: selectedOption,
      feeType: selectedOption3,
      fee,
      remark,
      new: true,
    });
    setSelectedOption(null);
    setFee(0);
    popup5();
  };

  const closeOption = () => {
    if (isOpen === true || isOpen3 === true) {
      setIsOpen(false);
      setIsOpen3(false);
      // setIsOpen2(false);
    }
  };

  return (
    <>
      <ModalBackground isOpen5={isOpen5} onClick={(e) => onClose("alw")} />
      <ModalContainer2
        className="add__payhead"
        isOpen5={isOpen5}
        onClick={closeOption}
      >
        <h2>
          New Addition for: <span>{`${employee?.user.name}`}</span>
        </h2>
        <section>
          <form onSubmit={onSubmit}>
            <div className="label__group">
              <label>Addition</label>
              <DropdownList
                list={true}
                payheadDropdown={true}
                isOpen={isOpen}
                toggling={toggling}
                selectedOption={selectedOption}
                text="-- Select an Addition"
                dataSet={allowances}
                onOptionClicked={onOptionClicked}
              />
            </div>
            <div className="label__group">
              <label>Fee Type</label>
              <DropdownList
                // list={true}
                isOpen={isOpen3}
                toggling={toggling3}
                selectedOption={selectedOption3}
                // cssClass2={"month__header"}
                // cssClass3={"margin__top"}
                text={feeType[0]}
                dataSet={feeType}
                onOptionClicked={onOptionClicked3}
              />
            </div>
            <div className="label__group margin__bottom">
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
                  fee <= 0 || !fee || !remark || !selectedOption
                    ? "disabled__btn margin__right"
                    : "margin__right save__btn"
                }
                type="submit"
                disabled={fee <= 0 || !fee || !remark || !selectedOption}
                value="Save"
              />
              <input
                className="cancel__btn "
                type="button"
                value="Cancel"
                onClick={popup5}
              />
            </div>
          </form>
        </section>
      </ModalContainer2>
    </>
  );
};

export default AddAllowance;
