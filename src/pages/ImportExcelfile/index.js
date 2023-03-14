import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSL from "xlsx";
import { BackLink, Container } from "../../styles/library";
import { COLORS } from "../../values/colors";
import { getAllDepartment } from "../../actions/department";
import { adminGetAllPosition } from "../../actions/position";
import {
  adminCreateBulkEmployeeFunc,
  hrUploadBulkContractStaffFunc,
} from "../../actions/employee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import {
  downloadContractBulkEmployeeTemplateExcelFileFunc,
  downloadCreateBulkEmployeeTemplateExcelFileFunc,
} from "../../actions/download";
import { Spinner } from "../../modals";
import { ErrorBox } from "../../components";
import {
  ADMIN_CREATE_BULK_EMPLOYEE_RESET,
  HR_UPLOAD_CONTRACT_EMPLOYEE_RESET,
} from "../../types/employee";
const ImportExcelfile = () => {
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

  const {
    isLoading: contractBulkLoading,
    success: contractBulkSuccess,
    error: contractBulkError,
  } = useSelector((state) => state.hrUploadContractEmployee);

  useEffect(() => {
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      history.push("/");
    } else {
      dispatch(getAllDepartment());
      dispatch(adminGetAllPosition());
    }
    if (excelFile !== null) {
      const workbook = XLSL.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSL.utils.sheet_to_json(worksheet);
      setExcelData(data);
    }
    // eslint-disable-next-line
  }, [excelFile]);

  useEffect(() => {
    if (showError) {
      setTimeout(() => {
        setShowError(null);
      }, 5000);
    }
  }, [showError]);

  useEffect(() => {
    if (
      (createBulkSuccess && !createBulkError) ||
      (contractBulkSuccess && !contractBulkError)
    ) {
      setExcelData(null);
      setExcelFile(null);
      dispatch({ type: ADMIN_CREATE_BULK_EMPLOYEE_RESET });
      dispatch({ type: HR_UPLOAD_CONTRACT_EMPLOYEE_RESET });
      history.push("/dashboard");
    }
  }, [
    createBulkSuccess,
    createBulkError,
    dispatch,
    history,
    contractBulkSuccess,
    contractBulkError,
  ]);

  // handle File
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

  // const hiddenFileInput = React.useRef(null);
  const hiddenFileInput = useRef(null);

  // const formatExcelDate =

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const downloadTemplate = () => {
    dispatch(downloadCreateBulkEmployeeTemplateExcelFileFunc());
  };

  const downloadContractTemplate = () => {
    dispatch(downloadContractBulkEmployeeTemplateExcelFileFunc());
  };

  function excelDateToJSDate(excelDate) {
    let date = new Date(Math.round((excelDate - (25568 + 1)) * 86400 * 1000));
    let converted_date = date.toLocaleString();

    return new Date(converted_date);
  }

  const onCreateBulk = (type = "") => {
    let newData;
    if (type && type === "Contract") {
      newData = excelData?.map((el) => {
        return {
          staffId: el.StaffId.trim(),
          staffName: el.StaffName?.trim(),
          email: el.Email?.trim(),
          employeeBank: el.BankName?.trim(),
          employeeBankAcctNumber: el.BankAcctNumber?.trim(),
          contractSalary: Number(el.ContractSalary),
          employeeType: el.EmploymentType,
        };
      });

      // console.log(newData);
      dispatch(hrUploadBulkContractStaffFunc(newData));
    }
    // const newData = excelData?.map((el) => {
    //   return {
    //     employeeBankAcctNumber: String(el?.AccountNumber).trim(),
    //     address: String(el?.Address).trim(),
    //     employeeBank: String(el?.BankName).trim(),
    //     city: String(el?.City).trim(),
    //     dob: excelDateToJSDate(el?.DateOfBirth),
    //     department: String(el?.Department).trim(),
    //     email: String(el?.Email).trim(),
    //     employeeType: String(el?.EmployeeType).trim(),
    //     gender: String(el?.Gender).trim(),
    //     joinDate: excelDateToJSDate(el?.JoinDate),
    //     name: String(el?.Name).trim(),
    //     nationality: String(el?.Nationality).trim(),
    //     mobile: String(el?.PhoneNumber).trim(),
    //     position: String(el?.Position).trim(),
    //     staffLevel: String(el?.StaffLevel).trim(),
    //     state: String(el?.State).trim(),
    //   };
    // });

    // dispatch(adminCreateBulkEmployeeFunc(newData));
    // dispatch(hrUploadBulkContractStaffFunc(newData));
  };

  return (
    <>
      {((downloadLoading && !downloadError) ||
        createBulkLoading ||
        contractBulkLoading) && <Spinner />}
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
            <p
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
            </p>
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
                onClick={() => onCreateBulk("Contract")}
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
              <input
                type="submit"
                className="disabled__btn"
                // className="save__btn"
                onClick={downloadTemplate}
                value="Non-Contract Staff"
              />
              <input
                type="submit"
                className="save__btn margin__left"
                onClick={downloadContractTemplate}
                value="Contract Staff"
              />
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default ImportExcelfile;
