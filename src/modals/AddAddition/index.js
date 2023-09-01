import React, { useState, useEffect, useCallback } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalBackground, ModalContainer2 } from "../../styles/library";
import { adminGetAllAllowance } from "../../actions/allowance";
import { useDispatch, useSelector } from "react-redux";
import { DropdownList } from "../../components";
import { Box, Typography, useTheme } from "@mui/material";
import { adminEmployeeTopUp } from "../../actions/employee";

const AddAllowance = ({
  isOpen5,
  popup5,
  onClose,
  addAllowance,
  employee,
  payhead,
  close,
  employeeDeduction,
}) => {
  // dispatch
  const dispatch = useDispatch();
  const theme = useTheme();

  //redux state
  const { allowances } = useSelector((state) => state.adminGetAllAllowance);
  const {
    success: topSuccess,
    // error: topError,
    // isLoading: loadingTopUp,
  } = useSelector((state) => state.adminEmployeeTopUp);

  // func state
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [fee, setFee] = useState(0);
  const [remark, setRemark] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);

  const feeType = ["Amount", "Percentage"];
  const [selectedOption3, setSelectedOption3] = useState(feeType[0]);

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  // useeffect
  useEffect(() => {
    if (toggle) {
      setIsRecurring(true);
    } else {
      setIsRecurring(false);
    }
  }, [toggle]);

  useEffect(() => {
    setFee(payhead ? payhead?.fee : 0);
    setRemark(payhead ? payhead?.remark : "");
    setIsRecurring(payhead ? payhead?.isRecurring : false);
    setToggle(payhead ? payhead?.isRecurring : false);
    setSelectedOption(
      payhead ? payhead?.allowance?.name : "-- Select an addition"
    );
  }, [payhead]);

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
      isRecurring,
      new: true,
    });
    setSelectedOption(null);
    setFee(0);
    popup5();

    if (payhead !== 0) {
      let postEmployeeDeduction;
      if (employeeDeduction.length > 0) {
        postEmployeeDeduction = employeeDeduction.map((el) => {
          return {
            deduction: el.deduction.id,
            fee: el.fee,
            feeType: el.feeType,
            remark: el.remark,
            isRecurring: el?.isRecurring,
          };
        });
      } else {
        postEmployeeDeduction = [];
      }
      dispatch(
        adminEmployeeTopUp(employee?.id, {
          allowancesArr: [
            {
              allowance: payhead?.allowance?.id,
              feeType: selectedOption3,
              fee,
              remark,
              isRecurring,
            },
          ],
          deductionsArr: postEmployeeDeduction,
        })
      );
    }
  };

  const closeOption = useCallback(() => {
    if (isOpen === true || isOpen3 === true) {
      setIsOpen(false);
      setIsOpen3(false);
      // setIsOpen2(false);
    }
    setFee(0);
    setRemark("");
    setIsRecurring(false);
    setSelectedOption(null);
    popup5();
    close();
  }, [close, isOpen, isOpen3, popup5]);

  useEffect(() => {
    if (topSuccess) {
      closeOption();
    }
  }, [topSuccess, closeOption]);

  return (
    <>
      <ModalBackground isOpen5={isOpen5} onClick={(e) => onClose("alw")} />
      <ModalContainer2
        className="add__payhead"
        isOpen5={isOpen5}
        // onClick={closeOption}
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
                text={selectedOption || "-- Select an addition"}
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
                placeholder="Enter Amount/Percentage"
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

            <Box sx={{ display: "flex", p: "0 0 2rem 0" }}>
              <Box
                sx={{
                  display: "flex",
                  width: "3.5rem",
                  my: "auto",
                  height: "2.1rem",
                  borderRadius: " 1rem",
                  cursor: "pointer",
                  bgcolor: toggle
                    ? theme.palette.primary[500]
                    : theme.palette.secondary[700],
                  transition: "all 250ms ease-in-out",
                }}
                onClick={handleToggle}
              >
                <Box
                  sx={{
                    width: "1.5rem",
                    height: "1.5rem",
                    borderRadius: " 1rem",
                    bgcolor: theme.palette.secondary[100],
                    position: "relative",
                    left: toggle ? "1.8rem" : ".3rem",
                    my: "auto",
                    transition: "all 250ms ease-in-out",
                  }}
                ></Box>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography
                  variant="h6"
                  color={theme.palette.secondary[900]}
                  sx={{ m: "auto auto auto 1rem" }}
                >
                  Recurring
                </Typography>
              </Box>
            </Box>
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
                onClick={closeOption}
              />
            </div>
          </form>
        </section>
      </ModalContainer2>
    </>
  );
};

export default AddAllowance;
