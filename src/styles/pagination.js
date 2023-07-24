import styled from "styled-components";
import { COLORS } from "../values/colors";

export const PaginationContainer = styled.div`
  width: 100%;
  bottom: 0;
  margin: 1rem auto 0 auto;
  padding: 0.8rem 2rem;
  position: sticky;
  display: flex;
  justify-content: space-between;
  box-shadow: 0.5rem 0 0.9rem rgba(0, 0, 0, 0.04);
  background-color: ${COLORS.white2};
  transition: 360ms ease-in-out;

  & .pagination {
    font-size: 3rem;
    display: flex;
    color: ${COLORS.black3};
    text-decoration: none;
    list-style: none;
    margin: 0 1rem 0 0;
    padding-bottom: 0.6rem;
    /* width: 100%; */
  }

  & .page__item {
    border-radius: 0.3rem;
    justify-content: center;
    cursor: pointer;
  }
  & .page__link {
    transition: all 150ms ease-in-out;
    background-color: ${COLORS.white4};
    justify-content: center;
    padding: 0.8rem 1.4rem;
    margin: auto 0.1rem;
    text-align: center;
    list-style: none;
  }
  & .active {
    color: ${COLORS.white2};
    background-color: ${COLORS.grey3};
  }

  & .pageCount {
    color: ${COLORS.grey2};
  }

  @media screen and (max-width: 1024px) {
    padding: 0.8rem 1rem;

    & .page__link {
    //   padding: 0.8rem 1.2rem;
      padding: 0.8rem calc(1rem + 0.5vw);
    }
  }
`;
