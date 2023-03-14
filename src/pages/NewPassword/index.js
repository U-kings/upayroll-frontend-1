import React, { useState, useEffect } from "react";
import {
  SigninContainer,
  SigninContent,
  SigninForm,
} from "../../styles/SigninElements";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LoadingSpinner } from "../../modals";
import { adminResetPasswordFunc } from "../../actions/auth";
import { ADMIN_RESET_PASSWORD_RESET } from "../../types/auth";
import { ErrorBox } from "../../components";

const NewPassword = () => {
  const dispatch = useDispatch();
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  const history = useHistory();
  const tokenId = history.location.pathname.split("/")[2];

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
      history.push("/dashboard");
    }

    if (success && !resetPasswordError) {
      dispatch({ type: ADMIN_RESET_PASSWORD_RESET });
      setFormData({
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [adminInfo, history, success, resetPasswordError, dispatch]);

  useEffect(() => {
    if(showError){
      setTimeout(() => {
        setShowError(null);
      }, 5000);
    }
  }, [showError]);
  

  const { newPassword, confirmPassword } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      dispatch(adminResetPasswordFunc(tokenId, { newPassword }));
    } else {
      setShowError("Password did not match")
    }
  };
  return (
    <>
      {resetPasswordLoading && <LoadingSpinner />}
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
                  value="Rest Password"
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
