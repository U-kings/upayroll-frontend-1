import React, { useEffect, useRef, useState } from "react";
import * as XLSL from "xlsx";
import { ErrorBox } from "../../components";
import { ModalBackground, ModalContainer } from "../../styles/library";
import { COLORS } from "../../values/colors";

const UploadSlips = ({
  isOpen5,
  popup5,
  userRole,

  onRejectShowConfirm,
}) => {
  //func states
  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState(null);
  const [showError, setShowError] = useState(null);

  useEffect(() => {
    if (excelFile !== null) {
      const workbook = XLSL.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSL.utils.sheet_to_json(worksheet);
      setExcelData(data);
    }
    // eslint-disable-next-line
  }, [excelFile]);

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
    onRejectShowConfirm(excelData);
  };

  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      <ModalBackground isOpen5={isOpen5} onClick={popup5} />
      <ModalContainer className="uploadslip" isOpen5={isOpen5}>
        <div className="uploadslipexcel__container">
          {showError && <ErrorBox errorMessage={showError} />}
          <h1>{userRole}</h1>
          <div className="label__group margin__top">
            <form onSubmit={handleSubmit}>
              <label>
                Select a file to upload: ...*
                <span style={{ color: `${COLORS.red}`, fontSize: "1.3rem" }}>
                  (must be a .xls, .xlsx, or .csv file extension)
                </span>
              </label>
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
              <input
                type="button"
                value="Upload"
                className={
                  excelData.length
                    ? "btn__padding save__btn margin__top"
                    : "btn__padding disabled__btn margin__top"
                }
                onClick={handleSubmit}
                disabled={!excelData.length}
              />
            </form>
          </div>
        </div>
      </ModalContainer>
    </>
  );
};

export default UploadSlips;
