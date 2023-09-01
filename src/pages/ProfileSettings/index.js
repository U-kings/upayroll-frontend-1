import React, { useEffect, useRef, useState } from "react";
import { Container, DashboardContent, Mainbody } from "../../styles/library";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Spinner, Successful } from "../../modals";
import {
  adminUpdateDetails,
  ceoUploadSignatureFunc,
  logoutAdmin,
} from "../../actions/auth";
import {
  ADMIN_UPDATE_LOGGEDIN_DETAILS_RESET,
  ADMIN_LOGGEDIN_DETAILS_RESET,
  CEO_UPLOAD_SIGNATURE_IMAGE_RESET,
} from "../../types/auth";
import { ErrorBox, Header, SideNav } from "../../components";
import usePasswordToggle from "../../hooks/PasswordToggle/usePasswordToggle";
import { COLORS } from "../../values/colors";
import axios from "axios";
import { Box } from "@mui/material";
import { urlConfig } from "../../util/config/config";

const ProfileSettings = ({
  toggle,
  toggleMenu,
  mobileToggle,
  toggleMobileMenu,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  const { isLoading: loadingAdminDetails, error: adminDetailsError } =
    useSelector((state) => state.adminGetLoggedinDetails);
  const {
    success: updateAdminDetailsSuccess,
    error: updateError,
    isLoading: updateLoading,
  } = useSelector((state) => state.adminUpdateLoggedinDetails);

  const {
    success: ceoUploadSignatureSuccess,
    error: ceoUploadSignatureError,
    isLoading: ceoUploadSignatureLoading,
  } = useSelector((state) => state.ceoUploadSignature);

  //   func state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signatureImage, setSignatureImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [showError, setShowError] = useState(null);
  const [userRole] = useState(adminInfo?.user?.role || "");
  const [eSignature] = useState(adminInfo?.user?.signaturePhoto || "");
  const [userProfile] = useState(adminInfo?.user?.photo || "");
  const [userRoleName] = useState(adminInfo?.user?.name || "");
  const [profileImg] = useState(adminInfo?.user?.photo || "");
  const [loading, setLoading] = useState(false);

  const [PasswordInputType, ToggleIcon] = usePasswordToggle();

  useEffect(() => {
    if (!adminInfo?.isAuthenticated || !adminInfo?.user?.name) {
      history.push("/");
    }

    if (updateAdminDetailsSuccess) {
      // dispatch({ type: ADMIN_LOGGEDIN_DETAILS_RESET });
      setName("");
      setConfirmPassword("");
      setEmail("");
      setNewPassword("");
      setOldPassword("");
    }

    setName(adminInfo?.user?.name ? adminInfo?.user?.name : "");
    setEmail(adminInfo?.user?.email ? adminInfo?.user?.email : "");
    // setProfileImage(adminInfo?.user?.photo ? adminInfo?.user?.photo : "");
  }, [adminInfo, userRole, history, dispatch, updateAdminDetailsSuccess]);
  useEffect(() => {
    if (
      adminDetailsError === "no token was passed" ||
      updateError === "no token was passed"
    ) {
      dispatch(logoutAdmin("no token was passed"));
      dispatch({
        type: ADMIN_LOGGEDIN_DETAILS_RESET,
      });
      dispatch({
        type: ADMIN_UPDATE_LOGGEDIN_DETAILS_RESET,
      });
    }
  }, [dispatch, adminDetailsError, updateError]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (confirmPassword !== newPassword) {
      setShowError("Password do not match");
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("oldPassword", oldPassword);
      formData.append("newPassword", newPassword);
      formData.append("photo", file);

      dispatch(adminUpdateDetails(formData));
      // dispatch(
      //   adminUpdateDetails({
      //     name,
      //     email,
      //     oldPassword,
      //     newPassword,
      //     photo: profileImage,
      //   })
      // );
    }
  };

  const getCloudinaryKeys = async () => {
    const { data } = await axios.get(
      `${urlConfig.proxyUrl.PROXYURL}api/cloudinary/keys`
    );
    return data;
  };

  const onUploadSignature = async () => {
    //up signature to database.

    const formData = new FormData();
    formData.append("signature", file2);
    dispatch(ceoUploadSignatureFunc(formData));

    // try {
    //   const cloudinaryRes = await getCloudinaryKeys();
    //   const formData = new FormData();
    //   formData.append("file", signatureImage);
    //   formData.append("upload_preset", "upayroll");
    //   formData.append("cloud_name", cloudinaryRes.cloudinaryKeyName);
    //   const res = await fetch(
    //     `https://api.cloudinary.com/v1_1/${cloudinaryRes.cloudinaryKeyName}/image/upload`,
    //     {
    //       method: "post",
    //       body: formData,
    //     }
    //   );
    //   const data = await res.json();
    //   dispatch(ceoUploadSignatureFunc(data.secure_url));
    // } catch (error) {
    //   setShowError(error.message);
    // }
  };

  useEffect(() => {
    if (showError) {
      setTimeout(() => {
        setShowError(null);
      }, 5000);
    }
  }, [showError]);

  const popup7 = () => {
    if (
      !ceoUploadSignatureError &&
      !ceoUploadSignatureLoading &&
      ceoUploadSignatureSuccess
    ) {
      dispatch({ type: CEO_UPLOAD_SIGNATURE_IMAGE_RESET });
      setSignatureImage(null);
      setFileName(null);
      // history.push("profile-settings");
    }
    if (updateAdminDetailsSuccess) {
      dispatch({ type: ADMIN_UPDATE_LOGGEDIN_DETAILS_RESET });
      dispatch(logoutAdmin("no token was passed"));
    }
  };

  // const hiddenFileInput = React.useRef(null);
  const hiddenFileInput = useRef(null);
  const hiddenFileInput2 = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleClick2 = () => {
    hiddenFileInput2.current.click();
  };

  // handle File
  const handleFile = (name) => (e) => {
    let selectedFile = e.target.files[0];
    const idxDot = selectedFile.name.lastIndexOf(".") + 1;
    const extFile = selectedFile.name
      .substr(idxDot, selectedFile.name.length)
      .toLowerCase();
    if (selectedFile) {
      if (
        extFile === "jpg" ||
        extFile === "jpeg" ||
        extFile === "png"
        // extFile === "svg" ||
        // extFile === "gif"
      ) {
        switch (name) {
          case "profile":
            getImageUrl(selectedFile);
            setFile(e.target.files[0]);
            // setProfileImage(selectedFile);

            break;
          case "signature":
            setFile2(e.target.files[0]);
            setSignatureImage(selectedFile);
            setFileName(selectedFile?.name);

            break;
          default:
            break;
        }
      } else {
        setShowError("Only jpg, jpeg and png files are allowed!");
        // setShowError("Only jpg/jpeg, png, gif and svg files are allowed!");
        // setShowError("Please select only specified file type");
      }
    } else {
      setShowError("Please select a file");
    }
  };

  const getImageUrl = async (profileImage) => {
    //do whatever you want to do
    setLoading(true);
    try {
      const cloudinaryRes = await getCloudinaryKeys();
      const formData = new FormData();
      formData.append("file", profileImage);
      formData.append("upload_preset", "upayroll");
      formData.append("cloud_name", cloudinaryRes.cloudinaryKeyName);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryRes.cloudinaryKeyName}/image/upload`,
        {
          method: "post",
          body: formData,
        }
      );
      const data = await res.json();
      setProfileImage(data.secure_url);
      setLoading(false);
      // dispatch(ceoUploadSignatureFunc(data.secure_url));
    } catch (error) {
      setShowError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loadingAdminDetails && <Spinner />}
      {updateLoading && <Spinner />}
      {ceoUploadSignatureLoading && <Spinner />}
      {loading && <Spinner />}
      <Successful
        popup7={popup7}
        isOpen7={
          ceoUploadSignatureSuccess &&
          !ceoUploadSignatureError &&
          !ceoUploadSignatureLoading
        }
        message="Signature Uploaded Successfully!"
      />
      <Successful
        isOpen7={updateAdminDetailsSuccess && !updateError && !updateLoading}
        popup7={popup7}
        message="Profile settings updated successfully!"
      />
      <DashboardContent>
        <SideNav
          // emp={emp}
          userRole={userRole}
          toggle={toggle}
          toggleMenu={toggleMenu}
          mobileToggle={mobileToggle}
          toggleMobileMenu={toggleMobileMenu}
        />
        <Mainbody toggle={toggle}>
          <Header
            text="Profile Settings"
            userRole={userRole}
            userRoleName={userRoleName}
            profileimg={profileImg}
            toggle={toggle}
            toggleMenu={toggleMenu}
            mobileToggle={mobileToggle}
            toggleMobileMenu={toggleMobileMenu}
          />
          <Container>
            <div className="profile__settings">
              {!updateLoading && updateError && (
                <ErrorBox errorMessage={updateError} />
              )}
              {showError && <ErrorBox errorMessage={showError} />}
              <form autoComplete="off">
                <div className="row2">
                  <div>
                    <h1>Edit Profile</h1>
                    <p>User Info</p>
                  </div>
                </div>

                <Box
                  sx={{
                    backgroundImage: `url(${
                      profileImage ? profileImage : userProfile
                    })`,
                    width: "14rem",
                    height: "14rem",
                    margin: "2rem 0",
                    backgroundSize: "cover",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                  onClick={handleClick2}
                ></Box>
                <input
                  type="file"
                  ref={hiddenFileInput2}
                  onChange={handleFile("profile")}
                  accept="image/png, image/jpg, image/jpeg"
                  style={{ display: "none" }}
                />
                <div className="input__row">
                  <div className="label__group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter a Name"
                      disabled={userRole === "Employee"}
                    />
                  </div>
                  <div className="label__group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter a valid Email Address"
                      disabled={userRole === "Employee"}
                    />
                  </div>
                </div>
                <p style={{ margin: "1.5rem 0" }}>Create New Password</p>
                <div className="label__group">
                  <label>Old Password</label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={oldPassword}
                    autoComplete="new-password"
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter your old password"
                  />
                </div>
                <div className="label__group form__input">
                  <label>New Password</label>
                  <input
                    type={PasswordInputType}
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                  />
                  {/* <span className="password__toggle">{ToggleIcon}</span> */}
                </div>
                <div className="label__group form__input">
                  <label>Comfirm New Password</label>
                  <input
                    type={PasswordInputType}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Comfirm new password"
                  />
                  <span className="password__toggle">{ToggleIcon}</span>
                </div>
                <input
                  type="button"
                  value="Save Changes"
                  className={
                    // !newPassword ||
                    // !confirmPassword ||
                    newPassword !== confirmPassword || !name || !email
                      ? "disabled__btn margin__top"
                      : "profile__save margin__top"
                  }
                  onClick={onSubmit}
                  disabled={
                    // !newPassword ||
                    // !confirmPassword ||
                    newPassword !== confirmPassword || !name || !email
                  }
                />
              </form>

              {userRole === "CEO" && (
                <>
                  <form>
                    <label className="margin__top">
                      Add Digital Signature: ...*
                      <span
                        style={{ color: `${COLORS.red}`, fontSize: "1.3rem" }}
                      >
                        (must be a .jpg, .jpeg or .png file extension)
                      </span>
                    </label>
                    {showError && <ErrorBox errorMessage={showError} />}
                    <div className="row">
                      <div style={{ width: "100%" }} className="upload_empfile">
                        <p className="choose__btn" onClick={handleClick}>
                          Choose a file
                        </p>
                        <p>{fileName}</p>
                      </div>
                      <div className="margin__left">
                        <input
                          type="button"
                          value="Upload e-Signature"
                          className={
                            // !newPassword ||
                            // !confirmPassword ||
                            !signatureImage
                              ? "disabled__btn margin__top"
                              : "save__btn profile__save margin__top"
                          }
                          onClick={onUploadSignature}
                          disabled={
                            // !newPassword ||
                            // !confirmPassword ||
                            // newPassword !== confirmPassword || !name || !email
                            !signatureImage
                          }
                        />
                      </div>
                      {eSignature && (
                        <div style={{ margin: "auto 1rem" }}>
                          <img alt="eSignature" height="35" src={eSignature} />
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={hiddenFileInput}
                      onChange={handleFile("signature")}
                      accept="image/png, image/jpg, image/jpeg"
                      style={{ display: "none" }}
                    />
                  </form>
                </>
              )}
            </div>
          </Container>
        </Mainbody>
      </DashboardContent>
    </>
  );
};

export default ProfileSettings;
