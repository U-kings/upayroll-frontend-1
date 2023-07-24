import React, { useState, useEffect } from "react";
import {
  SigninContainer,
  SigninContent,
  SigninForm,
  ForgotLink,
  SignUpLink,
} from "../../styles/SigninElements";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Spinner } from "../../modals";
import { adminLoginFunc } from "../../actions/auth";
import { ErrorBox } from "../../components";
import usePasswordToggle from "../../hooks/PasswordToggle/usePasswordToggle";
import {
  CHECK_COOKIE_TOKEN_VALID_RESET,
  LOGIN_ADMIN_USER_RESET,
} from "../../types/auth";
import { COLORS } from "../../values/colors";
import { TextLink } from "../../styles/SidenavElements";

const SignIn = () => {
  const dispatch = useDispatch();
  const adminLogin = useSelector((state) => state.adminLoginReducer);
  const {
    adminInfo,
    isLoading: isLoadingToken,
    error: tokenError,
  } = useSelector((state) => state.adminLoginStatus);
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

  useEffect(() => {
    if (cookieValid.status) {
      history.push("dashboard");
      dispatch({ type: CHECK_COOKIE_TOKEN_VALID_RESET });
    }
  }, [dispatch, history, cookieValid]);

  const { email, password } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    // dispatch(apiResource());
    dispatch(
      adminLoginFunc({
        email: email?.toString()?.trim(),
        password: password?.toString()?.trim(),
      })
    );
  };

  return (
    <>
      {adminLogin?.isLoading && <Spinner />}
      <SigninContainer>
        <div className="signin__container">
          <div className="sigin__img"></div>
          <SigninContent>
            <div className="form__container">
              <div className="signin__row__text">
                <div style={{ margin: "auto" }}>
                  <Link to="/">
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <div style={{ margin: "auto", display: "flex" }}>
                        <div className="logo"></div>
                        <h1
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          Payroll <span>System</span>
                          <span
                            style={{
                              fontSize: ".8rem",
                              color: `${COLORS.black5}`,
                              marginLeft: "0",
                              fontWeight: "600",
                              paddingBottom: "2rem",
                              position: "absolute",
                            }}
                          >
                            TM
                          </span>
                        </h1>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              {!adminLogin?.isLoading && adminLogin?.error && (
                <ErrorBox
                  errorMessage={
                    adminLogin?.error === "Request failed with status code 500"
                      ? "Please Check Your Internet Connection"
                      : adminLogin?.error
                  }
                />
              )}
              {tokenError === "no token was passed" && !isLoadingToken && (
                <ErrorBox errorMessage="Please Make Sure Your Have A Secured URL" />
              )}
              <SigninForm onSubmit={onSubmit} autoComplete="off">
                <div className="label__group form__input">
                  <label>
                    Email<span className="red__text">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Enter email"
                    onChange={onChange}
                    autoComplete="new-password"
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
                    autoComplete="new-password"
                    value={password}
                    placeholder="Enter password"
                    onChange={onChange}
                    required
                  />
                  <span className="password__toggle">{ToggleIcon}</span>
                </div>
                <ForgotLink to="/forgot-password">
                  <h3>Forgot password?</h3>
                </ForgotLink>
                <input
                  type="submit"
                  className="submit__btn margin__top"
                  value="Sign in"
                />
              </SigninForm>
              <br />
              <SignUpLink to="/signup">
                <h3>
                  Don't have an account?{" "}
                  <b style={{ fontSize: "1.5rem" }}> Sign up</b>
                </h3>
              </SignUpLink>
            </div>
          </SigninContent>
        </div>
      </SigninContainer>
    </>
  );
};

export default SignIn;
