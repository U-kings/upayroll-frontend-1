import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../values/colors";
import imgLogo from "../resources/uridium.png";
import ImgPageNotFound from "../resources/pagenotfound.jpg";

export const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;
`;
export const DashboardContent = styled.div`
  display: flex;
  /* width: calc(100vw - 4rem); */
  width: 100%;
  padding: 0;
`;

export const Box = styled.div`
  /* width: 30rem; */
  width: 100%;
  flex: 1;
  padding: 3rem;
  color: ${COLORS.white};
  border-radius: 0.5rem;
  margin-right: 2rem;
  gap: 1rem;
  margin-bottom: 1rem;
  :last-child {
    margin-right: 0;
    // margin-left: 1rem;
  }
  &.b1 {
    background-image: linear-gradient(
      to right,
      rgb(30, 144, 255),
      rgb(0, 191, 255)
    );
  }
  &.b2 {
    background-image: linear-gradient(
      to right,
      rgb(254, 90, 29),
      rgb(255, 117, 24)
    );
  }
  &.b3 {
    background-image: linear-gradient(
      to right,
      rgb(186, 85, 211),
      rgb(183, 104, 162)
    );
  }
  &.b4 {
    background-image: linear-gradient(
      to right,
      rgb(255, 0, 56),
      rgb(255, 0, 40)
    );
  }
  &.b5 {
    background-image: linear-gradient(
      to right,
      rgb(50, 205, 50),
      rgb(127, 255, 0)
    );
  }
  &.b6 {
    background-image: linear-gradient(
      to right,
      rgb(1, 121, 111),
      rgb(0, 116, 116)
    );
  }

  & p {
    font-weight: 400;
    font-size: 2rem;
    margin: 0;
  }
`;

export const LinkButton = styled(Link)`
  margin: auto 0 auto 0;
  color: ${COLORS.white};
  border-radius: 0.3rem;
  font-size: 1.5rem;
  /* left: 10rem; */
  /* height: 4rem; */
  /* margin-left: .2rem; */
  // width: 100%;

  & .green__btn {
    background-color: ${COLORS.green};
    /* height: 3rem; */
    // width: 100%;
    padding: 0.55rem 0.9rem;
    transition: all 150ms ease-in-out;
    &:hover {
      background-color: ${COLORS.green2};
    }
  }

  &.gen_payslip {
    background-color: ${COLORS.blue2};
  }

  @media only screen and (max-width: 1024px) {
    width: 100%;
    & .green__btn {
      width: 100%;
    }
  }
`;
export const Mainbody = styled.div`
  width: ${({ toggle }) => (toggle ? "95.5%" : "83%")};
  overflow: auto;
  position: fixed;
  height: 100%;
  -ms-overflow-style: none;
  scrollbar-width: none;
  right: 0;
  // margin-left: ${({ toggle }) => (toggle ? "70px" : "17%")};
  top: 0;
  background-color: ${COLORS.white2};
  transition: 360ms ease-in-out;

  &::-webkit-scrollbar {
    /* display: none; */
    width: 1rem;
    height: 1rem;
    margin-top: 4rem;
    position: absolute;
    z-index: 200;
  }
  &::-webkit-scrollbar-track {
    background-color: ${COLORS.white};
  }

  &::-webkit-scrollbar-thumb {
    cursor: pointer;
    background: ${COLORS.grey3};
    border-radius: 0.3rem;
  }

  @media only screen and (max-width: 1024px) {
    width: 100%;
    margin-left: 0;
    // display: none;
  }
`;

export const TopHeader = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 99;
  padding: 0 2rem;
  // height: 55px;
  background-color: ${COLORS.white};
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.04);
  justify-content: space-between;
  display: flex;
  align-items: center;
  transition: 360ms ease-in-out;
  over-flow: hidden;

  & .icons {
    width: 3.2rem;
    height: 3.2rem;
    font-size: 2rem;
    // margin-top: 1rem;
    // margin-left: 2rem;
    padding: 0.4rem;
  }

  & h1 {
    justify-content: center;
    font-size: 2.2rem;
    margin: auto 0;
    height: 5.3rem;
    color: ${COLORS.grey2};
    padding: 1rem 2.5rem;
    font-weight: 500;
    // white-space: nowrap;
  }
  & h2 {
    font-size: 1.3rem;
    cursor: pointer;
    margin: auto;
    padding: 0 0.5rem;
    color: ${COLORS.grey2};
    justify-content: center;
    font-weight: 500;
  }
  & .menu2 {
    display: none;
    margin: auto 0;
  }

  & .menu {
    display: block;
    margin: auto 0;
  }
  @media only screen and (max-width: 1024px) {
    padding: 1rem 1rem;
    & .menu {
      display: none;
    }
    & .menu2 {
      display: block;
    }
    & h1 {
      padding: 1rem 0.5rem;
    }
  }
`;

export const SignoutContainer = styled.input`
  font-size: 1.4rem;
  color: ${COLORS.white};
  width: 100%;
  padding: 0.5rem;
  margin: auto;
  font-weight: 400;
  border-radius: 0.3rem;
  cursor: pointer;
`;

////////////////////////////////////
/*Employee List Header Section (Add Emplyee)*/
////////////////////////////////////

export const EmpContainer = styled.div`
  margin: 1rem 1rem;
  display: flex;
  /* height: 3rem; */
  flex-wrap: wrap;
  justify-content: space-between;

  & .approve__slip {
    background-color: ${COLORS.green2};

    &:hover {
      background-color: ${COLORS.green};
    }
  }

  & .search__container {
    /* margin-left: auto; */
    display: flex;
    // width: 100%;
    position: relative;

    & .search__icon {
      position: absolute;
      left: 1.7rem;
      top: 0.4rem;
      color: ${COLORS.grey};
    }
    & .search__input {
      padding: 0.55rem 1rem 0.55rem 3rem;
      margin-left: 1rem;
      /* height: 3rem; */
      cursor: text;
      border-radius: 0.3rem;
    }
  }

  & .top__btn {
  }

  & .emp__control {
  }

  @media only screen and (max-width: 1024px) {
    margin: 1rem 0;

    & .top__btn {
      width: 100%;
    }

    & .search__container {
      width: 100%;

      & .search__icon {
        left: 1rem;
      }
      & .search__input {
        width: 100%;
        margin-left: 0;
      }
    }

    & .emp__control {
      width: 100%;
      margin-bottom: 1rem;
    }

    & .mobile__margin__top {
      margin-top: 1rem;
    }
  }
`;

export const Container = styled.div`
  background-color: ${COLORS.white2};
  margin: 0rem 1rem 0 1rem;
  color: ${COLORS.grey2};
  /* position: fixed; */
  /* margin-bottom: 2rem; */

  &.inner__container {
    padding: 1rem;
  }

  & .profile__settings {
    /* width: 520px; */
    padding: 2rem 30%;
    margin: auto;
    font-size: 0.5rem;
    overflow: auto;

    &::-webkit-scrollbar {
      /* display: none; */
      position: absolute;
      width: 0.5rem;
    }
    &::-webkit-scrollbar-track {
      background-color: ${COLORS.white2};
    }

    &::-webkit-scrollbar-thumb {
      background: ${COLORS.grey3};
      border-radius: 10rem;
    }

    & h1 {
      margin: 0;
      font-size: 2.8rem;
    }
    & .profile__save {
      background-color: ${COLORS.green};
    }
  }

  & .exportfile__container {
    width: 31%;
    margin: auto;
    padding: 0 0 4rem 0;

    & h1 {
      margin: 0;
      font-weight: 400;
    }
    & h2 {
      font-weight: 400;
      & span {
        margin: 0 1rem;
        font-size: 1.5rem;
        color: ${COLORS?.blue};
      }
    }
  }

  & h1 {
    font-weight: 400;
    font-size: 2.2rem;
    margin: 0 2rem;
  }

  & .table__body {
    width: 100%;
    /* background-color: orange; */
    padding: 1rem;
    background-color: ${COLORS.white};
    height: 80%;
    box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, 0.109);
  }

  & .table__overflow {
    overflow: auto;
    /* max-height: 500px; */
    /* height: 73vh; */
    &.full__height {
      max-height: calc(100vh - 185px);
    }
    &.full__height2 {
      max-height: calc(100vh - 150px);
    }
    &::-webkit-scrollbar {
      /* display: none; */
      width: 1rem;
      height: 0.8rem;
      margin-top: 4rem;
      position: absolute;
      z-index: 200;
    }
    &::-webkit-scrollbar-track {
      background-color: ${COLORS.white};
    }

    &::-webkit-scrollbar-thumb {
      cursor: pointer;
      background: ${COLORS.grey3};
      border-radius: 0.2rem;
    }
  }

  & .container__content {
    overflow-x: auto;
    display: flex;
    /* width: 100%; */
    padding: 1.5rem;
    margin: auto;

    & .monthlypayhead__text p {
      font-size: 1.5rem;
      font-weight: 500;
    }

    & h1 {
      display: flex;
      margin: 2rem auto;
    }

    & .taxtable__body {
      box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.109);
      width: 100%;
      padding: 1rem;
      // padding: 1.5rem;
      background-color: ${COLORS.white};
    }

    &::-webkit-scrollbar {
      /* display: none; */
      width: 1rem;
      height: 0.9rem;
      margin-top: 4rem;
      position: absolute;
      z-index: 200;
    }
    &::-webkit-scrollbar-track {
      background-color: ${COLORS.white};
    }

    &::-webkit-scrollbar-thumb {
      cursor: pointer;
      background: ${COLORS.grey3};
      border-radius: 0.2rem;
    }

    & .form__button {
      display: flex;
      margin-top: 1rem;
      justify-content: space-between;
    }

    & .form__button input {
      width: 100%;
      border-radius: 0.3rem;
    }
    // & .table__body {
    //   margin-left: 2rem;
    //   width: 65%;
    // }
    & .form__content {
      width: 35%;
      background-color: ${COLORS.white};
      padding: 0.6rem 1.7rem 3rem 1.7rem;
      margin-right: 2rem;
      border-radius: 0.3rem;
      box-shadow: 0.2rem 0 1.3rem rgba(0, 0, 0, 0.109);
    }
  }

  @media only screen and (max-width: 1024px) {
    & .container__content {
      display: block;
      padding: 0;

      & .table__body {
        width: 100%;
        margin-left: 0;
        margin-top: 1rem;
      }
      & .form__content {
        width: 100%;
        margin-right: 0;
      }

      & .import__text {
        margin-top: 7rem;
        text-align: center;
      }
    }

    & .profile__settings {
      padding: 2rem 0;
    }

    & .exportfile__container {
      width: 100%;
      margin: auto;
    }

    &.inner__container {
      padding: 0;
    }
  }
`;

//////////////////////////////////
/* Table section */
//////////////////////////////////

export const TableBody = styled.div`
  padding: 1rem 1.5rem;
  font-size: 1.6rem;
  width: 100%;
`;

export const TableContent = styled.div`
  padding: 1rem 1rem;
  border-radius: 0.3rem;
  width: 100%;
  background-color: ${COLORS.white};
  box-shadow: 0rem 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
`;

//////////////////////////////////
/* New & Edit Employee section */
//////////////////////////////////

export const NewEmp = styled.div`
  padding: 3rem 20rem 1.5rem 20rem;
  height: 100vh;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin: auto;
  background-color: ${COLORS.white};

  &.edit__emp {
    width: 100%;
    padding: 0.3rem 5rem;

    & .staffId,
    .workdays {
      width: 20rem;
    }
  }

  &::-webkit-scrollbar {
    /* display: none; */
    position: absolute;
    width: 0.5rem;
  }
  &::-webkit-scrollbar-track {
    background-color: ${COLORS.white2};
  }

  &::-webkit-scrollbar-thumb {
    background: ${COLORS.grey3};
    border-radius: 10rem;
  }

  & h1 {
    font-size: 2.5rem;
    text-align: center;
    color: ${COLORS.black5};
  }

  & .add__emp {
    margin-top: 1rem;
    color: ${COLORS.white4};
    background-color: ${COLORS.blue};
    transition: 360ms ease-in-out;
  }
  & .add__emp:hover {
    background-color: ${COLORS.blue2};
  }

  & .staffId,
  .workdays {
    width: 20rem;
  }

  @media only screen and (max-width: 1024px) {
    padding: 3rem 1.5rem 1.5rem 1.5rem;

    & .staffId,
    .workdays {
      width: 100%;
    }

    & h1 {
      margin-top: 4rem;
    }

    &.edit__emp {
      width: 100%;
      padding: 0.3rem 1.5rem;

      & .staffId,
      .workdays {
        width: 100%;
      }
    }
  }
`;

export const BackLink = styled(Link)`
  padding: 2.5rem;
  z-index: 50;
  top: 1rem;
  left: 15%;
  position: fixed;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;

  & .left__arrow {
    position: absolute;
    left: 1.7rem;
    top: 1.6rem;
    color: ${COLORS.white};
    font-size: 2rem;
    margin: 0;
    padding: 0;
  }

  @media only screen and (max-width: 1024px) {
    left: 3%;
  }
`;

export const ImportExcelLink = styled(Link)`
  /* background-color: rgba(0,0,0,.9); */
  z-index: 50;
  top: 1rem;
  right: 15.4%;
  position: fixed;
  border-radius: 0.3rem;

  & .excel__import {
    padding: 0.7rem;
    cursor: pointer;
    background-color: ${COLORS.green};
    transition: 260ms ease-in-out;
    &:hover {
      background-color: ${COLORS.green2};
    }
  }

  @media only screen and (max-width: 1024px) {
    right: 3%;
  }
`;

//////////////////////////////////
/* DropDown section */
//////////////////////////////////

export const DropDownContainer = styled("div")`
  text-align: left;

  & .dropdown__header {
    padding: 0.55rem 3rem 0.55rem 1rem;
  }

  & .month__header {
    padding: 0.55rem 3rem 0.55rem 1rem;
    width: 13rem;
  }

  @media only screen and (max-width: 1024px) {
    width: 100%;
    & .month__header {
      width: 100%;
    }
    & .dropdown__header {
      width: 100%;
    }
  }
`;

export const DropDownHeader = styled("div")`
  position: relative;
  padding: 0.9rem;
  border-radius: 0.3rem;
  font-size: 1.5rem;
  color: ${COLORS.grey2};
  background: ${COLORS.white4};
  border: 1px solid rgba(0, 0, 0, 0.09);

  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  cursor: default;

  & .dropdown__icon {
    position: absolute;
    right: 0.8rem;
    color: ${COLORS.grey2};
    cursor: pointer;
    font-size: 1.5rem;
  }
`;

export const DropDownListContainer = styled("div")`
  position: relative;
  padding: 0;
  margin: 0;
`;

export const DropDownList = styled("ul")`
  overflow: auto;
  width: 100%;
  position: absolute;
  box-sizing: border-box;
  z-index: 50;
  font-size: 2.2rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0rem 0.3rem 0.5rem rgba(0, 0, 0, 0.06);
  transition: 150ms ease-out;

  & :hover {
    background-color: ${COLORS.white4};
  }
`;

export const ListItem = styled("li")`
  list-style: none;
  padding: 0.8rem 0.8rem;
  color: ${COLORS.black2};
  background-color: ${COLORS.white2};
  border: 1px solid ${COLORS.white4};
  transition: 150ms ease-out;

  &:last-child {
    border-top: none;
  }
  &.current {
    background-color: ${COLORS.grey3};
    color: ${COLORS.white};
    border: 1px solid ${COLORS.white4};
  }
`;

//////////////////////////////////
/* Profile DropDown */
//////////////////////////////////

export const ProfileContainer = styled("div")`
  position: relative;
  display: flex;
  margin: auto auto auto 1rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  font-weight: 500;
  font-size: 1.5rem;
  color: ${COLORS.black2};
  background-color: ${COLORS.white2};
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  transition: 230ms ease-in-out;
`;

export const ProfileContent = styled("div")`
  position: absolute;
  right: 0;
  top: 4.5rem;
  width: 20rem;
  /* height: 20rem; */
  padding: 2rem;
  display: flex;
  background-color: ${COLORS.white};
  box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.09);

  &::before {
    content: "";
    z-index: 99;
    position: absolute;
    background-color: ${COLORS.white};
    transform: rotate(45deg);
    top: -0.5rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
  }

  & .content {
    height: 100%;
    margin: auto;
    width: 100%;
    justify-content: center;

    & .settings {
      text-decoration: none;
      color: ${COLORS.black2};
      font-size: 1.5rem;
      font-weight: 400;
      justify-content: center;
      margin: 1rem 0;
      display: flex;
      width: 100%;
      padding: 0.6rem 1rem;
      background-color: ${COLORS.white4};
      cursor: pointer;
      transition: 150ms ease-in-out;

      &:hover {
        color: ${COLORS.black7};
        background-color: ${COLORS.white5};
      }
    }
  }
`;

//////////////////////////////////
/* PopUp section */
//////////////////////////////////

export const ModalBackground = styled.div`
  width: 100%;
  position: fixed;
  z-index: 110;
  top: 0;
  left: 0;
  /* bottom: 0; */
  height: 100%;
  /* padding-top: 6rem; */
  /* background-color: ${COLORS.blue2}; */

  background-color: rgba(0, 0, 0, 0.7);
  visibility: ${({
    isOpen,
    isOpen2,
    isOpen3,
    isOpen4,
    isOpen5,
    isOpen6,
    isOpen7,
    isOpen8,
  }) =>
    isOpen ||
    isOpen2 ||
    isOpen3 ||
    isOpen4 ||
    isOpen5 ||
    isOpen6 ||
    isOpen7 ||
    isOpen8
      ? "visible"
      : "hidden"};
  opacity: ${({
    isOpen,
    isOpen2,
    isOpen3,
    isOpen4,
    isOpen5,
    isOpen6,
    isOpen7,
    isOpen8,
  }) =>
    isOpen ||
    isOpen2 ||
    isOpen3 ||
    isOpen4 ||
    isOpen5 ||
    isOpen6 ||
    isOpen7 ||
    isOpen8
      ? "1"
      : "0"};
  transition: 260ms ease-in-out;
`;

export const ModalContainer = styled.div`
  position: fixed;
  z-index: 120;
  top: 50%;
  left: 50%;
  /* width: 50%; */
  max-height: 100vh;
  transform: translate(-50%, -50%);
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  visibility: ${({
    isOpen,
    isOpen2,
    isOpen3,
    isOpen4,
    isOpen5,
    isOpen7,
    isOpen8,
  }) =>
    isOpen || isOpen2 || isOpen3 || isOpen4 || isOpen5 || isOpen7 || isOpen8
      ? "visible"
      : "hidden"};
  opacity: ${({
    isOpen,
    isOpen2,
    isOpen3,
    isOpen4,
    isOpen5,
    isOpen7,
    isOpen8,
  }) =>
    isOpen || isOpen2 || isOpen3 || isOpen4 || isOpen5 || isOpen7 || isOpen8
      ? "1"
      : "0"};
  transition: 360ms ease-in-out;

  &.emp__view {
    width: 45%;
    background-color: ${COLORS.white};
    margin: auto;
    color: ${COLORS.black5};
    padding: 2rem;
    border-radius: 0.4rem;
  }
  &.edit__emp {
    width: 60%;
  }
  &.view__slip {
    /* width: 28%; */
  }
  &.uploadslip {
    width: 30%;
    background-color: ${COLORS.white};
    margin: auto;
    /* padding: 2rem; */
  }
  &.comfirm {
    width: 40rem;
  }

  &.bank__schedule {
    width: 80rem;
  }

  &::-webkit-scrollbar {
    /* display: none; */
    width: 0.5rem;
    /* border: 3px solid goldenrod; */
    height: 3rem;
    margin-top: 4rem;
    position: absolute;
    z-index: 200;
  }
  &::-webkit-scrollbar-track {
    background-color: ${COLORS.white};
  }

  &::-webkit-scrollbar-thumb {
    cursor: pointer;
    background: ${COLORS.grey3};
    border-radius: 10rem;
  }

  @media only screen and (max-width: 1024px) {
    &.emp__view {
      width: 95%;
    }
    &.edit__emp {
      width: 95%;
    }
    &.view__slip {
      /* width: 28%; */
    }
    &.uploadslip {
      width: 95%;
      background-color: ${COLORS.white};
      margin: auto;
      /* padding: 2rem; */
    }
    &.comfirm {
      width: 95%;
    }

    &.bank__schedule {
      width: 95%;
      // width: 80rem;
    }
  }
`;

export const ModalContainer2 = styled.div`
  position: fixed;
  z-index: 120;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  transition: 360ms ease-in-out;
  visibility: ${({ isOpen3, isOpen5, isOpen6 }) =>
    isOpen3 || isOpen5 || isOpen6 ? "visible" : "hidden"};
  opacity: ${({ isOpen3, isOpen5, isOpen6 }) =>
    isOpen3 || isOpen5 || isOpen6 ? "1" : "0"};

  &.add__payhead {
    width: 35%;
    background-color: ${COLORS.white};
    margin: auto;
    color: ${COLORS.black5};
    padding: 2rem;
    border-radius: 0.4rem;
  }

  &::-webkit-scrollbar {
    /* display: none; */
    width: 1rem;
    /* border: 3px solid goldenrod; */
    height: 3rem;
    margin-top: 4rem;
    position: absolute;
    z-index: 200;
  }
  &::-webkit-scrollbar-track {
    background-color: ${COLORS.white};
  }

  &::-webkit-scrollbar-thumb {
    cursor: pointer;
    background: ${COLORS.grey3};
    border-radius: 10rem;
  }
`;

//////////////////////////////////
/* View SalarySlip section */
//////////////////////////////////

export const ViewSalaryContainer = styled.section`
  background-color: ${COLORS.white};
  // width: 35rem;
  width: 100%;
  padding: 0.8rem;
  border-radius: 0.3rem;

  & .row3 {
    display: flex;
    width: 100%;

    & .flex__1 {
      flex: 1;
    }
  }

  & .blue {
    height: 20px;
    background-color: ${COLORS.blue2};
  }
  & .black {
    background-color: ${COLORS.black};
  }

  & .U__logo {
    width: 50%;
    height: 35px;
    background-size: 150px;
    background-repeat: no-repeat;
    margin: 1.3rem 0;
  }

  & .payslip__text {
    margin: auto;
    font-size: 2.4rem;
    justify-content: center;
  }

  & h2 {
    font-size: 1.4rem;
    margin: 0.1rem 0;
    // text-align: left;
    width: 100%;
    padding: 0.1rem 0.7rem;
    // width: 200px;
    font-weight: bold;
  }

  & .bg {
    padding: 0.5rem 0.7rem;
    width: 100%;
    background-color: ${COLORS.white3};
  }
  & .row div {
    width: 100%;
  }
  & p {
    font-size: 1.3rem;
    margin: 0.4rem 0.7rem;
  }
`;
//////////////////////////////////
/* Months section */
//////////////////////////////////

export const MonthContainer = styled.div`
  width: 100%;
  margin: auto;
  justify-content: center;
`;
export const MonthContent = styled.div`
  display: flex;
  margin: auto;
  border-radius: 0.3rem;
  flex-wrap: wrap;
  width: 100%;
  & .month {
    margin: 0.5rem;
    justify-content: center;
  }
  & .month:last-child {
    /* margin-right: auto; */
  }
`;
export const Month = styled(Link)`
  background-color: ${COLORS.white4};
  color: ${COLORS.black5};
  border-radius: 0.5rem;
  flex: 1;
  padding: 2.7rem;
  cursor: pointer;
  transition: 350ms ease-in-out;

  &:hover {
    background-color: ${COLORS.grey3};
  }

  & h2 {
    text-align: center;
  }

  &.current {
    background-color: ${COLORS.grey3};
    color: ${COLORS.white};
    border: 1px solid ${COLORS.white4};
  }
`;

/////Screen Resolution Section //////
/////////////////////////////////////

export const ScreenResolutionContainer = styled.div`
  display: none;
  position: fixed;
  z-index: 130;
  @media screen and (max-width: 856px) {
    background-color: ${COLORS.white};
    display: flex;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /* background-color: ${COLORS.white2}; */
    // width: 100vw;
    // height: 100vh;
  }
`;
export const ScreenResolutionContent = styled.div`
  display: flex;
  & h1 {
    padding: 3rem;
    border-radius: 0.3rem;
    background-color: ${COLORS.white3};
    margin: auto;
    color: ${COLORS.grey};
    font-weight: 300;
    font-size: 2rem;
    width: 70%;
    text-align: center;
  }
`;

//////////////////////////////////////////
////////////Voucher//////////////////////
////////////////////////////////////////

export const ViewVoucherContainer = styled.section`
  background-color: ${COLORS.white2};
  box-shadow: 0.2rem 0.2rem 1rem rgba(0, 0, 0, 0.14);
  width: 550px;
  padding: 3rem;
  margin: 1rem auto auto auto;

  & h1 {
    text-align: center;
    margin: 0;
    font-size: 2.3rem;
  }

  & p {
    font-size: 1.4rem;
    color: ${COLORS.grey2};
    margin: 0 auto 1rem 0;
  }

  & .u__logo {
    width: 130px;
    height: 30px;
    /* margin: auto; */
    background-image: url(${imgLogo});
    background-size: cover;
  }

  & table {
    font-size: 5.8rem;

    /* border: 1px solid red; */
    & td {
      border: 1px solid ${COLORS.grey3};
    }
    & .black {
      background-color: ${COLORS.black2};
      border: 1px solid ${COLORS.black2};
      color: ${COLORS.white};
      text-align: center;
    }
  }
`;

//////////////////////////////////////////////
////////Bank Schedule////////////////////////
/////////////////////////////////////////////
export const BankScheduleContainer = styled.section`
  background-color: ${COLORS.white2};
  box-shadow: 0.2rem 0.2rem 1rem rgba(0, 0, 0, 0.14);
  width: 100%;
  padding: 0.5rem;
  margin: auto;
`;

export const PageNotFoundContainer = styled.section`
  background-image: url(${ImgPageNotFound});
  /* background-size: cover; */
  position: relative;
  width: 100%;
  display: flex;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  & .goback__text {
    font-size: 1.6rem;
    border-radius: 5rem;
    margin: auto auto auto auto;
    color: ${COLORS.white};
    padding: 0.8rem 2rem;
    background-color: ${COLORS.blue2};
    box-shadow: 0.2rem 0.1rem 1rem rgba(0, 0, 0, 0.3);
  }
`;
