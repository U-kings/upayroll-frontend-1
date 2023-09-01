import React from "react";
import cookie from "js-cookie";
import { commafy } from "../../hooks/calculations/paySlip";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ModalBackground,
  ModalContainer,
  ViewSalaryContainer,
} from "../../styles/library";
import { COLORS } from "../../values/colors";
import uridiumLogo from "../../resources/uridium.png";
import productLogo from "../../resources/productLogo.PNG";
import { useState } from "react";
import { useSelector } from "react-redux";

const ViewSalaryslip = ({ isOpen8, popup8, paySlip, monthlypayheads }) => {
  // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  // const [userRole] = useState(adminInfo?.user?.role || "");
  // const [companyLogo] = useState(cookie.get("companyLogo"));

  const [companyLogo] = useState(adminInfo?.user?.company?.logo || "");

  const printSlip = () => {
    window.print();
  };

  return (
    <>
      <ModalBackground isOpen8={isOpen8} onClick={popup8} />
      <ModalContainer className="view__slip" isOpen8={isOpen8}>
        <ViewSalaryContainer>
          <div className="row3 justify__btw">
            <div
              style={{ backgroundColor: `${COLORS.blue2}` }}
              className="blue"
            ></div>
            <div
              style={{ backgroundColor: `${COLORS.black}` }}
              className="black"
            ></div>
          </div>
          <div className="row3">
            <div className="flex__1">
              <img
                // className="margin__top"
                style={{ margin: "0 auto auto auto" }}
                src={companyLogo}
                // src={uridiumLogo}
                alt="Uridium logo"
                height="75"
              ></img>
            </div>
            <div className="flex__1">
              <h1
                style={{ whiteSpace: "nowrap" }}
                className="payslip__text aligntext__right full__width"
              >
                E-PAYSLIP
              </h1>
              <p
                style={{ paddingRight: "1rem" }}
                className="aligntext__right full__width"
              >
                {paySlip?.month}, {paySlip?.year}
              </p>
            </div>
          </div>
          <div className="row3 justify__btw margin__top">
            <h2>Staff ID Card No:</h2>
            <h2 className="aligntext__right">{paySlip?.employee?.staffId}</h2>
          </div>
          <div className="row3 justify__btw">
            <h2>Full Name:</h2>
            <h2
              style={{ whiteSpace: "nowrap" }}
              className="aligntext__right"
            >{`${paySlip?.employee?.user?.name}`}</h2>
          </div>
          {/* <div className="row justify__btw">
            <h2>Email:</h2>
            <h2 className="aligntext__right">
              {paySlip?.employee?.user?.email}
            </h2>
          </div> */}
          {/* <div className="row justify__btw">
            <h2>Department:</h2>
            <h2 className="aligntext__right">
              {paySlip?.employee?.position?.department?.name}
            </h2>
          </div>
          <div className="row justify__btw">
            <h2>Position:</h2>
            <h2 className="aligntext__right">
              {paySlip?.employee?.position?.name}
            </h2>
          </div> */}
          {paySlip?.employee?.employeeType !== "Contract-With-No-Grade" && (
            <div>
              {monthlypayheads
                ?.filter((data) => data?.payType === "GROSS SALARY")
                .map(({ name, percentage }, indexes) => (
                  <div
                    className="row3"
                    style={{ backgroundColor: `${COLORS.white4}` }}
                    key={++indexes}
                  >
                    <p style={{ width: "100%", fontWeight: "400" }}>{name} :</p>
                    <p style={{ fontWeight: "400" }}>{`${
                      paySlip?.grossPay &&
                      commafy(
                        Number(
                          Number(
                            Math.round(
                              (percentage / 100) * paySlip?.grossPay + "e" + 2
                            ) +
                              "e-" +
                              2
                          )
                        )
                      )
                    }`}</p>
                  </div>
                ))}
              {/* <div className="row">
                  <p style={{ width: "100%", fontWeight: "bold" }}>
                    U-Wallet(Keep alive):
                  </p>
                  <p style={{ fontWeight: "bold" }}>
                    
                    {paySlip?.uWallet &&
                      commafy(
                        Number(
                          Math.round(paySlip?.uWallet + "e" + 2) + "e-" + 2
                        )
                      )}
                  </p>
                </div> */}
            </div>
          )}
          <div className="row3">
            <p style={{ width: "100%", fontWeight: "bold" }}>GROSSPAY : </p>
            <p style={{ fontWeight: "bold" }}> {commafy(paySlip?.grossPay)}</p>
          </div>
          <div className="row3">
            <div style={{ borderRight: `solid 2px ${COLORS.white}`, flex: 1 }}>
              <h2 className="bg">Additions</h2>
              {paySlip?.allowances?.length > 0 ? (
                paySlip?.allowances?.map(({ allowance, fee, feeType }) => (
                  <p key={allowance?.id} style={{ whiteSpace: "nowrap" }}>
                    {allowance?.name} :
                    {feeType === "Amount" && `${commafy(fee)}`}
                    {feeType === "Percentage" &&
                      `${commafy(
                        Number(
                          Math.round(
                            (fee / 100) * paySlip?.grossPay + "e" + 2
                          ) +
                            "e-" +
                            2
                        )
                      )}`}
                  </p>
                ))
              ) : (
                <p>No additions added</p>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <h2 className="bg aligntext__right">Deductions</h2>
              {paySlip?.deductions?.length > 0 ? (
                paySlip?.deductions?.map(({ deduction, fee, feeType }) => (
                  <p
                    className="aligntext__right"
                    key={deduction?.id}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {deduction?.name} :
                    {feeType === "Amount" && `${commafy(fee)}`}
                    {feeType === "Percentage" &&
                      `${commafy(
                        Number(
                          Math.round(
                            (fee / 100) * paySlip?.grossPay + "e" + 2
                          ) +
                            "e-" +
                            2
                        )
                      )}`}
                  </p>
                ))
              ) : (
                <p className="aligntext__right">No deductions added</p>
              )}
            </div>
          </div>

          {paySlip?.employee?.employeeType !== "Contract-With-No-Grade" && (
            <>
              <div className="align__right">
                <h2 className="bg aligntext__right">Pension</h2>
                <p className="aligntext__right">
                  {paySlip?.pension && commafy(paySlip?.pension)}
                </p>
              </div>
              <div className="align__right">
                <h2 className="bg aligntext__right">Paye</h2>
                <p className="aligntext__right">
                  {paySlip?.paye && commafy(paySlip?.paye)}
                </p>
              </div>
              {/* <div className="align__right">
                <div className="row2">
                  <h2>Number of Working Days</h2>
                  <p>
                    {paySlip?.employee?.noOfWorkingDays !== 0 &&
                      commafy(paySlip?.employee?.noOfWorkingDays)}
                  </p>
                </div>
                </div> */}
            </>
          )}
          <div className="row3">
            <h2 className="bg" style={{ whiteSpace: "nowrap" }}>
              Total Additions
            </h2>
            <h2
              className="bg aligntext__right"
              style={{ whiteSpace: "nowrap" }}
            >
              Total Deductions
            </h2>
          </div>
          <div className="row3 justify__btw">
            <h2>
              {paySlip?.totalEarnings
                ? `${commafy(paySlip?.totalEarnings)}`
                : ""}
              {paySlip?.allowanceTotal
                ? `${commafy(paySlip?.allowanceTotal)}`
                : ""}
            </h2>
            <h2 className="aligntext__right">
              {commafy(paySlip?.deductionTotal)}
            </h2>
          </div>
          <h2 className="bg">
            NETPAY :
            {commafy(
              Number(
                Math.round(paySlip?.netPay + paySlip?.uWallet + "e" + 2) +
                  "e-" +
                  2
              )
            )}
          </h2>
          <div className="row3 justify__btw">
            <div>
              <input
                className="btn__padding margin__top save__btn"
                type="button"
                value="Print"
                onClick={printSlip}
              />
            </div>
            <div className="aligntext__right">
              <img
                className="margin__top"
                src={productLogo}
                alt="Product Logo"
                height="35"
              ></img>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ margin: "0 auto" }}>
              <p style={{ fontSize: "1rem" }}>
                {new Date(paySlip?.createdAt)
                  .toString()
                  .split(" ")
                  .slice(1, 5)
                  .join(" ")}
              </p>
            </div>
          </div>
          {/* <input
            className="btn__padding margin__top save__btn"
            type="button"
            value="Send"
          /> */}
        </ViewSalaryContainer>
      </ModalContainer>
    </>
  );
};

export default ViewSalaryslip;
