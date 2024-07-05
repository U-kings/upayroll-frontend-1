import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  LeftSide,
  TextLink,
  NavList,
  NavLink,
  MenuModal,
} from "../../styles/SidenavElements";
import cookie from "js-cookie";
import { getUserApprovalLevel } from "../../actions/auth";
import { useSelector } from "react-redux";

const SideNav = ({
  dash,
  emp,
  slp,
  dpt,
  psn,
  phd,
  sfl,
  mph,
  vch,
  psl,
  usersActive,
  auditlog,
  loan,
  loanreq,
  bnkschd,
  bnklst,
  userRole,
  toggle,
  mobileToggle,
  toggleMobileMenu,
}) => {
  // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  const [approvalLevelPayslip] = useState(cookie.get("approvalLevel-Payslip"));
  const [approvalLevelVoucher] = useState(cookie.get("approvalLevel-Voucher"));
  const [totalApprovalLevel] = useState(
    Number(cookie.get("totalApprovalLevel"))
  );

  const [isSuperAdmin] = useState(adminInfo?.user?.isSuperAdmin || false);

  // console.log(adminInfo);

  useEffect(() => {
    getUserApprovalLevel(
      userRole,
      slp === "active" ? "Payslip" : vch === "active" ? "Voucher" : ""
    );

    return () => {};
  }, [userRole, slp, vch]);

  return (
    <>
      <MenuModal mobileToggle={mobileToggle} onClick={toggleMobileMenu} />
      <LeftSide toggle={toggle} mobileToggle={mobileToggle}>
        <div
          className="leftside__header"
          style={{ display: "flex", overflow: "hidden" }}
        >
          <TextLink toggle={toggle} to="/">
            <h1 className="small">
              P<span>S</span>
            </h1>

            <div style={{ display: "flex" }}>
              <div
                className="profile__img"
                // style={{ marginTop: toggle ? "1.3rem" : "" }}
              ></div>
              <h1>
                Payroll <span>System</span>
              </h1>
            </div>
          </TextLink>
          {mobileToggle && (
            <div className="menu2">
              <FontAwesomeIcon
                className="icons"
                onClick={toggleMobileMenu}
                icon={["fas", "bars"]}
              />
            </div>
          )}
        </div>
        <NavList
          toggle={toggle}
          onClick={mobileToggle ? toggleMobileMenu : () => {}}
        >
          {/* <ul>Attendance</ul> */}
          {userRole === "HR" && (
            <>
              <NavLink to="/dashboard">
                <li className={dash}>
                  <FontAwesomeIcon className="icons" icon={["fas", "home"]} />
                  <p>Dashboard</p>
                </li>
              </NavLink>
              <NavLink to="/department">
                <li className={dpt}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "house-user"]}
                  />
                  <p>Department</p>
                </li>
              </NavLink>
              <NavLink to="/position">
                <li className={psn}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "user-tag"]}
                  />
                  <p>Position</p>
                </li>
              </NavLink>

              <NavLink to="/monthly-payhead">
                <li className={mph}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "money-bill-alt"]}
                  />
                  <p>Monthly Pay Head</p>
                </li>
              </NavLink>
              <NavLink to="/pay-head">
                <li className={phd}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "hand-holding-usd"]}
                  />
                  <p>Pay Head</p>
                </li>
              </NavLink>
              <NavLink to="/pay-structure">
                <li className={sfl}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "layer-group"]}
                  />
                  <p>Pay Structure</p>
                </li>
              </NavLink>
              <NavLink to="/employee">
                <li className={emp}>
                  <FontAwesomeIcon className="icons" icon={["fas", "users"]} />
                  <p>Empolyee</p>
                </li>
              </NavLink>
              <NavLink to="/payroll">
                <li className={slp}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "money-check"]}
                  />
                  <p>Payroll</p>
                </li>
              </NavLink>
              <NavLink to="/bank-schedule">
                <li className={bnkschd}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "clipboard-list"]}
                  />
                  <p>Bank Schedule</p>
                </li>
              </NavLink>

              {/* <NavLink to="/loan">
                <li className={loan}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "money-check-alt"]}
                  />
                  <p>Loan</p>
                </li>
              </NavLink> */}
            </>
          )}

          {userRole !== "HR" && (
            <div>
              <NavLink to="/dashboard">
                <li className={dash}>
                  <FontAwesomeIcon className="icons" icon={["fas", "home"]} />
                  <p>Dashboard</p>
                </li>
              </NavLink>
              <NavLink to="/payroll">
                <li className={slp}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "money-check"]}
                  />
                  <p>Payroll</p>
                </li>
              </NavLink>
              <NavLink to="/voucher">
                <li className={vch}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "file-invoice-dollar"]}
                  />
                  <p>Voucher</p>
                </li>
              </NavLink>
              <NavLink to="/bank-schedule">
                <li className={bnkschd}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "clipboard-list"]}
                  />
                  <p>Bank Schedule</p>
                </li>
              </NavLink>
            </div>
          )}

          {userRole === "Accountant" && (
            <NavLink to="/bank">
              <li className={bnklst}>
                <FontAwesomeIcon className="icons" icon={["fas", "list"]} />
                <p>Bank Account Settings</p>
              </li>
            </NavLink>
          )}

          {isSuperAdmin && (
            <div>
              <NavLink to="/users">
                <li className={usersActive}>
                  <FontAwesomeIcon className="icons" icon={["fas", "users"]} />
                  <p>Users</p>
                </li>
              </NavLink>
              <NavLink to="/auditlog">
                <li className={auditlog}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "list-alt"]}
                  />
                  <p>Audit Log</p>
                </li>
              </NavLink>
            </div>
          )}

          {userRole === "Employee" && (
            <>
              <NavLink to="/dashboard">
                <li className={dash}>
                  <FontAwesomeIcon className="icons" icon={["fas", "home"]} />
                  <p>Dashboard</p>
                </li>
              </NavLink>
              <NavLink to="/pay-slip">
                <li className={psl}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "file-invoice-dollar"]}
                  />
                  <p>Pay Slip</p>
                </li>
              </NavLink>
              {/* <NavLink to="/loan-request">
                <li className={loanreq}>
                  <FontAwesomeIcon className="icons" icon={["fas", "list"]} />
                  <p>Loan Request</p>
                </li>
              </NavLink> */}
            </>
          )}
        </NavList>
      </LeftSide>
    </>
  );
};

export default SideNav;
