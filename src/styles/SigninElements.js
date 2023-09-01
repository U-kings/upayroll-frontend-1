import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../values/colors";
import imgBg from "../resources/signinBg.jpg";
import imgBg2 from "../resources/forgotpaswordBg.jpg";
import imgBg3 from "../resources/newpasswordBg.jpg";
import imgLogo from "../resources/u-payLogo2.png";

export const SigninContainer = styled.div`
  width: 100%;
  /* background-color: lawngreen; */
  height: 100vh;

  & .signin__container {
    display: flex;
    height: 100vh;
  }
  & .sigin__img {
    background-image: url(${imgBg});
    /* background-position-y: 25rem; */
  }

  & .forgotpassword__img {
    background-image: url(${imgBg2});
    /* padding: 20px; */
  }
  & .newpassword__img {
    background-image: url(${imgBg3});
    background-position-y: 0rem;
    /* padding: 20px; */
  }
  & .sigin__img,
  .forgotpassword__img,
  .newpassword__img {
    width: 50%;
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: 0;

    &::before {
      content: "";
      position: absolute;
      background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.3)
      );
      height: inherit;
      /* opacity: .4; */
      width: inherit;
    }
  }

  @media only screen and (max-width: 1024px) {
    & .sigin__img {
      display: none;
    }
    & .forgotpassword__img {
      display: none;
    }
  }
`;
export const SigninContent = styled.div`
  /* width: 50%; */
  margin: auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding-top: 30rem;

  & .form__container {
    // padding-top: 10rem;
    width: 37rem;
    padding: 2rem 2rem;
    border-radius: 0.8rem;
    background-color: ${COLORS.white2};
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.09);

    & .signin__row__text {
      display: flex;
    }

    & .logo {
      background-image: url(${imgLogo});
      background-size: cover;
      margin: auto 0.2rem auto auto;
      width: 37px;
      height: 37px;
    }
  }
  & p {
    font-weight: 500;
    font-size: 1.4rem;
    color: ${COLORS.black2};
    margin-bottom: 1rem;
    position: relative;
    text-align: center;
  }
  & h2 {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  & h1 {
    color: ${COLORS.black6};
    margin: 1rem auto 1rem 0;
    cursor: default;
    font-size: 2.7rem;
    font-weight: 500;
    text-align: center;

    & span {
      color: ${COLORS.blue2};
      margin-bottom: 2rem;
      font-size: 2.7rem;
      font-weight: 400;
    }
  }
`;

export const SigninForm = styled.form`
  & input {
    width: 100%;
    margin: 0.5rem 0;
    padding: 0 1rem;
    border-radius: 0.2rem;
    background-color: ${COLORS.white4};
    height: 3.7rem;
  }
  & .submit__btn {
    background-color: ${COLORS.black3};
    margin-bottom: 1rem;
    transition: 150ms ease-in-out;

    &:hover {
      background-color: ${COLORS.black5};
    }
  }

  & label {
    font-size: 1.4rem;
  }
`;

export const ForgotLink = styled(Link)`
  font-size: 1.5rem;
  text-decoration: none;

  & h3 {
    font-weight: 400;
    color: ${COLORS.grey};
    color: ${COLORS.grey};
    font-weight: 400;
    margin: 0.3rem 0 1rem 0;
    text-align: right;
  }

  & span {
    font-size: 1.6rem;
    font-weight: 500;
    color: ${COLORS.black2};
  }
`;
export const SignUpLink = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  & h3 {
    color: ${COLORS.grey};
    font-weight: 400;
    text-align: center;
  }
  & span {
    font-size: 1.6rem;
    font-weight: 500;
    color: ${COLORS.black2};
  }
`;
