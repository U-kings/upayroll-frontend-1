import React, { useState, useEffect } from "react";
import {
  SigninContainer,
  SigninContent,
  SigninForm,
} from "../../styles/SigninElements";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Spinner, Successful } from "../../modals";
import {
  adminSetPasswordFunc,
  adminResetPasswordFunc,
} from "../../actions/auth";
import {
  ADMIN_RESET_PASSWORD_RESET,
  ADMIN_SET_PASSWORD_RESET,
} from "../../types/auth";
import { ErrorBox } from "../../components";

const SetPassword = ({ toggle }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  const {
    success,
    payload,
    error: setPasswordError,
    isLoading: setPasswordLoading,
  } = useSelector((state) => state.adminSetPassword);

  const {
    success: resetPasswordSuccess,
    error: resetPasswordError,
    isLoading: resetPasswordLoading,
  } = useSelector((state) => state.adminResetPassword);

  const url = location.search;

  // const resetToken = new URLSearchParams(url).get("token");
  const email = new URLSearchParams(url).get("email");
  const userId = new URLSearchParams(url).get("userId");

  //  func state
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showError, setShowError] = useState(null);
  const [resetToken, setRestToken] = useState(null);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (adminInfo?.isAuthenticated && adminInfo?.user?.name) {
      history.push("dashboard");
    }
  }, [adminInfo, history, success, setPasswordError, dispatch]);

  useEffect(() => {
    let timeoutId;

    if (showError !== "") {
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

  useEffect(() => {
    if (userId) {
      dispatch(adminSetPasswordFunc(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (payload && success) {
      const url = new URL(payload);
      setRestToken(new URLSearchParams(url.search).get("token"));
    }
  }, [payload, success]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      dispatch(adminResetPasswordFunc(resetToken, { newPassword }));
    } else {
      setShowError("Password did not match");
    }
  };

  useEffect(() => {
    if (setPasswordError || resetPasswordError) {
      dispatch({ type: ADMIN_SET_PASSWORD_RESET });
      dispatch({ type: ADMIN_RESET_PASSWORD_RESET });
    }
  }, [dispatch, setPasswordError, resetPasswordError]);

  const popup7 = () => {
    if (resetPasswordSuccess && !resetPasswordError) {
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
      {(setPasswordLoading || resetPasswordLoading) && <Spinner />}
      {(success || resetPasswordSuccess) && (
        <Successful
          message="Password Changed Successfully!"
          isOpen7={resetPasswordSuccess && !resetPasswordError}
          popup7={popup7}
        />
      )}
      <SigninContainer>
        <div className="signin__container">
          <div className="newpassword__img"></div>
          <SigninContent>
            <div className="form__container">
              {(showError || resetPasswordError) && (
                <ErrorBox
                  errorMessage={
                    showError || resetPasswordError || setPasswordError
                  }
                />
              )}
              <h1>
                Set<span> Password</span>
              </h1>
              <p>
                Set a new password so you can Login and access the
                Payroll-System
              </p>
              <SigninForm onSubmit={onSubmit}>
                <div className="label__group form__input">
                  <label>
                    Email<span className="red__text">*</span>
                  </label>
                  <input
                    type="text"
                    name="text"
                    value={email}
                    placeholder="Email address"
                    onChange={onChange}
                    required
                    disabled
                  />
                </div>
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
                  value="Set Password"
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

export default SetPassword;
