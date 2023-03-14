import React from "react";
import { commafy } from "../../hooks/calculations/paySlip";
import {
  ModalBackground,
  ModalContainer,
  BankScheduleContainer,
  Container,
} from "../../styles/library";

const ViewBankSchedule = ({ isOpen, popup, bankSchedule }) => {
  return (
    <>
      <ModalBackground isOpen={isOpen} onClick={popup} />
      <ModalContainer className="bank__schedule" isOpen={isOpen}>
        <BankScheduleContainer>
          <Container>
            <div className="u__logo"></div>
            <h1>Bank Schedule</h1>
            <div className="table__body">
              <div className="table__overflow">
                <table>
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Staff Name</th>
                      <th>Bank</th>
                      <th>Account Number</th>
                      <th>Amount</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bankSchedule?.map((el, indexes) => (
                      <tr key={el?._id}>
                        <td>{++indexes}</td>
                        <td>{el?.salarySlip?.employee?.user?.name}</td>
                        <td>{el?.salarySlip?.employee?.employeeBank}</td>
                        <td>
                          {el?.salarySlip?.employee?.employeeBankAcctNumber}
                        </td>
                        <td>{commafy(el?.amount)}</td>
                        <td>{el?.remark}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </BankScheduleContainer>
      </ModalContainer>
    </>
  );
};

export default ViewBankSchedule;
