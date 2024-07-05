import React from "react";
import { ModalBackground, ModalContainer } from "../../styles/library";

const DownloadOption = ({
  isOpen3,
  popup3,
  onDownloadFileFunc,
  userRole,
  approvalLevel,
}) => {
  return (
    <>
      <ModalBackground isOpen3={isOpen3} onClick={popup3} />
      <ModalContainer isOpen3={isOpen3}>
        <div className="option__container">
          <form>
            <h1>
              {userRole !== "HR" && userRole !== "Internal Auditor"
                ? "Download Option"
                : "Download Option"}
            </h1>
            <div className="button__row margin__top">
              <input
                type="button"
                className="save__btn"
                value="Download As PDF"
                onClick={(e) => onDownloadFileFunc("pdf")}
                //   onChange={onChange}
              />
              {((userRole === "HR" && userRole !== "Internal Auditor") ||
                approvalLevel !== "Level-1") && (
                <input
                  type="button"
                  className="save__btn margin__left"
                  value="Download As Excel"
                  onClick={() => {
                    onDownloadFileFunc("excel");
                  }}
                  //   onChange={onChange}
                />
              )}
              {userRole !== "HR" &&
                userRole !== "Internal Auditor" &&
                approvalLevel !== "Level-1" && (
                  <input
                    type="button"
                    className="save__btn margin__left"
                    value="Download As Sterling Pro Excel"
                    onClick={() => {
                      onDownloadFileFunc("sterling-pro-excel");
                    }}
                    //   onChange={onChange}
                  />
                )}
            </div>
          </form>
        </div>
      </ModalContainer>
    </>
  );
};

export default DownloadOption;
