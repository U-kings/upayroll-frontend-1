import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  LeftSide,
  TextLink,
  NavList,
  NavLink,
} from "../../styles/SidenavElements";

const SideNav = ({
  isOpen9: isopen9,
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
  loan,
  loanreq,
  bnkschd,
  bnklst,
  userRole,
}) => {
  return (
    <>
      <LeftSide isOpen9={isopen9}>
        <div className="leftside__header">
          <TextLink isOpen9={isopen9} to="/">
            <h1 className="small">
              P<span>S</span>
            </h1>

            <h1>
              <div className="profile__img"></div>
              Payroll <span>System</span>
            </h1>
          </TextLink>
        </div>
        <NavList isOpen9={isopen9}>
          {/* <ul>Attendance</ul> */}
          {userRole === "HR" && (
            <>
              <NavLink to="/dashboard">
                <li className={dash}>
                  <FontAwesomeIcon className="icons" icon={["fas", "home"]} />{" "}
                  <p>Dashboard</p>
                </li>
              </NavLink>
              <NavLink to="/employee">
                <li className={emp}>
                  <FontAwesomeIcon className="icons" icon={["fas", "users"]} />{" "}
                  <p>Empolyee</p>
                </li>
              </NavLink>
              <NavLink to="/payroll">
                <li className={slp}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "money-check"]}
                  />
                  <p>Payroll</p>{" "}
                </li>
              </NavLink>
              <NavLink to="/pay-head">
                <li className={phd}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "hand-holding-usd"]}
                  />
                  <p>Pay Head</p>{" "}
                </li>
              </NavLink>
              <NavLink to="/monthly-payhead">
                <li className={mph}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "money-bill-alt"]}
                  />
                  <p>Monthly Pay Head</p>{" "}
                </li>
              </NavLink>
              <NavLink to="/department">
                <li className={dpt}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "house-user"]}
                  />
                  <p>Department</p>{" "}
                </li>
              </NavLink>
              <NavLink to="/position">
                <li className={psn}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "user-tag"]}
                  />
                  <p>Position</p>{" "}
                </li>
              </NavLink>
              <NavLink to="/loan">
                <li className={loan}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "money-check-alt"]}
                  />
                  <p>Loan</p>{" "}
                </li>
              </NavLink>
              <NavLink to="/pay-structure">
                <li className={sfl}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "layer-group"]}
                  />
                  <p>Pay Structure</p>{" "}
                </li>
              </NavLink>
              <NavLink to="/bank-schedule">
                <li className={bnkschd}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "clipboard-list"]}
                  />
                  <p>Bank Schedule</p>{" "}
                </li>
              </NavLink>
            </>
          )}
          {(userRole === "Internal Auditor" || userRole === "CEO") && (
            <>
              <NavLink to="/dashboard">
                <li className={dash}>
                  <FontAwesomeIcon className="icons" icon={["fas", "home"]} />
                  <p>Dashboard</p>{" "}
                </li>
              </NavLink>{" "}
              <NavLink to="/payroll">
                <li className={slp}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "money-check"]}
                  />
                  <p>Payroll</p>{" "}
                </li>
              </NavLink>{" "}
              <NavLink to="/voucher">
                <li className={vch}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "file-invoice-dollar"]}
                  />
                  <p>Voucher</p>{" "}
                </li>
              </NavLink>
            </>
          )}
          {userRole === "CEO" && (
            <>
              <NavLink to="/bank-schedule">
                <li className={bnkschd}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "clipboard-list"]}
                  />
                  <p>Bank Schedule</p>{" "}
                </li>
              </NavLink>
            </>
          )}
          {userRole === "Accountant" && (
            <>
              <NavLink to="/dashboard">
                <li className={dash}>
                  <FontAwesomeIcon className="icons" icon={["fas", "home"]} />
                  <p>Dashboard</p>{" "}
                </li>
              </NavLink>{" "}
              <NavLink to="/payroll">
                <li className={slp}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "money-check"]}
                  />
                  <p>Payroll</p>{" "}
                </li>
              </NavLink>{" "}
              <NavLink to="/voucher">
                <li className={vch}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "file-invoice-dollar"]}
                  />
                  <p>Voucher</p>{" "}
                </li>
              </NavLink>
              <NavLink to="/bank-schedule">
                <li className={bnkschd}>
                  <FontAwesomeIcon
                    className="icons"
                    icon={["fas", "clipboard-list"]}
                  />
                  <p>Bank Schedule</p>{" "}
                </li>
              </NavLink>
              <NavLink to="/bank">
                <li className={bnklst}>
                  <FontAwesomeIcon className="icons" icon={["fas", "list"]} />
                  <p>Bank Account Settings</p>{" "}
                </li>
              </NavLink>
            </>
          )}
          {userRole === "Employee" && (
            <>
              <NavLink to="/dashboard">
                <li className={dash}>
                  <FontAwesomeIcon className="icons" icon={["fas", "home"]} />
                  <p>Dashboard</p>{" "}
                </li>
              </NavLink>
              <NavLink to="/pay-slip">
                <li className={psl}>
                  <FontAwesomeIcon className="icons" icon={["fas", "file-invoice-dollar"]} />
                  <p>Pay Slip</p>{" "}
                </li>
              </NavLink>
              <NavLink to="/loan-request">
                <li className={loanreq}>
                  <FontAwesomeIcon className="icons" icon={["fas", "list"]} />
                  <p>Loan Request</p>{" "}
                </li>
              </NavLink>
            </>
          )}
        </NavList>
      </LeftSide>
    </>
  );
};

export default SideNav;
