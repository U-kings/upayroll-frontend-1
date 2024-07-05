import React, { useState } from "react";
import { ModalBackground, ModalContainer2 } from "../../styles/library";
import cookie from "js-cookie";

const Comment = ({
  isOpen3,
  userRole,
  popup3,
  onRejectShowConfirm,
  setRejectComment,
  rejectComment,
  currentSlip,
  currentVoucher,
}) => {
  const [approvalLevel] = useState(cookie.get("approvalLevel"));
  const [totalApprovalLevel] = useState(
    Number(cookie.get("totalApprovalLevel"))
  );

  const onChange = (e) => {
    setRejectComment(e.target.value);
  };

  return (
    <>
      {(userRole === "HR" && currentSlip) ||
      ((userRole === "Accountant" ||
        (approvalLevel === "Level-2" && totalApprovalLevel === 2)) &&
        currentVoucher) ? (
        <>
          <ModalBackground isOpen3={isOpen3} onClick={popup3} />
          <ModalContainer2 isOpen3={isOpen3}>
            <div className="comment__container">
              <h1>{currentSlip?.commentBy || currentVoucher?.commentBy}</h1>
              <div className="margin__top label__group">
                <label>Comment</label>
                <textarea
                  name="name"
                  value={currentSlip?.comment || currentVoucher?.comment}
                  rows="4"
                  cols="50"
                  disabled
                ></textarea>
              </div>
            </div>
          </ModalContainer2>
        </>
      ) : (
        <>
          <ModalBackground isOpen3={isOpen3} onClick={popup3} />
          <ModalContainer2 isOpen3={isOpen3}>
            <div className="comment__container">
              <h1>{userRole}</h1>
              <div className="label__group">
                <label>Comment</label>
                <textarea
                  name="name"
                  rows="4"
                  cols="50"
                  placeholder="Add Comment"
                  value={rejectComment}
                  onChange={onChange}
                ></textarea>
                <input
                  type="button"
                  value="Reject"
                  className={
                    rejectComment
                      ? "btn__padding margin__top save__btn"
                      : "btn__padding margin__top disabled__btn"
                  }
                  onClick={onRejectShowConfirm}
                  disabled={!rejectComment}
                />
              </div>
            </div>
          </ModalContainer2>
        </>
      )}
    </>
  );
};

export default Comment;
