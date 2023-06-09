import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSL from "xlsx";
import { BackLink, Container } from "../../styles/library";
import { COLORS } from "../../values/colors";
import { getAllDepartment } from "../../actions/department";
import { adminGetAllPosition } from "../../actions/position";
import {
  adminCreateBulkEmployeeFunc,
  // hrUploadBulkContractStaffFunc,
} from "../../actions/employee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import {
  // downloadContractBulkEmployeeTemplateExcelFileFunc,
  downloadCreateBulkEmployeeTemplateExcelFileFunc,
} from "../../actions/download";
import { Spinner, Successful } from "../../modals";
import { ErrorBox } from "../../components";
import { ADMIN_CREATE_BULK_EMPLOYEE_RESET } from "../../types/employee";
import { DOWNLOADING_ON_PROCESS_ERROR } from "../../types/download";
import { VERIFY_BULK_ACCOUNT_NUMBER_RESET } from "../../types/auth";
import {
  Capitalize,
  checkAccNumber,
  checkDate,
  checkDuplicateAccountNumber,
  checkEmail,
  checkNumber,
  formatDate,
  trancateWord,
  validateEmail,
} from "../../hooks/functions";
import { getAllBankNamesFunc } from "../../actions/banklist";
import { verifyBulkAcctountNumberFunc } from "../../actions/auth";
import { useCallback } from "react";

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
  const [bulkData, setBulkData] = useState([]);
  const [fileName, setFileName] = useState(null);
  const [showError, setShowError] = useState(null);
  // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  const { bankNames } = useSelector((state) => state.adminGetAllBankNames);
  const {
    verifiedAccounts,
    error: verifyBulkAccountError,
    isLoading: verifyBulkAccountLoading,
  } = useSelector((state) => state.verifyBulkAccountNumber);
  const { isLoading: downloadLoading, error: downloadError } = useSelector(
    (state) => state.downloadStatus
  );
  const {
    isLoading: createBulkLoading,
    success: createBulkSuccess,
    error: createBulkError,
  } = useSelector((state) => state.adminCreateBulkEmployee);

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
    if (showError) {
      setTimeout(() => {
        setShowError(null);
      }, 5000);
    }
  }, [showError]);

  const clearData = () => {
    setExcelData([]);
    setBulkData([]);
    setFileName(null);
  };
  // console.log(excelData);

  const popup7 = () => {
    if (createBulkSuccess && !createBulkError) {
      setExcelData(null);
      setFileName(null);
      dispatch({ type: ADMIN_CREATE_BULK_EMPLOYEE_RESET });
      history.push("employee");
    }
  };

  useEffect(() => {
    if (createBulkError) {
      dispatch({ type: ADMIN_CREATE_BULK_EMPLOYEE_RESET });
    }
  }, [createBulkError, dispatch]);

  // handle File

  useEffect(() => {
    if (verifyBulkAccountError) {
      setTimeout(() => {
        dispatch({ type: VERIFY_BULK_ACCOUNT_NUMBER_RESET });
      }, 5000);
      setShowError(`InValid Acount Number ${verifyBulkAccountError}`);
    }
  }, [verifyBulkAccountError, dispatch]);

  const fileType = ["application/vnd.ms-excel"];
  const fileType2 = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];

    setFileName(selectedFile?.name);

    if (selectedFile) {
      if (
        selectedFile &&
        (fileType.includes(selectedFile.type) ||
          fileType2.includes(selectedFile.type))
      ) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          const workbook = XLSL.read(e?.target?.result, { type: "buffer" });
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];
          const data = XLSL.utils.sheet_to_json(worksheet);
          setExcelData(data);
        };
      } else {
        setShowError("Please select only specified file type");
        clearData();
      }
    } else {
      setShowError("Please select a file");
      clearData();
    }
  };

  useEffect(() => {
    if (verifiedAccounts && excelData?.length > 0) {
      // const employees = [];
      excelData?.map((data) => {
        let foundItem = verifiedAccounts?.find((account) => {
          return (
            data?.EmployeeBankAcctNumber?.toString() ===
            account?.accountNumber?.toString()
          );
        });

        setBulkData((oldArray) => [
          ...oldArray,
          { ...data, accountName: foundItem?.accountName },
        ]);
        // employees.push({ ...data, accountName: foundItem?.accountName });
      });
    }
    // eslint-disable-next-line
  }, [verifiedAccounts]);

  // console.log(bulkData);

  const handleSubmit = (e) => {
    e.preventDefault();

    // getDepartment();
  };

  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const downloadTemplate = () => {
    dispatch(downloadCreateBulkEmployeeTemplateExcelFileFunc());
  };

  // const downloadContractTemplate = () => {
  //   dispatch(downloadContractBulkEmployeeTemplateExcelFileFunc());
  // };

  const getBankCode = useCallback(
    (bankName) => {
      const bankCode = bankNames
        ?.filter((data) => data?.name === bankName)
        .map((data) => {
          // console.log(data?.code);
          return data?.code;
        })
        ?.join("");

      return bankCode ? bankCode : "";
    },
    [bankNames]
  );

  // const verifyAccount = useCallback(
  //   (verifyAccountData) => {
  //     if (verifyAccountData) {
  //       dispatch(verifyBulkAcctountNumberFunc(verifyAccountData));
  //     }
  //   },
  //   [dispatch]
  // );

  useEffect(() => {
    if (excelData?.length > 0) {
      const accountData = excelData?.map((employee) => {
        return {
          accountNumber: employee?.EmployeeBankAcctNumber,
          bankCode: getBankCode(employee?.BankName),
        };
      });

      dispatch(verifyBulkAcctountNumberFunc(accountData));
      // setVerifyAccountData(accountData);
      // console.log(accountData);
    }
    // eslint-disable-next-line
  }, [excelData]);

  function excelDateToJSDate(excelDate) {
    if (typeof excelDate === "string") {
      const date = excelDate.split("/").reverse().join("-");
      return date;
      // return new Date(converted_date).toISOString().split('T')[0].replaceAll('-', '/');
    } else if (excelDate) {
      let date = new Date(Math.round((excelDate - (25568 + 1)) * 86400 * 1000));
      let converted_date = date.toLocaleString();
      // return new Date(converted_date);
      return new Date(converted_date).toISOString().split("T")[0];
      // return new Date(converted_date).toISOString().split('T')[0].replaceAll('-', '/');
      // return new Date(converted_date).toISOString();
    }
  }

  const onCreateBulk = () => {
    const { test, test2 } = checkEmail(excelData ? excelData : []);
    let newData;
    // if (type && type === "Contract") {
    if (checkDate(excelData)) {
      setShowError(
        "Please enter correct format for both DateOfBirth and JoinDate"
      );
    } else {
      if (test) {
        setShowError("Please make sure emails are not Dulicated");
      } else {
        if (test2) {
          setShowError("Please make sure emails are Valid");
        } else {
          if (checkDuplicateAccountNumber(excelData)) {
            setShowError("Please make sure Account Number are not Dulicated");
          } else {
            newData = bulkData?.map((el) => {
              return {
                name: el?.Name?.trim(),
                staffId: el?.StaffId?.toString()?.trim(),
                email: el?.Email?.toString()?.trim(),
                position: el?.Position
                  ? el?.Position?.toString()?.trim()
                  : null,
                // salaryGrade: el?.salaryGrade ? el?.salaryGrade?.trim() : null,
                salaryLevel: el?.salaryLevel
                  ? el?.salaryLevel?.toString()?.trim()
                  : null,
                salaryStep: el?.salaryStep
                  ? el?.salaryStep?.toString()?.trim()
                  : null,
                contractSalary: el?.ContractSalary
                  ? Number(el?.ContractSalary)
                  : null,
                notch: el?.Notch ? el?.Notch?.toString()?.trim() : null,
                bankName: el?.BankName
                  ? el?.BankName?.toString()?.trim()
                  : null,
                employeeBankAcctNumber:
                  el?.EmployeeBankAcctNumber?.toString().trim(),
                accountName: el?.accountName?.toString().trim(),
                nationality: el?.Nationality ? el?.Nationality?.trim() : null,
                gender: el?.Gender?.toString()?.trim(),
                address: el?.Address?.toString()?.trim(),
                dob: excelDateToJSDate(el?.DateOfBirth?.toString()?.trim()),
                mobile: el?.PhoneNumber?.toString().trim(),
                city: el?.City?.toString()?.trim(),
                state: el?.State?.toString()?.trim(),
                employeeType: Capitalize(el?.EmployeeType?.toString()?.trim()),
                joinDate: excelDateToJSDate(el?.JoinDate),
              };
            });

            dispatch(adminCreateBulkEmployeeFunc(newData));
            // dispatch(hrUploadBulkContractStaffFunc(newData));
          }
        }
      }
    }
  };

  return (
    <>
      {((downloadLoading && !downloadError) ||
        createBulkLoading ||
        verifyBulkAccountLoading) && <Spinner />}

      {createBulkSuccess && !createBulkError && (
        <Successful
          isOpen7={createBulkSuccess && !createBulkError}
          popup7={popup7}
          message="Successfully Uploaded Employees"
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
            (!createBulkLoading && createBulkError)) && (
            <ErrorBox errorMessage={downloadError || createBulkError} />
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
              &#9888;{" "}
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
                  !excelData?.length
                    ? "disabled__btn full__width"
                    : "full__width green__btn"
                }
                onClick={() => onCreateBulk()}
                disabled={!excelData.length}
                value="Import Excel File"
              />
              <input
                type="submit"
                style={{ width: "15rem" }}
                className={"save__btn full__width margin__left"}
                onClick={() => clearData()}
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
              {/* <input
                type="submit"
                className="disabled__btn"
                // className="save__btn"
                onClick={downloadTemplate}
                value="Non-Contract Staff"
              /> */}
              <input
                type="submit"
                className="save__btn"
                // className="save__btn margin__left"
                onClick={downloadTemplate}
                value="Download"
                // value="Contract Staff"
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
        <div className="table__body">
          <div className="table__overflow full__height">
            <table>
              <thead>
                <tr>
                  {/* <th style={{ paddingLeft: "3.5rem" }}> Staff ID</th> */}
                  <th> Staff ID</th>
                  <th>Full Name</th>
                  <th>Email Address</th>
                  <th>Account No.</th>
                  <th>Account Name</th>
                  <th>Phone Number</th>
                  <th>Position</th>
                  <th>Employee Type</th>
                  <th>Date of Birth</th>
                </tr>
              </thead>
              <tbody>
                {bulkData?.map((employee, index) => {
                  return (
                    <tr key={++index}>
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
                      <td>
                        {employee?.accountName ? (
                          employee?.accountName
                        ) : (
                          <p className="red">
                            &#9888; Invalid account name
                            {/* &#9888; {employee?.EmployeeBankAcctNumber} */}
                          </p>
                        )}
                      </td>
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
                      <td>
                        {
                          new Date(excelDateToJSDate(employee?.DateOfBirth))
                            ?.toISOString()
                            ?.split("T")[0]
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* {noEmployees} */}
          </div>
        </div>
      </Container>
    </>
  );
};

export default ImportExcelfile;
