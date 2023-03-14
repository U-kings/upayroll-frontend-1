import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NewEmp, BackLink, ImportExcelLink } from "../../styles/library";
import {
  getAllDepartment,
  getPositionsByDepartment,
} from "../../actions/department";
import { adminGetAllStaffLevels } from "../../actions/stafflevel";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { adminCreateEmployee } from "../../actions/employee";
import { ADMIN_CREATE_EMPLOYEE_RESET } from "../../types/employee";
import { DropdownList, ErrorBox } from "../../components";
import { employeeDataValidation } from "../../hooks/validations/employeeDataValidation";
import { Spinner, Successful } from "../../modals";
import { logoutAdmin } from "../../actions/auth";
// import { adminGetAllBanksFunc } from "../../actions/banklist";
import { banks } from "../../values/banks";
import { hrGetAllStaffGradesFunc } from "../../actions/staffgrade";
import { hrGetSalaryLevelsFunc } from "../../actions/salarylevel";
import { hrGetSalaryStepsFunc } from "../../actions/salarysteps";
import { HR_GET_SALARYLEVEL_BY_SALARYGRADE_RESET } from "../../types/salarylevel";
import { HR_GET_STAFFGRADE_RESET } from "../../types/staffgrade";
import { HR_GET_STEPS_BY_SALARYLEVEL_RESET } from "../../types/salarysteps";
import {
  GET_POSITION_BY_DEPARTMENT_RESET,
  GET_ALL_DEPARTMENTS_RESET,
} from "../../types/department";
const AddEmployee = () => {
  // useDispatch init
  const dispatch = useDispatch();
  //   init history
  const history = useHistory();
  //   redux state
  const { departments } = useSelector((state) => state.departmentsReducer);
  const { positions } = useSelector(
    (state) => state.departmentPositionsReducer
  );

  const { salaryGrades } = useSelector((state) => state.hrGetStaffGrade);
  const { salaryLevels } = useSelector((state) => state.hrGetSalaryLevel);
  const { salarySteps } = useSelector((state) => state.hrGetSteps);

  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  const {
    success: createSuccess,
    error: createEmployeeError,
    isLoading: createLoading,
  } = useSelector((state) => state.adminCreateEmployeeReducer);

  // const { banks } = useSelector((state) => state.adminGetAllBanks);

  //  func state
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const [isOpenSalaryGrade, setIsOpenSalaryGrade] = useState(false);
  const [isOpenSalaryLevel, setIsOpenSalaryLevel] = useState(false);
  const [isOpenSalaryStep, setIsOpenSalaryStep] = useState(false);
  const [isOpenNotch, setIsOpenNotch] = useState(false);

  const [passwordLength] = useState(20);
  const [password, setPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [selectedOption4, setSelectedOption4] = useState(null);
  const [selectedOption5, setSelectedOption5] = useState(null);
  const [salaryGrade, setSalaryGrade] = useState(null);
  const [salaryLevel, setSalaryLevel] = useState(null);
  const [salaryStep, setSalaryStep] = useState(null);
  const [notch, setNotch] = useState(null);
  const [contractSalary, setContractSalary] = useState(0);
  const [userRole] = useState(adminInfo?.user?.role || "");

  const genders = ["Male", "Female"];
  const emptypes = ["Permanent", "Part-time", "Contract", "Intern"];
  // const bankname = ["Sterling Bank", "KeyStone Bank"];

  const [employeeFormData, setEmployeeFormData] = useState({
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
    contractSalary: 0,
  });
  const [errors, setErrors] = useState({});

  //   onChange Handler
  const onChange = (e) => {
    setEmployeeFormData({
      ...employeeFormData,
      [e.target.name]: e.target.value,
    });
  };

  //   destructuring the data from the employeeFormData
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
  } = employeeFormData;

  // check if array of object is empty
  function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  useEffect(() => {
    setErrors(employeeDataValidation(employeeFormData));
  }, [employeeFormData]);
  //   onSubmit
  const onSubmit = (e) => {
    e.preventDefault();
    if (isObjectEmpty(employeeDataValidation(employeeFormData))) {
      const position = selectedOption4;

      dispatch(
        adminCreateEmployee(
          position.department._id,
          position._id,

          {
            ...employeeFormData,
            gender: selectedOption,
            employeeType: selectedOption2,
            employeeBank: selectedOption5?.name,
            contractSalary: contractSalary ? contractSalary : null,
            salaryLevel: salaryStep?.salaryLevel?._id,
            salaryStep: salaryStep?._id,
            notch:
              notch && notch.name !== "No Notch"
                ? {
                    name: notch?.name,
                    notchId: notch?._id,
                    stepId: salaryStep?._id,
                  }
                : null,
          }
        )
      );
    }
  };

  //   toggle func for modals
  const toggling = () => setIsOpen(!isOpen);
  const toggling2 = () => setIsOpen2(!isOpen2);
  const toggling3 = () => setIsOpen3(!isOpen3);
  const toggling4 = () => setIsOpen4(!isOpen4);
  const toggling5 = () => setIsOpen5(!isOpen5);
  const togglingSalaryGrade = () => setIsOpenSalaryGrade(!isOpenSalaryGrade);
  const togglingSalaryLevel = () => setIsOpenSalaryLevel(!isOpenSalaryLevel);
  const togglingSalaryStep = () => setIsOpenSalaryStep(!isOpenSalaryStep);
  const togglingNotch = () => setIsOpenNotch(!isOpenNotch);

  //   useEffect
  useEffect(() => {
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      history.push("/");
    } else {
      dispatch(getAllDepartment());
      dispatch(adminGetAllStaffLevels());
      // dispatch(adminGetAllBanksFunc());
      dispatch(hrGetAllStaffGradesFunc());
      // dispatch()
    }

    if (userRole === "Employee") {
      history.push("dashboard");
    } else if (
      userRole === "Internal Auditor" ||
      userRole === "CEO" ||
      userRole === "Accountant"
    ) {
      history.push("dashboard");
    }
  }, [
    dispatch,
    history,
    adminInfo,
    createEmployeeError,
    createSuccess,
    createLoading,
    userRole,
  ]);

  useEffect(() => {
    if (createEmployeeError === "no token was passed") {
      dispatch(logoutAdmin());
      dispatch({ type: ADMIN_CREATE_EMPLOYEE_RESET });
    }
  }, [createEmployeeError, dispatch]);

  //   gender
  const onOptionClicked = (gender) => () => {
    setSelectedOption(gender);
    setIsOpen(false);
  };

  //   employee type
  const onOptionClicked2 = (employeeType) => () => {
    setSelectedOption2(employeeType);
    setIsOpen2(false);
  };

  //   departments
  const onOptionClicked3 = (department) => () => {
    setSelectedOption3(department);
    dispatch(getPositionsByDepartment(department?._id));
    setSelectedOption4(null);

    setIsOpen3(false);
  };
  //   positions
  const onOptionClicked4 = (position) => () => {
    setSelectedOption4(position);
    setIsOpen4(false);
  };

  // salary grade
  const onOptionClickedSalaryGrade = (salaryGrade) => () => {
    setSalaryGrade(salaryGrade);
    dispatch(hrGetSalaryLevelsFunc(salaryGrade?._id));
    setIsOpenSalaryGrade(false);
    setSalaryLevel(null);
    setSalaryStep(null);
  };

  // salary level
  const onOptionClickedSalarylevel = (salaryLevel) => () => {
    setSalaryLevel(salaryLevel);
    dispatch(hrGetSalaryStepsFunc(salaryLevel?._id));
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

  //   bank name
  const onOptionClicked5 = (bankname) => () => {
    setSelectedOption5(bankname);
    setIsOpen5(false);
  };

  //   close all modals
  const closeOption = () => {
    if (
      isOpen === true ||
      isOpen2 === true ||
      isOpen3 === true ||
      isOpen4 === true ||
      isOpen5 === true ||
      isOpenSalaryGrade === true ||
      isOpenSalaryLevel === true ||
      isOpenSalaryStep === true ||
      isOpenNotch === true
    ) {
      setIsOpen(false);
      setIsOpen2(false);
      setIsOpen3(false);
      setIsOpen4(false);
      setIsOpen5(false);
      setIsOpenSalaryGrade(false);
      setIsOpenSalaryLevel(false);
      setIsOpenSalaryStep(false);
      setIsOpenNotch(false);
    }
  };

  const createPassword = () => {
    const number = "12345678";
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let characterList = number + lowerCase + upperCase;
    let password = "";
    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }

    setPassword(password);
    // return password;
  };

  const popup7 = () => {
    if (createSuccess && !createLoading) {
      history.push("/employee");
      dispatch({
        type: ADMIN_CREATE_EMPLOYEE_RESET,
      });
      dispatch({
        type: HR_GET_SALARYLEVEL_BY_SALARYGRADE_RESET,
      });
      dispatch({ type: HR_GET_STEPS_BY_SALARYLEVEL_RESET });
      dispatch({ type: HR_GET_STAFFGRADE_RESET });
      dispatch({ type: GET_ALL_DEPARTMENTS_RESET });
      dispatch({ type: GET_POSITION_BY_DEPARTMENT_RESET });

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
      });
      setContractSalary(0);
      setSelectedOption(null);
      setSelectedOption2(null);
      setSelectedOption3(null);
      setSelectedOption4(null);
      setSalaryGrade(null);
      setSalaryLevel(null);
      setSalaryStep(null);
      setNotch(null);
    }
    setIsOpen7(false);
  };

  return (
    <>
      {createLoading && <Spinner />}
      <Successful
        isOpen7={
          isOpen7 || (createSuccess && !createLoading && !createEmployeeError)
        }
        setIsOpen7={setIsOpen7}
        popup7={popup7}
        message="Employpee has been Created Successfully"
      />
      <NewEmp onClick={closeOption}>
        <h1>Onboard Employee</h1>
        <BackLink className="save__btn" onClick={createPassword} to="/employee">
          <FontAwesomeIcon
            className="left__arrow"
            icon={["fas", "arrow-left"]}
          />
        </BackLink>
        <ImportExcelLink onClick={createPassword} to="/import-excel">
          <div className="label__group">
            <input
              className="excel__import"
              style={{ padding: "1rem" }}
              // className="disabled__btn"
              type="submit"
              value="Import from Excel"
              // disabled
            />
          </div>
        </ImportExcelLink>
        {!createLoading && createEmployeeError && (
          <ErrorBox
            errorMessage={
              createEmployeeError === "Request failed with status code 500"
                ? "Please Check Your Internet Connection"
                : createEmployeeError
            }
          />
        )}
        <form onSubmit={onSubmit}>
          <div className="input__row">
            <div style={{ width: "20rem" }} className="label__group">
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
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Employee Full Name"
              />
              <span className="error">{errors.name}</span>
            </div>
            <div style={{ width: "20rem" }} className="label__group">
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
                keyValue
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
                type="email"
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
                type="tel"
                pattern="[0-9]{11}"
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
                type="tel"
                title="Please use a 10 digit number with no dashes or dots"
                pattern="[0-9]{10}"
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
                isOpen={isOpen5}
                toggling={toggling5}
                selectedOption={selectedOption5}
                text="-- Select a Bank Name"
                dataSet={banks}
                onOptionClicked={onOptionClicked5}
              />
              <span className="error">
                {!selectedOption5 ? "*bank name is required" : ""}
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
          {selectedOption2 !== "Contract" &&
            selectedOption2 !== "Intern" &&
            selectedOption2 && (
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
                                _id: "238HS4329D",
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

          {(selectedOption2 === "Intern" || selectedOption2 === "Contract") && (
            <>
              <div className="input__row">
                <div className="label__group">
                  <label>Contract Salary</label>
                  <input
                    type="number"
                    name="contractSalary"
                    value={contractSalary}
                    onChange={(e) => setContractSalary(e.target.valueAsNumber)}
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
                isOpen={isOpen3}
                toggling={toggling3}
                selectedOption={selectedOption3}
                text="-- Select a Department"
                dataSet={departments}
                onOptionClicked={onOptionClicked3}
              />
              <span className="error">
                {!selectedOption3 ? "*department is required" : ""}
              </span>
            </div>
            <div className="label__group">
              <label>Position</label>
              <DropdownList
                list={true}
                isOpen={isOpen4}
                toggling={toggling4}
                selectedOption={selectedOption4}
                text="-- Select a Position"
                dataSet={positions}
                onOptionClicked={onOptionClicked4}
              />
              <span className="error">
                {!selectedOption4 ? "*position is required" : ""}
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
            className={
              !selectedOption ||
              !selectedOption2 ||
              !selectedOption3 ||
              !selectedOption4 ||
              createLoading ||
              (selectedOption2 !== "Contract" && selectedOption2 !== "Intern"
                ? !salaryGrade || !salaryLevel || !salaryStep
                : !contractSalary) ||
              !isObjectEmpty(employeeDataValidation(employeeFormData))
                ? "disabled__btn margin__top"
                : "add__emp"
            }
            // className="add__emp"
            type="submit"
            disabled={
              !selectedOption ||
              !selectedOption2 ||
              !selectedOption3 ||
              !selectedOption4 ||
              !selectedOption5 ||
              createLoading ||
              (selectedOption2 !== "Contract" && selectedOption2 !== "Intern"
                ? !salaryGrade || !salaryLevel || !salaryStep
                : !contractSalary) ||
              !isObjectEmpty(employeeDataValidation(employeeFormData))
            }
            value="Add Employee"
          />
        </form>
      </NewEmp>
    </>
  );
};

export default AddEmployee;
