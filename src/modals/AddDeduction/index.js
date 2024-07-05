import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalBackground, ModalContainer2 } from "../../styles/library";
import { adminGetAllDeduction } from "../../actions/deduction";
import { useDispatch, useSelector } from "react-redux";
import { DropdownList } from "../../components";
import { Box, Typography, useTheme } from "@mui/material";
import { adminEmployeeTopUp } from "../../actions/employee";
import { useCallback } from "react";

const AddDeduction = ({
  isOpen6,
  popup6,
  onClose,
  addDeduction,
  employee,
  close,
  payhead,
  employeeAllowance,
}) => {
  // dispatch
  const dispatch = useDispatch();

  const theme = useTheme();

  // redux state
  const { deductions } = useSelector((state) => state.adminGetAllDeduction);
  const {
    success: topSuccess,
    // error: topError,
    // isLoading: loadingTopUp,
  } = useSelector((state) => state.adminEmployeeTopUp);

  // func state
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [fee, setFee] = useState(0);
  const [remark, setRemark] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);

  const feeType = ["Amount", "Percentage"];
  const [selectedOption2, setSelectedOption2] = useState(feeType[0]);

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

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
      payhead ? payhead?.deduction?.name : "-- Select an deduction"
    );
  }, [payhead]);

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

  const onOptionClicked2 = (feeType) => {
    setSelectedOption2(feeType);
    setIsOpen2(false);
  };

  const closeOption = useCallback(() => {
    if (isOpen === true || isOpen2 === true) {
      setIsOpen(false);
      setIsOpen2(false);
      // setIsOpen2(false);
    }
    setFee(0);
    setRemark("");
    setIsRecurring(false);
    setSelectedOption(null);
    popup6();
    close();
  }, [close, isOpen, isOpen2, popup6]);

  useEffect(() => {
    if (topSuccess) {
      closeOption();
    }
  }, [topSuccess, closeOption]);
  const onSubmit = (e) => {
    e.preventDefault();
    addDeduction({
      deduction: selectedOption,
      feeType: selectedOption2,
      fee,
      remark,
      isRecurring,
      new: true,
    });
    popup6();
    setSelectedOption(null);
    setFee(0);

    if (payhead.length !== 0) {
      let postEmployeeAllowance;
      if (employeeAllowance.length > 0) {
        postEmployeeAllowance = employeeAllowance.map((el) => {
          return {
            allowance: el.allowance.id,
            fee: el.fee,
            feeType: el.feeType,
            remark: el.remark,
            isRecurring: el?.isRecurring,
          };
        });
      } else {
        postEmployeeAllowance = [];
      }

      dispatch(
        adminEmployeeTopUp(employee?.id, {
          allowancesArr: postEmployeeAllowance,
          deductionsArr: [
            {
              deduction: payhead?.deduction?.id,
              feeType: selectedOption2,
              fee,
              remark,
              isRecurring,
            },
          ],
        })
      );
    }
  };

  return (
    <>
      <ModalBackground isOpen6={isOpen6} onClick={(e) => onClose("deduc")} />
      <ModalContainer2
        className="add__payhead"
        isOpen6={isOpen6}
        // onClick={closeOption}
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
                text={selectedOption || "-- Select a deduction"}
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
                onClick={closeOption}
              />
            </div>
          </form>
        </section>
      </ModalContainer2>
    </>
  );
};

export default AddDeduction;
