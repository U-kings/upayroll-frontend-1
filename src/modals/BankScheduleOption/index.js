import React, { useEffect, useState } from "react";
import { DropdownList } from "../../components";
import { ModalBackground, ModalContainer } from "../../styles/library";

const BankScheduleOption = ({
  isopen,
  userName,
  popup,
  onOpenAct,
  setPaymentMethod,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectOption] = useState("");
  const paymentMethod = ["Transfer", "Cheque", "Cash"];

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => {
    setSelectOption(value);
    setIsOpen(false);
  };

  useEffect(() => {
    setPaymentMethod(selectedOption);
  }, [selectedOption, setPaymentMethod]);
  
  return (
    <>
      <ModalBackground isOpen3={isopen} onClick={popup} />
      <ModalContainer isOpen3={isopen}>
        <div className="option__container">
          <form>
            <h1>Bank Schedule Option</h1>
            <div className="margin__top label__group">
              <label>Selecet Payment Method</label>
              <DropdownList
                isOpen={isOpen}
                toggling={toggling}
                selectedOption={selectedOption}
                text="-- Select Payment Method"
                dataSet={paymentMethod}
                onOptionClicked={onOptionClicked}
              />
            </div>
            <div className="margin__top label__group">
              <label>Prepared By</label>
              <input type="text" name="paidedby" value={userName} disabled />
            </div>

            <input
              className={
                !selectedOption
                  ? "disabled__btn margin__top"
                  : "margin__top save__btn"
              }
              // className="add__emp"
              type="button"
              disabled={!selectedOption}
              value="Create"
              onClick={onOpenAct}
            />
          </form>
        </div>
      </ModalContainer>
    </>
  );
};

export default BankScheduleOption;
