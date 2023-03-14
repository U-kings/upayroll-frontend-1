import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SignoutButton } from "..";
import {
  TopHeader,
  ProfileContainer,
  ProfileContent,
} from "../../styles/library";

const Header = ({ isOpen9, setIsOpen9, text, userRole, userRoleName, profileimg }) => {
  const [isOpen, setIsOpen] = useState(false);

  //   toggle func for modals
  const toggling = () => setIsOpen(!isOpen);

  // close modal
  const close = () => {
    if (isOpen === true) {
      setIsOpen(false);
    }
  };

  const toggling9 = () => setIsOpen9(!isOpen9);

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
    } else if(userRole === "Employee"){
      profileText = userRoleName;
    }
  }

  return (
    <>
      <TopHeader onClick={close} isOpen={isOpen9}>
        <div className="row">
          <div style={{ display: "none" }} className="menu">
            <FontAwesomeIcon
              className="icons"
              onClick={toggling9}
              icon={["fas", "bars"]}
            />
          </div>
          <h1>{text}</h1>
        </div>
        <div className="row align__center">
          <h2 onClick={toggling}>{profileText}</h2>
          <ProfileContainer onClick={toggling}>
            <img alt="profile" className="profile__img" src={profileimg} />
            {isOpen && (
              <ProfileContent>
                <div className="content">
                  <div className="row">
                    <img
                      alt="profile"
                      className="profile__img2"
                      src={profileimg}
                    />
                  </div>

                  <Link to="/profile-settings">
                    <input
                      type="button"
                      className="settings"
                      value="Profile Settings"
                    />
                  </Link>
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
