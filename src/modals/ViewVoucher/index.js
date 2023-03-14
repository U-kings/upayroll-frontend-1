import React from "react";
import { commafy } from "../../hooks/calculations/paySlip";
import {
  ModalBackground,
  ModalContainer,
  ViewVoucherContainer,
} from "../../styles/library";

const ViewVoucher = ({ isOpen, popup, voucher }) => {
  return (
    <>
      <ModalBackground isOpen={isOpen} onClick={popup} />
      <ModalContainer isOpen={isOpen}>
        <ViewVoucherContainer>
          {/* <div className=""> */}
          {/* <h1>Bank Schedule</h1> */}
          <h1>Bank Voucher</h1>
          <div className="row margin__top">
            <p>PV NO: {voucher?.BSID}</p>
            <p>Employee Name: {voucher?.salarySlip?.employee?.user?.name}</p>
          </div>
          <div className="">
            <div className="table__overflow">
              <table>
                <tbody>
                  <tr>
                    <td>Amount : NGN {commafy(voucher?.amount)}</td>
                    <td colSpan="2">
                      Date : {voucher?.createdAt.substring(0, 10)}
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td className="black" colSpan="3">
                      Payment Method
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>Cash :</td>
                    <td colSpan="2">Check # :</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td colSpan="3">To :</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td colSpan="3">The Sum of : {voucher?.theSumOf} naira </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td colSpan="2">Being :</td>
                    <td>Paye : NGN {commafy(voucher?.salarySlip?.paye)}</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>Approved By :{voucher?.approvedBy}</td>
                    <td>Paid By : {voucher?.paidBy}</td>
                    <td>Signature :</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* </div> */}
        </ViewVoucherContainer>
      </ModalContainer>
    </>
  );
};

export default ViewVoucher;
