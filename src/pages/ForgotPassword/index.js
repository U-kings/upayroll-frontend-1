import React, { useState, useEffect } from "react";
import {
  SigninContainer,
  SigninContent,
  SigninForm,
  SignUpLink,
} from "../../styles/SigninElements";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Spinner, Successful } from "../../modals";
import { ADMIN_FORGOT_PASSWORD_RESET } from "../../types/auth";

import { adminForgotPasswordFunc } from "../../actions/auth";
import { ErrorBox } from "../../components";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  const { success, error, isLoading } = useSelector(
    (state) => state.adminForgotPassword
  );

  //  func state
  const [emailForm, setEmailForm] = useState("");
  const [isOpen7, setIsOpen7] = useState(false);

  useEffect(() => {
    if (adminInfo?.isAuthenticated && adminInfo?.user?.name) {
      history.push("dashboard");
    }

    if (success && !error) {
      setEmailForm("");
    }
  }, [adminInfo, history, success, error]);

  const onChange = (e) => {
    setEmailForm(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (emailForm) {
      dispatch(adminForgotPasswordFunc({ email: emailForm }));
    }
  };

  const popup7 = () => {
    if (success && !error) {
      dispatch({ type: ADMIN_FORGOT_PASSWORD_RESET });
      setIsOpen7(false);
    }
  };

  return (
    <>
      {isLoading && <Spinner />}

      <Successful
        isOpen7={isOpen7 || (success && !error)}
        setIsOpen7={setIsOpen7}
        popup7={popup7}
        message="Email sent successfully! 
        ..kindly check your email to see prodcures"
      />

      <SigninContainer>
        <div className="signin__container">
          <div className="forgotpassword__img"></div>
          <SigninContent>
            <div className="form__container">
              <h2>
                Forgot Password?<span></span>
              </h2>
              <p>
                Enter your valid email to recieve instructions on how to reset
                your password
              </p>
              {!isLoading && error && <ErrorBox errorMessage={error} />}
              <SigninForm autoComplete="off" onSubmit={onSubmit}>
                <div className="label__group form__input">
                  <label>
                    Email<span className="red__text">*</span>
                  </label>
                  <input
                    type="email"
                    name="emailForm"
                    value={emailForm}
                    placeholder="Enter your Email"
                    onChange={onChange}
                    autoComplete="new-password"
                    required
                  />
                </div>
                <input
                  type="submit"
                  className="submit__btn form__input"
                  value="Send"
                />
              </SigninForm>
              <SignUpLink to="/signin">
                <h3>
                  Go Back to <span>SignIn</span>
                </h3>
              </SignUpLink>
            </div>
          </SigninContent>
        </div>
      </SigninContainer>
    </>
  );
};

export default ForgotPassword;
