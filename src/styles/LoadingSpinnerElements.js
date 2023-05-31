import styled from "styled-components";
import { COLORS } from "../values/colors";

export const Modal = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 123;
  top: 0;
  /* left: 17%; */
  // left: 10rem;
  /* margin-top: 4%; */
  margin-left: 17%;
  left: ${({ toggle }) => (toggle ? "70px" : "17%")};
  right: 0;
  backdrop-filter: blur(5px);
  /* background-color: rgba(255,255,255,.39); */
  background-color: rgba(0, 0, 0, 0.5);
  /* background-color: ${COLORS.white2}; */
  visibility: "visible";
  opacity: 1;
  transition: 160ms ease-out;
  // visibility: ${({ toggle }) => (toggle ? "visible" : "hidden")};
  // opacity: ${({ toggle }) => (toggle ? "1" : "0")};

  &.modal__fullwidth {
    margin-left: 0;
  }

  @media screen and (max-width: 1024px) {
    margin-left: 0;
    left: 0;
  }
`;
export const ModalContainer = styled.div`
  z-index: 100;
  position: absolute;
  top: 48%;
  // left: 41.5%;
  left: ${({ toggle }) => (toggle ? "47.5%" : "41.5%")};
  transform: translate(-50%, -50%);
  // background-color: red;
  margin: 0 auto;
  justify-content: center;
  /* visibility: 'visible'; */
  /* opacity: 1; */
  @media screen and (max-width: 1024px) {
    margin-left: 4%;
    top: 48%;
    left: 47%;
  }
`;
