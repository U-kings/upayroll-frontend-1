import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalBackground, ModalContainer } from "../../styles/library";

const Successful = ({ isOpen7, popup7, message, isPayslip }) => {
  setTimeout(
    () => {
      popup7();
    },
    isPayslip ? 5000 : 4000
  );

  return (
    <>
      <ModalBackground isOpen7={isOpen7 && isOpen7} />
      <ModalContainer isOpen7={isOpen7}>
        <div className="successful__container">
          <div className="row">
            <FontAwesomeIcon
              className="success__icon"
              icon={["fas", "check"]}
            />
            <h3>{message}</h3>
          </div>
        </div>
      </ModalContainer>
    </>
  );
};

export default Successful;
