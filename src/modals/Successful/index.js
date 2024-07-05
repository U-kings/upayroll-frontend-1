import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalBackground, ModalContainer } from "../../styles/library";

const Successful = ({ isOpen7, popup7, message, isPayslip }) => {
  const [showModal, setShowModal] = useState(isOpen7 || false);

  useEffect(() => {
    let timeoutId;
    if (isOpen7) {
      setShowModal(true);
      timeoutId = setTimeout(
        () => {
          popup7 && popup7();
          closeModal();
        },
        isPayslip ? 5000 : 5000
      );
    }
    return () => {
      // Clear the timeout when the component unmounts or when showError changes
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line
  }, [isOpen7]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
    return () => {};
  }, [showModal]);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <ModalBackground onClick={closeModal} isOpen7={showModal} />
      <ModalContainer isOpen7={showModal}>
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
