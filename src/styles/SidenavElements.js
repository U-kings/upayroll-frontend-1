import styled from "styled-components";
import { Link } from "react-router-dom";
import { COLORS } from "../values/colors";
import imgBg from "../resources/u-payLogo3White.png";

export const LeftSide = styled.div`
  width: ${({ toggle }) => (toggle ? "70px" : "17%")};
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  overflow: auto;
  background-color: ${COLORS.black};
  height: 100vh;
  /* height: calc(100vh - 2rem); */
  height: 100vh;
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
    background-color: ${COLORS.black};
  }

  &::-webkit-scrollbar-thumb {
    cursor: pointer;
    background: ${COLORS.grey};
    border-radius: 0.3rem;
  }

  & .leftside__header {
    position: sticky;
    top: 0;
  }

  & .icons {
    width: 3.2rem;
    height: 3.2rem;
    font-size: 2rem;
    // margin-top: 1.5rem;
    // margin-left: 1rem;
    padding: 0.4rem;
    color: #fff;
  }

  & .menu2 {
    margin: auto 0;
    // display: none;
    padding: 0 1rem;
    display: ${({ mobileToggle }) => (mobileToggle ? "block" : "none")};
  }

  @media only screen and (max-width: 1024px) {
    // opacity: ${({ mobileToggle }) => (mobileToggle ? "1" : "0")};
    width: ${({ mobileToggle }) => (mobileToggle ? "250px" : "0")};
    margin-left: ${({ mobileToggle }) => (mobileToggle ? "0" : "-100rem")};

    // &::before {
    //   content: "";
    //   position: absolute;
    //   top: 0;
    //   right: 0;
    //   left: 0;
    //   bottom: 0;
    //   background-color: red;
    //   // background-color: rgba(0, 0, 0, 0.2)
    // }

    // & .menu2 {
    //   display: block;
    // }
  }
`;
export const MenuModal = styled.div`
  //   position: relative;
  @media only screen and (max-width: 1024px) {
    &::before {
      display: ${({ mobileToggle }) => (mobileToggle ? "block" : "none")};
      opacity: ${({ mobileToggle }) => (mobileToggle ? "1" : "0")};
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 100;
      background-color: rgba(0, 0, 0, 0.5);
      transition: 360ms ease-in-out;
    }
  }
`;

export const TextLink = styled(Link)`
background-color: ${COLORS.black};
padding: 1rem 0;
display: flex;
text-decoration: none;
height: 5.5rem;
width:100%;
  transition: 360ms ease-in-out;
  overflow: hidden;

  & .profile__img {
    background-image: url(${imgBg});
    background-size: cover;
    width: 30px;
    height: 30px;
    margin: auto 0 auto 1rem;
  }
  & h1 {
    overflow: hidden;
    display: ${({ toggle }) => (toggle ? "none" : "inline-flex")};
    font-size: 2.4rem;
    white-space: nowrap;
    margin: auto auto auto 1rem;
    text-align: left;
    color: ${COLORS.white};
    font-weight: 500;

    & span {
      color: ${COLORS.blue2};
      font-size: 2.4rem;
      margin-left: 0.5rem;
      font-weight: 400;
    }
  }
  & .small {
    // display: ${({ toggle }) => (!toggle ? "none" : "block")};
    display: none;
  }

  @media only screen and (max-width: 1353px) {
    & h1 {
        font-size: 1.8rem;
    
        & span {
          font-size: 1.8rem;
        }
    }

`;

export const NavList = styled.ul`
  list-style: none;
  font-weight: 400;
  margin: auto 0;
  overflow: hidden;
  width: 100%;
  /* width: 240px; */
  & p {
    white-space: nowrap;
    margin: auto 0;
    font-size: 1.4rem;
    display: ${({ toggle }) => (toggle ? "none" : "inline-flex")};
    transition: 160ms ease-in-out;
  }
  & li {
    color: ${COLORS.grey};
    padding: 1rem 1rem;
    overflow: hidden;
    transition: ease-in-out 0.1s;
    display: flex;
  }
  & li:hover {
    background-color: ${COLORS.black6};
    border-left: 2px solid ${COLORS.blue2};
  }
  & .active {
    color: ${COLORS.grey};
    background-color: ${COLORS.black6};
    border-left: 2px solid ${COLORS.blue2};
  }
`;

export const NavLink = styled(Link)`
  & .icons {
    width: 3rem;
    height: 3rem;
    margin: auto 1rem auto 0;
    // margin-right: 1rem;
    color: ${COLORS.white};
  }
`;
