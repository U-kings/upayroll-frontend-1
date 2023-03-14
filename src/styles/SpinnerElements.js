import styled from "styled-components";
import { COLORS } from "../values/colors";

export const Modal = styled.div`
  width: 100%;
  position: fixed;
  z-index: 1009;
  top: 0;
  left: 0;
  height: 100%;
  right: 0;
  backdrop-filter: blur(5px);
  background-color: rgba(0,0,0,.5);
  /* background-color: rgba(255,255,255,.39); */
  /* background-color: ${COLORS.white}; */
  visibility: 'visible';
  opacity: 1;
  transition: 160ms ease-out;
  /* visibility: ${({ isOpen8 }) => (isOpen8 ? "visible" : "hidden")};
  opacity: ${({ isOpen8 }) => (isOpen8 ? "1" : "0")}; */
`;
export const ModalContainer = styled.div`
  z-index: 100;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  /* background-color: red; */
  margin: 0 auto;
  justify-content: center;
  /* visibility: 'visible'; */
  /* opacity: 1; */
`;
