import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SignoutButton } from "..";
import {
  TopHeader,
  ProfileContainer,
  ProfileContent,
} from "../../styles/library";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const Header = ({
  isopen9,
  text,
  userRole,
  userRoleName,
  profileimg,
  toggle,
  toggleMenu,
  mobileToggle,
  toggleMobileMenu,
}) => {
  const history = useHistory();

  // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);

  const [isOpen, setIsOpen] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  // const [companyLogo] = useState(cookie.get("companyLogo"));

  const [companyLogo] = useState(adminInfo?.user?.company?.logo || "");
  const [approvalLevel] = useState(cookie.get("approvalLevel"));
  // console.log(companyLogo);

  //   toggle func for modals
  const toggling = () => setIsOpen(!isOpen);

  // close modal
  const close = () => {
    if (isOpen === true) {
      setIsOpen(false);
    }
  };

  let profileText = "";
  if (userRole) {
    if (userRole === "HR") {
      profileText = userRoleName;
    } else if (userRole === "CEO") {
      profileText = userRoleName;
    } else if (userRole === "Internal Auditor") {
      profileText = userRoleName;
    } else if (userRole === "Accountant") {
      profileText = userRoleName;
    } else if (userRole === "Employee") {
      profileText = userRoleName;
    }
  }

  useEffect(() => {
    const cookieHR = cookie.get("hr");
    const cookieIA = cookie.get("ia");
    const cookieCEO = cookie.get("ceo");
    const cookieACCT = cookie.get("acct");

    if (
      !JSON.parse(cookieHR ? cookieHR : true) &&
      !JSON.parse(cookieIA ? cookieIA : true) &&
      !JSON.parse(cookieCEO ? cookieCEO : true) &&
      !JSON.parse(cookieACCT ? cookieACCT : true)
    ) {
      return setButtonDisabled(true);
    }
  }, [history]);

  return (
    <>
      <TopHeader onClick={close} toggle={toggle}>
        <div className="row">
          <div className="menu">
            <FontAwesomeIcon
              className="icons"
              onClick={toggleMenu}
              icon={["fas", "bars"]}
            />
          </div>
          <div className="menu2">
            <FontAwesomeIcon
              className="icons"
              onClick={toggleMobileMenu}
              icon={["fas", "bars"]}
            />
          </div>
          <h1>{text}</h1>
        </div>
        <div className="row align__center">
          <div className="row margin__right">
            <img
              className="company__logo"
              src={companyLogo}
              width="37rem"
              alt="company-logo"
            />
          </div>
          <h2 onClick={toggling}>
            {profileText?.slice(0, 1)} .
            {profileText?.split(" ")[1]?.slice(0, 1)}
          </h2>
          <h2>({userRole})</h2>
          <ProfileContainer onClick={toggling}>
            <Box
              sx={{
                backgroundImage: `url(${profileimg})`,
                width: "30px",
                height: "30px",
                backgroundSize: "cover",
                borderRadius: "50%",
                margin: "auto",
                textAlign: "center",
                color: "white",
                // cursor: "pointer",
              }}
            ></Box>
            {isOpen && (
              <ProfileContent>
                <div className="content">
                  <div className="row">
                    <Box
                      sx={{
                        backgroundImage: `url(${profileimg})`,
                        width: "10rem",
                        height: "10rem",
                        backgroundSize: "cover",
                        borderRadius: "50%",
                        margin: "auto",
                        justifyContent: "center",
                        // cursor: "pointer",
                      }}
                    ></Box>
                  </div>

                  <Link to="/profile-settings">
                    <input
                      type="button"
                      className="settings"
                      value="Profile Settings"
                    />
                  </Link>
                  {(userRole === "HR" ||
                    userRole === "CEO" ||
                    approvalLevel === "Level-2") &&
                    !buttonDisabled && (
                      <h3
                        style={{
                          padding: ".5rem",
                          marginBottom: "1rem",
                          fontSize: "2.5rem",
                          textWrap: "nowrap",
                        }}
                        className="row save__btn"
                      >
                        <Link
                          style={{
                            color: "#fff",
                            // padding: "1rem",
                            margin: "auto",
                            // width: "100%",
                            fontWeight: "400",
                          }}
                          // className="full__width save__btn"
                          to="create-user-roles"
                          // to="create-user-roles"
                        >
                          Create User Roles
                        </Link>
                      </h3>
                    )}
                  {(userRole === "HR" || userRole === "CEO") && (
                    <h3
                      style={{
                        padding: ".5rem",
                        marginBottom: "1rem",
                        fontSize: "2.5rem",
                        textWrap: "nowrap",
                      }}
                      className="row save__btn"
                    >
                      <Link
                        style={{
                          color: "#fff",
                          // padding: "1rem",
                          margin: "auto",
                          // width: "100%",
                          fontWeight: "400",
                        }}
                        // className="full__width save__btn"
                        to="create-approval-levels"
                      >
                        Create Approval Levels
                      </Link>
                    </h3>
                  )}
                  <SignoutButton />
                </div>
              </ProfileContent>
            )}
          </ProfileContainer>
        </div>
      </TopHeader>
    </>
  );
};

export default Header;
