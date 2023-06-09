import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalBackground, ModalContainer } from "../../styles/library";
import AddAllowance from "../AddAddition";
import AddDeduction from "../AddDeduction";
import {
  adminEmployeeTopUp,
  adminDeleteEmployeeAllowance,
  adminDeleteEmployeeDeduction,
} from "../../actions/employee";
import { useDispatch, useSelector } from "react-redux";
import {
  ADMIN_DELETE_EMPLOYEE_ALLOWANCE_BY_ID_RESET,
  ADMIN_DELETE_EMPLOYEE_DEDUCTION_BY_ID_RESET,
  ADMIN_EMPLOYEE_TOPUP_RESET,
} from "../../types/employee";
import { ErrorBox } from "../../components";
import { Comfirm, LoadingSpinner, Successful } from "..";
const ViewEmployee = ({ isOpen2, popup2, setIsOpen2, employee, toggle }) => {
  // dispatch
  const dispatch = useDispatch();
  const {
    success: topSuccess,
    error: topError,
    isLoading: loadingTopUp,
  } = useSelector((state) => state.adminEmployeeTopUp);
  const { success: deleteAllowanceSuccess } = useSelector(
    (state) => state.adminDeleteEmployeeAllowance
  );
  const { success: deleteDeductionSuccess } = useSelector(
    (state) => state.adminDeleteEmployeeDeduction
  );
  const [isOpen5, setIsOpen5] = useState(false);
  const [isOpen6, setIsOpen6] = useState(false);
  const [employeeAllowance, setEmployeeAllowance] = useState([]);
  const [employeeDeduction, setEmployeeDeduction] = useState([]);

  useEffect(() => {
    setEmployeeAllowance(employee?.allowances);
    setEmployeeDeduction(employee?.deductions);
  }, [employee]);

  useEffect(() => {
    if (
      (topSuccess && !loadingTopUp) ||
      deleteDeductionSuccess ||
      deleteAllowanceSuccess
    ) {
      setEmployeeAllowance([]);
      setEmployeeDeduction([]);
      dispatch({ type: ADMIN_DELETE_EMPLOYEE_DEDUCTION_BY_ID_RESET });
      dispatch({ type: ADMIN_DELETE_EMPLOYEE_ALLOWANCE_BY_ID_RESET });
      popup2();
    }
  }, [
    employee,
    topSuccess,
    loadingTopUp,
    popup2,
    dispatch,
    employeeAllowance,
    deleteDeductionSuccess,
    deleteAllowanceSuccess,
  ]);

  const addNewAllowance = (newAll) => {
    const findAl = employeeAllowance.find(
      (el) => String(el?.allowance?.id) === String(newAll?.allowance?.id)
    );
    if (!findAl) {
      setEmployeeAllowance([newAll, ...employeeAllowance]);
    }
  };

  const removeAllowance = (id) => {
    const findAl = employeeAllowance.find(
      (el) => String(el?.allowance?.id) === String(id)
    );

    if (findAl?.new) {
      const newAllowance = employeeAllowance.filter(
        (el) => String(el?.allowance?.id) !== String(findAl?.allowance.id)
      );
      setEmployeeAllowance([...newAllowance]);
    } else {
      dispatch(adminDeleteEmployeeAllowance(employee?.id, id));
    }
  };

  const addNewDeduction = (newDeduct) => {
    const findDeduct = employeeDeduction.find(
      (el) => String(el?.deduction?.id) === String(newDeduct?.deduction?.id)
    );
    if (!findDeduct) {
      setEmployeeDeduction([newDeduct, ...employeeDeduction]);
    }
  };

  const removeDeduction = (id) => {
    const findDeduct = employeeDeduction.find(
      (el) => String(el?.deduction?.id) === String(id)
    );

    if (findDeduct?.new) {
      const newDeduction = employeeDeduction.filter(
        (el) => String(el?.deduction?.id) !== String(findDeduct?.deduction.id)
      );
      setEmployeeDeduction([...newDeduction]);
    } else {
      dispatch(adminDeleteEmployeeDeduction(employee?.id, id));
    }
  };

  const onSave = (e) => {
    let postEmployeeAllowance, postEmployeeDeduction;
    if (employeeAllowance.length > 0) {
      postEmployeeAllowance = employeeAllowance.map((el) => {
        return {
          allowance: el.allowance.id,
          fee: el.fee,
          feeType: el.feeType,
          remark: el.remark,
        };
      });
    } else {
      postEmployeeAllowance = [];
    }

    if (employeeDeduction.length > 0) {
      postEmployeeDeduction = employeeDeduction.map((el) => {
        return {
          deduction: el.deduction.id,
          fee: el.fee,
          feeType: el.feeType,
          remark: el.remark,
        };
      });
    } else {
      postEmployeeDeduction = [];
    }
    dispatch(
      adminEmployeeTopUp(employee?.id, {
        allowancesArr: postEmployeeAllowance,
        deductionsArr: postEmployeeDeduction,
      })
    );
  };

  const popup5 = () => {
    setIsOpen5(!isOpen5);
    setIsOpen2(false);
    if (isOpen5 && !isOpen2) {
      setIsOpen2(true);
    }
    // closepopus();
  };

  const onCancel = () => {
    setIsOpen2(false);
    setIsOpen5(false);
  };

  const closepopus = (type) => {
    setIsOpen2(false);
    if (type === "alw") {
      setIsOpen5(false);
    } else {
      setIsOpen6(false);
    }
  };
  const popup6 = () => {
    setIsOpen6(!isOpen6);
    setIsOpen2(false);
    if (isOpen6 && !isOpen2) {
      setIsOpen2(true);
    }
  };

  return (
    <>
      {loadingTopUp && <LoadingSpinner toggle={toggle} />}
      <Comfirm toggle={toggle} />
      <AddAllowance
        isOpen5={isOpen5}
        popup5={popup5}
        onClose={closepopus}
        addAllowance={addNewAllowance}
        employee={employee}
      />
      <AddDeduction
        isOpen6={isOpen6}
        popup6={popup6}
        onClose={closepopus}
        employee={employee}
        addDeduction={addNewDeduction}
      />
      <ModalBackground isOpen2={isOpen2} onClick={popup2} />
      <ModalContainer className="emp__view" isOpen2={isOpen2}>
        {!loadingTopUp && topError && <ErrorBox errorMessage={topError} />}
        <div>
          <div className="row full__width">
            <div className="row__item">
              <h2>
                Staff ID: <span>{employee?.staffId}</span>
              </h2>
              <h2>
                Name: <span>{`${employee?.user?.name}`}</span>
              </h2>
              <h2>
                Department: <span>{employee?.position?.department?.name}</span>
              </h2>
              <h2>
                Position: <span>{employee?.position?.name}</span>
              </h2>
            </div>
          </div>
          <div className="emp__content">
            <section className="payhead__section">
              <div className="row line">
                <h2>Additions</h2>
                <div className="row">
                  <h2>Fee</h2>
                  <div onClick={popup5} title="Add Addition">
                    <FontAwesomeIcon className="icons" icon={["fas", "plus"]} />
                  </div>
                </div>
              </div>
              {employeeAllowance?.length > 0 &&
                employeeAllowance?.map((el) => (
                  <div className="list__items" key={el?.allowance?.id}>
                    <div className="item" title={el?.remark}>
                      <div className="row line">
                        <p>{el?.allowance?.name}</p>
                        <div className="row">
                          <p>
                            {el?.fee}
                            {el?.feeType === "Percentage" && "%"}
                          </p>
                          <FontAwesomeIcon
                            title="Delete"
                            className="delete"
                            icon={["fas", "trash-alt"]}
                            onClick={(e) => removeAllowance(el?.allowance?.id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </section>
            <section className="payhead__section margin__left">
              <div className="row line">
                <h2>Deductions</h2>
                <div className="row">
                  <h2>Fee</h2>
                  <div onClick={popup6} title="Add Deduction">
                    <FontAwesomeIcon className="icons" icon={["fas", "plus"]} />
                  </div>
                </div>
              </div>
              {employeeDeduction?.length > 0 &&
                employeeDeduction?.map((el) => (
                  <div className="list__items" key={el?.deduction?.id}>
                    <div className="item" title={el?.remark}>
                      <div className="row line">
                        <p>{el?.deduction?.name}</p>
                        <div className="row">
                          <p>
                            {el?.fee}
                            {el?.feeType === "Percentage" && "%"}
                          </p>
                          <FontAwesomeIcon
                            title="Delete"
                            className="delete"
                            icon={["fas", "trash-alt"]}
                            onClick={(e) => removeDeduction(el?.deduction?.id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </section>
          </div>
          <div className="button__row button__left">
            <input
              className={
                employeeAllowance?.length === 0 &&
                employeeDeduction?.length === 0
                  ? "disabled__btn margin__right"
                  : "save__btn margin__right"
              }
              type="button"
              onClick={onSave}
              disabled={
                employeeAllowance?.length === 0 &&
                employeeDeduction?.length === 0
              }
              value="Save"
            />
            <input
              className="cancel__btn"
              type="submit"
              value="Cancel"
              onClick={onCancel}
            />
          </div>
        </div>
      </ModalContainer>
    </>
  );
};

export default ViewEmployee;
