import React, { useState, useEffect } from "react";
import {
  SigninContainer,
  SigninContent,
  SigninForm,
  ForgotLink,
} from "../../styles/SigninElements";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Spinner } from "../../modals";
import { adminLoginFunc } from "../../actions/auth";
import { ErrorBox } from "../../components";
import usePasswordToggle from "../../hooks/PasswordToggle/usePasswordToggle";
import {
  CHECK_COOKIE_TOKEN_VALID_RESET,
  LOGIN_ADMIN_USER_RESET,
} from "../../types/auth";

const EmployeeSignIn = ({ toggle, toggleMenu, mobileToggle, toggleMobileMenu }) => {
  const dispatch = useDispatch();
  const adminLogin = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  const cookieValid = useSelector((state) => state.checkCookieTokenValid);
  const history = useHistory();

  //  func state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [PasswordInputType, ToggleIcon] = usePasswordToggle();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (adminInfo?.isAuthenticated && adminInfo?.user?.name) {
      history.push("dashboard");
    }

    if (adminLogin?.success) {
      dispatch({ type: LOGIN_ADMIN_USER_RESET });
    }

    if (!adminLogin?.isLoading && !adminLogin?.error) {
      setFormData({
        email: "",
        password: "",
      });
    }
  }, [adminLogin, history, adminInfo, dispatch]);

  const { email, password } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLoginFunc({ email, password }));
  };

  return (
    <>
      {adminLogin?.isLoading && <Spinner />}
      <SigninContainer>
        <div className="signin__container">
          <div className="sigin__img"></div>
          <SigninContent>
            <div className="form__container">
              {/* <h1>
                Payroll <span>System</span>
              </h1> */}
              <h1 style={{ fontSize: "2.3rem" }}>
                Employee <span style={{ fontSize: "2.3rem" }}>Sign In</span>
                Portal
              </h1>
              {!adminLogin?.isLoading && adminLogin?.error && (
                <ErrorBox
                  errorMessage={
                    adminLogin?.error === "Invalid Credentials"
                      ? "Invalid Credentials"
                      : "No Internet Connection Available"
                  }
                />
              )}
              <SigninForm onSubmit={onSubmit}>
                <div className="label__group form__input">
                  <label>
                    Email<span className="red__text">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Enter Email"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="label__group form__input">
                  <label>
                    Password<span className="red__text">*</span>
                  </label>
                  <input
                    type={PasswordInputType}
                    name="password"
                    value={password}
                    placeholder="Enter Password"
                    onChange={onChange}
                    required
                  />
                  <span className="password__toggle">{ToggleIcon}</span>
                </div>
                <input type="submit" className="submit__btn" value="Sign in" />
              </SigninForm>
              <ForgotLink to="/forgot-password">Forgot password?</ForgotLink>
            </div>
          </SigninContent>
        </div>
      </SigninContainer>
    </>
  );
};

export default EmployeeSignIn;
