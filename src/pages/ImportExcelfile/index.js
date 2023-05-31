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
import {
  Capitalize,
  checkDate,
  checkEmail,
  formatDate,
} from "../../hooks/functions";

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

  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState(null);
  const [showError, setShowError] = useState(null);

  // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
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
      history.push("/");
    } else {
      dispatch(getAllDepartment());
      dispatch(adminGetAllPosition());
    }
  }, [dispatch, adminInfo, history]);

  useEffect(() => {
    if (excelFile !== null) {
      const workbook = XLSL.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSL.utils.sheet_to_json(worksheet);
      setExcelData(data);
    }
  }, [excelFile]);

  useEffect(() => {
    if (showError) {
      setTimeout(() => {
        setShowError(null);
      }, 5000);
    }
  }, [showError]);

  const popup7 = () => {
    if (createBulkSuccess && !createBulkError) {
      setExcelData(null);
      setExcelFile(null);
      setFileName(null);
      dispatch({ type: ADMIN_CREATE_BULK_EMPLOYEE_RESET });
      history.push("employee");
    }
  };

  // useEffect(() => {
  //   if (
  //     (createBulkSuccess && !createBulkError)
  //   ) {
  //     setExcelData(null);
  //     setExcelFile(null);
  //     dispatch({ type: ADMIN_CREATE_BULK_EMPLOYEE_RESET });
  //     dispatch({ type: HR_UPLOAD_CONTRACT_EMPLOYEE_RESET });
  //     history.push("dashboard");
  //   }
  // }, [
  //   createBulkSuccess,
  //   createBulkError,
  //   dispatch,
  //   history,
  // ]);

  // handle File

  useEffect(() => {
    if (downloadError) {
      dispatch({ type: DOWNLOADING_ON_PROCESS_ERROR });
    }
  }, [dispatch, downloadError]);

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
          setExcelFile(e.target.result);
        };
      } else {
        setShowError("Please select only specified file type");
      }
    } else {
      setShowError("Please select a file");
    }
  };

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
    let newData;
    // if (type && type === "Contract") {
    if (checkDate(excelData)) {
      setShowError(
        "Please enter correct format for both DateOfBirth and JoinDate"
      );
    } else {
      if (checkEmail(excelData)) {
        setShowError("Please make sure emails are not Dulicated");
      } else {
        newData = excelData?.map((el) => {
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
            contractSalary: el?.ContractSalary
              ? Number(el?.ContractSalary)
              : null,
            notch: el?.Notch ? el?.Notch?.toString()?.trim() : null,
            bankName: el?.BankName ? el?.BankName?.toString()?.trim() : null,
            employeeBankAcctNumber:
              el?.EmployeeBankAcctNumber?.toString().trim(),
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
  };

  return (
    <>
      {((downloadLoading && !downloadError) || createBulkLoading) && (
        <Spinner />
      )}

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
          <form onSubmit={handleSubmit}>
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
                  !excelFile
                    ? "disabled__btn full__width"
                    : "full__width green__btn"
                }
                onClick={() => onCreateBulk()}
                disabled={!excelFile}
                value="Import Excel File"
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
                Excel DateOfBirth and JoinDate must be in either of this format:
                <span>dd/mm/yyyy </span>
              </h2>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ImportExcelfile;
