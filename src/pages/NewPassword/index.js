import React, { useState, useEffect } from "react";
import {
  SigninContainer,
  SigninContent,
  SigninForm,
} from "../../styles/SigninElements";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { LoadingSpinner, Spinner, Successful } from "../../modals";
import { adminResetPasswordFunc } from "../../actions/auth";
import { ADMIN_RESET_PASSWORD_RESET } from "../../types/auth";
import { ErrorBox } from "../../components";

const NewPassword = ({ toggle }) => {
  const dispatch = useDispatch();
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  const history = useHistory();
  const location = useLocation();
  const url = location.search;
  // const { resetToken } = useParams();
  const resetToken = new URLSearchParams(url).get("token");
  // const resetToken = this.props.match.params.resetToken;

  const {
    success,
    error: resetPasswordError,
    isLoading: resetPasswordLoading,
  } = useSelector((state) => state.adminResetPassword);

  //  func state
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showError, setShowError] = useState(null);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (adminInfo?.isAuthenticated && adminInfo?.user?.name) {
      history.push("dashboard");
    }
  }, [adminInfo, history, success, resetPasswordError, dispatch]);

  useEffect(() => {
    let timeoutId;
    if (showError) {
      timeoutId = setTimeout(() => {
        setShowError(null);
      }, 6000);
    }

    return () => {
      // Clear the timeout when the component unmounts or when showError changes
      clearTimeout(timeoutId);
    };
  }, [showError]);

  const { newPassword, confirmPassword } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      dispatch(adminResetPasswordFunc(resetToken, { newPassword }));
    } else {
      setShowError("Password did not match");
    }
  };

  const popup7 = () => {
    if (success && !resetPasswordError) {
      dispatch({ type: ADMIN_RESET_PASSWORD_RESET });
      setFormData({
        newPassword: "",
        confirmPassword: "",
      });
      history.push("signin");
    }
  };

  return (
    <>
      {/* {resetPasswordLoading && <Spinner />} */}
      {resetPasswordLoading && <Spinner />}
      {/* <LoadingSpinner toggle={toggle} /> */}
      {/* <Spinner /> */}
      {success && (
        <Successful
          message="Password Changed Successfully!"
          isOpen7={success && !resetPasswordError}
          popup7={popup7}
        />
      )}
      <SigninContainer>
        <div className="signin__container">
          <div className="newpassword__img"></div>
          <SigninContent>
            <div className="form__container">
              {showError && <ErrorBox errorMessage={showError} />}
              <h1>
                Reset<span> Password</span>
              </h1>
              <p>
                Set a new password so you can Login and access the
                Payroll-System
              </p>
              {!resetPasswordLoading && resetPasswordError && (
                <p>{resetPasswordError}</p>
              )}
              <SigninForm onSubmit={onSubmit}>
                <div className="label__group form__input">
                  <label>
                    New Password<span className="red__text">*</span>
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    placeholder="Enter New Password"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="label__group form__input">
                  <label>
                    Comfirm Password<span className="red__text">*</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="Comfirm New Password"
                    onChange={onChange}
                    required
                  />
                </div>
                <input
                  type="submit"
                  className="submit__btn form__input"
                  value="Reset Password"
                  onClick={onSubmit}
                />
              </SigninForm>
            </div>
          </SigninContent>
        </div>
      </SigninContainer>
    </>
  );
};

export default NewPassword;
