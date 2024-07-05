import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSL from "xlsx";
import { BackLink, Container } from "../../styles/library";
import { COLORS } from "../../values/colors";
import { getAllDepartment } from "../../actions/department";
import { adminGetAllPosition } from "../../actions/position";
import {
  // adminCreateBulkEmployeeAllFunc,
  adminCreateBulkEmployeeFileFunc,
  adminCreateBulkEmployeeWithNoGradeFileFunc,
  // adminCreateBulkEmployeeFunc,
  // hrUploadBulkContractStaffFunc,
} from "../../actions/employee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import {
  // downloadContractBulkEmployeeTemplateExcelFileFunc,
  downloadEmployeeTemplateAsExcel,
  downloadEmployeeWithNoGradeTemplateAsExcel,
} from "../../actions/download";
import { Spinner, Successful } from "../../modals";
import { ErrorBox } from "../../components";
import {
  ADMIN_CREATE_BULK_EMPLOYEE_FILE_RESET,
  ADMIN_CREATE_BULK_EMPLOYEE_RESET,
} from "../../types/employee";
import { DOWNLOADING_ON_PROCESS_ERROR } from "../../types/download";
import { VERIFY_BULK_ACCOUNT_NUMBER_RESET } from "../../types/auth";
import {
  Capitalize,
  checkAccNumber,
  checkDate,
  checkEmail,
  checkNumber,
  excelDateToJSDate,
  trancateWord,
  validateEmail,
} from "../../hooks/functions";
import { getAllBankNamesFunc } from "../../actions/banklist";
// import { verifyBulkAcctountNumberFunc } from "../../actions/auth";
// import { useCallback } from "react";
// import { currentmonthMethod } from "../../hooks/months/listMonths";

const ImportExcelfile = ({
  toggle,
  toggleMenu,
  mobileToggle,
  toggleMobileMenu,
}) => {
  // useDispatch init
  const dispatch = useDispatch();
  // history init
  const history = useHistory();

  // useStates
  const [excelData, setExcelData] = useState([]);
  const [excelData2, setExcelData2] = useState([]);
  const [bulkData, setBulkData] = useState([]);
  const [fileName, setFileName] = useState(null);
  const [file, setFile] = useState(null);
  const [showError, setShowError] = useState(null);
  // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  // const { bankNames } = useSelector((state) => state.adminGetAllBankNames);
  const {
    // verifiedAccounts,
    error: verifyBulkAccountError,
    isLoading: verifyBulkAccountLoading,
  } = useSelector((state) => state.verifyBulkAccountNumber);

  const { isLoading: downloadLoading, error: downloadError } = useSelector(
    (state) => state.downloadStatus
  );

  const {
    isLoading: createBulkLoading,
    success: createBulkSuccess,
    message: CreateBulkMessage,
    error: createBulkError,
  } = useSelector((state) => state.adminCreateBulkEmployee);

  const {
    isLoading: createBulkFileLoading,
    success: createBulkFileSuccess,
    message: CreateBulkFileMessage,
    error: createBulkFileError,
  } = useSelector((state) => state.adminCreateBulkEmployeeFile);

  const hiddenFileInput = useRef(null);

  useEffect(() => {
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      history.push("/signin");
    } else {
      dispatch(getAllDepartment());
      dispatch(adminGetAllPosition());
      dispatch(getAllBankNamesFunc());
    }
    // clearData();
  }, [dispatch, adminInfo, history]);

  useEffect(() => {
    let timeoutId;
    if (showError || verifyBulkAccountError || downloadError) {
      timeoutId = setTimeout(() => {
        setShowError(null);
        dispatch({ type: VERIFY_BULK_ACCOUNT_NUMBER_RESET });
        dispatch({ type: DOWNLOADING_ON_PROCESS_ERROR });
      }, 6000);
    }

    return () => {
      // Clear the timeout when the component unmounts or when showError changes
      clearTimeout(timeoutId);
    };
  }, [verifyBulkAccountError, dispatch, showError, downloadError]);

  const clearData = () => {
    setExcelData([]);
    setExcelData2([]);
    setBulkData([]);
    hiddenFileInput.current.value = null;
    setFileName(null);
  };

  const popup7 = () => {
    if (createBulkSuccess && !createBulkError) {
      setExcelData(null);
      setFileName(null);
      dispatch({ type: ADMIN_CREATE_BULK_EMPLOYEE_RESET });
      history.push("employee");
    }

    if (createBulkFileSuccess) {
      history.push("employee");
      dispatch({ type: ADMIN_CREATE_BULK_EMPLOYEE_FILE_RESET });
    }

    if (createBulkFileError) {
      dispatch({ type: ADMIN_CREATE_BULK_EMPLOYEE_FILE_RESET });
    }
  };

  // handle File

  const fileType = ["application/vnd.ms-excel"];
  const fileType2 = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  const filyType3 = ["text/csv"];

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    setFileName(selectedFile?.name);

    // setting file from excel sheet
    setFile(e.target.files[0]);

    if (selectedFile) {
      if (
        selectedFile &&
        (fileType.includes(selectedFile.type) ||
          fileType2.includes(selectedFile.type) ||
          filyType3.includes(selectedFile.type))
      ) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          const workbook = XLSL.read(e?.target?.result, { type: "buffer" });
          const worksheetName = workbook.SheetNames[0];
          // const worksheetName2 = workbook.SheetNames[1];

          // console.log(workbook);

          const worksheet = workbook.Sheets[worksheetName];
          // const worksheet2 = workbook.Sheets[worksheetName2];
          const data = XLSL.utils.sheet_to_json(worksheet);
          // const data2 = XLSL.utils.sheet_to_json(worksheet2);

          if (
            worksheetName !== "Employee with grade" &&
            worksheetName !== "Employee with no grade"
          ) {
            return setShowError(
              'Your Sheet Name must be either "Employee with grade" or  "Employee with no grade"'
            );
          }
          if (checkExcelFile(data)) {
            setExcelData(data);
          } else {
            setExcelData2(data);
          }
        };
      } else {
        setShowError("Please select only specified file type");
        // clearData();
      }
    } else {
      setShowError("Please select a file");
      // clearData();
    }
  };

  // useEffect(() => {
  //   if (verifiedAccounts && excelData?.length > 0) {
  //     // const employees = [];
  //     excelData?.map((data) => {
  //       let foundItem = verifiedAccounts?.find((account) => {
  //         return (
  //           data?.EmployeeBankAcctNumber?.toString() ===
  //           account?.accountNumber?.toString()
  //         );
  //       });

  //       setBulkData((oldArray) => [
  //         ...oldArray,
  //         { ...data, accountName: foundItem?.accountName },
  //       ]);
  //       // employees.push({ ...data, accountName: foundItem?.accountName });
  //     });
  //   }
  //   // eslint-disable-next-line
  // }, [verifiedAccounts]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // getDepartment();
  // };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const downloadTemplate = (type) => {
    switch (type) {
      case "full-time":
        dispatch(downloadEmployeeTemplateAsExcel());
        break;
      case "contract-with-no-grade":
        dispatch(downloadEmployeeWithNoGradeTemplateAsExcel());
        break;
      default:
        break;
    }
  };

  // const downloadContractTemplate = () => {
  //   dispatch(downloadContractBulkEmployeeTemplateExcelFileFunc());
  // };

  // const getBankCode = useCallback(
  //   (bankName) => {
  //     const bankCode = bankNames
  //       ?.filter((data) => data?.name === bankName)
  //       .map((data) => {
  //         // console.log(data?.code);
  //         return data?.code;
  //       })
  //       ?.join("");

  //     return bankCode ? bankCode : "";
  //   },
  //   [bankNames]
  // );

  // useEffect(() => {
  //   if (excelData?.length > 0) {
  //     const accountData = excelData?.map((employee) => {
  //       return {
  //         accountNumber: employee?.EmployeeBankAcctNumber,
  //         bankCode: getBankCode(employee?.BankName),
  //       };
  //     });

  //     dispatch(verifyBulkAcctountNumberFunc(accountData));
  //   }
  //   // eslint-disable-next-line
  // }, [excelData]);

  //check if file has salarylevel

  // const checkforSalaryLevel = () => {
  //   const check = excelData?.hasOwnProperty("salaryLevel");
  //   return check ? true : false;
  // };

  const checkExcelFile = (data) => {
    const checkedData = data?.map(
      (el) => {
        return el.hasOwnProperty("salaryLevel");
      }
      // return console.log(!el.salaryLevel);
      // return el.hasOwnProperty("salaryLevel") ? true : false;
    );

    return checkedData[0];
  };

  const checkSalaryLevel = () => {
    return excelData.some((el) => {
      let asterisks = 0;
      for (let i = 0; i < el?.salaryLevel?.length; i++) {
        if (el?.salaryLevel?.charAt(i) === "*") {
          asterisks = asterisks + 1;
        }
      }
      // console.log(asterisks);
      return asterisks < 2 ? true : false;
    });
  };

  // console.log(checkSalaryLevel());

  const onCreateBulk = (e) => {
    e.preventDefault();
    const { test, test2 } = checkEmail(excelData ? excelData : []);

    if (checkSalaryLevel()) {
      return setShowError("Salary Level is incorrect");
    }

    if (checkDate(excelData)) {
      setShowError(
        "Please enter correct format for both date of birth and joinDate"
      );
    } else {
      if (test) {
        setShowError("Please make sure emails are not duplicated");
      } else {
        if (test2) {
          setShowError("Please make sure emails are valid");
        } else {
          // if (checkDuplicateAccountNumber(excelData)) {
          //   setShowError("Please make sure Account Number are not Dulicated");
          // } else {

          // if (excelData?.length > 500) {
          //   dispatch(adminCreateBulkEmployeeAllFunc(currentmonthMethod("long")));
          // } else {
          // let newData = bulkData?.map((el) => {

          // let newData;
          let newData = excelData?.map((el) => {
            return {
              name: el?.Name?.trim(),
              staffId: el?.StaffId?.toString()?.trim(),
              email: el?.Email?.toString()?.trim(),
              position: el?.Position ? el?.Position?.toString()?.trim() : null,
              // salaryGrade: el?.salaryGrade ? el?.salaryGrade?.trim() : null,
              salaryLevel: el?.salaryLevel
                ? el?.salaryLevel?.toString()?.trim()
                : null,
              salaryStep: el?.salaryStep
                ? el?.salaryStep?.toString()?.trim()
                : null,
              // contractSalary: el?.ContractSalary
              //   ? Number(el?.ContractSalary)
              //   : null,
              notch: el?.Notch ? el?.Notch?.toString()?.trim() : null,
              bankName: el?.BankName ? el?.BankName?.toString()?.trim() : null,
              employeeBankAcctNumber:
                el?.EmployeeBankAcctNumber?.toString().trim(),
              accountName: el?.accountName
                ? el?.accountName?.toString().trim()
                : null,
              nationality: el?.Nationality ? el?.Nationality?.trim() : null,
              gender: el?.Gender?.toString()?.trim(),
              address: el?.Address?.toString()?.trim(),
              dob: excelDateToJSDate(el?.DateOfBirth)?.toString()?.trim(),
              mobile: el?.PhoneNumber?.toString().trim(),
              city: el?.City?.toString()?.trim(),
              state: el?.State?.toString()?.trim(),
              employeeType: Capitalize(el?.EmployeeType?.toString()?.trim()),
              joinDate: excelDateToJSDate(el?.JoinDate)?.toString()?.trim(),
            };
          });

          if (excelData?.length > 0 && excelData2?.length > 0) {
            return setShowError("You can only upload one file at a time.");
          }

          const formData = new FormData();
          formData.append("excelFile", file);
          if (excelData?.length > 0) {
            dispatch(adminCreateBulkEmployeeFileFunc(formData));
          } else if (excelData2?.length > 0) {
            dispatch(adminCreateBulkEmployeeWithNoGradeFileFunc(formData));
          }

          // if (excelData?.length > 100) {
          //   const formData = new FormData();
          //   formData.append("excelFile", file);
          //   dispatch(adminCreateBulkEmployeeFileFunc(formData));
          //   // dispatch(hrUploadBulkContractStaffFunc(newData));
          // } else {
          //   const formData = new FormData();
          //   formData.append("excelFile", file);
          //   dispatch(adminCreateBulkEmployeeFileFunc(formData));
          //   // dispatch(adminCreateBulkEmployeeFunc(newData));
          // }

          // }

          // }
        }
      }
    }

    // const formData = new FormData();
    // formData.append("file", file);
    // dispatch(adminCreateBulkEmployeeFileFunc(formData));
  };

  useEffect(() => {
    let timeoutId;

    if (showError !== "") {
      timeoutId = setTimeout(() => {
        setShowError("");
      }, 6000);
    }

    return () => {
      // Clear the timeout when the component unmounts or when showError changes
      clearTimeout(timeoutId);
    };
  }, [showError]);

  return (
    <>
      {((downloadLoading && !downloadError) ||
        createBulkLoading ||
        verifyBulkAccountLoading ||
        createBulkFileLoading) && <Spinner />}

      {((createBulkSuccess && !createBulkError) ||
        CreateBulkMessage ||
        createBulkFileSuccess) && (
        <Successful
          isOpen7={
            (createBulkSuccess && !createBulkError) || createBulkFileSuccess
          }
          popup7={popup7}
          message={CreateBulkMessage || CreateBulkFileMessage}
          // message="Successfully Uploaded Employees"
        />
      )}

      <Container>
        <BackLink className="green__btn" to="/new-employee">
          <FontAwesomeIcon
            className="left__arrow"
            icon={["fas", "arrow-left"]}
          />
        </BackLink>
        <div className="container__content">
          <h1 className="import__text">
            Import
            <span
              style={{
                color: `${COLORS.green}`,
                fontSize: "2.2rem",
                margin: "0 .7rem",
              }}
            >
              Excel
            </span>
            File
          </h1>
        </div>
        <div className="exportfile__container">
          {((!downloadLoading && downloadError) ||
            (!createBulkLoading && createBulkError) ||
            verifyBulkAccountError ||
            createBulkFileError) && (
            <ErrorBox
              errorMessage={
                downloadError ||
                createBulkError ||
                verifyBulkAccountError ||
                createBulkFileError
              }
            />
          )}
          <form>
            {/* <form onSubmit={handleSubmit}> */}
            {/* <p
              style={{
                color: `${COLORS.red}`,
                marginBottom: "1rem",
                fontSize: "2rem",
                textAlign: "center",
              }}
            >
              &#9888;
              <u
                style={{
                  fontSize: "1.5rem",
                }}
              >
                Only Contract Staff Bulk Upload Available
              </u>
            </p> */}
            <label>
              Select a file to import: ...*
              <span style={{ color: `${COLORS.red}`, fontSize: "1.3rem" }}>
                (must be a .xls, .xlsx or .csv file extension)
              </span>
            </label>
            {showError && <ErrorBox errorMessage={showError} />}
            <div className="upload_empfile">
              <p className="choose__btn" onClick={handleClick}>
                Choose a file
              </p>
              <p>{fileName}</p>
            </div>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleFile}
              accept=".xls,.xlsx,.csv"
              style={{ display: "none" }}
            />
            <div className="button__row button__left">
              <input
                type="submit"
                className={
                  !excelData?.length && !excelData2?.length
                    ? "disabled__btn full__width"
                    : "full__width green__btn"
                }
                onClick={onCreateBulk}
                disabled={!excelData?.length && !excelData2?.length}
                value="Upload Excel File"
              />
              <input
                type="button"
                style={{ width: "15rem" }}
                className={"save__btn full__width margin__left"}
                onClick={clearData}
                value="Clear"
              />
            </div>
            <p
              style={{
                color: `${COLORS.black5}`,
                marginTop: "1rem",
                fontSize: "1.5rem",
              }}
            >
              Download Excel Template
            </p>
            <div className="button__row margin__top">
              <input
                type="button"
                // className="save__btn"
                className="save__btn"
                onClick={() => downloadTemplate("full-time")}
                // value="Download"
                value="Full-Time Staff"
              />
              <input
                type="button"
                // className="disabled__btn"
                className="save__btn margin__left"
                onClick={() => downloadTemplate("contract-with-no-grade")}
                value="Contract-With-No-Grade Staff"
              />
            </div>
          </form>
          <div
            style={{
              display: "flex",
              marginTop: "4rem",
              gap: "0 1rem",
              backgroundColor: "rgba(33,138,255, 0.5)",
              // backgroundColor: `${COLORS?.blue2}`,
              padding: "1rem",
              borderRadius: ".5rem",
              border: `1px solid rgb(33,138,255)`,
              color: `${COLORS?.white}`,
            }}
          >
            <h1 style={{ fontWeight: "600" }}> &#9432;</h1>
            <div>
              <h2>
                Excel DateOfBirth and JoinDate must be in this format:
                <span>dd/mm/yyyy </span>
              </h2>
            </div>
          </div>
        </div>

        {/* <h1>Employee with Grade</h1> */}
        {/* <h1>Preview Excel Sheet</h1> */}
        <h1>Preview Excel Sheet(Employee with Grade)</h1>
        <div className="table__body" style={{ marginBottom: "2rem" }}>
          <div className="table__overflow full__height">
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Staff ID</th>
                  <th>Full Name</th>
                  <th>Email Address</th>
                  <th>Account No.</th>
                  {/* <th>Account Name</th> */}
                  <th>Phone Number</th>
                  <th>Position</th>
                  <th>Employee Type</th>
                  <th>Date of Birth</th>
                  <th>Join Date</th>
                </tr>
              </thead>
              <tbody>
                {/* {bulkData?.map((employee, index) => { */}
                {excelData?.map((employee, index) => {
                  return (
                    <tr key={++index}>
                      <td>{++index}</td>
                      <td>{employee?.StaffId}</td>
                      <td>{`${trancateWord(employee?.Name?.toString())} `}</td>
                      <td>
                        {validateEmail(employee?.Email) ? (
                          trancateWord(employee?.Email?.toString())
                        ) : (
                          <p className="red">
                            &#x26A0; {trancateWord(employee?.Email?.toString())}
                          </p>
                        )}
                      </td>
                      <td>
                        {checkAccNumber(employee?.EmployeeBankAcctNumber) ? (
                          employee?.EmployeeBankAcctNumber
                        ) : (
                          <p className="red">
                            &#9888; {employee?.EmployeeBankAcctNumber}
                          </p>
                        )}
                      </td>

                      {/* <td>
                        {employee?.accountName ? (
                          employee?.accountName
                        ) : (
                          <p className="red">
                            &#9888; Invalid account name
                          </p>
                        )}
                      </td> */}

                      {/* <td>{employee?.dob?.substring(0, 10)}</td> */}
                      <td>
                        {checkNumber(employee?.PhoneNumber) ? (
                          employee?.PhoneNumber
                        ) : (
                          <p className="red">&#9888; {employee?.PhoneNumber}</p>
                        )}
                      </td>
                      <td>{trancateWord(employee?.Position?.toString())}</td>
                      <td>{Capitalize(employee?.EmployeeType)}</td>
                      <td>{excelDateToJSDate(employee?.DateOfBirth)}</td>
                      <td>{excelDateToJSDate(employee?.JoinDate)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* {noEmployees} */}
          </div>
        </div>

        <section>
          <h1>Preview Excel Sheet (Employee with No Grade) </h1>
          <div className="table__body" style={{ marginBottom: "2rem" }}>
            <div className="table__overflow full__height">
              <table>
                <thead>
                  <tr>
                    <th> S/N</th>
                    <th> Staff ID</th>
                    <th>Full Name</th>
                    <th>Email Address</th>
                    <th>Account No.</th>
                    <th>Amount</th>
                    {/* <th>Account Name</th> */}
                    {/* <th>Phone Number</th> */}
                    {/* <th>Position</th> */}
                    {/* <th>Employee Type</th> */}
                    {/* <th>Date of Birth</th> */}
                    {/* <th>Join Date</th> */}
                  </tr>
                </thead>
                <tbody>
                  {/* {bulkData?.map((employee, index) => { */}
                  {excelData2?.map((employee, index) => {
                    return (
                      <tr key={++index}>
                        <td>{++index}</td>
                        <td>{employee?.StaffId}</td>
                        <td>{`${trancateWord(
                          employee?.StaffName?.toString()
                        )} `}</td>
                        <td>
                          {validateEmail(employee?.Email) ? (
                            trancateWord(employee?.Email?.toString())
                          ) : (
                            <p className="red">
                              &#x26A0;{" "}
                              {trancateWord(employee?.Email?.toString())}
                            </p>
                          )}
                        </td>
                        <td>
                          {checkAccNumber(employee?.BankAcctNumber) ? (
                            employee?.BankAcctNumber
                          ) : (
                            <p className="red">
                              &#9888; {employee?.BankAcctNumber}
                            </p>
                          )}
                        </td>
                        <td>
                          {employee?.Amount ? (
                            employee?.Amount?.toString()
                          ) : (
                            <p className="red">&#x26A0; {"Can't be blank"}</p>
                          )}
                        </td>

                        {/* <td>
                        {employee?.accountName ? (
                          employee?.accountName
                        ) : (
                          <p className="red">
                            &#9888; Invalid account name
                          </p>
                        )}
                      </td> */}

                        {/* <td>{employee?.dob?.substring(0, 10)}</td> */}
                        {/* <td>
                        {checkNumber(employee?.PhoneNumber) ? (
                          employee?.PhoneNumber
                        ) : (
                          <p className="red">&#9888; {employee?.PhoneNumber}</p>
                        )}
                      </td> */}
                        {/* <td>{trancateWord(employee?.Position?.toString())}</td> */}
                        {/* <td>{Capitalize(employee?.EmployeeType)}</td> */}
                        {/* <td>{excelDateToJSDate(employee?.DateOfBirth)}</td> */}
                        {/* <td>{excelDateToJSDate(employee?.JoinDate)}</td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {/* {noEmployees} */}
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default ImportExcelfile;
