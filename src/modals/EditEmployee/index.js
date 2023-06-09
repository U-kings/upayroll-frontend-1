import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalBackground, ModalContainer, NewEmp } from "../../styles/library";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDepartment,
  getPositionsByDepartment,
} from "../../actions/department";
import { adminUpdateEmployeeById } from "../../actions/employee";
import LoadingSpinner from "../LoadingSpinner";
import { DropdownList, ErrorBox } from "../../components";
// import { adminGetAllBanksFunc } from "../../actions/banklist";
import { hrGetSalaryLevelsFunc } from "../../actions/salarylevel";
import { hrGetSalaryStepsFunc } from "../../actions/salarysteps";
import { hrGetAllStaffGradesFunc } from "../../actions/staffgrade";
import { banks } from "../../values/banks";
import { employeeDataValidation } from "../../hooks/validations/employeeDataValidation";
import { formatDate } from "../../hooks/functions";
import { getAllBankNamesFunc } from "../../actions/banklist";
import { VERIFY_ACCOUNT_NUMBER_RESET } from "../../types/auth";
import { verifyAccountNumberFunc } from "../../actions/auth";
const EditEmployee = ({
  isOpen3,
  popup3,
  employee,
  setCurrentEmployee,
  month,
  toggle,
}) => {
  // dispatch init
  const dispatch = useDispatch();

  // redux state
  const { bankNames } = useSelector((state) => state.adminGetAllBankNames);
  const { departments } = useSelector((state) => state.departmentsReducer);
  const { positions } = useSelector(
    (state) => state.departmentPositionsReducer
  );
  const { salaryGrades } = useSelector((state) => state.hrGetStaffGrade);
  const { salaryLevels } = useSelector((state) => state.hrGetSalaryLevel);
  const { salarySteps } = useSelector((state) => state.hrGetSteps);
  const {
    success: updateSuccess,
    isLoading: updateLoading,
    error: updateError,
  } = useSelector((state) => state.adminUpdateEmployee);

  const {
    accountName: employeeAccountName,
    error: verifyAccountError,
    isLoading: verifyAccountLoading,
  } = useSelector((state) => state.verifyAccountNumber);

  // const { banks } = useSelector((state) => state.adminGetAllBanks);
  // func state
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  const [isOpen6, setIsOpen6] = useState(false);
  const [isOpenSalaryGrade, setIsOpenSalaryGrade] = useState(false);
  const [isOpenSalaryLevel, setIsOpenSalaryLevel] = useState(false);
  const [isOpenSalaryStep, setIsOpenSalaryStep] = useState(false);
  const [isOpenNotch, setIsOpenNotch] = useState(false);
  const [contractSalary, setContractSalary] = useState(
    employee?.contractSalary || 0
  );

  // gender
  const [selectedOption, setSelectedOption] = useState(employee?.gender || "");
  // employeeType
  const [selectedOption2, setSelectedOption2] = useState(
    employee?.employeeType || ""
  );
  // department
  const [selectedOption4, setSelectedOption4] = useState(
    employee?.position?.department || ""
  );
  // position
  const [selectedOption5, setSelectedOption5] = useState(
    employee?.position || ""
  );
  // bank name
  const [selectedOption6, setSelectedOption6] = useState(
    employee?.employeeBank ? { name: employee?.employeeBank } : { name: "" }
  );
  const [salaryGrade, setSalaryGrade] = useState(
    employee?.salaryLevel?.salaryGrade || ""
  );
  const [salaryLevel, setSalaryLevel] = useState(employee?.salaryLevel || "");
  const [salaryStep, setSalaryStep] = useState(employee?.salaryStep || "");
  const [notch, setNotch] = useState(employee?.notch || "");
  const [errors, setErrors] = useState({});

  const [employeeFormData, setEmployeeFormData] = useState({
    staffId: employee && employee?.staffId ? employee?.staffId : "",
    noOfWorkingDays:
      employee && employee?.noOfWorkingDays ? employee?.noOfWorkingDays : 0,
    name: employee && employee?.user?.name ? employee?.user?.name : "",
    dob: employee && employee?.dob ? employee.dob?.substring(0, 10) : "",
    email: employee && employee?.user?.email ? employee?.user?.email : "",
    mobile: employee && employee?.mobile ? employee?.mobile : "",
    address: employee && employee?.address ? employee?.address : "",
    nationality: employee && employee?.nationality ? employee?.nationality : "",
    city: employee && employee?.city ? employee?.city : "",
    state: employee && employee?.state ? employee?.state : "",
    joinDate:
      employee && employee?.joinDate ? employee?.joinDate.substring(0, 10) : "",
    employeeBankAcctNumber:
      employee && employee?.employeeBankAcctNumber
        ? employee?.employeeBankAcctNumber
        : "",
    accountName: employee && employee?.accountName ? employee?.accountName : "",
  });
  const [bankCode, setBankCode] = useState(null);

  const genders = ["Male", "Female"];
  const emptypes = ["Permanent", "Part-time", "Contract", "Intern"];

  const {
    staffId,
    noOfWorkingDays,
    name,
    dob,
    email,
    mobile,
    state,
    nationality,
    city,
    joinDate,
    address,
    employeeBankAcctNumber,
    accountName,
  } = employeeFormData;

  // useEffect
  useEffect(() => {
    if (updateSuccess && !updateLoading) {
      popup3();
      setEmployeeFormData({
        staffId: "",
        noOfWorkingDays: 0,
        name: "",
        dob: "",
        email: "",
        mobile: "",
        address: "",
        nationality: "",
        city: "",
        state: "",
        joinDate: "",
        employeeBankAcctNumber: "",
        accountName: "",
      });
      setSelectedOption(null);
      setSelectedOption2(null);
      setSelectedOption4(null);
      setSelectedOption5(null);
      setSelectedOption6(null);
      setSalaryGrade(null);
      setSalaryLevel(null);
      setSalaryStep(null);
      setNotch(null);
      setContractSalary(0);
    }
  }, [employee, updateSuccess, updateLoading, popup3]);

  useEffect(() => {
    dispatch(getAllDepartment());
    dispatch(getAllBankNamesFunc());
    dispatch(getPositionsByDepartment(employee?.department?.id));
    // dispatch(adminGetAllBanksFunc());
    dispatch(hrGetAllStaffGradesFunc());
    dispatch(hrGetSalaryLevelsFunc(employee?.salaryLevel?.salaryGrade?.id));
    dispatch(hrGetSalaryStepsFunc(employee?.salaryStep?.salaryLevel?.id));
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    setErrors(employeeDataValidation(employeeFormData));
  }, [employeeFormData]);

  //set accounName filed to empty if length is not == 10
  useEffect(() => {
    if (employeeBankAcctNumber?.length !== 10 || !bankCode) {
      setEmployeeFormData({
        ...employeeFormData,
        accountName: "",
      });
    }
    // eslint-disable-next-line
  }, [employeeBankAcctNumber, bankCode]);

  // verify account name
  useEffect(() => {
    if (employeeBankAcctNumber?.length === 10 && bankCode) {
      dispatch(
        verifyAccountNumberFunc({
          accountNumber: employeeBankAcctNumber,
          bankCode: bankCode,
        })
      );
    }

    if (employeeAccountName) {
      setEmployeeFormData({
        ...employeeFormData,
        accountName: employeeAccountName,
      });
    }
    // eslint-disable-next-line
  }, [dispatch, employeeBankAcctNumber, bankCode, employeeAccountName]);

  // verify account error
  useEffect(() => {
    if (verifyAccountError) {
      setTimeout(() => {
        dispatch({ type: VERIFY_ACCOUNT_NUMBER_RESET });
      }, 5000);
    }
  }, [verifyAccountError, dispatch]);

  //   onChange Handler
  const onChange = (e) => {
    setEmployeeFormData({
      ...employeeFormData,
      [e.target.name]: e.target.value,
    });
  };

  const toggling = () => setIsOpen(!isOpen);
  const toggling2 = () => setIsOpen2(!isOpen2);
  const toggling4 = () => setIsOpen4(!isOpen4);
  const toggling5 = () => setIsOpen5(!isOpen5);
  const toggling6 = () => setIsOpen6(!isOpen6);
  const togglingSalaryGrade = () => setIsOpenSalaryGrade(!isOpenSalaryGrade);
  const togglingSalaryLevel = () => setIsOpenSalaryLevel(!isOpenSalaryLevel);
  const togglingSalaryStep = () => setIsOpenSalaryStep(!isOpenSalaryStep);
  const togglingNotch = () => setIsOpenNotch(!isOpenNotch);

  // gender
  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  // employee type
  const onOptionClicked2 = (value) => () => {
    setSelectedOption2(value);
    setIsOpen2(false);
  };

  // department
  const onOptionClicked4 = (department) => () => {
    setSelectedOption4(department);
    setIsOpen4(false);
    dispatch(getPositionsByDepartment(department?.id));
    setSelectedOption5(null);
  };

  // positions
  const onOptionClicked5 = (value) => () => {
    setSelectedOption5(value);
    setIsOpen5(false);
  };

  // salary grade
  const onOptionClickedSalaryGrade = (salaryGrade) => () => {
    setSalaryGrade(salaryGrade);
    dispatch(hrGetSalaryLevelsFunc(salaryGrade?.id));
    setIsOpenSalaryGrade(false);
    setSalaryLevel(null);
    setSalaryStep(null);
    setNotch(null);
  };

  // salary level
  const onOptionClickedSalarylevel = (salaryLevel) => () => {
    setSalaryLevel(salaryLevel);
    dispatch(hrGetSalaryStepsFunc(salaryLevel?.id));
    setIsOpenSalaryLevel(false);
    setSalaryStep(null);
    setNotch(null);
  };

  // salary step
  const onOptionClickedSalaryStep = (salaryStep) => () => {
    setSalaryStep(salaryStep);
    setIsOpenSalaryStep(false);
    setNotch(null);
  };

  // salary step notch
  const onOptionClickedNotch = (notch) => () => {
    setNotch(notch);
    setIsOpenNotch(false);
  };

  // bank
  const onOptionClicked6 = (bank) => () => {
    setSelectedOption6({ name: bank?.name });
    setBankCode(bank?.code);
    setIsOpen6(false);
  };

  //   close all modals
  const closeOption = () => {
    if (
      isOpen === true ||
      isOpen2 === true ||
      isOpen4 === true ||
      isOpen5 === true ||
      isOpen6 === true ||
      isOpenSalaryGrade === true ||
      isOpenSalaryLevel === true ||
      isOpenSalaryStep === true ||
      isOpenNotch === true
    ) {
      setIsOpen(false);
      setIsOpen2(false);

      setIsOpen4(false);
      setIsOpen5(false);
      setIsOpen6(false);
      setIsOpenSalaryGrade(false);
      setIsOpenSalaryLevel(false);
      setIsOpenSalaryStep(false);
      setIsOpenNotch(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const gender = selectedOption;
    const departId = selectedOption5?.department?.id;
    const postId = selectedOption5?.id;

    dispatch(
      adminUpdateEmployeeById(
        employee?.id,
        departId,
        postId,
        {
          ...employeeFormData,
          dob: formatDate(dob),
          noOfWorkingDays: parseInt(noOfWorkingDays),
          joinDate: formatDate(joinDate),
          gender,
          employeeType: selectedOption2,
          employeeBank: selectedOption6.name,
          department: departId,
          position: postId,
          contractSalary:
            selectedOption2 === "Contract" || selectedOption2 === "Intern"
              ? contractSalary
              : null,
          salaryLevelId:
            selectedOption2 !== "Contract" && selectedOption2 !== "Intern"
              ? salaryStep?.salaryLevelId
              : null,
          salaryStepId:
            selectedOption2 !== "Contract" && selectedOption2 !== "Intern"
              ? salaryStep?.id
              : null,
          notchId:
            notch &&
            notch.name !== "No Notch" &&
            selectedOption2 !== "Contract" &&
            selectedOption2 !== "Intern"
              ? notch?.id
              : null,
          // salaryLevel:
          //   selectedOption2 !== "Contract" && selectedOption2 !== "Intern"
          //     ? salaryStep?.salaryLevel?.id
          //     : null,
          // salaryStep:
          //   selectedOption2 !== "Contract" && selectedOption2 !== "Intern"
          //     ? salaryStep?.id
          //     : null,
          // notch:
          //   notch &&
          //   notch.name !== "No Notch" &&
          //   selectedOption2 !== "Contract" &&
          //   selectedOption2 !== "Intern"
          //     ? {
          //         name: notch?.name,
          //         notchId: notch?.id,
          //         stepId: salaryStep?.id,
          //       }
          //     : null,
        },
        month
      )
    );
  };

  // check if array of object is empty
  // function isObjectEmpty(obj) {
  //   return Object.keys(obj).length === 0;
  // }

  return (
    <>
      {(updateLoading || verifyAccountLoading) && (
        <LoadingSpinner toggle={toggle} />
      )}

      <ModalBackground isOpen3={isOpen3} onClick={popup3} />
      <ModalContainer className="edit__emp" isOpen3={isOpen3}>
        <NewEmp className="edit__emp" onClick={closeOption}>
          {updateError && <ErrorBox errorMessage={updateError} fixed={true} />}
          <h1>Edit Employee</h1>
          <form onSubmit={onSubmit}>
            <div className="input__row">
              <div className="label__group staffId">
                <label>Staff ID</label>
                <input
                  type="text"
                  name="staffId"
                  value={staffId}
                  onChange={onChange}
                  placeholder="Staff ID"
                />
                <span className="error">{errors.staffId}</span>
              </div>
              <div className="label__group">
                <label>Employee Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  placeholder="Employee Name"
                />
                <span className="error">{errors.name}</span>
              </div>
              <div className="label__group workdays">
                <label>
                  N<u style={{ fontSize: "1.5rem" }}>O</u> Of Work Days
                </label>
                <input
                  type="number"
                  name="noOfWorkingDays"
                  value={noOfWorkingDays}
                  onChange={onChange}
                  placeholder="Work Days"
                />
                <span className="error">{errors.noOfWorkingDays}</span>
              </div>
            </div>
            <div className="input__row">
              <div className="label__group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={dob}
                  onChange={onChange}
                  placeholder="Date of Birth"
                />
                <span className="error">{errors.dob}</span>
              </div>
              <div className="label__group">
                <label>Gender</label>
                <DropdownList
                  isOpen={isOpen}
                  toggling={toggling}
                  selectedOption={selectedOption}
                  text="-- Select a gender"
                  dataSet={genders}
                  key={Math.random()}
                  onOptionClicked={onOptionClicked}
                />
                <span className="error">
                  {!selectedOption ? "*gender is required" : ""}
                </span>
              </div>
            </div>
            <div className="input__row">
              <div className="label__group">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Email"
                />
                <span className="error">{errors.email}</span>
              </div>
              <div className="label__group">
                <label>Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={mobile}
                  onChange={onChange}
                  placeholder="Mobile"
                />
                <span className="error">{errors.mobile}</span>
              </div>
            </div>
            <div className="label__group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={onChange}
                placeholder="Address"
              />
              <span className="error">{errors.address}</span>
            </div>
            <div className="input__row">
              <div className="label__group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={city}
                  onChange={onChange}
                  placeholder="City"
                />
                <span className="error">{errors.city}</span>
              </div>
              <div className="label__group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={state}
                  onChange={onChange}
                  placeholder="State"
                />
                <span className="error">{errors.state}</span>
              </div>
            </div>
            <div className="input__row">
              <div className="label__group">
                <label>Account Number</label>
                <input
                  type="number"
                  name="employeeBankAcctNumber"
                  value={employeeBankAcctNumber}
                  onChange={onChange}
                  placeholder="Account Number"
                />
                <span className="error">{errors.employeeBankAcctNumber}</span>
              </div>
              <div className="label__group">
                <label>Bank Name</label>
                <DropdownList
                  list={true}
                  isOpen={isOpen6}
                  toggling={toggling6}
                  selectedOption={selectedOption6}
                  text="-- Select a Bank Name"
                  dataSet={bankNames}
                  onOptionClicked={onOptionClicked6}
                />
                <span className="error">
                  {!selectedOption6.name ? "*bank name is required" : ""}
                </span>
              </div>
            </div>
            <div className="input__row">
              <div className="label__group">
                <label>Nationality</label>
                <input
                  type="text"
                  name="nationality"
                  value={nationality}
                  onChange={onChange}
                  placeholder="Nationality"
                />
                <span className="error">{errors.nationality}</span>
              </div>
              {/* <div className="label__group">
                <label>Country</label>
                <input type="text" placeholder="Country" />
              </div> */}
            </div>

            {selectedOption2 !== "Contract" && selectedOption2 !== "Intern" && (
              <>
                <div className="input__row">
                  <div className="label__group">
                    <label>Salary Grade </label>
                    <DropdownList
                      list={true}
                      isOpen={isOpenSalaryGrade}
                      toggling={togglingSalaryGrade}
                      selectedOption={salaryGrade}
                      text="-- Select a Salary Grade"
                      dataSet={salaryGrades}
                      onOptionClicked={onOptionClickedSalaryGrade}
                    />
                    <span className="error">
                      {!salaryGrade ? "*salary grade is required" : ""}
                    </span>
                  </div>
                  <div className="label__group">
                    <label>Salary Level </label>
                    <DropdownList
                      list={true}
                      isOpen={isOpenSalaryLevel}
                      toggling={togglingSalaryLevel}
                      selectedOption={salaryLevel}
                      text="-- Select a Salary Level"
                      dataSet={salaryLevels}
                      onOptionClicked={onOptionClickedSalarylevel}
                    />
                    <span className="error">
                      {!salaryLevel ? "*salary level is required" : ""}
                    </span>
                  </div>
                  {/* <div className="label__group">
                  <label>Country</label>
                  <input type="text" placeholder="Country" />
                  </div> */}
                </div>

                <div className="input__row">
                  <div className="label__group">
                    <label>Salary Step </label>
                    <DropdownList
                      list={true}
                      isOpen={isOpenSalaryStep}
                      toggling={togglingSalaryStep}
                      selectedOption={salaryStep}
                      text="-- Select a Salary Step"
                      dataSet={salarySteps}
                      onOptionClicked={onOptionClickedSalaryStep}
                    />
                    <span className="error">
                      {!salaryStep ? "*salary step is required" : ""}
                    </span>
                  </div>

                  <div className="label__group">
                    <label>Notch </label>
                    <DropdownList
                      list={true}
                      isOpen={isOpenNotch}
                      toggling={togglingNotch}
                      selectedOption={notch}
                      text="-- Select a Notch Level"
                      dataSet={
                        salaryStep?.notches
                          ? [
                              {
                                id: "238HS4329D",
                                name: "No Notch",
                                amount: 0,
                                stepId: null,
                              },
                              ...salaryStep?.notches,
                            ]
                          : salaryStep?.notches
                      }
                      onOptionClicked={onOptionClickedNotch}
                    />
                    <span className="error">&nbsp;</span>
                  </div>

                  {/* <div className="label__group">
                      <label>Country</label>
                      <input type="text" placeholder="Country" />
                    </div> */}
                </div>
              </>
            )}

            {(selectedOption2 === "Intern" ||
              selectedOption2 === "Contract") && (
              <>
                <div className="input__row">
                  <div className="label__group">
                    <label>Contract Salary</label>
                    <input
                      type="number"
                      name="contractSalary"
                      value={contractSalary}
                      onChange={(e) =>
                        setContractSalary(e.target.valueAsNumber)
                      }
                      placeholder="Contract Salary"
                    />
                    <span className="error">
                      {!contractSalary && "Contract Salary is required"}
                    </span>
                  </div>
                </div>
              </>
            )}

            <div className="input__row">
              <div className="label__group">
                <label>Department</label>
                <DropdownList
                  list={true}
                  isOpen={isOpen4}
                  toggling={toggling4}
                  selectedOption={selectedOption4}
                  text="-- Select a Department"
                  dataSet={departments}
                  onOptionClicked={onOptionClicked4}
                />
                <span className="error">
                  {!selectedOption4 ? "*department is required" : ""}
                </span>
              </div>
              <div className="label__group">
                <label>Position</label>
                <DropdownList
                  list={true}
                  isOpen={isOpen5}
                  toggling={toggling5}
                  selectedOption={selectedOption5}
                  text="-- Select a Position"
                  dataSet={positions}
                  onOptionClicked={onOptionClicked5}
                />
                <span className="error">
                  {!selectedOption5 ? "*position is required" : ""}
                </span>
              </div>
            </div>
            <div className="input__row">
              <div className="label__group">
                <label>Employee Type</label>
                <DropdownList
                  isOpen={isOpen2}
                  toggling={toggling2}
                  selectedOption={selectedOption2}
                  text="-- Select an Employee type"
                  dataSet={emptypes}
                  onOptionClicked={onOptionClicked2}
                />

                <span className="error">
                  {!selectedOption2 ? "*employee-type is required" : ""}
                </span>
              </div>
              <div className="label__group">
                <label>Employment Date</label>
                <input
                  type="date"
                  name="joinDate"
                  value={joinDate}
                  onChange={onChange}
                  placeholder="Joining Date"
                />
                <span className="error">{errors.joinDate}</span>
              </div>
            </div>
            <input
              // className="add__emp"
              className={
                // !selectedOption ||
                !selectedOption2 ||
                !selectedOption4 ||
                !selectedOption5 ||
                !selectedOption6.name ||
                updateLoading ||
                (selectedOption2 !== "Contract" && selectedOption2 !== "Intern"
                  ? !salaryGrade || !salaryLevel || !salaryStep
                  : !contractSalary)
                  ? //  ||
                    // !isObjectEmpty(employeeDataValidation(employeeFormData))
                    "disabled__btn margin__top"
                  : "add__emp"
              }
              type="submit"
              disabled={
                // !selectedOption ||
                !selectedOption2 ||
                !selectedOption4 ||
                !selectedOption5 ||
                !selectedOption6.name ||
                updateLoading ||
                (selectedOption2 !== "Contract" && selectedOption2 !== "Intern"
                  ? !salaryGrade || !salaryLevel || !salaryStep
                  : !contractSalary)
                // ||
                // !isObjectEmpty(employeeDataValidation(employeeFormData))
              }
              value="Edit Employee"
            />
          </form>
        </NewEmp>
      </ModalContainer>
    </>
  );
};

export default EditEmployee;
